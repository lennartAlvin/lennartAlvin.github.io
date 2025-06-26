// EmailJS Configuration
// You need to sign up at https://www.emailjs.com/ and get these values

export const emailConfig = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID',
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID',
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY',
  toEmail: 'alvin.lennarthsson.dev@gmail.com',
};

// Template variables for EmailJS
export const createEmailTemplate = (data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => ({
  from_name: data.name,
  from_email: data.email,
  subject: data.subject,
  message: data.message,
  to_email: emailConfig.toEmail,
  reply_to: data.email,
}); 