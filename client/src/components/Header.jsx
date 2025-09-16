import { useState, useContext } from 'react';
import { Menu, X, LogOut } from 'lucide-react';
import '../styles/header.css';
import { AuthContext } from '../context/AuthContext';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isLoggedIn, logout } = useContext(AuthContext);

    const navigationLinks = [
        { name: 'Home', href: '#' },
        { name: 'Features', href: '/features' },
        { name: 'About Us', href: '/about-us' },
        { name: 'Our Socials', href: '#socials' },
    ];

    return (
        <header className="header">
            <div className="header-container">
                <div className="header-content">
                    {/* Logo */}
                    <div className="logo-container">
                        <div className="logo-icon">
                            <span>DR</span>
                        </div>
                        <span className="logo-text gradient-text">Dear Regards</span>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="desktop-nav">
                        {navigationLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="nav-link"
                            >
                                {link.name}
                            </a>
                        ))}
                    </nav>

                    {/* CTA Buttons */}
                    <div className="cta-buttons">
                        {!isLoggedIn ? (
                            <>
                                <button
                                    className="btn-primary"
                                    onClick={() => window.location.href = '/auth'}
                                >
                                    Sign Up
                                </button>
                                <button
                                    className="btn-hero"
                                    onClick={() => window.location.href = '/auth'}
                                >
                                    Login
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    className="btn-primary"
                                    onClick={() => window.location.href = '/dashboard'}
                                >
                                    Dashboard
                                </button>
                                <button
                                    className="btn-ghost"
                                    onClick={logout}
                                    title="Logout"
                                >
                                    <LogOut size={16} />
                                </button>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="mobile-menu-button"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="mobile-menu">
                        <nav className="mobile-nav">
                            {navigationLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="nav-link mobile-nav-link"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {link.name}
                                </a>
                            ))}
                            <div className="mobile-cta-buttons">
                                {!isLoggedIn ? (
                                    <>
                                        <button 
                                            className="btn-primary"
                                            onClick={() => {
                                                setIsMenuOpen(false);
                                                window.location.href = '/auth';
                                            }}
                                        >
                                            Sign Up
                                        </button>
                                        <button 
                                            className="btn-hero"
                                            onClick={() => {
                                                setIsMenuOpen(false);
                                                window.location.href = '/auth';
                                            }}
                                        >
                                            Login
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            className="btn-primary"
                                            onClick={() => {
                                                setIsMenuOpen(false);
                                                window.location.href = '/dashboard';
                                            }}
                                        >
                                            Dashboard
                                        </button>
                                        <button
                                            className="btn-ghost"
                                            onClick={() => {
                                                setIsMenuOpen(false);
                                                logout();
                                            }}
                                        >
                                            <LogOut size={16} />
                                            Logout
                                        </button>
                                    </>
                                )}
                            </div>
                        </nav>
                    </div>
                )}
            </div>

            {/* Tagline Bar */}
            <div className="tagline-bar">
                <div className="tagline-content">
                    <p className="tagline-text">
                        Write with Confidence, Send with Clarity.
                    </p>
                </div>
            </div>
        </header>
    );
};

export default Header;
