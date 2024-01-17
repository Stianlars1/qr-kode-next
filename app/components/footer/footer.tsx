import { FaEnvelope, FaGithub, FaInstagram } from "react-icons/fa";
import "./footer.css";
export const Footer = () => {
  return (
    <>
      <footer className="footer">
        <p>Created by: Stian Larsen</p>
        <div className="social-links">
          <a
            href="https://github.com/stianlars1"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub />
            <span>/stianlars1</span>
          </a>
          <a
            href="https://instagram.com/stianlarsen"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram />
            <span>stianlarsen</span>
          </a>
          <a
            href="mailto:stian.larsen@mac.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaEnvelope />
            <span>stian.larsen@mac.com</span>
          </a>
        </div>
      </footer>
    </>
  );
};
