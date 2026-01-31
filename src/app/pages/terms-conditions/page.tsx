import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms & Conditions | Desi Elegance",
    description: "Terms and conditions for using Desi Elegance website and purchasing products",
};

export default function TermsAndConditions() {
    return (
        <main className="min-h-screen pt-24 pb-16 bg-ivory text-obsidian">
            <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
                <h1 className="text-3xl md:text-4xl font-serif text-center uppercase tracking-wider mb-12 text-obsidian">
                    Terms & Conditions
                </h1>

                <div className="space-y-8 font-light leading-relaxed text-obsidian/90 border border-obsidian/10 p-6 md:p-10 bg-white shadow-sm">
                    <p className="text-sm md:text-base">
                        Welcome to Desi Elegance. These Terms & Conditions govern your use of{" "}
                        <span className="font-medium">www.desielegance.in</span> ("Site")
                        and the purchase of products from us. By accessing or using this
                        Site, you agree to be bound by these Terms and our Privacy Policy.
                    </p>

                    <section className="space-y-4">
                        <h2 className="text-lg md:text-xl font-medium uppercase tracking-wide border-b border-obsidian/10 pb-2">
                            1. About Us
                        </h2>
                        <p>
                            Desi Elegance is an Indian brand engaged in the design and sale of
                            clothing only, through its official website{" "}
                            <span className="font-medium">www.desielegance.in</span>.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-lg md:text-xl font-medium uppercase tracking-wide border-b border-obsidian/10 pb-2">
                            2. Acceptance of Terms
                        </h2>
                        <p>
                            By browsing, registering, or placing an order on the Site, you
                            confirm that you have read, understood, and agreed to these Terms
                            & Conditions. If you do not agree, you must not use the Site.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-lg md:text-xl font-medium uppercase tracking-wide border-b border-obsidian/10 pb-2">
                            3. Products & Pricing
                        </h2>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>
                                All products listed are owned, designed, and sold by Desi
                                Elegance.
                            </li>
                            <li>Prices are subject to change without prior notice.</li>
                            <li>
                                In case of pricing or typographical errors, we reserve the right
                                to cancel the order and refund any amount paid.
                            </li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-lg md:text-xl font-medium uppercase tracking-wide border-b border-obsidian/10 pb-2">
                            4. Orders & Payments
                        </h2>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>No account creation is required to place an order. We only collect necessary delivery details to process your request.</li>
                            <li>
                                We reserve the right to accept or reject any order at our
                                discretion.
                            </li>
                            <li>Payments may be processed before dispatch.</li>
                        </ul>
                        <div className="mt-4 bg-sand/10 p-4 rounded-sm">
                            <h3 className="font-medium text-copper mb-2 uppercase text-sm tracking-wider">
                                Cash on Delivery (COD)
                            </h3>
                            <ul className="list-disc pl-5 space-y-1 text-sm">
                                <li>COD is available across selected pin codes in India.</li>
                                <li>
                                    <strong className="text-obsidian">
                                        40% of the total cart value must be prepaid
                                    </strong>{" "}
                                    at the time of order placement.
                                </li>
                                <li>The remaining amount is payable on delivery.</li>
                            </ul>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-lg md:text-xl font-medium uppercase tracking-wide border-b border-obsidian/10 pb-2">
                            5. Cancellation Policy
                        </h2>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>
                                Order cancellations are allowed within{" "}
                                <span className="font-medium">12 hours</span> of placing the
                                order.
                            </li>
                            <li>
                                Orders already processed or dispatched cannot be cancelled.
                            </li>
                            <li>
                                The decision of Desi Elegance regarding order processing status
                                shall be final.
                            </li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-lg md:text-xl font-medium uppercase tracking-wide border-b border-obsidian/10 pb-2">
                            6. Returns & Exchanges
                        </h2>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>
                                <span className="font-medium">
                                    No returns are accepted after delivery.
                                </span>
                            </li>
                            <li>
                                Customers are requested to thoroughly inspect the product at the
                                time of delivery and may refuse acceptance if any visible defect
                                is found.
                            </li>
                            <li>
                                Exchanges are allowed only in rare cases and strictly at the
                                discretion of Desi Elegance, after approval via WhatsApp
                                communication.
                            </li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-lg md:text-xl font-medium uppercase tracking-wide border-b border-obsidian/10 pb-2">
                            7. Shipping
                        </h2>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>
                                We strive to deliver orders within the estimated timelines;
                                however, delays may occur due to factors beyond our control.
                            </li>
                            <li>
                                In case an order cannot be fulfilled, any prepaid amount will be
                                refunded.
                            </li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-lg md:text-xl font-medium uppercase tracking-wide border-b border-obsidian/10 pb-2">
                            8. User Account & Security
                        </h2>
                        <p>
                            You are responsible for maintaining the confidentiality of your
                            account credentials. Desi Elegance shall not be liable for any
                            loss arising from unauthorized use of your account.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-lg md:text-xl font-medium uppercase tracking-wide border-b border-obsidian/10 pb-2">
                            9. Electronic Communication
                        </h2>
                        <p>
                            By using our Site, you consent to receive transactional,
                            administrative, and promotional communications via email or SMS.
                            You may unsubscribe from promotional communications at any time.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-lg md:text-xl font-medium uppercase tracking-wide border-b border-obsidian/10 pb-2">
                            10. Intellectual Property
                        </h2>
                        <p>
                            All content on the Site, including designs, images, logos, text,
                            and trademarks, is the exclusive property of Desi Elegance and is
                            protected under applicable intellectual property laws.
                            Unauthorized use is strictly prohibited.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-lg md:text-xl font-medium uppercase tracking-wide border-b border-obsidian/10 pb-2">
                            11. Disclaimer & Limitation of Liability
                        </h2>
                        <p>
                            All products and services are provided on an “as is” basis. Desi
                            Elegance shall not be liable for any indirect, incidental, or
                            consequential damages arising from the use of the Site or products
                            purchased.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-lg md:text-xl font-medium uppercase tracking-wide border-b border-obsidian/10 pb-2">
                            12. Amendments
                        </h2>
                        <p>
                            Desi Elegance reserves the right to modify these Terms &
                            Conditions at any time. Continued use of the Site constitutes
                            acceptance of the updated Terms.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-lg md:text-xl font-medium uppercase tracking-wide border-b border-obsidian/10 pb-2">
                            13. Governing Law
                        </h2>
                        <p>
                            These Terms & Conditions shall be governed by and interpreted in
                            accordance with the laws of India, and courts in India shall have
                            exclusive jurisdiction.
                        </p>
                    </section>
                </div>
            </div>
        </main>
    );
}
