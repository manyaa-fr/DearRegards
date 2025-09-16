import Header from './Header';
import HeroSection from './HeroSection';
import Footer from './Footer';
import '../styles/components.css';

function LandingPage() {
  return (
    <div className="landing-page">
      <Header />
      <HeroSection />
      <Footer />
    </div>
  );
}

export default LandingPage;