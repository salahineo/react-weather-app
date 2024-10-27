import "./Footer.css";

const Footer = () => {
  // Get Current Year For Copyright
  let footer_copyright_year = new Date();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="copyright">
          © <span>{String(footer_copyright_year.getFullYear())}</span> | <a href='https://salahineo.com' target='_blank' rel="noopener noreferrer" className="author">Mohamed Salah</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
