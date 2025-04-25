import './Contact.css';

function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="contact-content">
        <h2>Contact</h2>
        <div className="contact-info">
          <div className="contact-item">
            <h3>Email</h3>
            <p>
              <a href="mailto:your.email@example.com">your.email@example.com</a>
            </p>
          </div>
          <div className="contact-item">
            <h3>Location</h3>
            <p>Your City, Country</p>
          </div>
          <div className="contact-item">
            <h3>Availability</h3>
            <p>Open to new opportunities</p>
          </div>
        </div>
        <div className="social-links">
          <a href="#" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="#" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="#" target="_blank" rel="noopener noreferrer">Twitter</a>
        </div>
      </div>
    </section>
  );
}

export default Contact;