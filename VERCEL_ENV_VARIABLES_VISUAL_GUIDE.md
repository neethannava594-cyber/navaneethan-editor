# How to Add Environment Variables in Vercel - Visual Guide

## Step 1: Open Vercel Dashboard
- Go to: **https://vercel.com/dashboard**
- You will see your projects listed

---

## Step 2: Click on Your Project
- Look for: **navaneethan-editor**
- Click on it to open the project

---

## Step 3: Go to Settings
```
At the top of your project page, you'll see tabs:
┌─────────────┬──────────┬──────────┬──────────┐
│ Deployments │ Settings │ Function │ ....     │
└─────────────┴──────────┴──────────┴──────────┘
         👆 Click here
```
- Click on **Settings** tab

---

## Step 4: Find Environment Variables
On the left sidebar, you'll see menu options:
```
Settings Menu:
├── General
├── Git
├── Environment Variables  ← Click here
├── Domains
├── Functions
└── ...
```
- Click on **Environment Variables**

---

## Step 5: Click "Add New" Button
You will see a screen like this:

```
Environment Variables

Environment Variables in the Production, Preview, and Development 
environments are available to your Deployments and Functions.

┌──────────────────────────────────────────┐
│ + Add New                                 │
└──────────────────────────────────────────┘

Existing Variables (if any):
┌─────────────────────────────────────────────┐
│ Name          │ Value      │ Environments    │
├───────────────┼────────────┼─────────────────┤
│ (empty)       │            │                 │
└─────────────────────────────────────────────┘
```

- Click the **"+ Add New"** button

---

## Step 6: Add First Variable (VITE_SUPABASE_URL)

A form will appear:

```
┌────────────────────────────────────────────────┐
│ Environment Variable Form                      │
├────────────────────────────────────────────────┤
│ Name*                                          │
│ ┌──────────────────────────────────────────┐  │
│ │ VITE_SUPABASE_URL                        │  │
│ └──────────────────────────────────────────┘  │
│                                                │
│ Value*                                         │
│ ┌──────────────────────────────────────────┐  │
│ │ https://kzheemfnnndvdhzslnfm.supabase.co│  │
│ └──────────────────────────────────────────┘  │
│                                                │
│ Environments*                                  │
│ ☑ Production                                  │
│ ☑ Preview                                     │
│ ☐ Development                                 │
│                                                │
│ ┌────────────┐  ┌────────┐                   │
│ │ Save       │  │ Cancel │                   │
│ └────────────┘  └────────┘                   │
└────────────────────────────────────────────────┘
```

**Fill in:**
1. **Name:** Type exactly: `VITE_SUPABASE_URL`
2. **Value:** Paste: `https://kzheemfnnndvdhzslnfm.supabase.co`
3. **Environments:** Make sure ✅ **Production** is checked AND ✅ **Preview** is checked
4. Click **Save** button

---

## Step 7: Add Second Variable (VITE_SUPABASE_ANON_KEY)

Click **"+ Add New"** button again

```
┌────────────────────────────────────────────────┐
│ Environment Variable Form                      │
├────────────────────────────────────────────────┤
│ Name*                                          │
│ ┌──────────────────────────────────────────┐  │
│ │ VITE_SUPABASE_ANON_KEY                   │  │
│ └──────────────────────────────────────────┘  │
│                                                │
│ Value*                                         │
│ ┌──────────────────────────────────────────┐  │
│ │ eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... │  │
│ │ (long string - paste your anon key here) │  │
│ └──────────────────────────────────────────┘  │
│                                                │
│ Environments*                                  │
│ ☑ Production                                  │
│ ☑ Preview                                     │
│ ☐ Development                                 │
│                                                │
│ ┌────────────┐  ┌────────┐                   │
│ │ Save       │  │ Cancel │                   │
│ └────────────┘  └────────┘                   │
└────────────────────────────────────────────────┘
```

**Fill in:**
1. **Name:** Type exactly: `VITE_SUPABASE_ANON_KEY`
2. **Value:** Paste the full key: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt6aGVlbWZubm5kdmRoenNsbmZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4NDI4NTgsImV4cCI6MjA3ODQxODg1OH0.BfnnF6lKhH3baipOsfdUmNBWuGWmQbMX2tgh2x0LKX0`
3. **Environments:** Make sure ✅ **Production** is checked AND ✅ **Preview** is checked
4. Click **Save** button

---

## Step 8: Verify Both Variables Added

After saving, your Environment Variables page should look like:

```
Environment Variables

┌──────────────────────────────────────────────────────────┐
│ + Add New                                                │
└──────────────────────────────────────────────────────────┘

Existing Variables:
┌──────────────────────────────────────────────────────────┐
│ Name                      │ Value        │ Environments  │
├───────────────────────────┼──────────────┼───────────────┤
│ VITE_SUPABASE_URL         │ https://k... │ Prod, Preview │
├───────────────────────────┼──────────────┼───────────────┤
│ VITE_SUPABASE_ANON_KEY    │ eyJhbGc...   │ Prod, Preview │
└──────────────────────────────────────────────────────────┘
```

✅ Both variables should be listed!

---

## Step 9: Redeploy Your Application

Now you need to redeploy so these variables take effect:

1. **Click on "Deployments"** tab at the top
2. You'll see your deployment history:
```
Deployments

Latest Deployment:
┌───────────────────────────────────────────────┐
│ feat: Update contact form with Supabase ...   │
│ Ready ✓                                        │
│ Deployed 2 hours ago                           │
│ [View] [Visit] [...]                          │
│                 👆 Click the 3 dots
└───────────────────────────────────────────────┘
```

3. Click the **three dots (...)** menu on the right side of latest deployment
4. Select **"Redeploy"**
5. A dialog appears - click **"Redeploy"** to confirm

```
Redeploy Deployment?

This will re-run the build and deployment with 
the latest environment variables.

[Cancel]  [Redeploy] ← Click here
```

---

## Step 10: Wait for Build to Complete

You'll see the status change:
```
Status:
┌─────────────────────────┐
│ ⏳ Building...          │
│ 📝 In Progress          │
└─────────────────────────┘
   ↓ (Wait 1-3 minutes)
┌─────────────────────────┐
│ ✅ Ready                │
│ 🟢 Live                 │
└─────────────────────────┘
```

Once it says **"Ready ✓"**, your environment variables are now active! 🎉

---

## Step 11: Test Your Contact Form

1. **Open Your Website**
   - Go to: https://navaneethan-editor.vercel.app/contact

2. **Fill the Form**
   - Name: (e.g., "Test User")
   - Email: (e.g., "test@example.com")
   - Phone: (optional)
   - Service Interest: (pick one)
   - Message: (e.g., "Testing the form")

3. **Click Submit**
   - You should see: "Message sent successfully!" ✅

---

## Step 12: Verify in Supabase

Now check if your data was saved:

1. **Go to Supabase**
   - Visit: https://app.supabase.com
   - Click your project

2. **Open Editor**
   - Click **Editor** in the left sidebar

3. **Click enquiries Table**
   - You should see your test entry! ✅

---

## ✅ Complete Checklist

- [ ] Added VITE_SUPABASE_URL to Vercel
- [ ] Added VITE_SUPABASE_ANON_KEY to Vercel
- [ ] Both variables set to Production AND Preview
- [ ] Clicked Redeploy
- [ ] Waited for build to complete (says "Ready ✓")
- [ ] Tested contact form on live website
- [ ] Saw data in Supabase enquiries table

If all checkboxes are done → **Your system is working!** 🎉

---

## Troubleshooting

**Problem:** Still don't see "Environment Variables" option?
- Solution: Make sure you're in the project settings, not account settings

**Problem:** Can't find the Deployments tab?
- Solution: You're in project page, look at top tabs: Deployments | Settings | Functions

**Problem:** Form still says success but no data in Supabase?
- Solution: Wait 5 more minutes (build might still be running) or press F5 to refresh page

**Problem:** Still not working?
- Tell me and we'll debug together! 👇
