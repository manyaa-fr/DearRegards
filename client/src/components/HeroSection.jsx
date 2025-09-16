import { Sparkles, Shield, Zap, Users } from 'lucide-react';
import '../styles/heroSection.css';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const HeroSection = () => {

    const { isLoggedIn } = useContext(AuthContext);

  const features = [
    { icon: Sparkles, text: "AI-Powered Tone Enhancement" },
    { icon: Shield, text: "Professional Language Transformation" },
    { icon: Zap, text: "Instant Email Improvement" },
    { icon: Users, text: "Trusted by Professionals" },
  ];

  return (
    <section className="hero">
      <div className="hero-container">
        <h1 className="hero-title gradient-text">
          Transform Your Emails from Rushed to Respectful
        </h1>
        
        <p className="hero-subtitle">
          Turn unprofessional, angry, or hurried email drafts into polished, impactful messages that get results.
        <br />
          Plus, you can send your refined emails directly through Gmail — saving time and ensuring your message reaches its audience instantly.
        </p>

        {/* Feature Pills */}
        <div className="features-grid">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="feature-pill">
                <IconComponent size={20} className="feature-icon" />
                <span className="feature-text">{feature.text}</span>
              </div>
            );
          })}
        </div>

        {/* CTA Buttons */}
        <div className="cta-section">
          <button
          className="btn-hero cta-primary"
          onClick={() => {
            window.location.href = isLoggedIn ? '/app' : '/auth';
          }}
        >
          Try It Now
        </button>
          <button 
            className="btn-ghost cta-secondary"
            onClick={() => window.location.href = '/about'}
          >
            About us
          </button>
        </div>

        {/* Social Proof */}
        <p className="social-proof">
          Trusted by professionals at Fortune 500 companies and growing startups alike
        </p>
      </div>

      {/* Decorative floating elements */}
      <div className="floating-element floating-1"></div>
      <div className="floating-element floating-2"></div>
      <div className="floating-element floating-3"></div>
      <div className="floating-element floating-4"></div>
    </section>
  );
};

export default HeroSection;