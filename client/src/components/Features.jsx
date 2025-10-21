import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Features.css';

const Features = () => {

  const features = [
    {
      title: "AI-Powered Tone Analysis",
      description: "Our intelligent system analyzes your email's tone and suggests improvements to ensure your message sounds professional and respectful.",
      icon: "🎯"
    },
    {
      title: "Direct-to-Gmail",
      description: "Skip the copy-paste — deliver your emails straight to Gmail instantly.",
      icon: "⚡"
    },
    {
      title: "Sentiment Adjustment",
      description: "Automatically detect and adjust emotional language to maintain professionalism while preserving your intended message.",
      icon: "🎭"
    },
    {
      title: "Multi-Language Support",
      description: "Enhance emails in multiple languages with culturally appropriate tone adjustments and professional phrasing.",
      icon: "🌍"
    },
    {
      title: "Learning from Context",
      description: "Our AI learns from your communication style and industry context to provide increasingly personalized suggestions.",
      icon: "🧠"
    }
  ];

  const benefits = [
    "Save time on email editing and proofreading",
    "Avoid miscommunication and workplace conflicts",
    "Build stronger professional relationships",
    "Increase response rates and engagement",
    "Maintain consistent brand voice across all communications"
  ];

  return (
    <div className="page-container">
      <Header />
      <main className="features-main">
        {/* Hero Section */}
        <section className="features-hero">
          <div className="features-container">
            <h1 className="features-title gradient-text">
              Powerful Features for Perfect Communication
            </h1>
            <p className="features-subtitle">
              Transform every email into a masterpiece with our intelligent writing assistant
            </p>
          </div>
        </section>

        {/* Features Grid */}
        <section className="features-grid-section">
          <div className="features-container">
            <div className="features-grid">
              {features.map((feature, index) => (
                <div key={index} className="feature-card">
                  <div className="feature-icon">{feature.icon}</div>
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="benefits-section">
          <div className="features-container">
            <h2 className="section-title">Why Choose Dear Regards?</h2>
            <div className="benefits-content">
              <div className="benefits-text">
                <p className="benefits-intro">
                  Join thousands of professionals who have transformed their email communication with Dear Regards.
                </p>
                <ul className="benefits-list">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="benefit-item">
                      ✓ {benefit}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="benefits-cta">
                <h3 className="cta-title">Ready to Transform Your Emails?</h3>
                <p className="cta-text">Start writing with confidence today</p>
                <button className="btn-hero" onClick={() => window.location.href = '/app'}>Try It Now</button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Features;