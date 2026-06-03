import Link from "next/link";

const footerLinks = {
  Company: [
    { href: "/about", label: "About Us" },
    { href: "/careers", label: "Careers" },
    { href: "/blog", label: "Blog" },
    { href: "/press", label: "Press" },
  ],
  Marketplace: [
    { href: "/marketplace", label: "Browse Listings" },
    { href: "/listings/create", label: "Sell Something" },
    { href: "/marketplace", label: "Categories" },
    { href: "/marketplace?featured=true", label: "Featured" },
  ],
  Support: [
    { href: "/help", label: "Help Center" },
    { href: "/safety", label: "Safety Tips" },
    { href: "/contact", label: "Contact Us" },
    { href: "/report", label: "Report Issue" },
  ],
  Legal: [
    { href: "/terms", label: "Terms of Service" },
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/cookies", label: "Cookie Policy" },
    { href: "/accessibility", label: "Accessibility" },
  ],
};

const socialLinks = [
  { label: "X", href: "#" },
  { label: "f", href: "#" },
  { label: "in", href: "#" },
  { label: "yt", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-1.5 mb-4">
              <div className="w-7 h-7 rounded bg-indigo-600 flex items-center justify-center">
                <span className="text-white font-black text-xs">M</span>
              </div>
              <span className="font-bold text-lg text-white ml-0.5">arketa</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-5">
              Direct deals between real people. Secure payments, no middlemen.
            </p>
            <div className="flex gap-2">
              {socialLinks.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-indigo-600 hover:text-white transition text-xs font-bold"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-semibold text-white mb-3 text-sm">{title}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-slate-400 hover:text-white transition">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} Marketa, Inc. All rights reserved.
          </p>
          <p className="text-xs text-slate-500">Payments secured by Stripe</p>
        </div>
      </div>
    </footer>
  );
}
