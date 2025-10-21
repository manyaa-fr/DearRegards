import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { api } from '../config';
import { ArrowLeft, Clock, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../styles/dashboard.css';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function Dashboard() {
  const [conversions, setConversions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchConversions = async () => {
      try {
        const response = await axios.get(api('/api/conversions'));
        // Ensure we always set an array
        const data = response.data;
        if (Array.isArray(data)) {
          setConversions(data);
        } else {
          console.warn('API response is not an array:', data);
          setConversions([]);
        }
      } catch (err) {
        setError('Failed to fetch conversion history.');
        console.error(err);
        setConversions([]); // Ensure we have an empty array on error
      } finally {
        setIsLoading(false);
      }
    };
    fetchConversions();
  }, []);

  if (isLoading) {
    return (
      <div className="dashboard-container">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading your conversion history...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-container">
        <div className="error-state">
          <div className="error-icon">⚠️</div>
          <p className="error-message">{error}</p>
          <button 
            className="btn-primary"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <div className="navigation-buttons">
          <button
            className="nav-button back-button"
            onClick={() => navigate('/')}
          >
            <ArrowLeft size={16} />
            Back to Home
          </button>
          <button
            className="nav-button conversion-button"
            onClick={() => navigate('/app')}
          >
            <Mail size={16} />
            Convert Email
          </button>
        </div>
        
        <div className="header-content">
          <h1 className="dashboard-title">Your Conversion History</h1>
          <p className="dashboard-subtitle">
            {conversions.length === 0 
              ? "You haven't converted any emails yet." 
              : `${conversions.length} email${conversions.length === 1 ? '' : 's'} converted`
            }
          </p>
        </div>
      </div>

      {/* Content */}
      {conversions.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">
            <Mail size={48} />
          </div>
          <h3 className="empty-title">No conversions yet</h3>
          <p className="empty-description">
            Start converting your emails to see your history here.
          </p>
          <button 
            className="btn-hero"
            onClick={() => navigate('/app')}
          >
            Start Converting
          </button>
        </div>
      ) : (
        <div className="conversions-grid">
          {conversions.map((conv) => (
            <div key={conv._id} className="conversion-card">
              <div className="conversion-header">
                <div className="conversion-date">
                  <Clock size={16} />
                  <span>{new Date(conv.date).toLocaleDateString()}</span>
                </div>
              </div>
              
              <div className="conversion-content">
                <div className="email-section">
                  <h4 className="section-title">Original Email</h4>
                  <p className="email-text original">
                    {conv.angryEmail.length > 200 
                      ? conv.angryEmail.substring(0, 200) + '...' 
                      : conv.angryEmail
                    }
                  </p>
                </div>
                
                <div className="conversion-arrow">→</div>
                
                <div className="email-section">
                  <h4 className="section-title">Converted Email</h4>
                  <p className="email-text converted">
                    {conv.convertedEmail.length > 200 
                      ? conv.convertedEmail.substring(0, 200) + '...' 
                      : conv.convertedEmail
                    }
                  </p>
                </div>
              </div>
              
              {conv.toneChange && (
                <div className="tone-change">
                  <strong>Tone Shift:</strong> {conv.toneChange}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;