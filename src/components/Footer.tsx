import Image from "next/image";
import Link from "next/link";
import logo from "../../public/FileDrop (3).png";

const Footer = () => {
  return (
    <footer className="bg-slate-50 dark:bg-slate-900 text-gray-800 dark:text-gray-400 py-6 px-4 md:px-8 mt-12">
      <div className="container mx-auto flex flex-col md:flex-col lg:flex-row items-center justify-between space-y-6 md:space-y-3">
        
        {/* Left Section - Logo & Brand */}
        <Link href="/" className="flex flex-col md:flex-row items-center md:space-x-3 text-center md:text-left">
          <Image
            src={logo}
            alt="Logo"
            width={50}
            height={60}
            className="w-12 h-12 bg-[#0160FE] rounded-lg"
          />
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Filedrop
            </h2>
            <p className="text-sm">Your simple & secure file storage solution.</p>
          </div>
        </Link>

        {/* Center Section - Navigation Links */}
        <nav className="flex flex-col space-y-1 text-sm">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/dashboard" className="hover:underline">
            Dashboard
          </Link>
        </nav>

        {/* Right Section - Disclaimer */}
        <div className="max-w-md text-center md:text-right text-xs text-gray-600 dark:text-gray-400">
          <p>
            This is a demo and not intended for production use. We do not
            affiliate with any of the companies mentioned.
          </p>
          <p>
            Copyright Disclaimer under section 107 of the Copyright Act 1976,
            allowance is made for “fair use” for educational and testing purposes.
          </p>
        </div>
      </div>

      {/* Bottom Section - Copyright & Made by */}
      <div className="border-t border-gray-300 dark:border-gray-700 mt-4 pt-4 flex flex-col lg:flex-row items-center justify-center lg:justify-between text-xs text-center space-y-3 lg:space-y-0">
        <p>&copy; {new Date().getFullYear()} Filedrop. All rights reserved.</p>
        <Link
          href="https://francescovurchio-dev.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          <p className="flex items-center">
            Made with ❤️ by <span className="ml-1 font-semibold">francesco.dev</span>
          </p>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
