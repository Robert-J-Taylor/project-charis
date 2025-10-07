import { ContactFormData } from '@/lib/validation/contact';

interface ContactEmailProps {
  data: ContactFormData;
  timestamp: string;
  ipAddress: string;
}

// This function is no longer used since we're using the HTML template in route.ts
// Keeping this file for the plain text version only
export function ContactEmail() {
  // This is a placeholder - the actual HTML email is generated in route.ts
  return null;
}

// Plain text version for email clients that don't support HTML
export function ContactEmailText({
  data,
  timestamp,
  ipAddress,
}: ContactEmailProps) {
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
    scheduleCall,
  } = data;

  return `
Project Charis - New Contact Form Submission

FROM:
Name: ${name}
Email: ${email}
${organization ? `Organization: ${organization}` : ''}

INVOLVEMENT:
${involvement.map((item) => `- ${item}`).join('\n')}

CHALLENGE:
${challenge}
${challenge === 'Other' && otherChallenge ? `Details: ${otherChallenge}` : ''}

HOW WE CAN HELP:
${helpText}

${extra ? `ADDITIONAL THOUGHTS:\n${extra}\n` : ''}

PREFERENCES:
Keep updated about beta launch: ${updatesOptIn ? 'Yes' : 'No'}
Would like to schedule a call: ${scheduleCall ? 'Yes' : 'No'}

Submitted: ${timestamp}
IP Address: ${ipAddress}
  `.trim();
}
