'use server';

import { Resend } from 'resend';
import { EmailTemplate } from '@/utils/email-template';
const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (
  to: string,
  subject: string,
  header: string,
  body: string,
  footer: string
) => {
  const { data, error } = await resend.emails.send({
    from: 'nodUp Tecnologia <onboarding@resend.dev>',
    to: [to],
    subject: subject,
    react: EmailTemplate({ header, body, footer }),
    text: '',
  });
};
