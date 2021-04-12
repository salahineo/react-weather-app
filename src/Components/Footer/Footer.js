import "./Footer.css";

const Footer = () => {
  // Get Current Year For Copyright
  let footer_copyright_year = new Date();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="copyright">
          © <span>{String(footer_copyright_year.getFullYear())}</span> | <span className="author">Mohamed Salah</span>
        </div>
        <div className="links">
          <a href="https://github.com/salahineo" target="_blank" rel="noreferrer">
            <i className="fab fa-github" />
          </a>
          <a href="https://www.linkedin.com/in/salahineo/" target="_blank" rel="noreferrer">
            <i className="fab fa-linkedin-in" />
          </a>
          <a href="https://twitter.com/salahineo" target="_blank" rel="noreferrer">
            <i className="fab fa-twitter" />
          </a>
          <a href="https://www.facebook.com/salahineo/" target="_blank" rel="noreferrer">
            <i className="fab fa-facebook-f" />
          </a>
          <a href="https://salahineo.github.io/salahineo/" target="_blank" rel="noreferrer">
            <i className="fas fa-globe-africa" />
          </a>
          <a href="mailto:salahineo.work@gmail.com" target="_blank" rel="noreferrer">
            <i className="fas fa-envelope" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
