import { NextRequest, NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';
import { checkRateLimit } from '@/lib/rateLimit/basic';

// Configure SendGrid
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

// Simple HTML email template for waitlist signup
function generateWaitlistEmailHTML(email: string, timestamp: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Waitlist Signup - Project Charis</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f8f9fa;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
    <!-- Header -->
    <div style="background-color: #223A5E; padding: 30px 20px; text-align: center;">
      <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">
        Project Charis
      </h1>
      <p style="color: #E4C9A1; margin: 10px 0 0 0; font-size: 16px;">
        New Waitlist Signup
      </p>
    </div>

    <!-- Content -->
    <div style="padding: 30px 20px;">
      <div style="margin-bottom: 25px;">
        <h2 style="color: #223A5E; font-size: 20px; margin: 0 0 15px 0; border-bottom: 2px solid #E4C9A1; padding-bottom: 8px;">
          New Waitlist Signup
        </h2>
        <p style="margin: 5px 0; color: #333333; font-size: 16px;">
          <strong>Email:</strong> <a href="mailto:${email}" style="color: #223A5E;">${email}</a>
        </p>
        <p style="margin: 5px 0; color: #333333; font-size: 16px;">
          <strong>Signed up:</strong> ${timestamp}
        </p>
      </div>

      <!-- Footer -->
      <hr style="margin-top: 30px; border-color: #E2EBF3;">
      <div style="margin-top: 20px; font-size: 14px; color: #718B9E;">
        <p style="margin: 5px 0;">
          This person has joined the Project Charis waitlist and will receive updates about the beta launch.
        </p>
      </div>
    </div>
  </div>
</body>
</html>
  `.trim();
}

// Plain text version
function generateWaitlistEmailText(email: string, timestamp: string): string {
  return `
Project Charis - New Waitlist Signup

Email: ${email}
Signed up: ${timestamp}

This person has joined the Project Charis waitlist and will receive updates about the beta launch.
  `.trim();
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : 'unknown';

    // Check rate limit (more lenient for waitlist)
    const rateLimit = checkRateLimit(ip);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          ok: false,
          message: 'Too many requests. Please try again later.',
        },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { email } = body;

    // Basic validation
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        {
          ok: false,
          message: 'Email is required',
        },
        { status: 400 }
      );
    }

    // Email format validation
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          ok: false,
          message: 'Invalid email format',
        },
        { status: 400 }
      );
    }

    const timestamp = new Date().toLocaleString('en-US', {
      timeZone: 'UTC',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    // Send email via SendGrid
    try {
      const msg = {
        to: process.env.CONTACT_TO || 'theprojectcharis@gmail.com',
        from: {
          email: process.env.CONTACT_FROM || 'noreply@projectcharis.org',
          name: 'Project Charis',
        },
        subject: `New Waitlist Signup - ${email}`,
        html: generateWaitlistEmailHTML(email, timestamp),
        text: generateWaitlistEmailText(email, timestamp),
      };

      await sgMail.send(msg);

      // Log minimal metadata
      console.log('Waitlist signup:', {
        timestamp: new Date().toISOString(),
        email: email,
        messageId: 'waitlist-signup',
      });

      return NextResponse.json({
        ok: true,
        message: 'Successfully joined waitlist',
      });
    } catch (emailError: any) {
      console.error('Waitlist email error:', emailError);
      return NextResponse.json(
        {
          ok: false,
          message: 'Failed to process signup. Please try again later.',
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Waitlist API error:', error);
    return NextResponse.json(
      {
        ok: false,
        message: 'Internal server error',
      },
      { status: 500 }
    );
  }
}
