import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Contact.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic will be implemented when backend is connected
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    
    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      message: ''
    });
  };

  return (
    <div className="contact-page">
      <Header />
      <main className="contact-main">
        <div className="contact-container">
          <div className="contact-header">
            <h1>Contact Us</h1>
            <p>Get in touch with our team. We'd love to hear from you.</p>
          </div>
          
          <div className="contact-content">
            <div className="contact-info">
              <h2>Get in Touch</h2>
              <p>Have questions about our services? Want to learn more about how we can help your business? Fill out the form and we'll get back to you as soon as possible.</p>
              
              <div className="contact-details">
                <div className="contact-item">
                  <h3>Email</h3>
                  <p>dearregards.official@gmail.com</p>
                </div>
                <div className="contact-item">
                  <h3>Response Time</h3>
                  <p>We typically respond within 24 hours</p>
                </div>
                <div className="contact-item">
                  <h3>Office Hours</h3>
                  <p>Monday - Friday, 9AM - 6PM EST</p>
                </div>
              </div>
            </div>
            
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name *</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name *</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  required
                ></textarea>
              </div>
              
              <button type="submit" className="submit-button">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContactUs;
