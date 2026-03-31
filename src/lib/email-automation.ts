/**
 * Email Automation Service — powered by SMTP
 *
 * Requires: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS
 * Sender: SMTP_FROM_EMAIL and optional SMTP_FROM_NAME
 *
 * Handles:
 * - Course completion notifications
 * - Certificate delivery
 * - Team member invitations
 * - Enrollment confirmations
 * - Expiration reminders
 */

import nodemailer from 'nodemailer';

const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = Number(process.env.SMTP_PORT ?? 587);
const SMTP_SECURE = process.env.SMTP_SECURE === 'true' || SMTP_PORT === 465;
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const FROM_EMAIL = process.env.SMTP_FROM_EMAIL ?? 'noreply@example.com';
const FROM_NAME = process.env.SMTP_FROM_NAME ?? 'NyxPulse';

const transporter =
  SMTP_HOST && SMTP_USER && SMTP_PASS
    ? nodemailer.createTransport({
        host: SMTP_HOST,
        port: SMTP_PORT,
        secure: SMTP_SECURE,
        auth: {
          user: SMTP_USER,
          pass: SMTP_PASS,
        },
      })
    : null;

interface EmailPayload {
  to: string;
  subject: string;
  html: string;
  type:
    | 'course-completion'
    | 'certificate-delivery'
    | 'team-invitation'
    | 'enrollment'
    | 'expiration-reminder'
    | 'contact-request'
    | 'contact-confirmation';
}

interface EmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

function baseTemplate(title: string, body: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title></head>
<body style="margin:0;padding:0;background:#0f0a1e;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f0a1e;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#1a1040;border-radius:16px;overflow:hidden;border:1px solid rgba(139,92,246,0.3);">
        <tr><td style="background:linear-gradient(135deg,#7c3aed,#4f46e5);padding:32px 40px;text-align:center;">
          <span style="color:#fff;font-size:28px;font-weight:700;letter-spacing:-0.5px;">NyxPulse</span>
        </td></tr>
        <tr><td style="padding:40px;color:#e2e8f0;">
          ${body}
        </td></tr>
        <tr><td style="padding:24px 40px;border-top:1px solid rgba(139,92,246,0.2);text-align:center;">
          <p style="margin:0;font-size:12px;color:#6b7280;">
            NyxPulse · Emergency &amp; Safety Training<br>
            <a href="https://nyxpulse.com" style="color:#8b5cf6;text-decoration:none;">nyxpulse.com</a> ·
            <a href="https://nyxpulse.com/privacy" style="color:#8b5cf6;text-decoration:none;">Privacy</a> ·
            <a href="https://nyxpulse.com/terms" style="color:#8b5cf6;text-decoration:none;">Terms</a>
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function btn(text: string, href: string): string {
  return `<a href="${href}" style="display:inline-block;margin-top:24px;padding:14px 28px;background:linear-gradient(135deg,#7c3aed,#4f46e5);color:#fff;font-weight:600;font-size:15px;border-radius:8px;text-decoration:none;">${text}</a>`;
}

async function sendAutomatedEmail(payload: EmailPayload): Promise<EmailResult> {
  try {
    if (!transporter) {
      console.warn('[EMAIL] SMTP configuration not set — skipping send for', payload.to);
      return { success: true, messageId: `dev_${Date.now()}` };
    }

    const info = await transporter.sendMail({
      from: `${FROM_NAME} <${FROM_EMAIL}>`,
      to: payload.to,
      subject: payload.subject,
      html: payload.html,
    });

    return { success: true, messageId: info.messageId };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error sending email',
    };
  }
}

export async function sendCourseCompletionEmail(
  email: string,
  learnerName: string,
  courseTitle: string,
  certificateUrl: string
): Promise<EmailResult> {
  const html = baseTemplate('Certificate Awarded', `
    <h1 style="margin:0 0 8px;font-size:24px;color:#fff;">Congratulations, ${learnerName}!</h1>
    <p style="margin:0 0 16px;color:#a78bfa;font-size:16px;">You've successfully completed</p>
    <div style="background:rgba(139,92,246,0.15);border:1px solid rgba(139,92,246,0.4);border-radius:12px;padding:20px;margin-bottom:24px;text-align:center;">
      <span style="font-size:20px;font-weight:700;color:#fff;">${courseTitle}</span>
    </div>
    <p style="color:#94a3b8;line-height:1.6;">Your certificate of completion has been issued and is ready to download.</p>
    ${btn('Download Certificate', certificateUrl)}
  `);

  return sendAutomatedEmail({
    to: email,
    subject: `Certificate Awarded: ${courseTitle}`,
    html,
    type: 'course-completion',
  });
}

export async function sendCertificateEmail(
  email: string,
  learnerName: string,
  certificateData: {
    courseTitle: string;
    completionDate: string;
    certificateId: string;
    expirationDate?: string;
    downloadUrl: string;
  }
): Promise<EmailResult> {
  const expiry = certificateData.expirationDate
    ? `<p style="margin:12px 0 0;color:#94a3b8;font-size:14px;">Expires: <strong style="color:#fbbf24;">${certificateData.expirationDate}</strong></p>`
    : '';

  const html = baseTemplate(`Your ${certificateData.courseTitle} Certificate`, `
    <h1 style="margin:0 0 8px;font-size:24px;color:#fff;">Your Certificate is Ready</h1>
    <p style="margin:0 0 24px;color:#a78bfa;">Hi ${learnerName}, here are your certificate details:</p>
    <table width="100%" cellpadding="12" style="background:rgba(139,92,246,0.1);border-radius:12px;border:1px solid rgba(139,92,246,0.3);">
      <tr><td style="color:#94a3b8;width:140px;">Course</td><td style="color:#fff;font-weight:600;">${certificateData.courseTitle}</td></tr>
      <tr><td style="color:#94a3b8;">Completed</td><td style="color:#fff;">${certificateData.completionDate}</td></tr>
      <tr><td style="color:#94a3b8;">Certificate ID</td><td style="color:#6b7280;font-size:13px;font-family:monospace;">${certificateData.certificateId}</td></tr>
    </table>
    ${expiry}
    ${btn('Download Certificate', certificateData.downloadUrl)}
  `);

  return sendAutomatedEmail({
    to: email,
    subject: `Your ${certificateData.courseTitle} Certificate`,
    html,
    type: 'certificate-delivery',
  });
}

export async function sendTeamInvitationEmail(
  email: string,
  invitedByName: string,
  organizationName: string,
  inviteToken: string,
  role: string
): Promise<EmailResult> {
  const acceptUrl = `https://nyxpulse.com/accept-invite?token=${encodeURIComponent(inviteToken)}`;

  const html = baseTemplate(`You're invited to ${organizationName}`, `
    <h1 style="margin:0 0 8px;font-size:24px;color:#fff;">You've Been Invited</h1>
    <p style="margin:0 0 24px;color:#a78bfa;font-size:16px;"><strong style="color:#fff;">${invitedByName}</strong> has invited you to join <strong style="color:#fff;">${organizationName}</strong> on NyxPulse.</p>
    <div style="background:rgba(139,92,246,0.15);border:1px solid rgba(139,92,246,0.4);border-radius:12px;padding:20px;margin-bottom:8px;">
      <p style="margin:0;color:#94a3b8;">Your role: <strong style="color:#a78bfa;text-transform:capitalize;">${role}</strong></p>
    </div>
    <p style="color:#6b7280;font-size:13px;">This invitation expires in 7 days.</p>
    ${btn('Accept Invitation', acceptUrl)}
  `);

  return sendAutomatedEmail({
    to: email,
    subject: `You're invited to ${organizationName} on NyxPulse`,
    html,
    type: 'team-invitation',
  });
}

export async function sendEnrollmentConfirmationEmail(
  email: string,
  learnerName: string,
  courses: string[],
  accessUrl: string
): Promise<EmailResult> {
  const courseList = courses
    .map((course) => `<li style="padding:6px 0;color:#e2e8f0;">${course}</li>`)
    .join('');

  const html = baseTemplate('Your courses are ready', `
    <h1 style="margin:0 0 8px;font-size:24px;color:#fff;">Welcome, ${learnerName}!</h1>
    <p style="margin:0 0 24px;color:#a78bfa;">You're now enrolled in the following course${courses.length > 1 ? 's' : ''}:</p>
    <ul style="margin:0 0 24px;padding:16px 20px;list-style:none;background:rgba(139,92,246,0.1);border-radius:12px;border:1px solid rgba(139,92,246,0.3);">
      ${courseList}
    </ul>
    <p style="color:#94a3b8;line-height:1.6;">You can access your courses anytime from your dashboard.</p>
    ${btn('Start Learning', accessUrl)}
  `);

  return sendAutomatedEmail({
    to: email,
    subject: 'Welcome! Your courses are ready',
    html,
    type: 'enrollment',
  });
}

export async function sendExpirationReminderEmail(
  email: string,
  learnerName: string,
  certificateData: {
    courseTitle: string;
    expiresAt: string;
    daysUntilExpiration: number;
    renewalUrl: string;
  }
): Promise<EmailResult> {
  const { courseTitle, expiresAt, daysUntilExpiration, renewalUrl } = certificateData;
  const urgent = daysUntilExpiration <= 7;
  const subject = urgent
    ? `Your ${courseTitle} certificate expires in ${daysUntilExpiration} days`
    : `Reminder: Your ${courseTitle} certificate expires soon`;

  const html = baseTemplate(subject, `
    <h1 style="margin:0 0 8px;font-size:24px;color:#fff;">Certificate Expiring Soon</h1>
    <p style="margin:0 0 24px;color:#a78bfa;">Hi ${learnerName}, your certification needs renewal.</p>
    <div style="background:${urgent ? 'rgba(239,68,68,0.15)' : 'rgba(251,191,36,0.1)'};border:1px solid ${urgent ? 'rgba(239,68,68,0.4)' : 'rgba(251,191,36,0.3)'};border-radius:12px;padding:20px;margin-bottom:24px;">
      <p style="margin:0;font-size:16px;color:#fff;font-weight:600;">${courseTitle}</p>
      <p style="margin:8px 0 0;color:${urgent ? '#fca5a5' : '#fcd34d'};">Expires: ${expiresAt} (${daysUntilExpiration} days remaining)</p>
    </div>
    <p style="color:#94a3b8;line-height:1.6;">Renew your certification to stay compliant and maintain your professional credentials.</p>
    ${btn('Renew Certification', renewalUrl)}
  `);

  return sendAutomatedEmail({
    to: email,
    subject,
    html,
    type: 'expiration-reminder',
  });
}

export async function sendContactRequestNotification(data: {
  name: string;
  email: string;
  org?: string;
  phone?: string;
  trainingType?: string[];
  format?: string;
  teamSize?: string;
  message?: string;
}): Promise<EmailResult> {
  const inboxEmail = process.env.CONTACT_INBOX_EMAIL ?? 'info@nyxpulse.com';
  const trainingSummary =
    data.trainingType && data.trainingType.length > 0
      ? data.trainingType.join(', ')
      : 'Not specified';

  const html = baseTemplate('New Contact Request', `
    <h1 style="margin:0 0 12px;font-size:24px;color:#fff;">New Contact Request</h1>
    <p style="margin:0 0 20px;color:#94a3b8;">A new lead submitted the contact form on nyxpulse.com.</p>
    <table width="100%" cellpadding="12" style="background:rgba(139,92,246,0.1);border-radius:12px;border:1px solid rgba(139,92,246,0.3);border-collapse:separate;">
      <tr><td style="color:#94a3b8;width:150px;">Name</td><td style="color:#fff;font-weight:600;">${data.name}</td></tr>
      <tr><td style="color:#94a3b8;">Email</td><td style="color:#fff;">${data.email}</td></tr>
      <tr><td style="color:#94a3b8;">Organization</td><td style="color:#fff;">${data.org || 'Not provided'}</td></tr>
      <tr><td style="color:#94a3b8;">Phone</td><td style="color:#fff;">${data.phone || 'Not provided'}</td></tr>
      <tr><td style="color:#94a3b8;">Training Interest</td><td style="color:#fff;">${trainingSummary}</td></tr>
      <tr><td style="color:#94a3b8;">Preferred Format</td><td style="color:#fff;">${data.format || 'Not specified'}</td></tr>
      <tr><td style="color:#94a3b8;">Team Size</td><td style="color:#fff;">${data.teamSize || 'Not specified'}</td></tr>
    </table>
    <div style="margin-top:20px;padding:16px;border:1px solid rgba(139,92,246,0.2);border-radius:12px;background:rgba(255,255,255,0.02);">
      <p style="margin:0 0 8px;color:#94a3b8;font-size:13px;text-transform:uppercase;letter-spacing:0.08em;">Additional Notes</p>
      <p style="margin:0;color:#e2e8f0;white-space:pre-wrap;">${data.message || 'No additional notes provided.'}</p>
    </div>
  `);

  return sendAutomatedEmail({
    to: inboxEmail,
    subject: `New Contact Request from ${data.name}`,
    html,
    type: 'contact-request',
  });
}

export async function sendContactRequestConfirmation(data: {
  name: string;
  email: string;
  trainingType?: string[];
}): Promise<EmailResult> {
  const trainingSummary =
    data.trainingType && data.trainingType.length > 0
      ? data.trainingType.join(', ')
      : 'your requested training';

  const html = baseTemplate('We received your request', `
    <h1 style="margin:0 0 8px;font-size:24px;color:#fff;">Thanks, ${data.name}!</h1>
    <p style="margin:0 0 16px;color:#a78bfa;">We received your request and our team will reach out within one business day.</p>
    <p style="margin:0;color:#94a3b8;line-height:1.6;">Requested focus: <strong style="color:#e2e8f0;">${trainingSummary}</strong></p>
    ${btn('Browse Courses', 'https://nyxpulse.com/courses')}
  `);

  return sendAutomatedEmail({
    to: data.email,
    subject: 'NyxPulse received your training request',
    html,
    type: 'contact-confirmation',
  });
}

export async function handleEmailWebhook(
  event: 'course.completed' | 'certificate.issued' | 'team.invitation.sent' | 'certificate.expiring',
  data: Record<string, unknown>
): Promise<EmailResult> {
  switch (event) {
    case 'course.completed':
      return sendCourseCompletionEmail(
        data.email as string,
        data.learnerName as string,
        data.courseTitle as string,
        data.certificateUrl as string
      );
    case 'certificate.issued':
      return sendCertificateEmail(
        data.email as string,
        data.learnerName as string,
        data.certificateData as Parameters<typeof sendCertificateEmail>[2]
      );
    case 'team.invitation.sent':
      return sendTeamInvitationEmail(
        data.email as string,
        data.invitedByName as string,
        data.organizationName as string,
        data.inviteToken as string,
        data.role as string
      );
    case 'certificate.expiring':
      return sendExpirationReminderEmail(
        data.email as string,
        data.learnerName as string,
        data.certificateData as Parameters<typeof sendExpirationReminderEmail>[2]
      );
    default:
      return { success: false, error: `Unknown event type: ${event}` };
  }
}

export async function sendBatchEmails(payloads: EmailPayload[]): Promise<EmailResult[]> {
  return Promise.all(payloads.map((payload) => sendAutomatedEmail(payload)));
}

export type { EmailPayload, EmailResult };
