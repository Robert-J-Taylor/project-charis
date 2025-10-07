import { NextRequest, NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';
import { validateContactForm } from '@/lib/validation/contact';
import { checkRateLimit } from '@/lib/rateLimit/basic';
import { ContactEmailText } from '@/lib/email/templates/ContactEmail';
import { ContactFormData } from '@/lib/validation/contact';

// Configure SendGrid
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

// Simple HTML email template function
function generateContactEmailHTML(data: ContactFormData, timestamp: string, ipAddress: string): string {
  const {
    name,
    email,
    organization,
    involvement,
    challenge,
    otherChallenge,
    helpText,
    extra,
    updatesOptIn,
    scheduleCall
  } = data;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact - Project Charis</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f8f9fa;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
    <!-- Header -->
    <div style="background-color: #223A5E; padding: 30px 20px; text-align: center;">
      <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">
        Project Charis
      </h1>
      <p style="color: #E4C9A1; margin: 10px 0 0 0; font-size: 16px;">
        New Contact Form Submission
      </p>
    </div>

    <!-- Content -->
    <div style="padding: 30px 20px;">
      <!-- From Section -->
      <div style="margin-bottom: 25px;">
        <h2 style="color: #223A5E; font-size: 20px; margin: 0 0 15px 0; border-bottom: 2px solid #E4C9A1; padding-bottom: 8px;">
          From
        </h2>
        <p style="margin: 5px 0; color: #333333; font-size: 16px;">
          <strong>Name:</strong> ${name}
        </p>
        <p style="margin: 5px 0; color: #333333; font-size: 16px;">
          <strong>Email:</strong> <a href="mailto:${email}" style="color: #223A5E;">${email}</a>
        </p>
        ${organization ? `
        <p style="margin: 5px 0; color: #333333; font-size: 16px;">
          <strong>Organization:</strong> ${organization}
        </p>
        ` : ''}
      </div>

      <!-- Involvement Section -->
      <div style="margin-bottom: 25px;">
        <h2 style="color: #223A5E; font-size: 20px; margin: 0 0 15px 0; border-bottom: 2px solid #E4C9A1; padding-bottom: 8px;">
          How they want to get involved
        </h2>
        ${involvement.map(item => `
        <p style="margin: 5px 0; color: #333333; font-size: 16px;">• ${item}</p>
        `).join('')}
      </div>

      <!-- Challenge Section -->
      <div style="margin-bottom: 25px;">
        <h2 style="color: #223A5E; font-size: 20px; margin: 0 0 15px 0; border-bottom: 2px solid #E4C9A1; padding-bottom: 8px;">
          Their biggest challenge
        </h2>
        <p style="margin: 5px 0; color: #333333; font-size: 16px;">
          <strong>${challenge}</strong>
        </p>
        ${challenge === 'Other' && otherChallenge ? `
        <p style="margin: 10px 0 5px 0; color: #333333; font-size: 16px; font-style: italic; background-color: #f8f9fa; padding: 10px; border-radius: 4px;">
          <strong>Details:</strong> ${otherChallenge}
        </p>
        ` : ''}
      </div>

      <!-- Help Section -->
      <div style="margin-bottom: 25px;">
        <h2 style="color: #223A5E; font-size: 20px; margin: 0 0 15px 0; border-bottom: 2px solid #E4C9A1; padding-bottom: 8px;">
          How we can help
        </h2>
        <div style="background-color: #f8f9fa; padding: 15px; border-radius: 4px; border: 1px solid #E2EBF3;">
          <p style="margin: 0; color: #333333; font-size: 16px; line-height: 1.5;">
            ${helpText}
          </p>
        </div>
      </div>

      ${extra ? `
      <!-- Additional Information -->
      <div style="margin-bottom: 25px;">
        <h2 style="color: #223A5E; font-size: 20px; margin: 0 0 15px 0; border-bottom: 2px solid #E4C9A1; padding-bottom: 8px;">
          Additional thoughts
        </h2>
        <div style="background-color: #f8f9fa; padding: 15px; border-radius: 4px; border: 1px solid #E2EBF3;">
          <p style="margin: 0; color: #333333; font-size: 16px; line-height: 1.5;">
            ${extra}
          </p>
        </div>
      </div>
      ` : ''}

      <!-- Preferences -->
      <div style="margin-bottom: 25px;">
        <h2 style="color: #223A5E; font-size: 20px; margin: 0 0 15px 0; border-bottom: 2px solid #E4C9A1; padding-bottom: 8px;">
          Preferences
        </h2>
        <p style="margin: 5px 0; color: #333333; font-size: 16px;">
          <strong>Keep updated about beta launch:</strong> ${updatesOptIn ? 'Yes' : 'No'}
        </p>
        <p style="margin: 5px 0; color: #333333; font-size: 16px;">
          <strong>Would like to schedule a call:</strong> ${scheduleCall ? 'Yes' : 'No'}
        </p>
      </div>

      <!-- Footer -->
      <hr style="margin-top: 30px; border-color: #E2EBF3;">
      <div style="margin-top: 20px; font-size: 14px; color: #718B9E;">
        <p style="margin: 5px 0;">
          <strong>Submitted:</strong> ${timestamp}
        </p>
        <p style="margin: 5px 0;">
          <strong>IP Address:</strong> ${ipAddress}
        </p>
      </div>
    </div>
  </div>
</body>
</html>
  `.trim();
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : 'unknown';

    // Check rate limit
    const rateLimit = checkRateLimit(ip);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { 
          ok: false, 
          message: 'Too many submissions. Please try again soon.' 
        },
        { status: 429 }
      );
    }

    const body = await request.json();
    
    // Debug: Log the incoming data
    console.log('Incoming form data:', JSON.stringify(body, null, 2));
    
    // Validate form data
    const validation = validateContactForm(body);
    if (!validation.success) {
      return NextResponse.json(
        { 
          ok: false, 
          errors: validation.errors 
        },
        { status: 400 }
      );
    }

    // At this point, we know validation.success is true, so data is defined
    const data = validation.data!;
    const timestamp = new Date().toLocaleString('en-US', {
      timeZone: 'UTC',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

        // Send email via SendGrid
        try {
          // Debug: Log SendGrid configuration
          console.log('SendGrid config:', {
            hasApiKey: !!process.env.SENDGRID_API_KEY,
            apiKeyLength: process.env.SENDGRID_API_KEY?.length,
            from: process.env.CONTACT_FROM || 'theprojectcharis@gmail.com',
            to: process.env.CONTACT_TO || 'theprojectcharis@gmail.com'
          });

          const msg = {
            to: process.env.CONTACT_TO || 'theprojectcharis@gmail.com',
            from: {
              email: process.env.CONTACT_FROM || 'noreply@projectcharis.org',
              name: 'Project Charis'
            },
            subject: `New Contact — Project Charis (${data.name})`,
            html: generateContactEmailHTML(data, timestamp, ip),
            text: ContactEmailText({ data, timestamp, ipAddress: ip }),
          };

          const info = await sgMail.send(msg);

          // Log minimal metadata (not full payload in production)
          console.log('Contact form submitted:', {
            timestamp: new Date().toISOString(),
            name: data.name,
            email: data.email,
            organization: data.organization || 'Not provided',
            involvementCount: data.involvement.length,
            challenge: data.challenge,
            messageId: info[0]?.headers?.['x-message-id'] || 'sent'
          });

      return NextResponse.json({ 
        ok: true,
        message: 'Form submitted successfully' 
      });

        } catch (emailError) {
          console.error('Email sending error:', emailError);
          console.error('SendGrid response:', emailError.response?.body);
          return NextResponse.json(
            { 
              ok: false, 
              message: 'Failed to send message. Please try again later.' 
            },
            { status: 500 }
          );
        }

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { 
        ok: false, 
        message: 'Internal server error' 
      },
      { status: 500 }
    );
  }
}
