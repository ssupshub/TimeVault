# TimeVault Troubleshooting Guide

## Website Not Showing / Blank Page

### Issue: Dev Server Shows Blank Page

**Solution 1: Restart the Dev Server**
```bash
# Stop the current server (Ctrl+C)
# Then restart it
npm run dev
```

**Why this works:** Vite caches environment variables. After changing `.env`, you must restart the server.

### Issue: "Missing Supabase environment variables" Error

**Check 1: Verify .env file exists and has correct content**
```bash
cat .env
```

Should show:
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

**Check 2: Ensure no extra spaces or line breaks**
The `.env` file should NOT have:
- Empty lines at the beginning
- Spaces around the `=` sign
- Quotes around values (not needed for Vite)

**Check 3: Variable names must start with `VITE_`**
❌ Wrong: `SUPABASE_URL`
✅ Correct: `VITE_SUPABASE_URL`

### Issue: Build Works But Dev Server Doesn't

**Solution: Clear Vite Cache**
```bash
rm -rf node_modules/.vite
npm run dev
```

### Issue: Working Locally But Not on Vercel

**Solution: Add Environment Variables in Vercel Dashboard**

1. Go to your project in Vercel
2. Settings > Environment Variables
3. Add both variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Redeploy the project

**Important:** On Vercel, you must add env vars through the dashboard. They cannot be read from `.env` file.

## Browser Console Errors

### Open DevTools
- Chrome/Edge: Press `F12` or `Ctrl+Shift+I` (Windows) / `Cmd+Option+I` (Mac)
- Firefox: Press `F12`
- Safari: Enable Developer Menu in Preferences, then press `Cmd+Option+I`

### Common Console Errors

**Error: "Failed to fetch"**
- Check if Supabase URL is correct
- Verify internet connection
- Check if Supabase project is active (not paused)

**Error: "Invalid API key"**
- Verify `VITE_SUPABASE_ANON_KEY` is correct
- Copy the key again from Supabase dashboard
- Ensure no extra spaces or characters

**Error: "CORS policy"**
- Check Supabase project settings
- Verify allowed origins in Supabase dashboard
- For local dev, ensure `localhost:5173` is allowed

## Network Issues

### Check if Files Are Loading

1. Open DevTools > Network tab
2. Refresh the page
3. Look for:
   - `index.html` (should be 200 OK)
   - `index-[hash].js` (should be 200 OK)
   - `index-[hash].css` (should be 200 OK)

**If files show 404:**
- Run `npm run build` again
- Check that `dist` folder exists
- Verify build completed without errors

**If files show CORS errors:**
- Check server configuration
- Verify Vercel deployment settings

## Performance Issues

### Slow Loading

**Solution: Check Network Tab**
- Look for large files (>1MB)
- Check if fonts are loading slowly
- Verify CDN links are working

### Fonts Not Loading

**Check Google Fonts Link in index.html**
```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display..." rel="stylesheet">
```

**If offline:** Fonts won't load, but website should still work with fallback fonts.

## Build Issues

### TypeScript Errors

**Run Type Check:**
```bash
npm run build
```

**Common fixes:**
- Check for missing imports
- Verify component prop types
- Ensure all required props are passed

### Missing Dependencies

**Reinstall Dependencies:**
```bash
rm -rf node_modules package-lock.json
npm install
```

## Still Not Working?

### Quick Diagnostic Steps

1. **Test static files work:**
   - Visit `http://localhost:5173/test.html`
   - If this works, the server is fine

2. **Check browser console:**
   - Look for red error messages
   - Copy the full error message

3. **Verify build succeeds:**
   ```bash
   npm run build
   ```
   Should complete without errors

4. **Test preview build:**
   ```bash
   npm run preview
   ```
   Visit the URL shown (usually `http://localhost:4173`)

5. **Check environment:**
   - Node version: `node --version` (should be 16+)
   - npm version: `npm --version`

### Get Help

If none of these solutions work:

1. Clear browser cache completely
2. Try a different browser
3. Try incognito/private mode
4. Check if antivirus/firewall is blocking

### Debug Mode

Add this to check if environment variables are loading:

**In `src/main.tsx`, add before ReactDOM.createRoot:**
```typescript
console.log('Environment Check:', {
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL,
  hasAnonKey: !!import.meta.env.VITE_SUPABASE_ANON_KEY
});
```

Then check browser console for the output.

## Production Checklist

Before deploying to Vercel:

- [ ] `.env` file has correct values locally
- [ ] Build succeeds: `npm run build`
- [ ] Preview works: `npm run preview`
- [ ] Environment variables added to Vercel dashboard
- [ ] All pages work after deployment
- [ ] Forms submit successfully
- [ ] Dark mode toggles correctly
- [ ] Mobile view works properly

## Emergency Fix

If website is completely broken, try this:

```bash
# 1. Stop dev server
# 2. Clean everything
rm -rf node_modules dist .vite
# 3. Reinstall
npm install
# 4. Rebuild
npm run build
# 5. Start fresh
npm run dev
```

This nuclear option usually fixes 90% of issues by starting completely fresh.
