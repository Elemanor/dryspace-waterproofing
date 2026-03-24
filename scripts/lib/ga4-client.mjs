import { google } from 'googleapis';
import { getAuthClient } from './google-auth.mjs';

function getPropertyId() {
  const id = process.env.GA4_PROPERTY_ID;
  if (!id) {
    console.error('\n  GA4_PROPERTY_ID is not set in .env\n');
    process.exit(1);
  }
  return id;
}

async function getAnalyticsData() {
  await getAuthClient();
  return google.analyticsdata('v1beta');
}

/**
 * Run a GA4 report with the given dimensions and metrics.
 */
async function runReport({ dateRanges, dimensions = [], metrics = [], limit = 100, orderBys } = {}) {
  const ad = await getAnalyticsData();
  const requestBody = {
    dateRanges,
    dimensions: dimensions.map(d => ({ name: d })),
    metrics: metrics.map(m => ({ name: m })),
    limit,
  };
  if (orderBys) {
    requestBody.orderBys = orderBys;
  }
  const res = await ad.properties.runReport({
    property: getPropertyId(),
    requestBody,
  });
  return res.data;
}

/**
 * Parse a GA4 report response into an array of objects.
 */
function parseReport(data) {
  if (!data.rows) return [];
  const dimHeaders = (data.dimensionHeaders || []).map(h => h.name);
  const metHeaders = (data.metricHeaders || []).map(h => h.name);

  return data.rows.map(row => {
    const obj = {};
    (row.dimensionValues || []).forEach((v, i) => { obj[dimHeaders[i]] = v.value; });
    (row.metricValues || []).forEach((v, i) => {
      obj[metHeaders[i]] = isNaN(Number(v.value)) ? v.value : Number(v.value);
    });
    return obj;
  });
}

/**
 * Traffic overview: sessions, users, pageviews, bounce rate, avg engagement time.
 */
export async function getTrafficOverview({ startDate, endDate }) {
  const data = await runReport({
    dateRanges: [{ startDate, endDate }],
    metrics: ['sessions', 'activeUsers', 'screenPageViews', 'bounceRate', 'averageSessionDuration', 'engagedSessions'],
  });
  const rows = parseReport(data);
  if (rows.length === 0) return null;
  const r = rows[0];
  return {
    sessions: r.sessions,
    activeUsers: r.activeUsers,
    pageviews: r.screenPageViews,
    bounceRate: Math.round(r.bounceRate * 1000) / 10,
    avgSessionDuration: Math.round(r.averageSessionDuration),
    engagedSessions: r.engagedSessions,
    engagementRate: r.sessions > 0 ? Math.round((r.engagedSessions / r.sessions) * 1000) / 10 : 0,
  };
}

/**
 * Top landing pages by sessions.
 */
export async function getTopLandingPages({ startDate, endDate, limit = 20 }) {
  const data = await runReport({
    dateRanges: [{ startDate, endDate }],
    dimensions: ['landingPagePlusQueryString'],
    metrics: ['sessions', 'activeUsers', 'bounceRate', 'averageSessionDuration', 'conversions'],
    limit,
    orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
  });
  return parseReport(data);
}

/**
 * Conversions: form submissions, phone clicks, and other key events.
 */
export async function getConversions({ startDate, endDate }) {
  const data = await runReport({
    dateRanges: [{ startDate, endDate }],
    dimensions: ['eventName'],
    metrics: ['eventCount', 'conversions'],
    limit: 50,
  });
  return parseReport(data).filter(r => r.conversions > 0 || ['form_submit', 'phone_click', 'generate_lead', 'contact_form', 'click_to_call'].includes(r.eventName));
}

/**
 * Traffic sources: organic, direct, referral, social breakdown.
 */
export async function getTrafficSources({ startDate, endDate }) {
  const data = await runReport({
    dateRanges: [{ startDate, endDate }],
    dimensions: ['sessionDefaultChannelGroup'],
    metrics: ['sessions', 'activeUsers', 'conversions', 'engagedSessions'],
    orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
  });
  const rows = parseReport(data);
  const total = rows.reduce((sum, r) => sum + r.sessions, 0);
  return rows.map(r => ({
    ...r,
    percentage: total > 0 ? Math.round((r.sessions / total) * 1000) / 10 : 0,
  }));
}

/**
 * Compare traffic between two periods.
 */
export async function getTrafficComparison(period1, period2) {
  const [data1, data2] = await Promise.all([
    getTrafficOverview(period1),
    getTrafficOverview(period2),
  ]);

  if (!data1 || !data2) return { current: data2, previous: data1, changes: null };

  const pctChange = (curr, prev) => prev > 0 ? Math.round(((curr - prev) / prev) * 1000) / 10 : null;

  return {
    current: data2,
    previous: data1,
    changes: {
      sessions: pctChange(data2.sessions, data1.sessions),
      activeUsers: pctChange(data2.activeUsers, data1.activeUsers),
      pageviews: pctChange(data2.pageviews, data1.pageviews),
      bounceRate: data2.bounceRate - data1.bounceRate,
      engagementRate: data2.engagementRate - data1.engagementRate,
    },
  };
}
