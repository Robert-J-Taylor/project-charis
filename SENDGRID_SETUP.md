# SendGrid Setup for Contact Form

## Quick Setup (5 minutes)

### Step 1: Create SendGrid Account
1. Go to https://sendgrid.com/
2. Click "Start for Free"
3. Sign up with your email
4. Verify your email address

### Step 2: Get API Key
1. In SendGrid dashboard, go to **Settings** → **API Keys**
2. Click **"Create API Key"**
3. Name it "Project Charis Contact Form"
4. Choose **"Restricted Access"**
5. Under **"Mail Send"**, give **"Full Access"**
6. Click **"Create & View"**
7. **Copy the API key immediately** (you won't see it again!)

### Step 3: Verify Sender Email
1. Go to **Settings** → **Sender Authentication**
2. Click **"Verify a Single Sender"**
3. Use: `theprojectcharis@gmail.com`
4. Fill out the form and verify via email

### Step 4: Update Environment Variables
Create or update `.env.local`:

```env
# SendGrid Configuration
SENDGRID_API_KEY=your_api_key_here
CONTACT_TO=theprojectcharis@gmail.com
CONTACT_FROM=theprojectcharis@gmail.com
```

### Step 5: Test
1. Restart your dev server: `npm run dev`
2. Go to `/contact` and submit the form
3. Check your email!

## Benefits of SendGrid
- ✅ No Gmail App Password needed
- ✅ More reliable delivery
- ✅ Better analytics
- ✅ Free tier: 100 emails/day
- ✅ Professional email service

## Troubleshooting
- **"Unauthorized" error**: Check your API key
- **"Forbidden" error**: Verify your sender email
- **No emails received**: Check spam folder
