# Google Sheets Integration Setup

## Overview

The subscription system now saves email addresses to both the database and a Google Sheet for easy management.

## Required Environment Variables

Add these to your `.env.local` file:

```env
# Google Sheets Integration
GOOGLE_SHEET_ID="your-google-sheet-id"
GOOGLE_SERVICE_ACCOUNT_EMAIL="your-service-account@your-project.iam.gserviceaccount.com"
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----"
```

## Setup Steps

### 1. Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google Sheets API

### 2. Create a Service Account

1. Go to "IAM & Admin" > "Service Accounts"
2. Click "Create Service Account"
3. Give it a name like "mind-method-sheets"
4. Click "Create and Continue"
5. Skip the optional steps and click "Done"

### 3. Generate Service Account Key

1. Click on your newly created service account
2. Go to the "Keys" tab
3. Click "Add Key" > "Create new key"
4. Choose "JSON" format
5. Download the JSON file

### 4. Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com/)
2. Create a new spreadsheet
3. Name it "Mind & Method Subscribers"
4. Add headers in row 1: `email`, `subscribedAt`, `source`
5. Copy the Sheet ID from the URL (the long string between `/d/` and `/edit`)

### 5. Share the Sheet

1. Click "Share" in the top right
2. Add the service account email (from step 2)
3. Give it "Editor" permissions

### 6. Configure Environment Variables

1. Extract the following from your downloaded JSON file:
   - `client_email` → `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - `private_key` → `GOOGLE_PRIVATE_KEY`
   - Sheet ID from URL → `GOOGLE_SHEET_ID`

## How It Works

When someone subscribes:

1. Email is saved to the database (existing functionality)
2. Email is also added to the Google Sheet with:
   - Email address
   - Timestamp of subscription
   - Source (always "website")
3. Welcome email is sent (existing functionality)

## Troubleshooting

- If Google Sheets integration fails, the subscription still works (it only affects the database and email)
- Check the server logs for any Google Sheets errors
- Ensure the service account has proper permissions
- Verify the Sheet ID is correct in the environment variables
