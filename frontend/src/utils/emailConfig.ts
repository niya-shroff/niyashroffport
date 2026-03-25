// EmailJS Configuration
// Your actual EmailJS credentials

export const EMAIL_CONFIG = {
  SERVICE_ID: 'service_zp5wqpv', // Your EmailJS service ID
  TEMPLATE_ID: 'template_2j9kfz8', // Your EmailJS template ID
  PUBLIC_KEY: 'sAk8szaUTJHpc6XkK', // Your EmailJS public key
};

// Email template variables that will be sent to EmailJS
export interface EmailTemplateParams {
  from_name: string;
  from_email: string;
  subject: string;
  message: string;
  to_email: string;
}