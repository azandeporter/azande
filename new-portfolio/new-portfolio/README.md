# Azande Porter - Modern Portfolio Website

A modern, exceptional personal website built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

## 🚀 Features

### Exceptional Design & User Experience
- **Interactive Hero Section** with animated typewriter effect, particle system, and parallax animations
- **Responsive Navigation** with smooth transitions and mobile-friendly hamburger menu
- **Animated Skills Showcase** with 3D card effects and hover interactions
- **Interactive Timeline** for professional experience with scroll-triggered animations
- **Micro-animations** throughout the site for polished user interactions
- **Custom scrollbar** and scroll progress indicator

### Modern Tech Stack
- **Next.js 15** with App Router and Turbopack
- **TypeScript** for type safety and better DX
- **Tailwind CSS v4** with custom design system
- **Framer Motion** for smooth animations and interactions
- **Shadcn/ui** components for consistent UI elements
- **Lucide React** for modern icons

### Performance & SEO
- **Optimized images** with Next.js Image component
- **SEO-friendly** meta tags and structured data
- **Fast build times** with Turbopack
- **Production-ready** with static generation
- **Accessible** design with proper ARIA labels

## 🎨 Design System

### Color Palette
- **Background**: Deep black (`#0a0a0a`) for elegant backdrop
- **Gold**: Premium gold accent (`oklch(0.76 0.17 85.87)`) for highlights
- **White**: Pure white text for maximum contrast
- **Grays**: Various shades for subtle UI elements

### Typography
- **Inter**: Clean, modern sans-serif for body text
- **JetBrains Mono**: Monospace font for code elements

## 🛠️ Development

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```

3. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles and design system
│   ├── layout.tsx         # Root layout with metadata
│   └── page.tsx           # Main page component
├── components/            # React components
│   ├── ui/               # Shadcn/ui components
│   ├── navigation.tsx    # Header navigation
│   ├── hero-section.tsx  # Interactive hero
│   ├── skills-section.tsx # Skills showcase
│   ├── experience-section.tsx # Timeline
│   ├── footer.tsx        # Footer
│   └── scroll-progress.tsx # Progress indicator
└── hooks/                # Custom React hooks
    └── use-active-section.ts # Section tracking
```

## 🎯 Key Components

### Hero Section
- Animated typewriter effect with multiple text rotations
- Interactive particle system responding to mouse movement
- Parallax 3D effects on profile image
- Call-to-action buttons with magnetic hover effects

### Skills Section  
- Interactive 3D card transformations
- Hover effects with particle animations
- Progressive skill reveal on scroll
- Technology tags with smooth transitions

### Experience Timeline
- Animated vertical timeline with scroll triggers
- Expandable experience cards
- Achievement lists with staggered animations
- Current role highlighting

### Navigation
- Sticky header with backdrop blur
- Active section highlighting
- Smooth scroll navigation
- Mobile-responsive with slide-out menu

## 🚀 Deployment

The project is optimized for deployment on Vercel. Your existing CNAME and domain setup will work seamlessly.

### Vercel Deployment
1. Connect your repository to Vercel
2. Vercel will automatically detect Next.js and deploy
3. Your site will be live with automatic deployments on push

---

Built with ❤️ by Azande Porter
