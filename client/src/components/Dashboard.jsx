import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/main.css';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function Dashboard() {
  const [conversions, setConversions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchConversions = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/conversions`);
        setConversions(response.data);
      } catch (err) {
        setError('Failed to fetch conversion history.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchConversions();
  }, []);

  if (isLoading) return <p className="container" style={{ textAlign: 'center' }}>Loading history...</p>;
  if (error) return <p className="container alert alert-error">{error}</p>;
  if (conversions.length === 0) return <p className="container" style={{ textAlign: 'center' }}>You have no conversion history.</p>;

  return (
    <div className="container">
      <h2>Your Conversion History</h2>
      <div className="conversion-list">
        {conversions.map((conv) => (
          <div key={conv._id} className="card" style={{ marginBottom: '1rem' }}>
            <p><strong>Original:</strong> {conv.angryEmail.length > 150 ? conv.angryEmail.substring(0, 150) + '...' : conv.angryEmail}</p>
            <p style={{ marginTop: '0.5rem' }}><strong>Polite:</strong> {conv.convertedEmail.length > 150 ? conv.convertedEmail.substring(0, 150) + '...' : conv.convertedEmail}</p>
            <p style={{ marginTop: '1rem', fontSize: '0.8rem', color: 'var(--color-text-light)' }}>
              Converted on: {new Date(conv.date).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;