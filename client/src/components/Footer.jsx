import { Mail, Send, Heart, Linkedin, Twitter, Instagram, ExternalLink } from 'lucide-react';
import '../styles/footer.css';

const Footer = () => {
  const footerSections = {
    about: {
      title: "About Us",
      content: "We believe every message deserves to be heard the right way. Our AI helps you say it best.",
    },
    support: [
      { name: "Help Center", href: "#" },
      { name: "Contact Us", href: "#" },
      { name: "Tutorials", href: "#" },
    ],
    legal: [
      { name: "Terms of Service", href: "#" },
      { name: "Privacy Policy", href: "#" },
      { name: "FAQs", href: "#" },
    ],
    social: [
      { name: "LinkedIn", href: "#", icon: Linkedin },
      { name: "Twitter", href: "#", icon: Twitter },
      { name: "Instagram", href: "#", icon: Instagram },
    ],
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          
          {/* Brand & About */}
          <div className="brand-section">
            <div className="brand-logo">
              <div className="brand-icon">
                <span>DR</span>
              </div>
              <span className="brand-text gradient-text">Dear Regards</span>
            </div>
            
            <p className="brand-description">
              {footerSections.about.content}
            </p>

            {/* Newsletter Subscription */}
            <div className="newsletter">
              <h3 className="newsletter-title">Stay informed. Write better emails.</h3>
              <div className="newsletter-form">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="input-elegant newsletter-input"
                />
                <button className="btn-primary newsletter-button">
                  <Send size={16} />
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Support Links */}
          <div className="footer-section">
            <h3 className="footer-section-title">Support</h3>
            <ul className="footer-links">
              {footerSections.support.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="footer-link"
                  >
                    {link.name}
                    <ExternalLink size={14} className="external-icon" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div className="footer-section">
            <h3 className="footer-section-title">Legal</h3>
            <ul className="footer-links">
              {footerSections.legal.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="footer-link"
                  >
                    {link.name}
                    <ExternalLink size={14} className="external-icon" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Media & Bottom Section */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            
            {/* Social Icons */}
            <div id="socials" className="social-section">
                <span className="social-label">Follow us:</span>
                <div className="social-links">
                    {footerSections.social.map((social) => {
                        const IconComponent = social.icon;
                        return (
                            <a
                                key={social.name}
                                href={social.href}
                                className="social-icon"
                                aria-label={social.name}
                            >
                                <IconComponent size={20} />
                            </a>
                        );
                    })}
                </div>
            </div>

            {/* Contact Info */}
            <div className="contact-info">
              <a 
                href="mailto:dearregards.official@gmail.com" 
                className="contact-link"
              >
                <Mail size={16} />
                dearregards.official@gmail.com
              </a>
            </div>
          </div>

          {/* Closing Statement */}
          <div className="closing-statement">
            <p className="closing-main gradient-text">
              <Heart size={20} className="heart-icon" />
              Because Every Word Matters
            </p>
            <p className="closing-subtitle">
              Empowering Every Email You Send - Follow us for tips and updates!
            </p>
          </div>

          {/* Copyright */}
          <div className="copyright">
            <p>&copy; 2025 Dear Regards. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;