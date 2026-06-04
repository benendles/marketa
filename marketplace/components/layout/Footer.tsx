import Link from "next/link";
import BackToTop from "./BackToTop";

const FOOTER_COLS = [
  {
    title: "Get to know us",
    links: [
      { label: "About Marketa", href: "/" },
      { label: "Careers", href: "/" },
      { label: "Press releases", href: "/" },
      { label: "Blog", href: "/" },
    ],
  },
  {
    title: "Make money with us",
    links: [
      { label: "Sell on Marketa", href: "/listings/create" },
      { label: "Become an affiliate", href: "/" },
      { label: "Advertise your products", href: "/" },
      { label: "Marketa for business", href: "/" },
    ],
  },
  {
    title: "Payment & protection",
    links: [
      { label: "Stripe payments", href: "/" },
      { label: "Buyer protection", href: "/" },
      { label: "Secure checkout", href: "/" },
      { label: "Shop with confidence", href: "/" },
    ],
  },
  {
    title: "Let us help you",
    links: [
      { label: "Your account", href: "/dashboard" },
      { label: "Your orders & bookings", href: "/dashboard/bookings" },
      { label: "Help centre", href: "/" },
      { label: "Contact us", href: "/" },
    ],
  },
];

export default function Footer() {
  return (
    <footer>
      <BackToTop />

      {/* Main footer */}
      <div className="bg-[#131921] text-[#DDDDDD]">
        <div className="max-w-375 mx-auto px-6 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {FOOTER_COLS.map((col) => (
              <div key={col.title}>
                <h3 className="text-white font-bold text-sm mb-3">{col.title}</h3>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-[#DDDDDD] hover:text-white transition"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-[#0F1111] text-[#999] text-xs">
        <div className="max-w-375 mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-1">
            <span className="text-white font-black text-base tracking-tight">marketa</span>
            <span className="text-[#FF9900] font-black text-base">.com</span>
          </div>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
            <Link href="/" className="hover:text-white transition">Conditions of use</Link>
            <Link href="/" className="hover:text-white transition">Privacy notice</Link>
            <Link href="/" className="hover:text-white transition">Interest-based ads</Link>
          </div>
          <p>&copy; {new Date().getFullYear()} Marketa, Inc.</p>
        </div>
      </div>
    </footer>
  );
}
