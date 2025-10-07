# Project Charis

> **Grace in action — connecting nonprofits with the tools they deserve.**

Project Charis is a comprehensive platform designed to empower nonprofits by providing modern technology, advanced AI tools, and a community built on goodwill. We help organizations work smarter, connect deeper, and multiply their impact.

## 🌟 **Features**

### **Current Implementation**
- **Responsive Homepage** with hero section, mission statement, and product showcase
- **Interactive Problem/Solution Slider** with 6 key challenges nonprofits face
- **Stats Panorama** with animated count-ups and key statistics
- **How It Works** section with 3-step process explanation
- **Contact Form** with comprehensive questionnaire and email notifications
- **Waitlist Signup** for beta launch notifications
- **Mobile-First Design** with accessibility features

### **Future Products**
- **Website-as-a-Service** - Launch modern, optimized sites for nonprofits
- **Donation & CRM Integrations** - Manage donations and donors in one place
- **Volunteer Management Hub** - Track hours, match skills, schedule shifts
- **AI Assistant for Grant Writing** - Save hours on proposals and reports
- **Shared Vendor Marketplace** - Access discounted tools and services
- **Community Collaboration Tools** - Message, share documents, collaborate

## 🛠 **Tech Stack**

- **Framework**: Next.js 15.5.4 (App Router)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Forms**: React Hook Form + Zod validation
- **Email**: SendGrid
- **Language**: TypeScript
- **Package Manager**: npm

## 🚀 **Getting Started**

### **Prerequisites**
- Node.js 18+ 
- npm or yarn
- Git (for development)

### **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/project-charis.git
   cd project-charis
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your environment variables:
   ```env
   # SendGrid Configuration
   SENDGRID_API_KEY=your_sendgrid_api_key_here
   CONTACT_TO=contact@projectcharis.org
   CONTACT_FROM=noreply@projectcharis.org
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📧 **Email Setup**

### **SendGrid Configuration**
1. Create a SendGrid account at [sendgrid.com](https://sendgrid.com)
2. Generate an API key with "Mail Send: Full Access"
3. Verify your sender email address
4. Add your API key to `.env.local`

### **Domain Authentication (Recommended)**
For better email deliverability:
1. Set up domain authentication in SendGrid
2. Add SPF, DKIM, and DMARC records to your domain
3. Use custom domain emails (e.g., `noreply@projectcharis.org`)

See `EMAIL_DELIVERABILITY_GUIDE.md` for detailed instructions.

## 🎨 **Design System**

### **Color Palette**
- **Deep Navy**: `#223A5E` (headings, primary text)
- **Soft Gold**: `#E4C9A1` (buttons, accents)
- **Mist Blue**: `#718B9E` (secondary text)
- **Light Mist**: `#F3F6FB` / `#E8F0F6` (backgrounds)
- **Lines/Ripples**: `#D5E1EC` / `#E2EBF3` (borders, outlines)

### **Typography**
- **Headings**: Montserrat (font-heading)
- **Body Text**: Inter (font-body)

### **Visual Motifs**
- Subtle ripple rings and outlines
- Rounded corners and soft shadows
- Gradient backgrounds
- Smooth transitions and animations

## 📱 **Pages & Routes**

- **`/`** - Homepage with all sections
- **`/contact`** - Contact form with questionnaire
- **`/api/contact`** - Contact form submission endpoint
- **`/api/waitlist`** - Waitlist signup endpoint

## 🔧 **Development**

### **Available Scripts**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript checks

### **Project Structure**
```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── contact/           # Contact page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── ContactForm.tsx   # Contact form component
│   ├── Header.tsx        # Site header
│   ├── Hero.tsx          # Hero section
│   ├── HowItWorks.tsx    # How it works section
│   ├── ProblemSlider.tsx # Problem/solution slider
│   ├── ProjectCharisLogo.tsx # Logo component
│   ├── StatsPanorama.tsx # Stats section
│   └── Waitlist.tsx      # Waitlist signup
└── lib/                  # Utility functions
    ├── email/            # Email templates
    ├── rateLimit/        # Rate limiting
    └── validation/       # Form validation schemas
```

## 🚀 **Deployment**

### **Vercel (Recommended)**
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### **Other Platforms**
- **Netlify**: Connect GitHub repo, add build command `npm run build`
- **Railway**: Connect GitHub repo, add environment variables
- **DigitalOcean App Platform**: Connect GitHub repo, configure build settings

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 **Contact**

- **Email**: contact@projectcharis.org
- **Website**: [projectcharis.org](https://projectcharis.org)
- **GitHub**: [@yourusername/project-charis](https://github.com/yourusername/project-charis)

## 🙏 **Acknowledgments**

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Email service by [SendGrid](https://sendgrid.com/)

---

**Built with ❤️ for nonprofits making a difference.**