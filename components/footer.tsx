import Link from "next/link";
import { Facebook, Twitter, Linkedin, Github, Mail, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white text-sm">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-4 gap-6">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold text-blue-400 mb-2">TechKL</h3>
            <p className="text-gray-400 mb-3 leading-relaxed">
              Your source for technology knowledge and learning.
            </p>
            <div className="flex space-x-3">
              <a href="https://www.youtube.com/@knowledgelearning9352" className="text-gray-400 hover:text-blue-400">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400">
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base font-semibold mb-2">Quick Links</h4>
            <ul className="space-y-1">
              <li><Link href="/" className="text-gray-400 hover:text-white">Home</Link></li>
              <li><Link href="/blog" className="text-gray-400 hover:text-white">Blog</Link></li>
              <li><Link href="/news" className="text-gray-400 hover:text-white">News</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-white">About</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-base font-semibold mb-2">Resources</h4>
            <ul className="space-y-1">
              <li><Link href="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
              <li><Link href="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-gray-400 hover:text-white">Terms & Conditions</Link></li>
              <li><Link href="/sitemap" className="text-gray-400 hover:text-white">Sitemap</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-base font-semibold mb-2">Contact</h4>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span className="text-gray-400">info@techkl.de</span>
              </div>
              <p className="text-gray-400 text-sm">Reach out for inquiries or feedback.</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-2 pt-2 text-center">
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} TechKL. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
