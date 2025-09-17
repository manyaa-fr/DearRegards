import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Socials.css';

const Socials = () => {
  const socialPlatforms = [
    {
      name: "LinkedIn",
      handle: "@DearRegards",
      description: "Professional tips, industry insights, and communication best practices for the workplace.",
      followers: "12.5K",
      icon: "💼",
      color: "#0077B5"
    },
    {
      name: "Twitter",
      handle: "@DearRegards",
      description: "Quick tips, real-time updates, and bite-sized communication wisdom for busy professionals.",
      followers: "8.3K",
      icon: "🐦",
      color: "#1DA1F2"
    },
    {
      name: "Instagram",
      handle: "@dear.regards",
      description: "Visual communication tips, behind-the-scenes content, and inspiring stories from our community.",
      followers: "5.2K",
      icon: "📸",
      color: "#E4405F"
    },
    {
      name: "YouTube",
      handle: "Dear Regards",
      description: "In-depth tutorials, communication masterclasses, and expert interviews on effective writing.",
      followers: "3.1K",
      icon: "🎥",
      color: "#FF0000"
    }
  ];

  const recentPosts = [
    {
      platform: "LinkedIn",
      content: "✨ The difference between 'Can you do this ASAP?' and 'Would you be able to help with this by Friday?' might seem small, but the impact is huge. One builds relationships, the other strains them.",
      engagement: "247 likes • 18 comments",
      time: "2 days ago"
    },
    {
      platform: "Twitter",
      content: "Pro tip: Replace 'No problem' with 'You're welcome' or 'Happy to help' in professional emails. It shifts the focus from the inconvenience to the value you're providing. 🙌",
      engagement: "892 likes • 134 retweets",
      time: "4 days ago"
    },
    {
      platform: "Instagram",
      content: "Swipe to see how we transformed this frustrated email into a diplomatic masterpiece ➡️ Sometimes all it takes is reframing your perspective.",
      engagement: "156 likes • 23 comments",
      time: "1 week ago"
    }
  ];

  return (
    <div className="page-container">
      <Header />
      <main className="socials-main">
        {/* Hero Section */}
        <section className="socials-hero">
          <div className="socials-container">
            <h1 className="socials-title gradient-text">
              Join Our Community
            </h1>
            <p className="socials-subtitle">
              Connect with us across platforms for daily communication tips, insights, and inspiration
            </p>
          </div>
        </section>

        {/* Social Platforms Grid */}
        <section className="platforms-section">
          <div className="socials-container">
            <h2 className="section-title">Find Us Everywhere</h2>
            <div className="platforms-grid">
              {socialPlatforms.map((platform, index) => (
                <div key={index} className="platform-card">
                  <div className="platform-header">
                    <div className="platform-icon" style={{ backgroundColor: `${platform.color}20` }}>
                      {platform.icon}
                    </div>
                    <div className="platform-info">
                      <h3 className="platform-name">{platform.name}</h3>
                      <p className="platform-handle">{platform.handle}</p>
                    </div>
                    <div className="platform-followers">
                      {platform.followers} followers
                    </div>
                  </div>
                  <p className="platform-description">{platform.description}</p>
                  <button className="btn-follow" style={{ borderColor: platform.color }}>
                    Follow Us
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Recent Posts Section */}
        <section className="recent-posts-section">
          <div className="socials-container">
            <h2 className="section-title">Recent Highlights</h2>
            <div className="posts-grid">
              {recentPosts.map((post, index) => (
                <div key={index} className="post-card">
                  <div className="post-header">
                    <span className="post-platform">{post.platform}</span>
                    <span className="post-time">{post.time}</span>
                  </div>
                  <p className="post-content">{post.content}</p>
                  <div className="post-engagement">{post.engagement}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="newsletter-section">
          <div className="socials-container">
            <div className="newsletter-content">
              <h2 className="newsletter-title">Weekly Communication Insights</h2>
              <p className="newsletter-description">
                Get our best tips, real email transformations, and exclusive content delivered to your inbox every week.
              </p>
              <div className="newsletter-form">
                <input 
                  type="email" 
                  placeholder="Enter your email address"
                  className="newsletter-input"
                />
                <button className="btn-hero">Subscribe</button>
              </div>
              <p className="newsletter-disclaimer">
                Join 15,000+ professionals who trust us with their inbox. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </section>

        {/* Community Guidelines */}
        <section className="guidelines-section">
          <div className="socials-container">
            <h2 className="section-title">Community Guidelines</h2>
            <div className="guidelines-content">
              <div className="guideline-card">
                <h3>Be Respectful</h3>
                <p>We're all here to learn and improve our communication. Treat everyone with kindness and respect.</p>
              </div>
              <div className="guideline-card">
                <h3>Share Constructively</h3>
                <p>Share your experiences, ask questions, and help others. Constructive feedback is always welcome.</p>
              </div>
              <div className="guideline-card">
                <h3>Stay On Topic</h3>
                <p>Keep discussions focused on communication, writing, and professional development.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Socials;