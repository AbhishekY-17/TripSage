import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'; // Import icons for social links

function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-6 mt-10 w-full">
            <div className="max-w-screen-xl mx-auto text-center px-4">
                <h2 className="text-xl font-bold mb-2">
                    Created By Abhishek Yadav
                </h2>
                <p className="text-gray-400 mb-4">© 2024 All Rights Reserved</p>

                {/* Social Links */}
                <div className="flex justify-center gap-6 mb-4">
                    <a href="https://github.com/AbhishekY-17" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400 transition">
                        <FaGithub size={24} />
                    </a>
                    <a href="https://www.linkedin.com/in/abhishek-yadav-618825257/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400 transition">
                        <FaLinkedin size={24} />
                    </a>
                    <a href="https://twitter.com/yourtwitter" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400 transition">
                        <FaTwitter size={24} />
                    </a>
                </div>

                {/* Tagline */}
                <p className="text-sm text-gray-500">
                    "Turning Ideas Into Reality"
                </p>
            </div>
        </footer>
    );
}

export default Footer;
