import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(100, 'Name must be less than 100 characters'),
  email: z
    .string()
    .email('Invalid email address')
    .max(255, 'Email must be less than 255 characters'),
  organization: z
    .string()
    .max(200, 'Organization must be less than 200 characters')
    .optional(),
  involvement: z
    .array(z.string())
    .min(1, 'Please select at least one involvement option'),
  challenge: z.string().min(1, 'Please select a challenge'),
  otherChallenge: z.string().optional(),
  helpText: z
    .string()
    .min(
      10,
      'Please provide at least 10 characters describing how we can help'
    ),
  extra: z.string().optional(),
  updatesOptIn: z.boolean().optional(),
  scheduleCall: z.boolean().optional(),
  honeypot: z.string().max(0, 'Invalid submission').optional(), // Must be empty
});

// Custom validation: if challenge is "Other", otherChallenge is required
export const validateContactForm = (data: unknown) => {
  const result = contactFormSchema.safeParse(data);

  if (!result.success) {
    console.log('Zod validation failed:', result.error.flatten().fieldErrors);
    return { success: false, errors: result.error.flatten().fieldErrors };
  }

  const { challenge, otherChallenge, helpText, extra } = result.data;

  // If challenge is "Other", otherChallenge must be provided
  if (
    challenge === 'Other' &&
    (!otherChallenge || otherChallenge.trim().length === 0)
  ) {
    return {
      success: false,
      errors: { otherChallenge: ['Please describe your specific challenge'] },
    };
  }

  // At least one of helpText or extra must have substantial content
  const hasSubstantialHelp = helpText && helpText.trim().length >= 3;
  const hasSubstantialExtra = extra && extra.trim().length >= 3;

  console.log('Validation check:', {
    helpText: helpText?.trim().length,
    extra: extra?.trim().length,
    hasSubstantialHelp,
    hasSubstantialExtra,
  });

  if (!hasSubstantialHelp && !hasSubstantialExtra) {
    console.log('Custom validation failed: insufficient content');
    return {
      success: false,
      errors: {
        helpText: [
          'Please provide at least 3 characters describing how we can help or share additional thoughts',
        ],
      },
    };
  }

  return { success: true, data: result.data };
};

export type ContactFormData = z.infer<typeof contactFormSchema>;
