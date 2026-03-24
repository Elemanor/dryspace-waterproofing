#!/usr/bin/env node

/**
 * DrySpace SEO Command Center
 *
 * Usage:
 *   node scripts/seo-monitor.mjs keywords       — Track keyword positions (GSC)
 *   node scripts/seo-monitor.mjs striking        — Striking-distance keywords (pos 5-20)
 *   node scripts/seo-monitor.mjs pages           — Top pages report (GSC)
 *   node scripts/seo-monitor.mjs traffic         — GA4 traffic overview
 *   node scripts/seo-monitor.mjs sources         — GA4 traffic sources breakdown
 *   node scripts/seo-monitor.mjs landing-pages   — GA4 top landing pages
 *   node scripts/seo-monitor.mjs conversions     — GA4 conversions report
 *   node scripts/seo-monitor.mjs gbp-info        — Read current GBP listing
 *   node scripts/seo-monitor.mjs gbp-reviews     — Fetch GBP reviews
 *   node scripts/seo-monitor.mjs gbp-post        — Create a Google Post
 *   node scripts/seo-monitor.mjs full-report     — Generate full weekly report
 */

import 'dotenv/config';
import { mkdirSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

import { getKeywordPositions, getTopPages, getPositionChanges, getStrikingDistance } from './lib/gsc-client.mjs';
import { getTrafficOverview, getTopLandingPages, getConversions, getTrafficSources, getTrafficComparison } from './lib/ga4-client.mjs';
import { getBusinessInfo, getReviews, createPost, listPosts } from './lib/gbp-client.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPORTS_DIR = resolve(__dirname, 'reports');

// ── Helpers ──────────────────────────────────────────────────────────

function today() {
  return new Date().toISOString().slice(0, 10);
}

function daysAgo(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().slice(0, 10);
}

function ensureReportsDir() {
  mkdirSync(REPORTS_DIR, { recursive: true });
}

function saveReport(filename, content) {
  ensureReportsDir();
  const path = resolve(REPORTS_DIR, filename);
  writeFileSync(path, content, 'utf-8');
  console.log(`\n  Report saved: ${path}\n`);
}

function table(headers, rows) {
  const widths = headers.map((h, i) =>
    Math.max(h.length, ...rows.map(r => String(r[i] ?? '').length))
  );
  const sep = widths.map(w => '-'.repeat(w)).join(' | ');
  const head = headers.map((h, i) => h.padEnd(widths[i])).join(' | ');
  const body = rows.map(row =>
    row.map((cell, i) => String(cell ?? '').padEnd(widths[i])).join(' | ')
  ).join('\n');
  return `${head}\n${sep}\n${body}`;
}

function mdTable(headers, rows) {
  const hdr = '| ' + headers.join(' | ') + ' |';
  const sep = '| ' + headers.map(() => '---').join(' | ') + ' |';
  const body = rows.map(r => '| ' + r.join(' | ') + ' |').join('\n');
  return `${hdr}\n${sep}\n${body}`;
}

function arrow(change) {
  if (change > 0) return `+${change} ↑`;
  if (change < 0) return `${change} ↓`;
  return '—';
}

function pctStr(val) {
  if (val === null || val === undefined) return 'N/A';
  return val > 0 ? `+${val}%` : `${val}%`;
}

// ── Commands ─────────────────────────────────────────────────────────

async function cmdKeywords() {
  console.log('\n  Fetching keyword positions from Google Search Console...\n');
  const range = { startDate: daysAgo(28), endDate: today() };
  const { tracked, other } = await getKeywordPositions(range);

  console.log('  TRACKED KEYWORDS');
  console.log('  ' + '='.repeat(80));
  if (tracked.length === 0) {
    console.log('  No data yet. Make sure the service account has access to GSC.\n');
    return;
  }
  const rows = tracked.map(k => [k.keyword, k.position, k.impressions, k.clicks, `${k.ctr}%`]);
  console.log(table(['Keyword', 'Pos', 'Impr', 'Clicks', 'CTR'], rows).split('\n').map(l => '  ' + l).join('\n'));

  if (other.length > 0) {
    console.log('\n  TOP DISCOVERY KEYWORDS (non-tracked)');
    console.log('  ' + '-'.repeat(80));
    const oRows = other.slice(0, 15).map(k => [k.keyword, k.position, k.impressions, k.clicks, `${k.ctr}%`]);
    console.log(table(['Keyword', 'Pos', 'Impr', 'Clicks', 'CTR'], oRows).split('\n').map(l => '  ' + l).join('\n'));
  }
  console.log('');
}

async function cmdStriking() {
  console.log('\n  Finding striking-distance keywords (positions 5-20)...\n');
  const range = { startDate: daysAgo(28), endDate: today() };
  const results = await getStrikingDistance(range);

  if (results.length === 0) {
    console.log('  No striking-distance keywords found.\n');
    return;
  }
  const rows = results.map(k => [k.keyword, k.page || '/', k.position, k.impressions, k.clicks]);
  console.log(table(['Keyword', 'Page', 'Pos', 'Impr', 'Clicks'], rows).split('\n').map(l => '  ' + l).join('\n'));
  console.log(`\n  Total: ${results.length} keywords in striking distance\n`);
}

async function cmdPages() {
  console.log('\n  Fetching top pages from Google Search Console...\n');
  const range = { startDate: daysAgo(28), endDate: today() };
  const pages = await getTopPages(range);

  if (pages.length === 0) {
    console.log('  No page data available.\n');
    return;
  }
  const rows = pages.slice(0, 20).map(p => [p.page || '/', p.clicks, p.impressions, `${p.ctr}%`, p.position]);
  console.log(table(['Page', 'Clicks', 'Impr', 'CTR', 'Avg Pos'], rows).split('\n').map(l => '  ' + l).join('\n'));
  console.log('');
}

async function cmdTraffic() {
  console.log('\n  Fetching GA4 traffic overview...\n');

  const current = { startDate: daysAgo(7), endDate: today() };
  const previous = { startDate: daysAgo(14), endDate: daysAgo(8) };
  const comparison = await getTrafficComparison(previous, current);

  if (!comparison.current) {
    console.log('  No traffic data. Check GA4_PROPERTY_ID and service account access.\n');
    return;
  }

  const c = comparison.current;
  const ch = comparison.changes;

  console.log(`  Sessions:         ${c.sessions}  ${ch ? pctStr(ch.sessions) : ''}`);
  console.log(`  Active Users:     ${c.activeUsers}  ${ch ? pctStr(ch.activeUsers) : ''}`);
  console.log(`  Pageviews:        ${c.pageviews}  ${ch ? pctStr(ch.pageviews) : ''}`);
  console.log(`  Bounce Rate:      ${c.bounceRate}%  ${ch ? `(${ch.bounceRate > 0 ? '+' : ''}${ch.bounceRate}pp)` : ''}`);
  console.log(`  Engagement Rate:  ${c.engagementRate}%  ${ch ? `(${ch.engagementRate > 0 ? '+' : ''}${ch.engagementRate}pp)` : ''}`);
  console.log(`  Avg Session:      ${c.avgSessionDuration}s`);
  console.log('');
}

async function cmdSources() {
  console.log('\n  Fetching GA4 traffic sources...\n');
  const range = { startDate: daysAgo(28), endDate: today() };
  const sources = await getTrafficSources(range);

  if (sources.length === 0) {
    console.log('  No source data.\n');
    return;
  }
  const rows = sources.map(s => [s.sessionDefaultChannelGroup, s.sessions, `${s.percentage}%`, s.activeUsers, s.conversions]);
  console.log(table(['Channel', 'Sessions', '%', 'Users', 'Conv'], rows).split('\n').map(l => '  ' + l).join('\n'));
  console.log('');
}

async function cmdLandingPages() {
  console.log('\n  Fetching GA4 top landing pages...\n');
  const range = { startDate: daysAgo(28), endDate: today() };
  const pages = await getTopLandingPages(range);

  if (pages.length === 0) {
    console.log('  No landing page data.\n');
    return;
  }
  const rows = pages.map(p => [
    p.landingPagePlusQueryString || '/',
    p.sessions,
    p.activeUsers,
    `${Math.round(p.bounceRate * 1000) / 10}%`,
    p.conversions,
  ]);
  console.log(table(['Landing Page', 'Sessions', 'Users', 'Bounce', 'Conv'], rows).split('\n').map(l => '  ' + l).join('\n'));
  console.log('');
}

async function cmdConversions() {
  console.log('\n  Fetching GA4 conversions...\n');
  const range = { startDate: daysAgo(28), endDate: today() };
  const events = await getConversions(range);

  if (events.length === 0) {
    console.log('  No conversion events found.\n');
    return;
  }
  const rows = events.map(e => [e.eventName, e.eventCount, e.conversions]);
  console.log(table(['Event', 'Count', 'Conversions'], rows).split('\n').map(l => '  ' + l).join('\n'));
  console.log('');
}

async function cmdGBPInfo() {
  console.log('\n  Fetching Google Business Profile info...\n');
  const info = await getBusinessInfo();
  console.log(JSON.stringify(info, null, 2));
  console.log('');
}

async function cmdGBPReviews() {
  console.log('\n  Fetching GBP reviews...\n');
  const { reviews, totalReviewCount, averageRating } = await getReviews();

  console.log(`  Total Reviews: ${totalReviewCount}  |  Average Rating: ${averageRating}`);
  console.log('  ' + '-'.repeat(60));

  const unreplied = reviews.filter(r => !r.reply);
  if (unreplied.length > 0) {
    console.log(`\n  ⚠ ${unreplied.length} reviews need a reply:\n`);
    for (const r of unreplied) {
      console.log(`  [${r.rating}] ${r.reviewer} — "${r.comment.slice(0, 100)}${r.comment.length > 100 ? '...' : ''}"`);
    }
  }

  console.log(`\n  Recent reviews:`);
  for (const r of reviews.slice(0, 10)) {
    const replied = r.reply ? ' (replied)' : ' (needs reply)';
    console.log(`  [${r.rating}] ${r.reviewer}${replied} — ${r.createTime}`);
  }
  console.log('');
}

async function cmdGBPPost() {
  const summary = process.argv[3];
  const url = process.argv[4];

  if (!summary) {
    console.log('\n  Usage: node scripts/seo-monitor.mjs gbp-post "Post text here" [https://url]');
    console.log('  Example: node scripts/seo-monitor.mjs gbp-post "Spring flood season is here! Protect your basement." https://dryspacewaterproofing.ca/blog/spring-flooding\n');
    return;
  }

  console.log('\n  Creating Google Business Post...\n');
  const post = await createPost({
    summary,
    callToActionUrl: url || 'https://dryspacewaterproofing.ca',
    callToActionType: url ? 'LEARN_MORE' : 'CALL',
  });

  console.log('  Post created successfully!');
  console.log(`  Name: ${post.name}`);
  console.log(`  State: ${post.state}`);
  console.log('');
}

async function cmdFullReport() {
  console.log('\n  Generating full weekly SEO report...\n');

  const thisWeek = { startDate: daysAgo(7), endDate: today() };
  const lastWeek = { startDate: daysAgo(14), endDate: daysAgo(8) };
  const month = { startDate: daysAgo(28), endDate: today() };

  // Gather all data in parallel
  const [keywords, pages, posChanges, striking, trafficComp, sources, landingPages, conversions, reviewData] = await Promise.allSettled([
    getKeywordPositions(month),
    getTopPages(month),
    getPositionChanges(lastWeek, thisWeek),
    getStrikingDistance(month),
    getTrafficComparison(lastWeek, thisWeek),
    getTrafficSources(thisWeek),
    getTopLandingPages(thisWeek),
    getConversions(thisWeek),
    getReviews().catch(() => null),
  ]);

  const get = (result) => result.status === 'fulfilled' ? result.value : null;

  const kw = get(keywords);
  const pg = get(pages);
  const pc = get(posChanges);
  const sd = get(striking);
  const tc = get(trafficComp);
  const src = get(sources);
  const lp = get(landingPages);
  const conv = get(conversions);
  const rev = get(reviewData);

  // Build markdown report
  let md = `# DrySpace SEO Report — Week of ${today()}\n\n`;

  // Keyword Rankings
  md += `## Keyword Rankings (Last 28 Days)\n\n`;
  if (kw?.tracked?.length) {
    md += mdTable(
      ['Keyword', 'Position', 'Impressions', 'Clicks', 'CTR'],
      kw.tracked.map(k => [k.keyword, k.position, k.impressions, k.clicks, `${k.ctr}%`])
    ) + '\n\n';
  } else {
    md += '_No GSC data available._\n\n';
  }

  // Position Changes
  if (pc?.length) {
    md += `## Position Changes (Week over Week)\n\n`;
    const movers = pc.slice(0, 20);
    md += mdTable(
      ['Keyword', 'Previous', 'Current', 'Change', 'Impressions'],
      movers.map(k => [k.keyword, k.previousPosition, k.currentPosition, arrow(k.change), k.impressions])
    ) + '\n\n';
  }

  // Striking Distance
  if (sd?.length) {
    md += `## Striking Distance Keywords (Pos 5-20)\n\n`;
    md += `_These are your most actionable keywords — a small content or link push could land them in the top 5._\n\n`;
    md += mdTable(
      ['Keyword', 'Page', 'Position', 'Impressions', 'Clicks'],
      sd.slice(0, 15).map(k => [k.keyword, k.page, k.position, k.impressions, k.clicks])
    ) + '\n\n';
  }

  // Traffic Summary
  md += `## Traffic Summary (Last 7 Days)\n\n`;
  if (tc?.current) {
    const c = tc.current;
    const ch = tc.changes;
    md += `- **Sessions:** ${c.sessions} ${ch ? `(${pctStr(ch.sessions)} vs last week)` : ''}\n`;
    md += `- **Active Users:** ${c.activeUsers} ${ch ? `(${pctStr(ch.activeUsers)})` : ''}\n`;
    md += `- **Pageviews:** ${c.pageviews} ${ch ? `(${pctStr(ch.pageviews)})` : ''}\n`;
    md += `- **Bounce Rate:** ${c.bounceRate}%\n`;
    md += `- **Engagement Rate:** ${c.engagementRate}%\n`;
    md += `- **Avg Session Duration:** ${c.avgSessionDuration}s\n\n`;
  } else {
    md += '_No GA4 data available._\n\n';
  }

  // Traffic Sources
  if (src?.length) {
    md += `## Traffic Sources\n\n`;
    md += mdTable(
      ['Channel', 'Sessions', '%', 'Users'],
      src.map(s => [s.sessionDefaultChannelGroup, s.sessions, `${s.percentage}%`, s.activeUsers])
    ) + '\n\n';
  }

  // Top Landing Pages
  if (lp?.length) {
    md += `## Top Landing Pages\n\n`;
    md += mdTable(
      ['Page', 'Sessions', 'Users', 'Conversions'],
      lp.slice(0, 10).map(p => [p.landingPagePlusQueryString || '/', p.sessions, p.activeUsers, p.conversions])
    ) + '\n\n';
  }

  // Conversions
  if (conv?.length) {
    md += `## Conversions\n\n`;
    md += mdTable(
      ['Event', 'Count', 'Conversions'],
      conv.map(e => [e.eventName, e.eventCount, e.conversions])
    ) + '\n\n';
  }

  // Top Pages (GSC)
  if (pg?.length) {
    md += `## Top Pages by Clicks (GSC)\n\n`;
    md += mdTable(
      ['Page', 'Clicks', 'Impressions', 'CTR', 'Avg Position'],
      pg.slice(0, 15).map(p => [p.page || '/', p.clicks, p.impressions, `${p.ctr}%`, p.position])
    ) + '\n\n';
  }

  // GBP Reviews
  if (rev) {
    md += `## Google Business Profile\n\n`;
    md += `- **Total Reviews:** ${rev.totalReviewCount}\n`;
    md += `- **Average Rating:** ${rev.averageRating}\n`;
    const unreplied = rev.reviews.filter(r => !r.reply);
    if (unreplied.length > 0) {
      md += `- **Needs Reply:** ${unreplied.length} reviews\n`;
    }
    md += '\n';
  }

  // Action Items
  md += `## Action Items\n\n`;
  const actions = [];

  if (sd?.length) {
    const top3 = sd.slice(0, 3);
    for (const k of top3) {
      actions.push(`- **"${k.keyword}"** at position ${k.position} on \`${k.page}\` — optimize content or build links to push into top 5`);
    }
  }

  if (rev) {
    const unreplied = rev.reviews.filter(r => !r.reply);
    if (unreplied.length > 0) {
      actions.push(`- **${unreplied.length} reviews** need responses — reply promptly to improve engagement`);
    }
  }

  if (kw?.tracked?.length) {
    const lowCTR = kw.tracked.filter(k => k.position <= 10 && k.ctr < 3);
    for (const k of lowCTR.slice(0, 2)) {
      actions.push(`- **"${k.keyword}"** at position ${k.position} has CTR of only ${k.ctr}% — test a new meta title/description`);
    }
  }

  if (actions.length === 0) {
    actions.push('- Continue monitoring — not enough data yet for actionable recommendations');
  }

  md += actions.join('\n') + '\n\n';
  md += `---\n_Generated by DrySpace SEO Command Center on ${new Date().toISOString()}_\n`;

  // Save report
  const filename = `weekly-${today()}.md`;
  saveReport(filename, md);

  // Also save raw JSON for programmatic use
  const jsonData = {
    generatedAt: new Date().toISOString(),
    dateRange: { thisWeek, lastWeek, month },
    keywords: kw,
    pages: pg,
    positionChanges: pc,
    strikingDistance: sd,
    traffic: tc,
    sources: src,
    landingPages: lp,
    conversions: conv,
    reviews: rev,
  };
  saveReport(`weekly-${today()}.json`, JSON.stringify(jsonData, null, 2));

  console.log('  Full report generated successfully!');
}

// ── CLI Router ───────────────────────────────────────────────────────

const COMMANDS = {
  'keywords': cmdKeywords,
  'striking': cmdStriking,
  'pages': cmdPages,
  'traffic': cmdTraffic,
  'sources': cmdSources,
  'landing-pages': cmdLandingPages,
  'conversions': cmdConversions,
  'gbp-info': cmdGBPInfo,
  'gbp-reviews': cmdGBPReviews,
  'gbp-post': cmdGBPPost,
  'full-report': cmdFullReport,
};

const command = process.argv[2];

if (!command || !COMMANDS[command]) {
  console.log(`
  DrySpace SEO Command Center
  ============================

  Usage: node scripts/seo-monitor.mjs <command>

  Commands:
    keywords       Track keyword positions (GSC)
    striking       Striking-distance keywords, pos 5-20 (GSC)
    pages          Top pages by clicks (GSC)
    traffic        Traffic overview with week-over-week comparison (GA4)
    sources        Traffic sources breakdown (GA4)
    landing-pages  Top landing pages (GA4)
    conversions    Conversion events (GA4)
    gbp-info       Read current GBP listing data
    gbp-reviews    Fetch and summarize GBP reviews
    gbp-post       Create a Google Post: gbp-post "text" [url]
    full-report    Generate full weekly markdown + JSON report

  Setup:
    1. Place service account key at scripts/credentials/service-account.json
    2. Set env vars in .env (see .env.example)
    3. npm install googleapis dotenv
  `);
  process.exit(0);
}

try {
  await COMMANDS[command]();
} catch (err) {
  console.error(`\n  Error running '${command}':\n`);
  if (err.response?.data) {
    console.error('  API Error:', JSON.stringify(err.response.data, null, 2));
  } else {
    console.error(' ', err.message);
  }
  if (err.code === 403) {
    console.error('\n  Check that the service account has access to this property.');
  }
  if (err.code === 401) {
    console.error('\n  Authentication failed. Verify your service account key.');
  }
  process.exit(1);
}
