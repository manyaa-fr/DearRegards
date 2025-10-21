import React, { useState, useRef } from 'react';
import axios from 'axios';
import { api } from '../config';
import { Mic, Mail, Home, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../styles/ConversionTool.css';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function ConversionTool() {
  const [angryEmail, setAngryEmail] = useState('');
  const [convertedEmail, setConvertedEmail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
  const navigate = useNavigate();

  // New state for user controls
  const [tone, setTone] = useState('Professional');
  const [wordLimit, setWordLimit] = useState(150);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setConvertedEmail(null);
    setIsLoading(true);

    try {
      const response = await axios.post(api('/api/convert-email'), {
        angryEmail,
        tone,
        wordLimit
      });
      
      // Log the full response data received from the backend
      console.log("Backend response data:", response.data); 
      setConvertedEmail(response.data);

    } catch (err) {
      setError(err.response?.data?.error || 'Failed to convert email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendToGmail = () => {
    // Check for both convertedSubject and convertedEmail
    if (convertedEmail?.convertedSubject && convertedEmail?.convertedEmail) {
      const subject = encodeURIComponent(convertedEmail.convertedSubject);
      const body = encodeURIComponent(convertedEmail.convertedEmail);
      const mailtoLink = `https://mail.google.com/mail/?view=cm&fs=1&su=${subject}&body=${body}`;
      window.open(mailtoLink, '_blank');
    } else {
      console.log("Failed to redirect: Converted email data is missing.");
    }
  };

  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window)) {
      setError('Voice-to-Text is not supported by your browser.');
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setAngryEmail((prev) => (prev ? prev + ' ' + transcript : transcript));
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      setError(`Voice input error: ${event.error}`);
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  return (
    <div className="container">
      {/* Navigation Header */}
      <div className="navigation-header">
        <div className="nav-buttons">
          <button
            className="nav-button back-button"
            onClick={() => navigate('/')}
          >
            <Home size={16} />
            Back to Home
          </button>
          <button
            className="nav-button dashboard-button"
            onClick={() => navigate('/dashboard')}
          >
            <BarChart3 size={16} />
            Dashboard
          </button>
        </div>
      </div>

      <div className="card">
        <h2>AI Email Tone Converter</h2>
        <p style={{ marginBottom: '1.5rem' }}>
          Paste or speak your angry email below and let's transform its tone.
        </p>

        <div className="form-group" style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
          <div>
            <label htmlFor="tone-select" style={{ marginRight: '0.5rem' }}>Tone:</label>
            <select
              id="tone-select"
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              style={{ padding: '8px', borderRadius: '8px', border: '1px solid var(--color-border)' }}
            >
              <option value="Professional">Professional</option>
              <option value="Diplomatic">Diplomatic</option>
              <option value="Casual">Casual</option>
              <option value="Formal">Formal</option>
              <option value="Encouraging">Encouraging</option>
              <option value="Direct">Direct</option>
              <option value="Inquisitive">Inquisitive</option>
            </select>
          </div>
          <div>
            <label htmlFor="word-limit" style={{ marginRight: '0.5rem' }}>Word Limit:</label>
            <input
              id="word-limit"
              type="number"
              value={wordLimit}
              onChange={(e) => setWordLimit(e.target.value)}
              min="10"
              max="1000"
              style={{ width: '80px', padding: '8px', textAlign: 'center' }}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ position: 'relative' }}>
            <textarea
              placeholder="Paste your angry email here..."
              value={angryEmail}
              onChange={(e) => setAngryEmail(e.target.value)}
              rows="10"
              required
            />
            <button
              type="button"
              onClick={handleVoiceInput}
              className="voice-btn"
              disabled={isListening}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: isListening ? '#e74c3c' : '#2c3e50',
                fontSize: '1.5rem',
              }}
            >
              <Mic size={20} />
            </button>
          </div>
          <button type="submit" className="btn-primary" disabled={isLoading || !angryEmail.trim()}>
            {isLoading ? 'Converting...' : 'Convert Email'}
          </button>
        </form>
      </div>

      {(isLoading || error || convertedEmail) && (
        <div className="card" style={{ marginTop: '2rem' }}>
          {isLoading && <p>Converting...</p>}
          {error && <p className="alert alert-error">{error}</p>}
          {convertedEmail && (
            <div>
              <h3>Polite Version</h3>
              <p style={{ whiteSpace: 'pre-wrap' }}>{convertedEmail.convertedEmail}</p>
              <p style={{ marginTop: '1rem', color: '#2c3e50' }}>
                <strong>Tone Shift:</strong> {convertedEmail.toneChange}
              </p>
              <button onClick={handleSendToGmail} className="btn-primary" style={{ marginTop: '1rem' }}>
                <Mail size={16} style={{ marginRight: '0.5rem' }} /> Send to Gmail
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ConversionTool;