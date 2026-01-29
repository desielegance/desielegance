"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Twitter, Youtube, PhoneCall, Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const toasterRef = useRef<any>(null);

  useEffect(() => {
    import('toaster-ui').then((mod) => {
      const ToasterUi = mod.default;
      toasterRef.current = new ToasterUi();
    });
  }, []);

  const handleSubscribe = async () => {
    if (!email || !email.includes("@")) {
      toasterRef.current?.addToast("Please enter a valid email address.", "error");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        if (data.message === "Already subscribed") {
          toasterRef.current?.addToast("You are already a member of our newsletter.", "warning");
        } else {
          toasterRef.current?.addToast("Subscription successful. Please check your email.", "success");
        }
        setEmail("");
      } else {
        toasterRef.current?.addToast(data.error || "Something went wrong.", "error");
      }
    } catch (error) {
      console.error(error);
      toasterRef.current?.addToast("Failed to subscribe. Please try again after some time.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-obsidian text-ivory py-20 border-t border-white/10 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20">
          {/* Brand Column & Socials */}
          <div className="md:col-span-4 space-y-8">
            <Link href="/" className="block relative h-20 w-48">
              <Image
                src="/logo.svg"
                alt="Desi Elegance"
                fill
                className="object-contain object-left invert" // Invert to make black logo white
              />
            </Link>

            <div className="space-y-4">
              <h3 className="font-serif text-lg uppercase tracking-[0.2em] text-ivory/40">Follow Us</h3>
              <div className="flex space-x-6">
                <Link href="https://www.instagram.com/desi_elegance03?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" className="hover:text-copper transition-colors opacity-80 hover:opacity-100"><Instagram size={24} /></Link>
                <Link href="https://www.instagram.com/desi_elegance03?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" className="hover:text-copper transition-colors opacity-80 hover:opacity-100"><Facebook size={24} /></Link>
                <Link href="https://www.instagram.com/desi_elegance03?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" className="hover:text-copper transition-colors opacity-80 hover:opacity-100"><Twitter size={24} /></Link>
                <Link href="https://www.instagram.com/desi_elegance03?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" className="hover:text-copper transition-colors opacity-80 hover:opacity-100"><Youtube size={24} /></Link>
              </div>
            </div>
          </div>

          {/* Contact Us */}
          <div className="md:col-span-4 space-y-6">
            <h3 className="font-serif text-lg uppercase tracking-[0.2em] text-ivory/40">Contact Us</h3>
            <div className="space-y-4 text-ivory/80 font-light text-lg">
              <div className="flex items-center gap-3">
                <PhoneCall size={20} className="text-ivory/60" />
                <p>+91 9874112489</p>
              </div>
              <div className="flex items-center gap-3">
                <PhoneCall size={20} className="text-ivory/60" />
                <p>+91 7439505161</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={20} className="text-ivory/60" />
                <p>desielegance79@gmail.com</p>
              </div>
              <p className="uppercase text-sm tracking-wider opacity-70 pt-2 block">Monday To Sunday 10 Am To 5 Pm</p>
            </div>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-4 space-y-6">
            <h3 className="font-serif text-lg uppercase tracking-[0.2em] text-ivory/40">The Inner Circle</h3>
            <p className="text-ivory/60 text-sm font-light">
              Join our newsletter for exclusive drops and early access.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="bg-white/5 border border-white/10 text-ivory px-4 py-3 w-full focus:outline-none focus:border-copper transition-colors placeholder:text-ivory/20"
                onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
              />
              <Button
                onClick={handleSubscribe}
                disabled={loading}
                variant="primary"
                size="icon"
                className="shrink-0 aspect-square"
              >
                {loading ? "..." : "OK"}
              </Button>
            </div>
          </div>
        </div>

        {/* Big Brand Value */}
        <div className="mt-24 mb-12 select-none">
          <h1 className="text-[12vw] leading-none font-serif font-bold text-center text-white/5 tracking-tighter w-full">
            DESI ELEGANCE
          </h1>
        </div>

        <div className="pt-8 border-t border-white/5 text-center md:text-left flex flex-col md:flex-row justify-between text-sm text-ivory/30 font-light">
          <p>&copy; 2026 Desi Elegance. All rights reserved.</p>
          <div className="space-x-6 mt-4 md:mt-0">
            <Link href="/pages/privacy-policy" className="hover:text-cream">Privacy Policy</Link>
            <Link href="/pages/terms-conditions" className="hover:text-cream">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
