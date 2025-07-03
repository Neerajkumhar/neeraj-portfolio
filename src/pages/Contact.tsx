import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, CheckCircle, AlertCircle } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: 'Email',
      value: 'neerajarod@gmail.com',
      href: 'neerajarod@gmail.com'
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: 'Phone',
      value: '+91 7878539633',
      href: 'tel:+91 7878539633'
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: 'Location',
      value: 'Jodhpur Raj, IND',
      href: 'https://maps.app.goo.gl/JhR8VrCoLTH8tkHS8'
    }
  ];

  const socialLinks = [
    {
      icon: <Github className="h-6 w-6" />,
      name: 'GitHub',
      href: 'https://github.com/Neerajkumhar',
      color: 'hover:text-gray-900 dark:hover:text-white'
    },
    {
      icon: <Linkedin className="h-6 w-6" />,
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/neeraj-kumhar/',
      color: 'hover:text-blue-600'
    },
    {
      icon: <Twitter className="h-6 w-6" />,
      name: 'Twitter',
      href: 'https://x.com/NEERAJ_AROD_',
      color: 'hover:text-blue-400'
    }
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-600">Touch</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Have a project in mind or just want to chat about web development? I'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="animate-slide-in-left">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                Send Me a Message
              </h2>
              
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mr-2" />
                    <span className="text-green-800 dark:text-green-200">
                      Message sent successfully! I'll get back to you soon.
                    </span>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <div className="flex items-center">
                    <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mr-2" />
                    <span className="text-red-800 dark:text-red-200">
                      Something went wrong. Please try again later.
                    </span>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors"
                    placeholder="What's this about?"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors resize-none"
                    placeholder="Tell me about your project or what you have in mind..."
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="animate-slide-up">
              <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                  Let's Connect
                </h3>
                
                <div className="space-y-6 mb-8">
                  {contactInfo.map((item, index) => (
                    <a
                      key={index}
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="flex items-center space-x-4 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    >
                      <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-lg text-primary-600 dark:text-primary-400">
                        {item.icon}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {item.title}
                        </div>
                        <div className="text-sm">
                          {item.value}
                        </div>
                      </div>
                    </a>
                  ))}
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Follow Me
                  </h4>
                  <div className="flex space-x-4">
                    {socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-3 bg-white dark:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-300 ${social.color} transition-colors shadow-md hover:shadow-lg`}
                        aria-label={social.name}
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                </div>

                <div className="mt-8 p-6 bg-gradient-to-r from-primary-600 to-accent-600 rounded-xl text-white">
                  <h4 className="text-lg font-semibold mb-2">
                    Available for Work
                  </h4>
                  <p className="text-primary-100 text-sm">
                    I'm currently available for freelance projects and full-time opportunities. Let's discuss how we can work together!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;