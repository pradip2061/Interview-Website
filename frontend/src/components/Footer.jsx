import React, { useEffect, useRef } from 'react';
import { Github, Twitter, Linkedin } from 'lucide-react';
import { useFooter } from '../pages/Footerc';
const Footer = () => {

  return (
    <footer className="bg-gray-800 text-white mt-8 lg:sticky">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">TechLearn</h3>
            <p className="text-gray-400">
              Empowering developers with comprehensive learning resources and tutorials.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white" aria-label='Home'>Home</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white" aria-label='Courses'>Courses</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white" aria-label='About Us'>About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white" aria-label='Contact'>Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white" aria-label='Documentation'>Documentation</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white" aria-label='Tutorials'>Tutorials</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white" aria-label='Blog'>Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white" aria-label='FAQ'>FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white" aria-label='github'>
                <Github className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white" aria-label='Twitter'>
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white" aria-label='Linkedin'>
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} TechLearn. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;