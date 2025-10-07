# Environment Setup for Contact Form

## Required Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# Email Configuration (Gmail)
EMAIL_USER=theprojectcharis@gmail.com
EMAIL_PASS=your_gmail_app_password_here
CONTACT_TO=theprojectcharis@gmail.com
CONTACT_FROM=Project Charis <theprojectcharis@gmail.com>
```

## Setting Up Gmail App Password

1. Enable 2-Factor Authentication on your Gmail account
2. Go to [Google Account Settings](https://myaccount.google.com/)
3. Navigate to Security → 2-Step Verification → App passwords
4. Generate an app password for "Mail"
5. Replace `your_gmail_app_password_here` with the generated app password

## Email Configuration

- **EMAIL_USER**: Your Gmail address
- **EMAIL_PASS**: Gmail App Password (not your regular password)
- **CONTACT_TO**: The email address where contact form submissions will be sent
- **CONTACT_FROM**: The sender email address

## Testing

1. Start the development server: `npm run dev`
2. Navigate to `/contact`
3. Fill out and submit the contact form
4. Check the specified email inbox for the formatted email

## Features Implemented

- ✅ Zod validation schema with custom validation rules
- ✅ Rate limiting (5 submissions per 10 minutes per IP)
- ✅ Professional HTML email template with Project Charis branding
- ✅ Plain text email fallback
- ✅ Honeypot spam protection
- ✅ Comprehensive error handling
- ✅ Field-level validation errors
- ✅ Success/error state management
