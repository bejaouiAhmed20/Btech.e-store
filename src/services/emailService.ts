import emailjs from '@emailjs/browser';

const SERVICE_ID = 'service_j720r47';
const TEMPLATE_ID = 'template_pv4jqq4';
const PUBLIC_KEY = 'MJZwW0yzYW8kGIbCl';

export interface OrderEmailTemplateParams {
  command_code: string;
  from_name: string;
  from_email: string;
  to_email: string;
  phone: string;
  description: string;
}

export const sendOrderEmail = async (templateParams: OrderEmailTemplateParams) => {
  try {
    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams as unknown as Record<string, unknown>,
      PUBLIC_KEY
    );
    return response;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};
