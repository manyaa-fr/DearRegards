import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/AboutUs.css';

const AboutUs = () => {
  const teamMembers = [
    {
      name: "Manya Behl",
      role: "CEO & Founder",
      bio: "DearRegards director.. helping executives craft impactful messages.",
      image: "👩‍💼"
    },
    {
      name: "Michael Rodriguez",
      role: "CTO",
      bio: "AI researcher passionate about natural language processing and human-computer interaction.",
      image: "👨‍💻"
    },
    {
      name: "Emily Johnson",
      role: "Head of Product",
      bio: "UX expert dedicated to making complex AI technology accessible and intuitive for everyone.",
      image: "👩‍🎨"
    }
  ];

  const values = [
    {
      title: "Empathy First",
      description: "We understand that everyone struggles with communication sometimes. Our technology meets you where you are.",
      icon: "💝"
    },
    {
      title: "Privacy Matters",
      description: "Your emails are personal. We use advanced encryption and never store your sensitive content.",
      icon: "🔒"
    },
    {
      title: "Continuous Learning",
      description: "We're constantly improving our AI to better understand context, culture, and communication nuances.",
      icon: "📈"
    }
  ];

  return (
    <div className="page-container">
      <Header />
      <main className="about-main">
        {/* Hero Section */}
        <section className="about-hero">
          <div className="about-container">
            <h1 className="about-title gradient-text">
              Every Message Deserves to Be Heard the Right Way
            </h1>
            <p className="about-subtitle">
              We're on a mission to eliminate miscommunication and help everyone express themselves with clarity and confidence.
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="story-section">
          <div className="about-container">
            <div className="story-content">
              <h2 className="section-title">Our Story</h2>
              <div className="story-text">
                <p>
                  Dear Regards was born from a simple observation: even the most intelligent and capable people sometimes struggle to communicate effectively via email. We've all been there - writing something in the heat of the moment, sending a message that came across wrong, or spending way too long crafting the "perfect" response.
                </p>
                <p>
                  Our founder, Manya Behl, experienced this firsthand while working as a communications director. She watched brilliant colleagues damage relationships simply because their emails sounded harsher than intended, or saw important messages go ignored because they lacked the right tone.
                </p>
                <p>
                  That's when the idea struck: What if we could create an AI assistant that doesn't just check grammar, but actually understands the emotional impact of your words? What if technology could help bridge the gap between what you mean and how it's received?
                </p>
                <p>
                  Today, Dear Regards is that bridge - helping thousands of professionals, students, and individuals communicate with the respect, clarity, and impact they intend.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="values-section">
          <div className="about-container">
            <h2 className="section-title">Our Values</h2>
            <div className="values-grid">
              {values.map((value, index) => (
                <div key={index} className="value-card">
                  <div className="value-icon">{value.icon}</div>
                  <h3 className="value-title">{value.title}</h3>
                  <p className="value-description">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="team-section">
          <div className="about-container">
            <h2 className="section-title">Meet Our Team</h2>
            <div className="team-grid">
              {teamMembers.map((member, index) => (
                <div key={index} className="team-card">
                  <div className="team-image">{member.image}</div>
                  <h3 className="team-name">{member.name}</h3>
                  <p className="team-role">{member.role}</p>
                  <p className="team-bio">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="contact-section">
          <div className="about-container">
            <div className="contact-content">
              <h2 className="section-title">Get in Touch</h2>
              <p className="contact-text">
                We'd love to hear from you! Whether you have questions, feedback, or just want to say hello, 
                our team is here to help make your communication even better.
              </p>
              <div className="contact-info">
                <p>📧 dearregards.official@gmail.com</p>
                <p>💬 Follow us for tips and updates</p>
              </div>
              <button className="btn-hero" onClick={() => window.location.href = '/contact'}>Contact Us</button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUs;