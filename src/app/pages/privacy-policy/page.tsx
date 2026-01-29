import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy | Desi Elegance",
    description: "Privacy Policy for Desi Elegance - How we collect, use, and protect your information.",
};

export default function PrivacyPolicy() {
    return (
        <main className="min-h-screen pt-24 pb-16 bg-ivory text-obsidian">
            <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
                <h1 className="text-3xl md:text-4xl font-serif text-center uppercase tracking-wider mb-12 text-obsidian">
                    Privacy Policy
                </h1>

                <div className="space-y-8 font-light leading-relaxed text-obsidian/90 border border-obsidian/10 p-6 md:p-10 bg-white shadow-sm">
                    <p className="text-sm md:text-base">
                        At Desi Elegance, we respect your privacy and are committed to
                        protecting the information you share with us while using{" "}
                        <span className="font-medium">www.desielegance.in</span>
                    </p>

                    <section className="space-y-4">
                        <h2 className="text-lg md:text-xl font-medium uppercase tracking-wide border-b border-obsidian/10 pb-2">
                            Information We Collect
                        </h2>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>
                                We collect only basic details such as your name, address, phone
                                number, and email only when you place an order.
                            </li>
                            <li>
                                We do not store any login credentials or passwords, as users are
                                not required to create accounts to browse or shop.
                            </li>
                            <li>
                                Payment details are processed securely through third-party payment
                                gateways. We do not store or retain any card or payment
                                information.
                            </li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-lg md:text-xl font-medium uppercase tracking-wide border-b border-obsidian/10 pb-2">
                            Use of Information
                        </h2>
                        <p>Your information is used solely for:</p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Order processing and delivery</li>
                            <li>Customer support and order-related communication</li>
                        </ul>
                        <p className="mt-2">
                            We do not sell, rent, or misuse your personal data.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-lg md:text-xl font-medium uppercase tracking-wide border-b border-obsidian/10 pb-2">
                            Cookies
                        </h2>
                        <p>
                            We may use basic cookies to improve website performance and user
                            experience. Cookies do not store any personal or payment
                            information.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-lg md:text-xl font-medium uppercase tracking-wide border-b border-obsidian/10 pb-2">
                            Email Communication & Unsubscribe
                        </h2>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>
                                You may receive order-related or promotional emails from us.
                            </li>
                            <li>
                                To unsubscribe, simply reply to the email from which you
                                received the subscription or welcome message, and we will remove
                                you from our mailing list.
                            </li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-lg md:text-xl font-medium uppercase tracking-wide border-b border-obsidian/10 pb-2">
                            Data Security
                        </h2>
                        <p>
                            We use standard security measures and SSL encryption to protect
                            your information during transmission.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-lg md:text-xl font-medium uppercase tracking-wide border-b border-obsidian/10 pb-2">
                            Changes to This Policy
                        </h2>
                        <p>
                            Desi Elegance reserves the right to update this Privacy Policy at
                            any time. Continued use of the Site implies acceptance of the
                            revised policy.
                        </p>
                    </section>

                    <div className="pt-6 border-t border-obsidian/10">
                        <p className="italic text-obsidian/70">
                            If you do not agree with this Privacy Policy, please do not use our
                            website.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
