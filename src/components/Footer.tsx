import { ReactNode } from "react";
import Image from "next/image";
import { TransitionLink } from "./TransitionLink";

export const Footer = () => {
  return (
    <footer 
      aria-labelledby="footer-heading" 
      className="footer bg-black py-16 text-white"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3 lg:gap-16">
          <NavGroup title="Shop">
            <NavLink href="/fragrance/terra">Terra</NavLink>
            <NavLink href="/fragrance/igni">Igni</NavLink>
            <NavLink href="/fragrance/aqua">Aqua</NavLink>
          </NavGroup>

          <NavGroup title="About">
            <NavLink href="/about/science">Science</NavLink>
            <NavLink href="/about/story">Our Story</NavLink>
            <NavLink href="/about">Côte Royale</NavLink>
          </NavGroup>

          <NavGroup title="Social">
            <NavLink 
              href="https://instagram.com/coteroyale" 
              external
              aria-label="Follow us on Instagram"
            >
              Instagram
            </NavLink>
            <NavLink 
              href="https://twitter.com/coteroyale" 
              external
              aria-label="Follow us on X (Twitter)"
            >
              X (Twitter)
            </NavLink>
            <NavLink 
              href="https://facebook.com/coteroyale" 
              external
              aria-label="Follow us on Facebook"
            >
              Facebook
            </NavLink>
          </NavGroup>
        </div>

        {/* Bottom footer */}
        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-neutral-800 pt-8 md:flex-row">
          <p className="text-center text-sm text-gray-400">
            © {new Date().getFullYear()} Côte Royale Inc. All rights reserved
          </p>
          
          <TransitionLink
            href="/"
            aria-label="Côte Royale Home"
            className="order-first transition-opacity duration-300 hover:opacity-80 md:order-none"
          >
            <Image 
              src="/logo.svg" 
              alt="CÔTE ROYALE" 
              width={150} 
              height={25}
              className="h-auto w-auto"
              priority={false}
            />
          </TransitionLink>
          
          <nav aria-label="Legal">
            <ul className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
              <li>
                <TransitionLink 
                  href="/legal/terms" 
                  className="transition-colors duration-300 hover:text-white focus:text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black"
                >
                  Terms &amp; Conditions
                </TransitionLink>
              </li>
              <li>
                <TransitionLink 
                  href="/legal/privacy" 
                  className="transition-colors duration-300 hover:text-white focus:text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black"
                >
                  Privacy Policy
                </TransitionLink>
              </li>
              <li>
                <TransitionLink 
                  href="/legal/cookies" 
                  className="transition-colors duration-300 hover:text-white focus:text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black"
                >
                  Cookie Policy
                </TransitionLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
};

type NavGroupProps = {
  title: string;
  children?: ReactNode;
};

const NavGroup = ({ title, children }: NavGroupProps) => (
  <nav aria-labelledby={`${title.toLowerCase()}-heading`}>
    <h3
      id={`${title.toLowerCase()}-heading`}
      className="mb-6 text-xl font-medium text-white"
    >
      {title}
    </h3>
    <ul className="space-y-4" role="list">
      {children}
    </ul>
  </nav>
);

type NavLinkProps = {
  href: string;
  children: ReactNode;
  external?: boolean;
  "aria-label"?: string;
};

const NavLink = ({ href, children, external = false, ...props }: NavLinkProps) => {
  const linkProps = external 
    ? {
        target: "_blank",
        rel: "noopener noreferrer",
      }
    : {};

  return (
    <li>
      <TransitionLink 
        href={href} 
        className="text-gray-300 transition-colors duration-300 hover:text-white focus:text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black"
        {...linkProps}
        {...props}
      >
        {children}
      </TransitionLink>
    </li>
  );
};
