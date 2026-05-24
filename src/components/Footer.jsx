import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiFacebook, FiInstagram, FiTwitter, FiGithub, FiMail, FiMapPin, FiPhone } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer" className="w-full pt-16 pb-8 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        
        {/* Brand Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
            BAZAR <span className="text-blue-600">BLIZZ</span>
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            Your destination for premium products. Built with the MERN stack for a seamless shopping experience.
          </p>
          <div className="flex gap-4 pt-2">
            <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
              <FiFacebook size={20} />
            </a>
            <a href="https://www.instagram.com/sami_sheikh0075/" className="text-gray-400 hover:text-blue-600 transition-colors">
              <FiInstagram size={20} />
            </a>
            <a href="https://github.com/shami-sheikh" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-blue-600 transition-colors">
              <FiGithub size={20} />
            </a>
          </div>
        </div>

        {/* Collections - Playfair Display will apply via your CSS */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-6">Collections</h3>
          <ul className="flex flex-col gap-3">
            <li><NavLink to="/collection" className="text-gray-600 hover:text-blue-600 text-sm transition-colors">Latest Drops</NavLink></li>
            <li><NavLink to="/collection" className="text-gray-600 hover:text-blue-600 text-sm transition-colors">Best Sellers</NavLink></li>
            <li><NavLink to="/collection" className="text-gray-600 hover:text-blue-600 text-sm transition-colors">Summer Sale</NavLink></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-6">Company</h3>
          <ul className="flex flex-col gap-3">
            <li><NavLink to="/about" className="text-gray-600 hover:text-blue-600 text-sm transition-colors">About Us</NavLink></li>
            <li><NavLink to="/contact" className="text-gray-600 hover:text-blue-600 text-sm transition-colors">Contact</NavLink></li>
            <li><NavLink to="/testimonial" className="text-gray-600 hover:text-blue-600 text-sm transition-colors">Testimonials</NavLink></li>
          </ul>
        </div>

        {/* Contact Details */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-6">Get in Touch</h3>
          <ul className="flex flex-col gap-4">
            <li className="flex items-start gap-3 text-gray-600 text-sm">
              <FiMapPin className="text-blue-600 mt-1 shrink-0" />
              <span>Bagodar, Jharkhand, India</span>
            </li>
            <li className="flex items-center gap-3 text-gray-600 text-sm">
              <FiPhone className="text-blue-600 shrink-0" />
              <span>+91 1234567890</span>
            </li>
            <li className="flex items-center gap-3 text-gray-600 text-sm">
              <FiMail className="text-blue-600 shrink-0" />
              <span>sami@bazarblizz.com</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-gray-400 text-xs font-medium">
          © {currentYear} BAZARBlizz. Designed by <span className="text-gray-700 font-bold">Sami Sheikh</span>.
        </p>
        <div className="flex gap-6 grayscale opacity-60">
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="Paypal" className="h-4" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-3" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-5" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;