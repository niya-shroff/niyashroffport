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
      title: 'Email_Protocol',
      value: 'contact@niyashroff.me',
      onClick: handleEmailClick,
      color: 'text-accent-crimson'
    },
    {
      icon: MapPin,
      title: 'Geo_Location',
      value: 'New York, NY',
      onClick: handleLocationClick,
      color: 'text-primary'
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      name: 'GitHub',
      url: 'https://github.com/niya-shroff',
      color: 'hover:text-white'
    },
    {
      icon: Linkedin,
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/niyashroff/',
      color: 'hover:text-primary'
    },
    {
      icon: Instagram,
      name: 'Instagram',
      url: 'https://www.instagram.com/newniyas/',
      color: 'hover:text-accent-crimson'
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 bg-background relative overflow-hidden">
      {/* Sci-Fi Grid Overlay */}
      <div className="absolute inset-0 bg-[url('/subtle-grid.svg')] opacity-20 pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          
          <div className="flex flex-col items-center mb-16 relative">
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gray-800 -z-10"></div>
            <div className="bg-background px-6 border border-gray-800 py-3 tape-edge rotate-[-1deg]">
              <h2 className="text-3xl font-mono text-white tracking-widest uppercase flex items-center gap-3">
                <TerminalSquare className="text-accent-emerald" />
                INITIATE_CONTACT
                <span className="font-handwriting text-primary text-2xl lowercase absolute -bottom-6 -right-4 rotate-[-5deg]">say hi!</span>
              </h2>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 items-start mt-20">
            {/* Contact Information - Scrapbook Note */}
            <div className="lg:col-span-5 relative perspective-1000 mt-4">
              <div className="note-panel shadow-2xl rotate-[-2deg] !p-8">
                <h3 className="text-3xl font-handwriting text-gray-900 mb-6 font-bold">Let's Connect!</h3>
                <p className="text-gray-700 leading-relaxed font-sans mb-8 font-medium">
                  Whether you have a project in mind, want to collaborate, or just want to say hello,
                  I'd love to hear from you. Feel free to reach out through any of these channels.
                </p>

                {/* Contact Details */}
                <div className="space-y-4 mb-8">
                  {contactInfo.map((info, index) => (
                    <div
                      key={index}
                      onClick={info.onClick}
                      className="flex items-center gap-4 p-3 border-b-2 border-dashed border-gray-300 hover:bg-gray-100 transition-colors duration-200 group cursor-pointer"
                    >
                      <div className="text-gray-600">
                        <info.icon size={24} />
                      </div>
                      <div>
                        <h4 className="text-gray-900 font-handwriting text-xl">{info.title}</h4>
                        <p className="font-mono text-xs text-gray-600">{info.value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Social Links */}
                <div>
                  <h4 className="text-gray-900 font-handwriting text-xl font-bold mb-4">Find me here:</h4>
                  <div className="flex space-x-2">
                    {socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-white border border-gray-300 shadow-sm text-gray-600 hover:text-black transition-all duration-200 hover:-translate-y-1 transform rounded-sm"
                        aria-label={social.name}
                      >
                        <social.icon size={20} />
                      </a>
                    ))}
                  </div>
                </div>
                
                {/* Visual Pin */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-red-500 rounded-full shadow-md border-2 border-red-700/50 flex items-center justify-center">
                    <div className="w-2 h-2 bg-white/50 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Contact Form - Sci-Fi Terminal */}
            <div className="lg:col-span-7">
              <div className="card !p-0 border-primary/30 overflow-hidden bg-surface/90 backdrop-blur-md shadow-[0_0_30px_rgba(14,165,233,0.1)]">
                {/* Terminal Header */}
                <div className="bg-gray-900 px-6 py-3 border-b border-gray-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Code className="text-primary" size={16} />
                    <span className="font-mono text-[10px] text-primary tracking-widest">SECURE_COMM_LINK</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                    <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  </div>
                </div>
                
                <div className="p-8">
                  {/* Status Messages */}
                  {submitStatus === 'success' && (
                    <div className="mb-6 p-4 bg-accent-emerald/10 border border-accent-emerald rounded font-mono text-xs flex items-start gap-3">
                      <CheckCircle className="text-accent-emerald shrink-0 mt-0.5" size={16} />
                      <span className="text-accent-emerald tracking-wide">MSG_TRANSMITTED_SUCCESSFULLY. AWAITING_RESPONSE...</span>
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="mb-6 p-4 bg-accent-crimson/10 border border-accent-crimson rounded font-mono text-xs flex items-start gap-3">
                      <AlertCircle className="text-accent-crimson shrink-0 mt-0.5" size={16} />
                      <span className="text-accent-crimson tracking-wide">ERR_TRANSMISSION_FAILED. RE-ESTABLISH_CONNECTION_OR_USE_MANUAL_PROTOCOL.</span>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block font-mono text-[10px] text-muted uppercase tracking-widest mb-2">
                          &gt; IDENTIFICATION
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          disabled={isSubmitting}
                          className="w-full px-4 py-3 bg-background border border-gray-800 text-white font-mono text-sm placeholder-gray-600 focus:outline-none focus:border-primary transition-colors duration-200 disabled:opacity-50"
                          placeholder="ENTER_NAME..."
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block font-mono text-[10px] text-muted uppercase tracking-widest mb-2">
                          &gt; RETURN_ADDRESS
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          disabled={isSubmitting}
                          className="w-full px-4 py-3 bg-background border border-gray-800 text-white font-mono text-sm placeholder-gray-600 focus:outline-none focus:border-primary transition-colors duration-200 disabled:opacity-50"
                          placeholder="ENTER_EMAIL..."
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block font-mono text-[10px] text-muted uppercase tracking-widest mb-2">
                        &gt; PACKET_HEADER
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 bg-background border border-gray-800 text-white font-mono text-sm placeholder-gray-600 focus:outline-none focus:border-primary transition-colors duration-200 disabled:opacity-50"
                        placeholder="ENTER_SUBJECT..."
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block font-mono text-[10px] text-muted uppercase tracking-widest mb-2">
                        &gt; PAYLOAD
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 bg-background border border-gray-800 text-white font-mono text-sm placeholder-gray-600 focus:outline-none focus:border-primary transition-colors duration-200 resize-none disabled:opacity-50"
                        placeholder="ENTER_MESSAGE..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full group relative overflow-hidden bg-primary/10 border border-primary text-primary font-mono text-sm uppercase tracking-widest py-4 px-6 transition-all duration-300 hover:bg-primary/20 disabled:opacity-50"
                    >
                      <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out -z-10 text-white"></div>
                      <div className="flex items-center justify-center gap-3 relative z-10 group-hover:text-background transition-colors duration-300">
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-current border-t-transparent flex-shrink-0 animate-spin"></div>
                            TRANSMITTING_DATA...
                          </>
                        ) : (
                          <>
                            <Send size={16} />
                            INITIALIZE_TRANSMISSION
                          </>
                        )}
                      </div>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;