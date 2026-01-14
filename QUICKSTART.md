# Quick Start Guide

Get the Jakarta Party Squad website running in 5 minutes!

## ⚡ Prerequisites

- Node.js 22.x
- npm 10.x
- Terminal access

## 🚀 Getting Started

### Step 1: Install Dependencies

```bash
cd /Users/leynardo/Revelt/jps/jps-landing-page
npm install
```

> **Note**: If you get permission errors, try:
>
> ```bash
> sudo npm install
> ```

### Step 2: Run Development Server

```bash
npm run dev
```

You should see:

```
✓ Ready in 2.5s
○ Local:   http://localhost:3000
```

### Step 3: Open in Browser

Visit: **http://localhost:3000**

You should see the Jakarta Party Squad homepage!

## ✅ Test Checklist

### Desktop (Chrome/Safari)

- [ ] Homepage loads
- [ ] Click "About Us" in header
- [ ] Click "Community" in header
- [ ] Click "Partners" in header
- [ ] Click "Gallery" in header
- [ ] Click "Contact" in header
- [ ] Footer links work
- [ ] External links open in new tab

### Mobile (Responsive Mode or Real Device)

1. Open Chrome DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M / Cmd+Shift+M)
3. Select "iPhone 12 Pro" or similar

**Test:**

- [ ] Hamburger menu (☰) appears in header
- [ ] Click hamburger → menu slides in from right
- [ ] Click menu items → navigates correctly
- [ ] Close menu (X button) works
- [ ] Buttons are easy to tap (44px minimum)
- [ ] Text is readable (not too small)
- [ ] Images load properly
- [ ] Layout doesn't overflow horizontally

### Pages to Visit

1. **Homepage** (`/`)
   - Hero section with CTAs
   - Quick about (2 cards)
   - Featured partners (6 logos)

2. **About** (`/about`)
   - Full story
   - Founder speech with avatar
   - Team grid (12 members)

3. **Community** (`/community`)
   - 4 benefit cards
   - How to join (3 steps)
   - CTA buttons

4. **Partners** (`/partners`)
   - All 9 partners
   - Partnership info

5. **Gallery** (`/gallery`)
   - 4 albums
   - 11 event photos

6. **Contact** (`/contact`)
   - Social media cards
   - Partnership section

## 🛠️ Common Issues & Fixes

### Issue: `npm install` fails

**Fix 1**: Clear npm cache

```bash
npm cache clean --force
npm install
```

**Fix 2**: Use sudo (if on Mac/Linux)

```bash
sudo npm install
```

### Issue: Port 3000 already in use

**Fix**: Kill the process or use different port

```bash
# Kill process on port 3000 (Mac/Linux)
lsof -ti:3000 | xargs kill

# Or use different port
PORT=3001 npm run dev
```

### Issue: Images not showing

**Check**: Verify these files exist

```bash
ls -la public/assets/images/
```

You should see:

- `logo_2.png`
- `header.jpg`
- `party.png`, `party_2.png`
- Partner logos (`wildout.png`, etc.)
- Team photos (`founder.png`, etc.)

### Issue: TypeScript errors

**Fix**: Rebuild types

```bash
npm run build-types
```

## 📱 Test on Real Mobile Device

### Method 1: Same WiFi Network

1. Find your computer's IP address:

   ```bash
   # Mac
   ifconfig | grep "inet " | grep -v 127.0.0.1

   # Windows
   ipconfig | findstr IPv4
   ```

2. On your phone, visit:
   ```
   http://YOUR_IP_ADDRESS:3000
   ```
   Example: `http://192.168.1.100:3000`

### Method 2: Vercel Preview (Free)

```bash
npm i -g vercel
vercel
```

You'll get a URL like: `https://jps-landing-page-xyz.vercel.app`

## 🎨 Making Changes

### Update Content

Edit: `config/index.json`

```json
{
  "mainHero": {
    "title": "Your New Title",
    "description": "Your new description"
  }
}
```

Save → Browser auto-refreshes!

### Update Styles

Edit: `tailwind.config.js` for colors/spacing

Edit: `src/styles/main.css` for global styles

### Add New Page

1. Create: `app/newpage/page.tsx`

   ```typescript
   export const metadata = {
     title: 'New Page',
     description: 'Description'
   };

   export default function NewPage() {
     return <div>Content</div>;
   }
   ```

2. Add to navigation: `config/index.json`
   ```json
   "navigation": [
     { "name": "New Page", "href": "/newpage" }
   ]
   ```

## 📦 Production Build

Before deploying, test the production build:

```bash
# Build
npm run build

# Start production server
npm start
```

Should show:

```
✓ Compiled successfully
Route (app)                Size    First Load JS
○ /                       140 B         120 kB
○ /about                  180 B         125 kB
...
```

## 🚢 Deploy to Vercel (Recommended)

### Quick Deploy:

```bash
npm i -g vercel
vercel login
vercel --prod
```

### Or via GitHub:

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your repository
5. Click "Deploy"

Done! You'll get a URL like:

```
https://jps-landing-page.vercel.app
```

## 📚 Next Steps

1. **Read Documentation**:
   - `README.md` - Project overview
   - `ARCHITECTURE.md` - Technical details
   - `MIGRATION.md` - What changed
   - `DEPLOYMENT.md` - Detailed deployment guide

2. **Customize**:
   - Update `config/index.json` with your content
   - Add your team photos to `public/assets/images/`
   - Update social media links

3. **Deploy**:
   - Follow `DEPLOYMENT.md` for production
   - Set up custom domain
   - Configure analytics

## 🎯 Performance Targets

After deployment, aim for:

- ✅ Lighthouse Performance > 90
- ✅ Lighthouse SEO = 100
- ✅ Mobile PageSpeed > 90
- ✅ First Contentful Paint < 1.8s

Test at: [https://pagespeed.web.dev/](https://pagespeed.web.dev/)

## 🆘 Need Help?

1. **Check Docs**: Review `REFACTOR_SUMMARY.md` for complete overview
2. **Check Linter**: Run `npm run lint` to see issues
3. **Check Types**: Run `npm run build-types` for TypeScript errors
4. **Check Console**: Open DevTools (F12) to see JavaScript errors

## ✨ Tips

- **Hot Reload**: Changes auto-refresh in dev mode
- **TypeScript**: IDE shows errors in real-time
- **Tailwind**: Use IntelliSense for class suggestions
- **Images**: Always use `next/image` component
- **Links**: Always use `next/link` component

## 📞 Support

- Instagram: [@jakartapartysquad](https://www.instagram.com/jakartapartysquad)
- Discord: [Join Server](https://discord.gg/UshBBJkDS8)
- Issues: GitHub Issues (if applicable)

---

**You're all set!** 🎉

The website is mobile-first, SEO-optimized, and ready for production.

**Start developing**:

```bash
npm run dev
```

**Deploy when ready**:

```bash
vercel --prod
```

Happy coding! 🚀
