"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { useRouter, usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";

const navLinks = [
  { name: "Collections", href: "/products" },
  { name: "Our Story", href: "/pages/about" },
  { name: "Inquiry?", href: "https://wa.me/917278304949?text=Ask%20any%20inquiry%20you%20have.%20We%20will%20respond%20to%20you%20within%20one%20hour." },
];



export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const isHomePage = pathname === "/";
  const showTransparentHeader = isHomePage && !isScrolled && !isOpen;



  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hide Navbar on Admin pages
  if (pathname && pathname.startsWith("/admin")) return null;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-500",
        !showTransparentHeader
          ? "bg-ivory/95 backdrop-blur-md border-b border-obsidian/5 py-2"
          : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Mobile Menu Button (Left) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "md:hidden p-1 focus:outline-none z-[120]",
            !showTransparentHeader ? "text-obsidian" : "text-ivory"
          )}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Logo (Center on Mobile, Left on Desktop) */}
        <Link
          href="/"
          className="flex items-center gap-2 md:gap-3 absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 z-[110]"
        >
          <Image
            src="/logo.svg"
            alt="Desi Elegance"
            height={40}
            width={40}
            className={cn("object-contain transition-all duration-300", !showTransparentHeader ? "" : "invert")}
          />
          <span className={cn(
            "font-serif text-xl md:text-2xl font-medium tracking-tight whitespace-nowrap transition-colors duration-300",
            !showTransparentHeader ? "text-obsidian" : "text-ivory"
          )}>
            Desi Elegance
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "text-sm font-medium uppercase tracking-[0.2em] transition-colors hover:text-copper",
                !showTransparentHeader ? "text-obsidian/80" : "text-ivory/80"
              )}
            >
              {link.name}
            </Link>
          ))}
          <Button variant="primary" size="sm" onClick={() => router.push('/products')}>
            Shop Now
          </Button>
        </nav>

        {/* Cart Icon (Right) */}
        <div className="flex items-center gap-4 z-[110]">
          <Link href="/cart">
            <button className={cn(
              "hover:text-copper transition-colors relative",
              !showTransparentHeader ? "text-obsidian" : "text-ivory"
            )}>
              <ShoppingBag size={22} />
              <CartCountBadge />
            </button>
          </Link>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, clipPath: "circle(0% at 100% 0)" }}
              animate={{ opacity: 1, clipPath: "circle(150% at 100% 0)" }}
              exit={{ opacity: 0, clipPath: "circle(0% at 100% 0)" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-0 bg-ivory z-[100] flex flex-col items-center justify-center space-y-8 md:hidden h-dvh w-screen"
            >
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.8 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="font-serif text-4xl text-obsidian font-light hover:text-copper transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => setIsOpen(false)}
                  className="mt-8"
                  onClickCapture={() => router.push('/products')}
                >
                  Shop Full Collection
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

function CartCountBadge() {
  const { getCartCount } = useCart();
  const count = getCartCount();

  if (count === 0) return null;

  return (
    <span className="absolute -top-1 -right-1 bg-copper text-ivory text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full animate-in zoom-in duration-300">
      {count}
    </span>
  );
}
