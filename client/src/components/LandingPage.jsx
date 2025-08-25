import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/landingPage.css';

function LandingPage() {
  const { user } = useContext(AuthContext);

  return (
    <div className="landing-container">
      <div className="landing-content">
        <h1 className="landing-title">
          DearRegards: Professionalize Your Tone
        </h1>
        
        <p className="landing-description">
          Transform your angry and unprofessional emails into polished, polite, 
          and effective messages with the power of AI. Our service ensures your 
          communication is always professional.
        </p>
        
        <Link 
          to={user ? "/app" : "/auth"} 
          className="landing-cta"
        >
          Get Started
        </Link>
        
        <div className="landing-features">
          <div className="feature-item">
            <div className="feature-icon">✨</div>
            <h3 className="feature-title">AI-Powered</h3>
            <p className="feature-description">
              Advanced AI algorithms ensure your messages maintain the perfect professional tone
            </p>
          </div>
          
          <div className="feature-item">
            <div className="feature-icon">⚡</div>
            <h3 className="feature-title">Lightning Fast</h3>
            <p className="feature-description">
              Transform your emails in seconds, not minutes. Quick and efficient processing
            </p>
          </div>
          
          <div className="feature-item">
            <div className="feature-icon">🎯</div>
            <h3 className="feature-title">Always Professional</h3>
            <p className="feature-description">
              Guaranteed professional output that maintains your message while improving tone
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;