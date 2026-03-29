/**
 * Email Automation Service
 * 
 * Handles automated email delivery for:
 * - Course completion notifications
 * - Certificate delivery
 * - Team member invitations
 * - Enrollment confirmations
 * - Expiration reminders
 */

interface EmailPayload {
  to: string;
  subject: string;
  templateId: string;
  data: Record<string, any>;
  type: 'course-completion' | 'certificate-delivery' | 'team-invitation' | 'enrollment' | 'expiration-reminder';
}

interface EmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

/**
 * Send automated email via webhook
 */
export async function sendAutomatedEmail(payload: EmailPayload): Promise<EmailResult> {
  try {
    // In production, integrate with email service (SendGrid, Mailgun, AWS SES)
    // For now, log the email that would be sent
    console.log(`[EMAIL] ${payload.type} -> ${payload.to}`, {
      subject: payload.subject,
      templateId: payload.templateId,
      data: payload.data,
    });

    // Simulate successful delivery
    return {
      success: true,
      messageId: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error sending email',
    };
  }
}

/**
 * Send course completion notification
 */
export async function sendCourseCompletionEmail(
  email: string,
  learnerName: string,
  courseTitle: string,
  certificateUrl: string
): Promise<EmailResult> {
  return sendAutomatedEmail({
    to: email,
    subject: `🎉 Certificate Awarded: ${courseTitle}`,
    templateId: 'course-completion',
    type: 'course-completion',
    data: {
      learnerName,
      courseTitle,
      certificateUrl,
      completedAt: new Date().toISOString(),
    },
  });
}

/**
 * Send certificate delivery email
 */
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
  return sendAutomatedEmail({
    to: email,
    subject: `Your ${certificateData.courseTitle} Certificate`,
    templateId: 'certificate-delivery',
    type: 'certificate-delivery',
    data: {
      learnerName,
      ...certificateData,
    },
  });
}

/**
 * Send team member invitation email
 */
export async function sendTeamInvitationEmail(
  email: string,
  invitedByName: string,
  organizationName: string,
  inviteToken: string,
  role: string
): Promise<EmailResult> {
  const acceptUrl = `https://nyxpulse.com/accept-invite?token=${inviteToken}`;

  return sendAutomatedEmail({
    to: email,
    subject: `You're invited to ${organizationName} on NyxPulse`,
    templateId: 'team-invitation',
    type: 'team-invitation',
    data: {
      invitedByName,
      organizationName,
      role,
      acceptUrl,
      expiresIn: '7 days',
    },
  });
}

/**
 * Send enrollment confirmation email
 */
export async function sendEnrollmentConfirmationEmail(
  email: string,
  learnerName: string,
  courses: string[],
  accessUrl: string
): Promise<EmailResult> {
  return sendAutomatedEmail({
    to: email,
    subject: 'Welcome! Your courses are ready',
    templateId: 'enrollment',
    type: 'enrollment',
    data: {
      learnerName,
      courses,
      accessUrl,
      enrolledAt: new Date().toISOString(),
    },
  });
}

/**
 * Send certificate expiration reminder
 */
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
  const days = certificateData.daysUntilExpiration;
  const subject =
    days <= 7
      ? `⚠️ Your ${certificateData.courseTitle} certificate expires in ${days} days`
      : `Reminder: Your ${certificateData.courseTitle} certificate expires soon`;

  return sendAutomatedEmail({
    to: email,
    subject,
    templateId: 'expiration-reminder',
    type: 'expiration-reminder',
    data: {
      learnerName,
      ...certificateData,
    },
  });
}

/**
 * Webhook receiver for events that trigger emails
 * This would be called by your course completion or Stripe webhook handlers
 */
export async function handleEmailWebhook(
  event: 'course.completed' | 'certificate.issued' | 'team.invitation.sent' | 'certificate.expiring',
  data: Record<string, any>
): Promise<EmailResult> {
  switch (event) {
    case 'course.completed':
      return sendCourseCompletionEmail(
        data.email,
        data.learnerName,
        data.courseTitle,
        data.certificateUrl
      );

    case 'certificate.issued':
      return sendCertificateEmail(data.email, data.learnerName, data.certificateData);

    case 'team.invitation.sent':
      return sendTeamInvitationEmail(
        data.email,
        data.invitedByName,
        data.organizationName,
        data.inviteToken,
        data.role
      );

    case 'certificate.expiring':
      return sendExpirationReminderEmail(data.email, data.learnerName, data.certificateData);

    default:
      return {
        success: false,
        error: `Unknown event type: ${event}`,
      };
  }
}

/**
 * Batch send emails (for admin operations like bulk invitations)
 */
export async function sendBatchEmails(
  payloads: EmailPayload[]
): Promise<EmailResult[]> {
  const results = await Promise.all(
    payloads.map((payload) => sendAutomatedEmail(payload))
  );
  return results;
}

export type { EmailPayload, EmailResult };
