# TimeVault - Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Verify Environment Variables

Check that `.env` file exists with your Supabase credentials:

```bash
cat .env
```

You should see:
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

**Don't have these?**
1. Go to [supabase.com](https://supabase.com)
2. Open your project
3. Go to Settings > API
4. Copy the Project URL and anon/public key

### Step 3: Start Development Server
```bash
npm run dev
```

Visit `http://localhost:5173` in your browser.

---

## ✅ Verify Everything Works

After starting the dev server:

1. **Homepage should load** with storytelling sections
2. **Navigation works** - click through all pages
3. **Dark mode toggles** - click moon/sun icon
4. **Form loads** - go to "Create Capsule" page

---

## 🐛 Not Working?

### Quick Fixes

**Blank Page?**
1. Check browser console (F12) for errors
2. Restart dev server: Stop it (Ctrl+C) and run `npm run dev` again

**Environment Variable Errors?**
1. Verify `.env` file has no empty lines at the start
2. Ensure variable names start with `VITE_`
3. No spaces around `=` sign
4. Restart dev server after changing `.env`

**Still not working?**
See [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) for detailed solutions.

---

## 📦 Build for Production

Test the production build locally:

```bash
# Build the project
npm run build

# Preview the build
npm run preview
```

Visit the URL shown (usually `http://localhost:4173`)

---

## 🚢 Deploy to Vercel

### Quick Deploy

1. Push code to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your repository
4. Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Click Deploy

**Detailed instructions:** See [DEPLOYMENT.md](./DEPLOYMENT.md)

---

## 📚 Documentation

- **README.md** - Complete project overview
- **DEPLOYMENT.md** - Full deployment guide with troubleshooting
- **TROUBLESHOOTING.md** - Solutions for common issues

---

## 🎨 Features to Explore

Once running, try:

1. **Create a Time Capsule**
   - Write a message to your future self
   - Upload files (images, videos, documents)
   - Set custom unlock date and time

2. **Toggle Dark Mode**
   - Click the theme toggle in header
   - Notice smooth transitions

3. **Explore Pages**
   - Read the storytelling homepage
   - Learn "How It Works"
   - Check out the "About" page

---

## 🔧 Development Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type check
npx tsc --noEmit
```

---

## 💡 Tips

- **Hot Module Replacement**: Changes auto-reload in dev mode
- **Environment Variables**: Must restart dev server after `.env` changes
- **Build Before Deploy**: Always run `npm run build` to verify
- **Browser Console**: Keep DevTools open to catch errors early

---

## ✨ You're Ready!

The website should now be running. Start creating time capsules! 🎉

**Need help?** Check [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
