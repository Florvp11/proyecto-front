import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";
import './footer.css'

export function Footer() {
    return (
        <footer>
            <div className="container">
                <div className="socials">
                    <a href="https://www.instagram.com/igmeals/" target="_blank" aria-label="Instagram"><FaInstagram /></a>
                    <a href="#" aria-label="Twitter"><FaTwitter /></a>
                    <a href="#" aria-label="Facebook"><FaFacebookF /></a>
                </div>
                <p>Privacy Policy</p>
                <p>Terms and Conditions</p>
                <p>© Copyright 2025</p>
            </div>
        </footer>
    );
}
