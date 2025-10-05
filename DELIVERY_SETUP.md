# TimeVault Delivery Integration Guide

## Overview

TimeVault currently has a delivery Edge Function deployed that checks for capsules ready to be delivered. To enable actual email and SMS delivery, you'll need to integrate third-party services.

## Current Implementation

The Edge Function `deliver-capsules` is deployed and will:
- Check for capsules where `unlock_date` has passed and `is_delivered` is false
- Log delivery attempts to console
- Mark capsules as delivered in the database

## Setting Up Email Delivery (SendGrid)

### 1. Sign up for SendGrid
- Create a free account at https://sendgrid.com
- Get your API key from Settings > API Keys

### 2. Install SendGrid in Edge Function
Update the Edge Function to include SendGrid:

```typescript
import { createClient } from "npm:@supabase/supabase-js@2.39.3";

const SENDGRID_API_KEY = Deno.env.get("SENDGRID_API_KEY")!;

// In the email delivery section:
if (capsule.delivery_method === "email") {
  const emailData = {
    personalizations: [{
      to: [{ email: capsule.delivery_target }],
      subject: "Your Time Capsule Has Arrived! 🎉"
    }],
    from: { email: "noreply@yourdomain.com" },
    content: [{
      type: "text/html",
      value: `
        <h1>Your Time Capsule from the Past</h1>
        <p>${capsule.message}</p>
        ${capsule.file_url ? `<p>View your file: <a href="${capsule.file_url}">Click here</a></p>` : ''}
      `
    }]
  };

  await fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${SENDGRID_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(emailData)
  });
}
```

### 3. Set Environment Variable
Add your SendGrid API key through Supabase dashboard under Edge Functions settings.

## Setting Up SMS Delivery (Twilio)

### 1. Sign up for Twilio
- Create an account at https://twilio.com
- Get your Account SID and Auth Token
- Purchase a phone number

### 2. Install Twilio in Edge Function
Update the Edge Function:

```typescript
const TWILIO_ACCOUNT_SID = Deno.env.get("TWILIO_ACCOUNT_SID")!;
const TWILIO_AUTH_TOKEN = Deno.env.get("TWILIO_AUTH_TOKEN")!;
const TWILIO_PHONE = Deno.env.get("TWILIO_PHONE_NUMBER")!;

// In the SMS delivery section:
if (capsule.delivery_method === "sms") {
  const auth = btoa(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`);

  const formData = new URLSearchParams({
    To: capsule.delivery_target,
    From: TWILIO_PHONE,
    Body: `Your Time Capsule: ${capsule.message.substring(0, 160)}`
  });

  await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`,
    {
      method: "POST",
      headers: {
        "Authorization": `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: formData
    }
  );
}
```

### 3. Set Environment Variables
Add through Supabase dashboard:
- TWILIO_ACCOUNT_SID
- TWILIO_AUTH_TOKEN
- TWILIO_PHONE_NUMBER

## Scheduling the Delivery Function

To automatically check and deliver capsules, you have several options:

### Option 1: External Cron Service (Recommended)
Use a service like cron-job.org or EasyCron to call your edge function regularly:

```
URL: https://[your-project].supabase.co/functions/v1/deliver-capsules
Schedule: Every hour (or as needed)
Method: POST
```

### Option 2: GitHub Actions
Create a workflow that runs on a schedule:

```yaml
name: Deliver Time Capsules
on:
  schedule:
    - cron: '0 * * * *'  # Every hour
jobs:
  deliver:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger Delivery
        run: |
          curl -X POST https://[your-project].supabase.co/functions/v1/deliver-capsules
```

### Option 3: Supabase Cron (Coming Soon)
Supabase is working on native cron job support for Edge Functions.

## Testing

To manually trigger delivery check:
```bash
curl -X POST https://[your-project].supabase.co/functions/v1/deliver-capsules
```

## Security Notes

- The Edge Function uses service role key to bypass RLS (necessary for delivery)
- Store all API keys as environment variables, never in code
- Consider adding authentication to the Edge Function endpoint for production
