import { google } from 'googleapis';
import { getAuthClient } from './google-auth.mjs';

const TARGET_KEYWORDS = [
  'basement waterproofing toronto',
  'basement waterproofing cost toronto',
  'basement waterproofing mississauga',
  'basement waterproofing brampton',
  'foundation repair toronto',
  'interior basement waterproofing',
  'exterior basement waterproofing',
  'basement waterproofing near me',
  'basement waterproofing etobicoke',
  'basement waterproofing scarborough',
  'basement waterproofing north york',
  'basement waterproofing east york',
  'basement waterproofing oakville',
  'basement leak repair toronto',
  'wet basement solutions toronto',
  'basement waterproofing company toronto',
  'foundation crack repair toronto',
  'sump pump installation toronto',
  'weeping tile replacement toronto',
  'basement underpinning toronto',
  'crawl space waterproofing toronto',
  'french drain installation toronto',
  'waterproofing contractors toronto',
  'basement flooding prevention toronto',
  'foundation waterproofing toronto',
];

function getSiteUrl() {
  return process.env.GSC_SITE_URL || 'https://dryspacewaterproofing.ca';
}

function stripDomain(url) {
  return url.replace(/^https?:\/\/[^/]+/, '');
}

async function getSearchConsole() {
  await getAuthClient();
  return google.searchconsole('v1');
}

/**
 * Query GSC Search Analytics with given params.
 */
async function querySearchAnalytics({ startDate, endDate, dimensions = ['query'], rowLimit = 1000, dimensionFilterGroups } = {}) {
  const sc = await getSearchConsole();
  const requestBody = {
    startDate,
    endDate,
    dimensions,
    rowLimit,
  };
  if (dimensionFilterGroups) {
    requestBody.dimensionFilterGroups = dimensionFilterGroups;
  }
  const res = await sc.searchanalytics.query({
    siteUrl: getSiteUrl(),
    requestBody,
  });
  return res.data.rows || [];
}

/**
 * Get positions for tracked target keywords.
 */
export async function getKeywordPositions({ startDate, endDate }) {
  const rows = await querySearchAnalytics({
    startDate,
    endDate,
    dimensions: ['query'],
    rowLimit: 5000,
  });

  const targetSet = new Set(TARGET_KEYWORDS.map(k => k.toLowerCase()));
  const tracked = [];
  const other = [];

  for (const row of rows) {
    const query = row.keys[0].toLowerCase();
    const entry = {
      keyword: row.keys[0],
      position: Math.round(row.position * 10) / 10,
      impressions: row.impressions,
      clicks: row.clicks,
      ctr: Math.round(row.ctr * 1000) / 10,
    };
    if (targetSet.has(query)) {
      tracked.push(entry);
    } else {
      other.push(entry);
    }
  }

  tracked.sort((a, b) => a.position - b.position);
  other.sort((a, b) => b.impressions - a.impressions);

  return { tracked, other: other.slice(0, 50) };
}

/**
 * Get top pages by impressions and clicks.
 */
export async function getTopPages({ startDate, endDate }) {
  const rows = await querySearchAnalytics({
    startDate,
    endDate,
    dimensions: ['page'],
    rowLimit: 100,
  });

  return rows
    .map(row => ({
      page: stripDomain(row.keys[0]) || '/',
      impressions: row.impressions,
      clicks: row.clicks,
      ctr: Math.round(row.ctr * 1000) / 10,
      position: Math.round(row.position * 10) / 10,
    }))
    .sort((a, b) => b.clicks - a.clicks);
}

/**
 * Compare keyword positions between two periods. Returns movers (up/down).
 */
export async function getPositionChanges(period1, period2) {
  const [rows1, rows2] = await Promise.all([
    querySearchAnalytics({ startDate: period1.startDate, endDate: period1.endDate, dimensions: ['query'], rowLimit: 5000 }),
    querySearchAnalytics({ startDate: period2.startDate, endDate: period2.endDate, dimensions: ['query'], rowLimit: 5000 }),
  ]);

  const map1 = new Map(rows1.map(r => [r.keys[0].toLowerCase(), r]));
  const map2 = new Map(rows2.map(r => [r.keys[0].toLowerCase(), r]));

  const changes = [];
  for (const [query, curr] of map2) {
    const prev = map1.get(query);
    if (prev) {
      const change = Math.round((prev.position - curr.position) * 10) / 10;
      if (Math.abs(change) >= 1) {
        changes.push({
          keyword: curr.keys[0],
          previousPosition: Math.round(prev.position * 10) / 10,
          currentPosition: Math.round(curr.position * 10) / 10,
          change,
          direction: change > 0 ? 'up' : 'down',
          impressions: curr.impressions,
          clicks: curr.clicks,
        });
      }
    }
  }

  changes.sort((a, b) => Math.abs(b.change) - Math.abs(a.change));
  return changes;
}

/**
 * Find striking-distance keywords (positions 5-20) — the most actionable.
 */
export async function getStrikingDistance({ startDate, endDate }) {
  const rows = await querySearchAnalytics({
    startDate,
    endDate,
    dimensions: ['query', 'page'],
    rowLimit: 5000,
  });

  return rows
    .filter(row => row.position >= 5 && row.position <= 20 && row.impressions >= 10)
    .map(row => ({
      keyword: row.keys[0],
      page: stripDomain(row.keys[1]) || '/',
      position: Math.round(row.position * 10) / 10,
      impressions: row.impressions,
      clicks: row.clicks,
      ctr: Math.round(row.ctr * 1000) / 10,
    }))
    .sort((a, b) => a.position - b.position);
}
