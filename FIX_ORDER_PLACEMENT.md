# Fix: Order Placement Not Working on Vercel

## What I Fixed

✅ **Enhanced Error Handling in `api.ts`**
- Added detailed console logging to track exact failure points
- Captures full Supabase error details (code, message, details, hint)
- Better error messages for debugging

✅ **Improved UI in `pages.tsx` (CheckoutPage)**
- Now shows error messages directly to users instead of generic alerts
- Shows success message before redirecting
- Validates that at least one footage link is provided
- Error and success messages appear above the form

## Why Orders Are Still Failing on Vercel

The most likely cause is **missing or incorrect environment variables** on Vercel. Your app needs these two variables to connect to Supabase:

- `VITE_SUPABASE_URL` - Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Your Supabase anonymous key

Without these, the Supabase client can't connect, and all orders fail silently.

## How to Fix It (Step by Step)

### Step 1: Get Your Supabase Keys

1. Go to https://app.supabase.com/
2. Select your project (navaneethan-editor or similar)
3. Click **Settings** (⚙️) in the left sidebar
4. Click **API** tab
5. You'll see two keys:
   - **Project URL** - Copy this (looks like: `https://xxxxx.supabase.co`)
   - **Anon Key** - Copy this (long string starting with `eyJhbGc...`)

**Save these values - you'll need them in next step.**

### Step 2: Add Environment Variables to Vercel

1. Go to https://vercel.com/ and log in
2. Click on your project **navaneethan-editor**
3. Click **Settings** tab
4. Click **Environment Variables** in left sidebar
5. Add the two variables:

   **First variable:**
   - Name: `VITE_SUPABASE_URL`
   - Value: (paste your Project URL from Step 1)
   - Environments: Select **All** (Production, Preview, Development)
   - Click **Add**

   **Second variable:**
   - Name: `VITE_SUPABASE_ANON_KEY`
   - Value: (paste your Anon Key from Step 1)
   - Environments: Select **All**
   - Click **Add**

### Step 3: Redeploy Your Project

After adding environment variables, Vercel needs to rebuild with the new vars:

1. In Vercel dashboard, go to **Deployments**
2. Click the three dots (...) on the most recent deployment
3. Select **Redeploy**
4. Wait for deployment to complete (you'll see green checkmark)

### Step 4: Test Order Placement

1. Go to https://navaneethan-editor.vercel.app
2. Sign up with a test email
3. Go to **Pricing**
4. Click **Choose Plan** on any package
5. Fill in the checkout form:
   - **Footage Links:** Paste any test URLs (comma separated)
   - **Notes:** Write something like "Test order"
6. Click **Place Order**
7. Check for success or error message

### What to Look For

**✓ If it works:**
- Green success message appears: "✓ Order placed successfully!"
- You're redirected to dashboard after 1.5 seconds
- Order appears in dashboard under your orders

**✗ If it still fails:**
- Red error message shows the exact problem
- Copy that error message and we can debug further

## Additional Debugging (if needed)

If orders still fail after setting env vars, check your browser's Developer Console for more details:

1. Open your Vercel site in Chrome/Firefox
2. Press **F12** to open Developer Console
3. Click **Console** tab
4. Try placing an order
5. Look for error messages that start with "Supabase insert error:"
6. Copy those messages

## Common Errors and Solutions

| Error | Cause | Fix |
|-------|-------|-----|
| "User must be logged in" | Not authenticated | Make sure you're signed in before checkout |
| "service_id must be a numeric id" | Service ID invalid | Contact support - this shouldn't happen |
| "Failed to create order: row-level security" | RLS policy blocking insert | Check Supabase RLS policies (unlikely) |
| "Failed to create order: relation does not exist" | Database table missing | Contact support - database corrupted |
| "VITE_SUPABASE_URL is undefined" | Env var not set | Follow Steps 1-3 above to add variables |

## Need More Help?

If order placement still isn't working:

1. **Check the error message** in the red alert box
2. **Open browser console** (F12) and screenshot any error messages
3. **Verify env variables are set** in Vercel Settings → Environment Variables
4. **Confirm you're signed in** before trying to place an order

The error messages are now much clearer - they'll tell you exactly what went wrong! 🎯
