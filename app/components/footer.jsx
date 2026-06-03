// @flow strict
import Link from 'next/link';
import { BsGithub, BsLinkedin } from 'react-icons/bs';
import { FaFacebook } from 'react-icons/fa';

function Footer() {
  return (
    <div className="relative border-t bg-[#050b18] border-[#1a3a5c] text-white">
      <div className="mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] py-8 lg:py-10">
        <div className="flex justify-center mb-6">
          <div className="absolute top-0 h-[1px] w-1/2 bg-gradient-to-r from-transparent via-[#00d4ff] to-transparent opacity-40"></div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col items-center md:items-start gap-1">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-[#00d4ff] to-[#f97316] text-white font-bold text-xs">
                FH
              </span>
              <span className="text-white font-semibold tracking-wide">
                Faycal<span className="text-[#00d4ff]">.</span>dev
              </span>
            </Link>
            <p className="text-xs text-gray-500 mt-1">
              © {new Date().getFullYear()} Faycal Habib Ahmat Al Bachar. All rights reserved.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Link
              target="_blank"
              href="https://github.com/faycalhabibahmatalbachar"
              className="text-gray-400 hover:text-[#00d4ff] transition-colors duration-300"
              aria-label="GitHub"
            >
              <BsGithub size={20} />
            </Link>
            <Link
              target="_blank"
              href="https://www.linkedin.com/in/faycalhabibahmat/"
              className="text-gray-400 hover:text-[#00d4ff] transition-colors duration-300"
              aria-label="LinkedIn"
            >
              <BsLinkedin size={20} />
            </Link>
            <Link
              target="_blank"
              href="https://www.facebook.com/faycalhabibahmat"
              className="text-gray-400 hover:text-[#00d4ff] transition-colors duration-300"
              aria-label="Facebook"
            >
              <FaFacebook size={20} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
