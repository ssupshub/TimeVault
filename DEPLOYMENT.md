# Deployment Guide for TimeVault

This guide will help you deploy TimeVault to Vercel.

## Prerequisites

Before deploying, ensure you have:

1. A Vercel account ([vercel.com](https://vercel.com))
2. A Supabase project with:
   - Project URL
   - Anonymous/Public API key
   - Database migrations applied
   - Storage bucket `capsule-files` created
   - Edge function `deliver-capsules` deployed

## Deployment Steps

### Step 1: Prepare Your Supabase Project

1. **Create/Verify Database Schema**
   - Ensure the `time_capsules` table exists with all required columns
   - Verify Row Level Security (RLS) is enabled

2. **Create Storage Bucket**
   - Name: `capsule-files`
   - Public access: Enabled
   - File size limit: As per your requirements

3. **Deploy Edge Function**
   - Function name: `deliver-capsules`
   - Ensure it has access to service role key

### Step 2: Deploy to Vercel

#### Option A: Deploy via Vercel Dashboard

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your Git repository (GitHub, GitLab, or Bitbucket)
3. Configure project:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. Add Environment Variables:
   - Click "Environment Variables"
   - Add the following:
     ```
     VITE_SUPABASE_URL=https://your-project.supabase.co
     VITE_SUPABASE_ANON_KEY=your_anon_key_here
     ```
   - Apply to: Production, Preview, and Development

5. Click "Deploy"

#### Option B: Deploy via Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy from project directory:
   ```bash
   vercel
   ```

4. Follow the prompts:
   - Link to existing project or create new
   - Confirm settings

5. Add environment variables:
   ```bash
   vercel env add VITE_SUPABASE_URL
   vercel env add VITE_SUPABASE_ANON_KEY
   ```

6. Deploy to production:
   ```bash
   vercel --prod
   ```

### Step 3: Configure Custom Domain (Optional)

1. Go to your project in Vercel Dashboard
2. Navigate to "Settings" > "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

### Step 4: Verify Deployment

After deployment, test the following:

1. **Homepage loads correctly**
   - Storytelling sections visible
   - Typography renders properly
   - Dark mode toggle works

2. **Create Capsule functionality**
   - Form loads without errors
   - File upload works
   - Custom date/time picker functions
   - Form submission succeeds

3. **Supabase connection**
   - Check browser console for errors
   - Verify data is being saved to database
   - Test file uploads to storage

4. **All pages work**
   - Home page
   - Create page
   - How It Works page
   - About page
   - Confirmation page

## Troubleshooting

### Environment Variables Not Loading

If you see "Missing Supabase environment variables" error:

1. Verify environment variables are set in Vercel Dashboard
2. Ensure variable names start with `VITE_` prefix
3. Redeploy the project after adding variables
4. Check that variables are added to correct environment (Production/Preview/Development)

### Build Fails

If build fails:

1. Check build logs in Vercel Dashboard
2. Ensure all dependencies are in `package.json`
3. Verify TypeScript types are correct
4. Run `npm run build` locally to test

### 404 Errors on Page Refresh

If you get 404 errors when refreshing pages:

1. Verify `vercel.json` exists with proper rewrites configuration
2. Check that routing is set up correctly in React Router
3. Ensure all routes in `App.tsx` match your navigation

### Supabase Connection Issues

If database connection fails:

1. Verify Supabase URL is correct (should be https://xxx.supabase.co)
2. Check that anon key is valid and not expired
3. Ensure Supabase project is not paused
4. Verify RLS policies allow required operations

### Font Loading Issues

If custom fonts don't load:

1. Check Google Fonts link in `index.html`
2. Verify font families in CSS match imported fonts
3. Check browser console for font loading errors

## Post-Deployment Checklist

- [ ] All pages load correctly
- [ ] Forms submit successfully
- [ ] File uploads work
- [ ] Database operations succeed
- [ ] Dark mode toggles properly
- [ ] Mobile responsive design works
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active
- [ ] Analytics set up (if desired)

## Continuous Deployment

Vercel automatically deploys:
- **Production**: When you push to `main` branch
- **Preview**: When you create a pull request

To disable auto-deployment:
1. Go to Project Settings > Git
2. Adjust deployment settings as needed

## Performance Optimization

For better performance:

1. **Enable Vercel Analytics**
   - Go to Project > Analytics
   - Enable Web Analytics

2. **Configure Caching**
   - Vercel automatically caches static assets
   - Adjust cache headers if needed in `vercel.json`

3. **Optimize Images**
   - Consider using Vercel Image Optimization
   - Add `next/image` equivalent for React

## Support

For deployment issues:
- Vercel Documentation: [vercel.com/docs](https://vercel.com/docs)
- Supabase Documentation: [supabase.com/docs](https://supabase.com/docs)
- Project Issues: Open an issue on GitHub

## Security Notes

**Important**: Never commit `.env` file to Git

The `.env` file is ignored by `.gitignore`. Environment variables should only be set in:
- Local `.env` file (for development)
- Vercel Dashboard (for production)

Keep your Supabase service role key secure and never expose it in client-side code.
