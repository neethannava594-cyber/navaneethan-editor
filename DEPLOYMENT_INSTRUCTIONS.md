# 🚀 Navaneethan Editor - Deployment Instructions

## Your Credentials & Environment Variables

### GitHub Account
```
Username: navaneethan2013
Email: neethannava594@gmail.com
Password: @143NDeepika2013
Repository: navaneethan-editor
```

### Supabase Environment Variables (for Vercel)
```
VITE_SUPABASE_URL=https://pbrcqyeiaajrhucjvcuv.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBicmNxeWVpYWFqcmh1Y2p2Y3V2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4NDQ3OTAsImV4cCI6MjA3ODQyMDc5MH0.13_7z5f5PQ12Wii45q8w6aWFe21TQ4rBGlsquJePZIQ
```

---

## 📋 Step-by-Step Deployment Guide

### ✅ STEP 1: Create GitHub Account
**Time: ~2 minutes**

1. Open: https://github.com/signup
2. Enter:
   - Email: `neethannava594@gmail.com`
   - Username: `navaneethan2013`
   - Password: `@143NDeepika2013`
3. Click "Create account"
4. Check your email and verify
5. Choose free plan

✅ **Done!** Your GitHub account is ready.

---

### ✅ STEP 2: Create GitHub Repository & Upload Files
**Time: ~5 minutes**

1. Open: https://github.com/new
2. Fill in:
   - Repository name: `navaneethan-editor`
   - Description: `Navaneethan Editor - Video editing and portfolio platform`
   - Choose: **Public** (required for free Vercel)
3. Click "Create repository"
4. Click the blue link: **"uploading an existing file"**
5. **Drag & drop or select all files** from:
   ```
   c:\Users\SHIGADESIGN3\Downloads\Programs\navaneethan-editor\
   ```
   
   **Important files to include:**
   - `package.json`
   - `vite.config.ts`
   - `tsconfig.json`
   - `index.html`
   - `.env.local` ⚠️ (includes Supabase keys)
   - `src/` or all `.tsx` `.ts` files
   - `certs/` folder (SSL certificates)
   - All other source files

6. Scroll down and click "Commit changes"

✅ **Done!** Your code is on GitHub.

---

### ✅ STEP 3: Deploy to Vercel
**Time: ~10 minutes**

#### 3a. Create Vercel Account
1. Open: https://vercel.com/signup
2. Click **"Continue with GitHub"**
3. Authorize Vercel to access your GitHub account
4. You're now logged in!

#### 3b. Import Your Repository
1. Click **"New Project"** or **"Add New..."**
2. Select: `navaneethan2013/navaneethan-editor`
3. Click **"Import"**

#### 3c. Configure Build Settings
- **Framework Preset:** Vite (should auto-detect) ✅
- **Root Directory:** `./` (default) ✅
- **Build Command:** `npm run build` (auto-filled) ✅
- **Output Directory:** `dist` (auto-filled) ✅
- **Install Command:** `npm install` (auto-filled) ✅

#### 3d. Add Environment Variables ⚠️ IMPORTANT
Click **"Environment Variables"** and add these TWO variables:

**Variable 1:**
- Name: `VITE_SUPABASE_URL`
- Value: `https://pbrcqyeiaajrhucjvcuv.supabase.co`

**Variable 2:**
- Name: `VITE_SUPABASE_ANON_KEY`
- Value: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBicmNxeWVpYWFqcmh1Y2p2Y3V2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4NDQ3OTAsImV4cCI6MjA3ODQyMDc5MH0.13_7z5f5PQ12Wii45q8w6aWFe21TQ4rBGlsquJePZIQ`

#### 3e. Deploy!
1. Click **"Deploy"**
2. Wait 2-3 minutes...
3. You'll see a success page! ✅

**Your live URL:** `https://navaneethan-editor.vercel.app`

---

### ✅ STEP 4: Test Your Live Site
**Time: ~5 minutes**

1. Open: `https://navaneethan-editor.vercel.app` (your Vercel URL)
2. **Sign up** with a test email
3. Navigate to **Pricing** page
4. Click **"Choose Plan"** on any package
5. Fill the **Checkout Form:**
   - Footage Links: Enter a test URL (e.g., `https://example.com/video.mp4`)
   - Notes: Enter any text
6. Click **"Place Order"**
7. ✅ Order should appear in your **Orders** list

**If successful:** 🎉 Your app is live and working!
**If error:** Check browser console (F12) and share the error message.

---

## 🔧 Troubleshooting

### Issue: "Environment variables not found"
- ✅ Make sure you added both VITE_SUPABASE_* variables in Vercel dashboard
- Redeploy after adding variables (Vercel → Settings → Redeploy)

### Issue: "Page shows blank or 404"
- Check Vercel deployment logs (Deployments tab)
- Make sure `.env.local` was included when uploading to GitHub
- Verify `build` command is `npm run build`

### Issue: "Orders not being created"
- Check browser console (F12) for error messages
- Verify Supabase keys are correct
- Check that you're logged in before placing order

---

## 📱 What's Been Fixed & Deployed

Your app now includes:

✅ **Order Creation Fix** - Fixed `service_id` field mismatch with database  
✅ **Face Detection** - Profile photos display full face (no cropping)  
✅ **HTTPS Support** - Self-signed certificates for local dev  
✅ **Checkout Page** - Complete order form with validation  
✅ **Responsive Design** - Works on mobile and desktop  

---

## 🎯 Next Steps After Deployment

1. **Test thoroughly** on the live site
2. **Share your URL** with team/clients
3. **Monitor orders** in Supabase dashboard
4. **Update custom domain** (optional) in Vercel settings
5. **Set up email notifications** (optional) in Supabase

---

## 📞 Support

If you run into issues:
1. Check browser console (F12)
2. Check Vercel logs in dashboard
3. Check Supabase console for database errors
4. Share error message for debugging

---

**Happy deploying! 🚀**
