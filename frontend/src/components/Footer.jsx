import { FaFacebook, FaInstagram, FaYoutube, FaTelegram, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => (
  <footer className="bg-neutral-900 text-neutral-200">
    <div className="container-padding mx-auto max-w-7xl section-padding">
      <div className="grid gap-12 md:grid-cols-4">
        {/* Brand Section */}
        <div className="md:col-span-2">
          <div className="flex items-center space-x-3 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-bold text-xl">
              ப
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">பாரி செந்தமிழ் கல்வி</h3>
              <p className="text-sm text-neutral-400">UG TRB Coaching Platform</p>
            </div>
          </div>
          <p className="text-neutral-300 mb-6 max-w-md">
            Empowering Tamil Nadu's future teachers with comprehensive UG TRB preparation,
            expert faculty, and cutting-edge learning technology.
          </p>
          <div className="flex space-x-4">
            {[
              { icon: FaFacebook, href: '#', color: 'hover:text-blue-400', name: 'facebook' },
              { icon: FaInstagram, href: '#', color: 'hover:text-pink-400', name: 'instagram' },
              { icon: FaYoutube, href: '#', color: 'hover:text-red-400', name: 'youtube' },
              { icon: FaTelegram, href: '#', color: 'hover:text-blue-300', name: 'telegram' }
            ].map(({ icon: Icon, href, color, name }) => (
              <a
                key={name}
                href={href}
                className={`text-neutral-400 transition-colors duration-300 ${color}`}
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-6">Quick Links</h4>
          <ul className="space-y-3">
            {[
              'Courses',
              'Test Series',
              'Study Materials',
              'Mock Tests',
              'Rank Analysis',
              'Faculty'
            ].map((item) => (
              <li key={item}>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors duration-300">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-6">Contact Us</h4>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <FaPhone className="h-4 w-4 text-primary-400 flex-shrink-0" />
              <span className="text-neutral-300">+91 98765 43210</span>
            </div>
            <div className="flex items-center space-x-3">
              <FaEnvelope className="h-4 w-4 text-primary-400 flex-shrink-0" />
              <span className="text-neutral-300">support@paarisenthamizhkalvi.com</span>
            </div>
            <div className="flex items-start space-x-3">
              <FaMapMarkerAlt className="h-4 w-4 text-primary-400 flex-shrink-0 mt-1" />
              <span className="text-neutral-300">
                123 Education Street<br />
                Madurai, Tamil Nadu<br />
                India - 625001
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-neutral-800 mt-12 pt-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-400 text-sm">
            © 2024 பாரி செந்தமிழ்க் கல்வி. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-neutral-400 hover:text-white text-sm transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="text-neutral-400 hover:text-white text-sm transition-colors duration-300">
              Terms of Service
            </a>
            <a href="#" className="text-neutral-400 hover:text-white text-sm transition-colors duration-300">
              Refund Policy
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
