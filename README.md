<p align="center" width="100%">
    <img height="100" src="https://github.com/said7388/developer-portfolio/assets/77630868/c0064908-cd5f-4751-a77c-eba90a62b55c">
</p>

<h1 align="center">Developer Portfolio</h1>

<p align="center">
  <strong>A modern, responsive, and customizable portfolio template for developers and freelancers</strong>
</p>

<p align="center">
  <a href="#demo-movie_camera">Demo</a> •
  <a href="#features-sparkles">Features</a> •
  <a href="#installation-arrow_down">Installation</a> •
  <a href="#usage-joystick">Usage</a> •
  <a href="#deployment-rocket">Deployment</a> •
  <a href="#tutorials-wrench">Tutorials</a>
</p>

---

## Overview

Transform your online presence with this professional portfolio template! Built with **Next.js** and **Tailwind CSS**, this template offers a seamless way to showcase your skills, projects, and experience. Whether you're a developer, freelancer, or tech enthusiast, this portfolio is designed to be user-friendly and easily customizable to match your personal brand.

---

## Demo :movie_camera:

<p align="center">
  <img src="./public/image/screen.png" alt="Portfolio Screenshot" width="100%">
</p>

<p align="center">
  <a href="https://abusaid.netlify.app/" target="_blank">
    <strong>🚀 View Live Demo</strong>
  </a>
</p>

---

## Features :sparkles:

- ✅ **Modern Tech Stack**: Built with Next.js 14+ and Tailwind CSS
- ✅ **Fully Responsive**: Optimized for all devices and screen sizes
- ✅ **SEO Optimized**: Better visibility on search engines
- ✅ **Fast Performance**: Leverages Next.js for optimal loading speeds
- ✅ **Easy Customization**: Simple data-driven configuration
- ✅ **Contact Form**: Integrated email and Telegram notifications
- ✅ **Blog Integration**: Automatically fetch posts from dev.to
- ✅ **Dark Theme**: Beautiful gradient design with animations
- ✅ **Docker Support**: Easy containerized deployment
- ✅ **Google Analytics**: Track visitor insights with GTM support

---

## Sections :bookmark:

| Section           | Description                                         |
| ----------------- | --------------------------------------------------- |
| 🦸 **Hero**       | Eye-catching introduction with animated elements    |
| 👤 **About Me**   | Personal information and professional summary       |
| 💼 **Experience** | Work history and professional accomplishments       |
| 🛠️ **Skills**     | Technical skills with animated marquee display      |
| 🚀 **Projects**   | Showcase your best work with descriptions and links |
| 🎓 **Education**  | Academic background and certifications              |
| 📝 **Blog**       | Latest articles from dev.to (auto-fetched)          |
| 📧 **Contact**    | Get in touch form with email/Telegram integration   |

---

## Table of Contents :scroll:

- [Overview](#overview)
- [Demo](#demo-movie_camera)
- [Features](#features-sparkles)
- [Sections](#sections-bookmark)
- [Tech Stack](#tech-stack-computer)
- [Installation](#installation-arrow_down)
- [Getting Started](#getting-started-dart)
- [Usage](#usage-joystick)
- [Deployment](#deployment-rocket)
- [Tutorials](#tutorials-wrench)
  - [Gmail App Password Setup](#gmail-app-password-setup)
  - [Create a Telegram Bot](#create-a-telegram-bot)
  - [Fetching Blog from dev.to](#fetching-blog-from-devto)
- [Packages Used](#packages-used-package)
- [Contributing](#contributing-handshake)
- [License](#license-page_with_curl)
- [Support](#support-coffee)

---

## Tech Stack :computer:

| Technology       | Purpose                        |
| ---------------- | ------------------------------ |
| **Next.js**      | React framework for production |
| **React**        | UI component library           |
| **Tailwind CSS** | Utility-first CSS framework    |
| **SASS**         | CSS preprocessor               |
| **Lottie**       | Lightweight animations         |
| **Nodemailer**   | Email sending functionality    |
| **Axios**        | HTTP client for API requests   |
| **Docker**       | Containerization platform      |

---

## Installation :arrow_down:

### Prerequisites

Before you begin, ensure you have the following installed on your machine:

| Tool                   | Minimum Version | Download Link                               |
| ---------------------- | --------------- | ------------------------------------------- |
| **Node.js**            | v18.0.0+        | [Download](https://nodejs.org/en/download/) |
| **Git**                | Latest          | [Download](https://git-scm.com/downloads)   |
| **pnpm** (recommended) | Latest          | [Install](https://pnpm.io/installation)     |

#### Verify Installation

Check your installations with these commands:

```bash
node --version
git --version
pnpm --version  # or npm --version
```

---

## Getting Started :dart:

### 1️⃣ Fork and Clone the Repository

1. Click the **Fork** button at the top right of this page
2. Clone your forked repository:

```bash
git clone https://github.com/<YOUR_GITHUB_USERNAME>/developer-portfolio.git
cd developer-portfolio
```

### 2️⃣ Install Dependencies

Choose your preferred package manager:

```bash
# Using pnpm (recommended - faster and more efficient)
pnpm install

# Using npm
npm install

# Using yarn
yarn install
```

### 3️⃣ Set Up Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Then edit the `.env` file with your actual values (see [Usage](#usage-joystick) section for details).

### 4️⃣ Run the Development Server

```bash
pnpm dev
# or
npm run dev
# or
yarn dev
```

### 5️⃣ View Your Portfolio

Open [http://localhost:3000](http://localhost:3000) in your browser to see your portfolio in action! 🎉

---

### 🐳 Docker Deployment (Alternative)

#### Option 1: Using Docker Compose (Recommended)

The easiest way to run the application with Docker:

```bash
# Build and run in one command
docker-compose up --build

# Run in detached mode
docker-compose up -d --build

# Stop the container
docker-compose down
```

Access the application at [http://localhost:3000](http://localhost:3000)

#### Option 2: Using Docker Directly

**For Development:**

```bash
# Build the development image
docker build -t developer-portfolio:dev -f Dockerfile.dev .

# Run the container
docker run -p 3000:3000 --name portfolio-dev developer-portfolio:dev

# Stop and remove container
docker stop portfolio-dev && docker rm portfolio-dev
```

**For Production:**

```bash
# Build the production image
docker build -t developer-portfolio:prod -f Dockerfile.prod .

# Run the production container
docker run -p 3000:3000 --name portfolio-prod developer-portfolio:prod
```

---

## Usage :joystick:

### Environment Variables Configuration

Create a `.env` file in the root directory with the following variables:

```env
# Google Tag Manager (Optional - for analytics)
NEXT_PUBLIC_GTM=GTM-XXXXXXX

# Your deployed app URL
NEXT_PUBLIC_APP_URL=https://your-domain.com

# Telegram Bot Configuration (for contact form notifications)
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_CHAT_ID=your_chat_id_here

# Gmail Configuration (for contact form emails)
GMAIL_PASSKEY=your_gmail_app_password
EMAIL_ADDRESS=your_email@gmail.com
```

#### Variable Descriptions:

| Variable              | Required | Description                                  |
| --------------------- | -------- | -------------------------------------------- |
| `NEXT_PUBLIC_GTM`     | No       | Google Tag Manager ID for analytics tracking |
| `NEXT_PUBLIC_APP_URL` | Yes      | Your portfolio's public URL                  |
| `TELEGRAM_BOT_TOKEN`  | No       | Token for Telegram bot notifications         |
| `TELEGRAM_CHAT_ID`    | No       | Your Telegram chat ID for receiving messages |
| `GMAIL_PASSKEY`       | No       | Gmail app password for email notifications   |
| `EMAIL_ADDRESS`       | No       | Your Gmail address for sending emails        |

> **Note**: Contact form features require either Telegram or Gmail configuration (or both).

---

### Customize Your Portfolio Data

All portfolio content is managed through data files in the `utils/data/` folder:

#### 📝 Personal Information (`personal-data.js`)

```javascript
export const personalData = {
  name: "YOUR NAME",
  profile: "/profile.png", // Path to your profile image
  designation: "Software Developer", // Your job title
  description: "Your bio and introduction...", // About yourself
  email: "your.email@example.com",
  phone: "+1234567890",
  address: "City, Country",
  github: "https://github.com/yourusername",
  facebook: "https://www.facebook.com/yourprofile",
  linkedIn: "https://www.linkedin.com/in/yourprofile",
  twitter: "https://twitter.com/yourusername",
  stackOverflow: "https://stackoverflow.com/users/your-id",
  leetcode: "https://leetcode.com/yourusername/",
  devUsername: "yourusername", // dev.to username for blog integration
  resume: "https://link-to-your-resume.pdf",
};
```

#### 💼 Additional Data Files

| File               | Purpose                                        |
| ------------------ | ---------------------------------------------- |
| `experience.js`    | Your work experience and job history           |
| `projects-data.js` | Portfolio projects with descriptions and links |
| `skills.js`        | Technical skills and competencies              |
| `educations.js`    | Academic background and certifications         |
| `contactsData.js`  | Contact form configuration                     |

#### 🎨 Adding Your Profile Image

Place your profile picture in the `public/` directory and update the `profile` field in `personal-data.js`:

```javascript
profile: "/your-image-name.png"; // or .jpg, .webp
```

> **Pro Tip**: Use a square image (e.g., 400x400px) for best results!

---

## Deployment :rocket:

Deploy your portfolio to the web in minutes! Choose from multiple hosting platforms:

### 🚀 Deploy to Vercel (Recommended)

Vercel is the creators of Next.js and offers the best integration:

1. **Quick Deploy** (One-Click):

   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/said7388/developer-portfolio)

2. **Manual Deployment**:
   - Sign up or log in to [Vercel](https://vercel.com/)
   - Click **"New Project"**
   - Import your GitHub repository
   - Configure environment variables:
     - Go to **Settings** → **Environment Variables**
     - Add all variables from your `.env` file
   - Click **Deploy**
   - Your site will be live in ~2 minutes! 🎉

**Benefits:**

- ✅ Automatic deployments on every push
- ✅ Preview deployments for pull requests
- ✅ Global CDN for fast loading
- ✅ Free SSL certificates
- ✅ Zero configuration needed

---

### 🌐 Deploy to Netlify

Another excellent choice for Next.js applications:

1. **Quick Deploy** (One-Click):

   [![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/said7388/developer-portfolio)

2. **Manual Deployment**:
   - Sign up or log in to [Netlify](https://www.netlify.com/)
   - Click **"New site from Git"**
   - Connect your GitHub account and select your repository
   - Build settings:
     - **Build command**: `npm run build`
     - **Publish directory**: `.next`
   - Add environment variables:
     - Navigate to **Site Settings** → **Build & Deploy** → **Environment**
     - Add all variables from your `.env` file
   - Click **Deploy Site**

---

### 🐳 Deploy with Docker

For self-hosting or cloud platforms (AWS, DigitalOcean, etc.):

```bash
# Build production image
docker build -t developer-portfolio:prod -f Dockerfile.prod .

# Run on your server
docker run -d -p 80:3000 --name portfolio developer-portfolio:prod
```

Or use Docker Compose:

```bash
docker-compose -f docker-compose.prod.yml up -d
```

---

### 🔄 Continuous Deployment

Once deployed, your portfolio will automatically update when you:

1. Push changes to your GitHub repository
2. The hosting platform detects the change
3. Automatically rebuilds and deploys the new version

**No manual deployment needed!** ✨

---

## Tutorials :wrench:

### 📧 Gmail App Password Setup

Follow these steps to enable email notifications from your contact form:

1. **Access Your Google Account**

   - Go to [https://myaccount.google.com/](https://myaccount.google.com/)
   - Log in with your Gmail account

2. **Enable 2-Step Verification** (if not already enabled)

   - Click **Security** in the left sidebar
   - Scroll to **"Signing in to Google"**
   - Click **2-Step Verification** and follow the setup process

3. **Generate App Password**

   - In **Security**, scroll to **"Signing in to Google"**
   - Click **App Passwords** (you may need to sign in again)
   - In the dropdowns:
     - **Select app**: Choose "Mail"
     - **Select device**: Choose "Other (Custom name)"
     - Enter a name like "Portfolio Website"
   - Click **Generate**

4. **Save Your Password**
   - Copy the 16-character password displayed
   - Add it to your `.env` file as `GMAIL_PASSKEY`
   - ⚠️ **Important**: Save this password securely; you won't be able to see it again!

**Example `.env` configuration:**

```env
GMAIL_PASSKEY=abcd efgh ijkl mnop
EMAIL_ADDRESS=your.email@gmail.com
```

---

### 🤖 Create a Telegram Bot

Set up a Telegram bot to receive contact form submissions directly in Telegram:

1. **Find BotFather**

   - Open Telegram and search for `@BotFather`
   - Start a chat with BotFather

2. **Create Your Bot**

   - Send `/newbot` command
   - Follow the prompts:
     - **Bot name**: Enter a display name (e.g., "Portfolio Assistant")
     - **Username**: Must be unique and end with `bot` (e.g., `YourNamePortfolioBot`)

3. **Save Your Bot Token**

   - BotFather will send you a token like: `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`
   - Copy this token for your `.env` file

4. **Get Your Chat ID**

   - Open your newly created bot in Telegram
   - Send it any message (e.g., "Hello")
   - Open this URL in your browser (replace `<BOT_TOKEN>` with your actual token):
     ```
     https://api.telegram.org/bot<BOT_TOKEN>/getUpdates
     ```
   - Find the `"chat":{"id":` field in the JSON response
   - Copy the ID number (e.g., `123456789`)

5. **Update Your Environment Variables**
   ```env
   TELEGRAM_BOT_TOKEN=123456789:ABCdefGHIjklMNOpqrsTUVwxyz
   TELEGRAM_CHAT_ID=123456789
   ```

**Test Your Setup**: Send a test message through your contact form and check Telegram!

---

### 📝 Fetching Blog from dev.to

Automatically display your latest dev.to articles on your portfolio:

1. **Create a dev.to Account** (if you haven't already)

   - Sign up at [https://dev.to/](https://dev.to/)
   - Write and publish some articles

2. **Configure Your Portfolio**

   - Open `utils/data/personal-data.js`
   - Set your dev.to username:
     ```javascript
     export const personalData = {
       // ... other fields
       devUsername: "yourusername", // Your dev.to username
     };
     ```

3. **How It Works**

   - The portfolio automatically fetches your latest articles using the dev.to API
   - Articles are displayed in the **BLOG** section
   - Updates happen automatically when you publish new posts
   - Ensure your articles are set to **public** visibility

4. **Customization**
   - The number of displayed articles can be configured in the blog component
   - Articles show title, description, cover image, and publication date

**No API key required!** The dev.to API is public and free to use.

---

## Packages Used :package:

### Core Dependencies

| Package         | Version | Purpose                                |
| --------------- | ------- | -------------------------------------- |
| **next**        | Latest  | React framework for production         |
| **react**       | Latest  | JavaScript library for building UIs    |
| **react-dom**   | Latest  | React package for working with the DOM |
| **tailwindcss** | Latest  | Utility-first CSS framework            |
| **sass**        | Latest  | CSS preprocessor for styling           |

### UI & Animations

| Package                | Purpose                                    |
| ---------------------- | ------------------------------------------ |
| **lottie-react**       | Lightweight animations with Lottie files   |
| **react-fast-marquee** | Smooth scrolling marquee component         |
| **react-icons**        | Popular icon library with easy integration |
| **react-toastify**     | Beautiful notification toasts              |

### Functionality

| Package                    | Purpose                           |
| -------------------------- | --------------------------------- |
| **axios**                  | Promise-based HTTP client         |
| **nodemailer**             | Email sending functionality       |
| **@emailjs/browser**       | Client-side email service         |
| **react-google-recaptcha** | Google reCAPTCHA integration      |
| **sharp**                  | High-performance image processing |
| **@next/third-parties**    | Third-party script optimization   |

---

## Troubleshooting :wrench:

### Common Issues and Solutions

<details>
<summary><strong>❌ "next is not recognized as an internal or external command"</strong></summary>

**Solution:**

```bash
# Option 1: Install Next.js globally
npm install -g next

# Option 2: Use npx (recommended)
npx next dev

# Option 3: Use package manager scripts
npm run dev
```

</details>

<details>
<summary><strong>❌ Port 3000 is already in use</strong></summary>

**Solution:**

```bash
# Find and kill the process using port 3000
# On macOS/Linux:
lsof -ti:3000 | xargs kill -9

# On Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use a different port:
PORT=3001 npm run dev
```

</details>

<details>
<summary><strong>❌ Module not found or dependency errors</strong></summary>

**Solution:**

```bash
# Clear cache and reinstall dependencies
rm -rf node_modules package-lock.json
npm cache clean --force
npm install

# Or with pnpm:
rm -rf node_modules pnpm-lock.yaml
pnpm store prune
pnpm install
```

</details>

<details>
<summary><strong>❌ Environment variables not working</strong></summary>

**Solution:**

- Ensure `.env` file is in the root directory
- Restart the development server after changing `.env`
- Check that variables starting with `NEXT_PUBLIC_` are used for client-side code
- Server-side variables should NOT start with `NEXT_PUBLIC_`

</details>

<details>
<summary><strong>❌ Images not loading</strong></summary>

**Solution:**

- Verify images are in the `public/` directory
- Use paths starting with `/` (e.g., `/profile.png`)
- Check image file extensions match the code
- Ensure image files are committed to your repository

</details>

<details>
<summary><strong>❌ Contact form not sending emails</strong></summary>

**Solution:**

- Verify Gmail App Password is correct (16 characters)
- Check that 2-Step Verification is enabled on your Google account
- Ensure `EMAIL_ADDRESS` matches the Gmail account
- Test Telegram bot token and chat ID separately
- Check browser console for error messages

</details>

---

## Contributing :handshake:

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

### Contribution Guidelines

- Follow the existing code style
- Write clear, descriptive commit messages
- Test your changes thoroughly
- Update documentation as needed
- Add comments for complex logic

---

## License :page_with_curl:

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## Support :coffee:

If you found this helpful, consider:

- ⭐ **Starring the repository**
- 🐛 **Reporting bugs** via [Issues](https://github.com/said7388/developer-portfolio/issues)
- 💡 **Suggesting new features** via [Discussions](https://github.com/said7388/developer-portfolio/discussions)
- 📢 **Sharing with others** who might benefit

---

<p align="center">
  <strong>Built with ❤️ by developers, for developers</strong>
</p>

<p align="center">
  <a href="https://github.com/said7388/developer-portfolio/stargazers">⭐ Star this repo</a> •
  <a href="https://github.com/said7388/developer-portfolio/issues">🐛 Report Bug</a> •
  <a href="https://github.com/said7388/developer-portfolio/discussions">💬 Discussions</a>
</p>

---

### 📊 Project Stats

![GitHub stars](https://img.shields.io/github/stars/said7388/developer-portfolio?style=social)
![GitHub forks](https://img.shields.io/github/forks/said7388/developer-portfolio?style=social)
![GitHub issues](https://img.shields.io/github/issues/said7388/developer-portfolio)
![GitHub license](https://img.shields.io/github/license/said7388/developer-portfolio)

---

<p align="center">
  Made with Next.js, Tailwind CSS, and lots of ☕
</p>
