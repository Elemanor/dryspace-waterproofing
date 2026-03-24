import { google } from 'googleapis';
import { getAuthClient, getApiKey } from './google-auth.mjs';

function getAccountId() {
  const id = process.env.GBP_ACCOUNT_ID;
  if (!id) {
    console.error('\n  GBP_ACCOUNT_ID is not set in .env (e.g. accounts/123456789)\n');
    process.exit(1);
  }
  return id;
}

function getLocationId() {
  const id = process.env.GBP_LOCATION_ID;
  if (!id) {
    console.error('\n  GBP_LOCATION_ID is not set in .env (e.g. locations/123456789)\n');
    process.exit(1);
  }
  return id;
}

function getLocationName() {
  return `${getAccountId()}/${getLocationId()}`;
}

/**
 * Get the My Business Business Information API client.
 */
async function getBusinessInfo_API() {
  await getAuthClient();
  return google.mybusinessbusinessinformation('v1');
}

/**
 * Get the My Business (v4) API client for posts and reviews.
 */
async function getMyBusiness_API() {
  await getAuthClient();
  return google.mybusiness('v4');
}

/**
 * Read current GBP listing data.
 */
export async function getBusinessInfo() {
  const api = await getBusinessInfo_API();
  const res = await api.accounts.locations.get({
    name: getLocationName(),
    readMask: 'name,title,phoneNumbers,categories,websiteUri,storefrontAddress,regularHours,profile',
  });
  return res.data;
}

/**
 * Update GBP listing info (description, hours, categories, etc.).
 */
export async function updateBusinessInfo(data) {
  const api = await getBusinessInfo_API();
  const updateFields = Object.keys(data).join(',');
  const res = await api.accounts.locations.patch({
    name: getLocationName(),
    updateMask: updateFields,
    requestBody: data,
  });
  return res.data;
}

/**
 * Create a Google Post (local post) on the GBP listing.
 */
export async function createPost({ summary, callToActionType = 'LEARN_MORE', callToActionUrl, mediaUrl } = {}) {
  const api = await getMyBusiness_API();

  const requestBody = {
    languageCode: 'en',
    summary,
    topicType: 'STANDARD',
  };

  if (callToActionType && callToActionUrl) {
    requestBody.callToAction = {
      actionType: callToActionType,
      url: callToActionUrl,
    };
  }

  if (mediaUrl) {
    requestBody.media = [{
      mediaFormat: 'PHOTO',
      sourceUrl: mediaUrl,
    }];
  }

  const res = await api.accounts.locations.localPosts.create({
    parent: getLocationName(),
    requestBody,
  });
  return res.data;
}

/**
 * Fetch recent reviews for the listing.
 */
export async function getReviews({ pageSize = 50 } = {}) {
  const api = await getMyBusiness_API();
  const res = await api.accounts.locations.reviews.list({
    parent: getLocationName(),
    pageSize,
    orderBy: 'updateTime desc',
  });
  const reviews = res.data.reviews || [];
  return {
    reviews: reviews.map(r => ({
      reviewId: r.reviewId,
      reviewer: r.reviewer?.displayName || 'Anonymous',
      rating: r.starRating,
      comment: r.comment || '',
      createTime: r.createTime,
      reply: r.reviewReply?.comment || null,
    })),
    totalReviewCount: res.data.totalReviewCount || 0,
    averageRating: res.data.averageRating || 0,
  };
}

/**
 * Reply to a review.
 */
export async function replyToReview(reviewName, comment) {
  const api = await getMyBusiness_API();
  const res = await api.accounts.locations.reviews.updateReply({
    name: reviewName,
    requestBody: { comment },
  });
  return res.data;
}

/**
 * List all GBP posts for the location.
 */
export async function listPosts({ pageSize = 10 } = {}) {
  const api = await getMyBusiness_API();
  const res = await api.accounts.locations.localPosts.list({
    parent: getLocationName(),
    pageSize,
  });
  return res.data.localPosts || [];
}
