# Portfolio Website - Frontend

A modern, responsive portfolio website built with React, Vite, and Tailwind CSS, featuring advanced animations and a full-stack architecture.

## 🚀 Features

- **Modern React Architecture**: Built with React 18 and Vite for fast development
- **Advanced Animations**: Smooth scrolling with Lenis, scroll-triggered animations with GSAP, and interactive animations with Framer Motion
- **Responsive Design**: Fully responsive across all devices using Tailwind CSS
- **Dark Mode**: Built-in dark mode support
- **Performance Optimized**: Code splitting, lazy loading, and optimized builds
- **Full-Stack Ready**: API integration ready for backend connectivity
- **Testing Suite**: Comprehensive testing with Vitest and React Testing Library

## 🛠️ Tech Stack

### Frontend

- **React 18** - Modern React with hooks and concurrent features
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Production-ready motion library
- **GSAP** - Professional-grade animation library
- **Lenis** - Smooth scrolling library
- **Axios** - HTTP client for API requests

### Development Tools

- **ESLint** - Code linting and formatting
- **Vitest** - Fast unit testing framework
- **React Testing Library** - Testing utilities for React components

## 📦 Installation

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

### Setup Steps

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd portfolio-frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Configuration**

   ```bash
   cp .env.example .env
   ```

   Update the `.env` file with your configuration:

   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   VITE_CONTACT_EMAIL=your-email@example.com
   VITE_CONTACT_PHONE=+880 1642728613
   ```

4. **Start Development Server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   The application will be available at `http://localhost:3000`

## 🏗️ Build for Production

```bash
# Build the application
npm run build
# or
yarn build

# Preview the production build
npm run preview
# or
yarn preview
```

## 🧪 Testing

```bash
# Run tests
npm run test
# or
yarn test

# Run tests with UI
npm run test:ui
# or
yarn test:ui
```

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── common/          # Reusable components
│   ├── sections/        # Page sections
│   └── ui/              # UI components
├── hooks/               # Custom React hooks
├── pages/               # Page components
├── services/            # API and external services
├── styles/              # Global styles and CSS
├── test/                # Test configuration
└── utils/               # Utility functions
```

## 🎨 Customization

### Colors and Theming

Update the color scheme in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: "#00C2FF",        // Main brand color
      "background-dark": "#050B14", // Dark background
      "surface-dark": "#0D1421",    // Dark surface
      // Add your custom colors
    }
  }
}
```

### Animation Configuration

Modify animation settings in `src/services/animations.js`:

```javascript
export const ANIMATION_CONFIG = {
  duration: {
    fast: 0.3,
    normal: 0.6,
    slow: 1.2,
  },
  easing: {
    easeOut: "power2.out",
    easeInOut: "power2.inOut",
  },
};
```

## 🔧 Configuration

### Environment Variables

- `VITE_API_BASE_URL` - Backend API base URL
- `VITE_CONTACT_EMAIL` - Contact email address
- `VITE_CONTACT_PHONE` - Contact phone number
- `VITE_GITHUB_URL` - GitHub profile URL
- `VITE_LINKEDIN_URL` - LinkedIn profile URL
- `VITE_TWITTER_URL` - Twitter profile URL

### API Integration

The application is configured to work with a backend API. Update the API endpoints in `src/services/api.js` to match your backend implementation.

## 📱 Responsive Breakpoints

The application uses Tailwind CSS breakpoints:

- `sm`: 640px and up
- `md`: 768px and up
- `lg`: 1024px and up
- `xl`: 1280px and up
- `2xl`: 1536px and up

## 🎯 Performance Features

- **Code Splitting**: Automatic code splitting for optimal bundle sizes
- **Lazy Loading**: Images and components loaded on demand
- **Tree Shaking**: Unused code eliminated in production builds
- **Asset Optimization**: Images and assets optimized for web delivery
- **Caching**: Proper caching headers for static assets

## 🚀 Deployment

### Build Optimization

The production build includes:

- Minified JavaScript and CSS
- Optimized images and assets
- Source maps for debugging
- Gzip compression ready

### Deployment Platforms

This application can be deployed to:

- **Vercel** - Recommended for React applications
- **Netlify** - Great for static site hosting
- **AWS S3 + CloudFront** - Scalable cloud hosting
- **GitHub Pages** - Free hosting for public repositories

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](../../issues) page for existing solutions
2. Create a new issue with detailed information
3. Contact: [your-email@example.com](mailto:your-email@example.com)

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - UI library
- [Vite](https://vitejs.dev/) - Build tool
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [GSAP](https://greensock.com/gsap/) - Animation platform
- [Lenis](https://github.com/studio-freight/lenis) - Smooth scroll library
