# Desi Elegance

**A Premium E-Commerce Experience for Indian Ethnic Wear.**

Desi Elegance is a minimalist, mobile-first e-commerce platform built with Next.js 15, designed to offer a seamless and aesthetic shopping experience for premium clothing. It emphasizes visual storytelling, frictionless navigation, and a direct-to-WhatsApp checkout flow.

## ✨ Key Features

*   **🎨 Premium Aesthetic**: Custom design system using Ivory, Obsidian, and Copper tones for a sophisticated look.
*   **📱 Mobile-First Experience**: Optimized for touch interactions with smooth scrolling and tactile feedback.
*   **🛍️ Frictionless Shopping**: Guest checkout system—no account creation required.
*   **💬 WhatsApp Integration**: Direct order placement via WhatsApp with pre-formatted order details.
*   **🔒 Secure Admin Dashboard**: 
    *   Password-protected admin area with specialized Session Hashing security.
    *   Instant kill-switch for compromised sessions.
    *   Product and Coupon management.
*   **⚡ High Performance**: Built on Next.js 15 App Router with Framer Motion animations.

## 🛠️ Tech Stack

*   **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
*   **Language**: TypeScript
*   **Styling**: Tailwind CSS (Custom Theme)
*   **Database**: MongoDB
*   **Animations**: Framer Motion
*   **Icons**: Lucide React

## 🚀 Getting Started

### Prerequisites

*   Node.js 18+ installed
*   MongoDB Atlas account (or local instance)
*   Cloudinary account

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database
MONGODB_URL=your_mongodb_connection_string

# Cloudinary (Image Optimization)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name

# Email Service (Newsletter)
EMAIL_ID=your_email@example.com
EMAIL_PASSWORD=your_app_specific_password

# Admin Security
ADMIN_PASSWORD=your_secure_master_password
```

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/yourusername/desi-elegance.git
    cd desi-elegance
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Run the development server:
    ```bash
    npm run dev
    ```

4.  Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📂 Project Structure

```
src/
├── app/               # Next.js App Router pages and API routes
├── components/        # Reusable UI components
│   ├── cart/          # Cart and Checkout components
│   ├── landing/       # Homepage sections (Hero, Story, etc.)
│   ├── layout/        # Header, Footer
│   ├── products/      # Product cards and lists
│   └── ui/            # Generic UI elements (Button, Input)
├── context/           # React Context (CartContext)
├── lib/               # Utilities, Database connection, Auth helpers
├── models/            # Mongoose models (Product, Coupon)
└── services/          # Business logic (ProductService)
```

## 🛡️ Security Note

The Admin Panel is protected by a custom **Session Hashing** mechanism. 
- Sessions are valid for 7 days by default.
- Changing the `ADMIN_PASSWORD` in `.env` immediately invalidates all active sessions, providing a security "kill switch".

---

Built with ❤️ by Desi Elegance Team
