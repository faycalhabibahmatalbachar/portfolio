// @flow strict
import Link from "next/link";


function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-transparent pt-4">
      <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#0d1224]/75 px-4 py-3 shadow-[0_0_40px_rgba(139,92,246,0.15)] backdrop-blur-md md:px-6">
        <div className="flex flex-shrink-0 items-center">
          <Link
            href="/"
            className="text-[#16f2b3] text-2xl md:text-3xl font-bold tracking-wide">
            ABU SAID
          </Link>
        </div>

        <ul className="mt-4 flex h-screen max-h-0 w-full flex-col items-start text-sm opacity-0 md:mt-0 md:h-auto md:max-h-screen md:w-auto md:flex-row md:space-x-1 md:border-0 md:opacity-100" id="navbar-default">
          <li>
            <Link className="block rounded-lg px-3 py-2 no-underline outline-none hover:no-underline" href="/#about">
              <div className="text-sm text-white transition-colors duration-300 hover:text-pink-400">ABOUT</div>
            </Link>
          </li>
          <li>
            <Link className="block rounded-lg px-3 py-2 no-underline outline-none hover:no-underline" href="/#experience"><div className="text-sm text-white transition-colors duration-300 hover:text-pink-400">EXPERIENCE</div></Link>
          </li>
          <li>
            <Link className="block rounded-lg px-3 py-2 no-underline outline-none hover:no-underline" href="/#skills"><div className="text-sm text-white transition-colors duration-300 hover:text-pink-400">SKILLS</div></Link>
          </li>
          <li>
            <Link className="block rounded-lg px-3 py-2 no-underline outline-none hover:no-underline" href="/#education"><div className="text-sm text-white transition-colors duration-300 hover:text-pink-400">EDUCATION</div></Link>
          </li>
          <li>
            <Link className="block rounded-lg px-3 py-2 no-underline outline-none hover:no-underline" href="/blog"><div className="text-sm text-white transition-colors duration-300 hover:text-pink-400">BLOGS</div></Link>
          </li>
          <li>
            <Link className="block rounded-lg px-3 py-2 no-underline outline-none hover:no-underline" href="/#projects"><div className="text-sm text-white transition-colors duration-300 hover:text-pink-400">PROJECTS</div></Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
