import React, { useState } from 'react';
import { Mail, MapPin, Send, Github, Linkedin, Instagram, CheckCircle, AlertCircle, Code, TerminalSquare } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { EMAIL_CONFIG } from '../utils/emailConfig';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_email: 'contact@niyashroff.me'
      };

      await emailjs.send(
        EMAIL_CONFIG.SERVICE_ID,
        EMAIL_CONFIG.TEMPLATE_ID,
        templateParams,
        EMAIL_CONFIG.PUBLIC_KEY
      );

      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEmailClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent('Hello from your portfolio');
    const body = encodeURIComponent('Hi Niya,\n\nI found your portfolio and would like to get in touch.\n\nBest regards');
    const mailtoUrl = `mailto:contact@niyashroff.me?subject=${subject}&body=${body}`;

    window.location.href = mailtoUrl;

    setTimeout(() => {
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=contact@niyashroff.me&su=${subject}&body=${body}`;
      window.open(gmailUrl, '_blank');
    }, 1000);
  };

  const handleLocationClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open('https://maps.google.com/?q=New+York,+NY', '_blank');
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'contact@niyashroff.me',
      onClick: handleEmailClick,
      color: 'text-coral'
    },
    {
      icon: MapPin,
      title: 'Based In',
      value: 'New York, NY',
      onClick: handleLocationClick,
      color: 'text-skyBlue'
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      name: 'GitHub',
      url: 'https://github.com/niya-shroff',
      color: 'hover:text-coral'
    },
    {
      icon: Linkedin,
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/niyashroff/',
      color: 'hover:text-coral'
    },
    {
      icon: Instagram,
      name: 'Instagram',
      url: 'https://www.instagram.com/newniyas/',
      color: 'hover:text-coral'
    }
  ];

  return (
    <div className="min-h-screen pt-28 pb-16 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">

          <div className="flex flex-col items-center mb-16 relative">
            <div className="flex items-center gap-3 bg-coral/20 px-5 py-2 rounded-lg border border-coral/10 inline-flex mb-6 mt-4">
              <Mail className="text-coral" size={18} />
              <h2 className="text-xl font-serif text-gray-900 dark:text-white font-semibold tracking-wide">Contact</h2>
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-ink dark:text-white mb-2 tracking-tight">
              Let's Connect ☻
            </h1>
            <span className="font-handwriting text-coral text-2xl lowercase mt-1 rotate-[-2deg]"> drop a message, or just say hi!</span>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 items-start mt-12">
            {/* Contact Information - Scrapbook Note */}
            <div className="lg:col-span-5 relative perspective-1000">
              <div className="card-notebook shadow-xl rotate-[-2deg] !p-8 bg-white/80 dark:bg-[#1D1A22]/80 backdrop-blur-md">
                {/* Visual clip decoration */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-2xl drop-shadow-sm select-none z-20">📎</div>

                <h3 className="text-3xl font-handwriting text-gray-900 dark:text-slate-100 mb-6 font-bold">Let's Connect!</h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-sans mb-8">
                  Whether you have a project in mind, want to collaborate on something creative, or just want to chat about films or coding,
                  I'd love to hear from you.
                </p>

                {/* Contact Details */}
                <div className="space-y-4 mb-8">
                  {contactInfo.map((info, index) => (
                    <div
                      key={index}
                      onClick={info.onClick}
                      className="flex items-center gap-4 p-3 border-b border-dashed border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 transition-colors duration-200 group cursor-pointer rounded-lg"
                    >
                      <div className={info.color}>
                        <info.icon size={22} />
                      </div>
                      <div>
                        <h4 className="text-ink dark:text-white font-serif font-semibold text-sm">{info.title}</h4>
                        <p className="font-sans text-xs text-slate-500">{info.value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Social Links */}
                <div>
                  <h4 className="text-ink dark:text-white font-serif font-semibold text-sm mb-4">Find me here:</h4>
                  <div className="flex space-x-2">
                    {socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-white dark:bg-white/5 border border-black/5 dark:border-white/5 shadow-sm text-slate-600 dark:text-slate-300 hover:text-coral transition-all duration-200 hover:-translate-y-1 transform rounded-xl"
                        aria-label={social.name}
                      >
                        <social.icon size={18} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form - Editorial Notepad */}
            <div className="lg:col-span-7">
              <div className="card border border-black/5 dark:border-white/5 bg-white/80 dark:bg-[#1D1A22]/80 backdrop-blur-md shadow-xl p-8">

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <div className="mb-6 p-4 bg-mint/30 dark:bg-mint/10 border border-mint rounded-xl font-serif text-sm flex items-start gap-3 text-ink dark:text-mint">
                    <CheckCircle className="shrink-0 mt-0.5" size={16} />
                    <span>Your message has been sent successfully. I will get back to you shortly!</span>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="mb-6 p-4 bg-pink/30 dark:bg-pink/10 border border-pink rounded-xl font-serif text-sm flex items-start gap-3 text-ink dark:text-pink">
                    <AlertCircle className="shrink-0 mt-0.5" size={16} />
                    <span>Failed to send the message. Please try again or reach out directly via email.</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block font-serif text-sm font-semibold text-ink dark:text-white mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 bg-background border border-black/10 dark:border-white/10 rounded-xl text-gray-900 dark:text-white font-sans text-sm focus:outline-none focus:border-coral transition-colors duration-200 disabled:opacity-50"
                        placeholder="What should I call you?"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block font-serif text-sm font-semibold text-ink dark:text-white mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 bg-background border border-black/10 dark:border-white/10 rounded-xl text-gray-900 dark:text-white font-sans text-sm focus:outline-none focus:border-coral transition-colors duration-200 disabled:opacity-50"
                        placeholder="Where should I reply?"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block font-serif text-sm font-semibold text-ink dark:text-white mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 bg-background border border-black/10 dark:border-white/10 rounded-xl text-gray-900 dark:text-white font-sans text-sm focus:outline-none focus:border-coral transition-colors duration-200 disabled:opacity-50"
                      placeholder="What is this about?"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block font-serif text-sm font-semibold text-ink dark:text-white mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 bg-background border border-black/10 dark:border-white/10 rounded-xl text-gray-900 dark:text-white font-sans text-sm focus:outline-none focus:border-coral transition-colors duration-200 resize-none disabled:opacity-50"
                      placeholder="Share your thoughts here..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary justify-center py-3.5"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-current border-t-transparent flex-shrink-0 animate-spin"></div>
                        Sending Note...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Send message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;