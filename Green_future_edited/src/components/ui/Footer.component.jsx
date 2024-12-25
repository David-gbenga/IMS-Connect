import React from "react";
import "./Footer.css";

const FooterComponent = () => {
  return (
    <footer className="footer">
      <span>Powered By InnoSphere</span>
      <span className="d-none d-md-inline ms-2">All rights reserved </span>

      <div className="footer-container">
        {/* Company Info Section */}
        <div className="footer-section">
          <h4>Green Future</h4>
          <p>
            Empowering sustainable development through innovative ideas and
            solutions. Let's create a greener world together.
          </p>
        </div>

        {/* Social Media Links Section */}
        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-links">
            <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
              <i className="fab fa-facebook-f"></i> Facebook
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noreferrer">
              <i className="fab fa-twitter"></i> Twitter
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
              <i className="fab fa-linkedin-in"></i> LinkedIn
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fab fa-instagram"></i> Instagram
            </a>
          </div>
        </div>

        {/* Contact Details Section */}
        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>Email: contact@greenfuture.com</p>
          <p>Phone: +123-456-7890</p>
          <p>Address: 123 Green Street, Sustainability City</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} Innosphere. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default FooterComponent;
