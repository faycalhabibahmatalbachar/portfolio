// @flow strict
import { personalData } from '@/utils/data/personal-data';
import Link from 'next/link';
import { BiLogoLinkedin } from "react-icons/bi";
import { CiLocationOn } from "react-icons/ci";
import { FaFacebook } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoGithub, IoMdCall } from "react-icons/io";
import { MdAlternateEmail } from "react-icons/md";
import ContactForm from './contact-form';

function ContactSection() {
  return (
    <div id="contact" className="my-12 lg:my-16 relative mt-24 text-white">
      <div className="hidden lg:flex flex-col items-center absolute top-24 -right-8">
        <span className="bg-[#0c1a2e] border border-[#1a3a5c] w-fit text-[#00d4ff] rotate-90 p-2 px-5 text-sm font-medium rounded-md tracking-widest uppercase">
          Contact
        </span>
        <span className="h-36 w-[1px] bg-gradient-to-b from-[#1a3a5c] to-transparent"></span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        <ContactForm />

        <div className="lg:w-3/4">
          <div className="flex flex-col gap-5">
            <p className="text-sm md:text-base flex items-center gap-4">
              <MdAlternateEmail
                className="bg-[#0c1a2e] border border-[#1a3a5c] p-2 rounded-xl hover:border-[#00d4ff] hover:scale-110 transition-all duration-300 text-[#00d4ff] cursor-pointer flex-shrink-0"
                size={36}
              />
              <span className="text-gray-300">{personalData.email}</span>
            </p>

            <p className="text-sm md:text-base flex items-center gap-4">
              <IoMdCall
                className="bg-[#0c1a2e] border border-[#1a3a5c] p-2 rounded-xl hover:border-[#00d4ff] hover:scale-110 transition-all duration-300 text-[#00d4ff] cursor-pointer flex-shrink-0"
                size={36}
              />
              <span className="text-gray-300">{personalData.phone}</span>
            </p>

            <p className="text-sm md:text-base flex items-center gap-4">
              <CiLocationOn
                className="bg-[#0c1a2e] border border-[#1a3a5c] p-2 rounded-xl hover:border-[#00d4ff] hover:scale-110 transition-all duration-300 text-[#00d4ff] cursor-pointer flex-shrink-0"
                size={36}
              />
              <span className="text-gray-300">{personalData.address}</span>
            </p>
          </div>

          <div className="mt-8 lg:mt-12 flex items-center gap-4 flex-wrap">
            <Link target="_blank" href={personalData.github} aria-label="GitHub">
              <IoLogoGithub
                className="bg-[#0c1a2e] border border-[#1a3a5c] p-3 rounded-xl hover:border-[#00d4ff] hover:text-[#00d4ff] hover:scale-110 transition-all duration-300 text-gray-300 cursor-pointer"
                size={44}
              />
            </Link>
            <Link target="_blank" href={personalData.linkedIn} aria-label="LinkedIn">
              <BiLogoLinkedin
                className="bg-[#0c1a2e] border border-[#1a3a5c] p-3 rounded-xl hover:border-[#00d4ff] hover:text-[#00d4ff] hover:scale-110 transition-all duration-300 text-gray-300 cursor-pointer"
                size={44}
              />
            </Link>
            <Link target="_blank" href={personalData.twitter} aria-label="X / Twitter">
              <FaXTwitter
                className="bg-[#0c1a2e] border border-[#1a3a5c] p-3 rounded-xl hover:border-[#00d4ff] hover:text-[#00d4ff] hover:scale-110 transition-all duration-300 text-gray-300 cursor-pointer"
                size={44}
              />
            </Link>
            <Link target="_blank" href={personalData.facebook} aria-label="Facebook">
              <FaFacebook
                className="bg-[#0c1a2e] border border-[#1a3a5c] p-3 rounded-xl hover:border-[#00d4ff] hover:text-[#00d4ff] hover:scale-110 transition-all duration-300 text-gray-300 cursor-pointer"
                size={44}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactSection;
