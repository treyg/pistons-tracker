# Pistons Tracker - Netlify Deployment Guide

## Overview

This project uses Netlify Background Functions (15-minute execution limit) instead of Scheduled Functions because the data scraping and API calls need more time to complete reliably.

## Architecture

- **React Client**: Static site hosted on Netlify, reads from Firebase
- **Background Function**: Runs data collection (scraping + API calls) and updates Firebase
- **Scheduling**: GitHub Actions triggers the background function hourly
- **Data Storage**: Firebase Realtime Database

## Prerequisites

1. **Firebase Setup**:
   - Create a Firebase project
   - Enable Realtime Database
   - Create a service account with database admin privileges
   - Download the service account JSON

2. **API Keys**:
   - Ball Don't Lie API key
   - Bing Search API v7 key and endpoint

3. **Netlify Account**: With access to Background Functions (Free tier includes this)

## Deployment Steps

### 1. Install Netlify CLI

```bash
npm install -g netlify-cli
netlify login
```

### 2. Initialize Netlify Project

```bash
# In your project root
netlify init

# Follow prompts to:
# - Connect to Git repository  
# - Choose team/account
# - Set site name (e.g., pistons-tracker)
```

### 3. Configure Environment Variables

In your Netlify dashboard or via CLI:

```bash
# Set environment variables
netlify env:set FIREBASE_SERVICE_ACCOUNT '{"type":"service_account","project_id":"your-project",...}'
netlify env:set FIREBASE_DATABASE_URL "https://your-project.firebaseio.com"
netlify env:set BALL_DONT_LIE_KEY "your-api-key"
netlify env:set BING_SEARCH_V7_ENDPOINT "https://api.bing.microsoft.com/v7.0/search"
netlify env:set BING_SEARCH_V7_API_KEY "your-bing-api-key"
```

### 4. Deploy the Site

```bash
# Test deployment
netlify deploy

# Production deployment  
netlify deploy --prod
```

### 5. Configure GitHub Actions Scheduling

1. In your GitHub repository, go to Settings > Secrets and Variables > Actions
2. Add repository secret:
   - `NETLIFY_FUNCTION_URL`: Your Netlify site URL (e.g., `https://pistons-tracker.netlify.app/.netlify/functions`)

3. The workflow in `.github/workflows/scheduled-update.yml` will:
   - Run every hour at minute 0
   - Trigger your background function via HTTP POST
   - Allow manual triggering for testing

### 6. Testing

#### Manual Testing:
```bash
# Test the manual trigger function
curl -X POST https://your-site.netlify.app/.netlify/functions/trigger-update
```

#### Monitor Background Function:
1. Go to Netlify Dashboard > Functions
2. Click on `pistons-update-background`
3. View logs and invocation history

#### Test GitHub Actions:
1. Go to your GitHub repository > Actions
2. Find "Scheduled Pistons Data Update" workflow
3. Click "Run workflow" to test manually

## Function Endpoints

- **Background Function**: `/.netlify/functions/pistons-update-background` (triggered by GitHub Actions)
- **Manual Trigger**: `/.netlify/functions/trigger-update` (for testing)
- **React App**: Served from root domain

## Monitoring & Troubleshooting

### Check Background Function Logs:
```bash
netlify functions:list
netlify functions:invoke pistons-update-background --no-identity
```

### Common Issues:

1. **Timeout Errors**: Background functions have 15 minutes - should be sufficient
2. **Firebase Connection**: Ensure service account JSON is valid
3. **API Rate Limits**: Function includes delays between API calls
4. **GitHub Actions Failing**: Check repository secrets are set correctly

### Function Retry Logic:
- If background function fails, Netlify automatically retries after 1 minute
- If it fails again, retries after 2 minutes
- GitHub Actions will show the trigger attempt, function logs show execution details

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `FIREBASE_SERVICE_ACCOUNT` | Firebase service account JSON (as string) | `{"type":"service_account",...}` |
| `FIREBASE_DATABASE_URL` | Firebase Realtime Database URL | `https://project-id.firebaseio.com` |
| `BALL_DONT_LIE_KEY` | API key for Ball Don't Lie | `your-api-key` |
| `BING_SEARCH_V7_ENDPOINT` | Bing Search API endpoint | `https://api.bing.microsoft.com/v7.0/search` |
| `BING_SEARCH_V7_API_KEY` | Bing Search API key | `your-bing-key` |

## Cost Considerations

- **Netlify**: Background Functions are included in free tier (with usage limits)
- **GitHub Actions**: 2000 minutes/month free (more than enough for hourly triggers)
- **Firebase**: Realtime Database has generous free tier
- **APIs**: Check rate limits and pricing for Ball Don't Lie and Bing Search

## Next Steps

1. Deploy and test the setup
2. Monitor function execution for first few runs
3. Adjust timing if needed (GitHub Actions cron schedule)
4. Set up error notifications (Netlify can email on function failures)
5. Consider adding health check endpoints for monitoring