# Quick Deploy & Test - 5 Minutes

## STEP 1: Update Code on GitHub (2 min)

Since we added better error logging, we need to push the latest code to GitHub so Vercel automatically rebuilds.

### Option A: Using GitHub Desktop (Easiest)
1. Open **GitHub Desktop**
2. Your repo should already be loaded: `navaneethan-editor`
3. You'll see "Changes" tab showing modified files (should show `api.ts`)
4. Click **Commit to main**
   - Summary: "Add detailed order creation logging for debugging"
   - Description: "Added console logging with emoji indicators to debug order placement issues"
5. Click **Push origin**
6. Wait for push to complete

### Option B: Using Git Command Line
```bash
cd "c:\Users\SHIGADESIGN3\Downloads\Programs\navaneethan-editor"
git add api.ts
git commit -m "Add detailed order creation logging for debugging"
git push origin main
```

**Result:** GitHub will be updated and Vercel will automatically start rebuilding.

---

## STEP 2: Verify Vercel Deployment (2 min)

1. Go to **https://vercel.com/dashboard**
2. Click on your project: **navaneethan-editor**
3. You should see a **new deployment** starting
4. Wait for it to show **✓ Ready** (takes 1-3 minutes)
   - Shows in gray while building
   - Shows in green when ready

**Screenshot Check:** Take a screenshot of:
- Deployment status showing "✓ Ready"
- Environment variables section showing VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY

---

## STEP 3: Check Environment Variables (1 min)

1. In Vercel Dashboard for your project
2. Click **Settings** → **Environment Variables**
3. **VERIFY both variables are listed:**
   - ✓ `VITE_SUPABASE_URL` = `https://pbrcqyeiaajrhucjvcuv.supabase.co`
   - ✓ `VITE_SUPABASE_ANON_KEY` = `eyJhbGci...` (the long key)

**If MISSING:**
1. Click **Add New** for each missing variable
2. For `VITE_SUPABASE_URL`:
   ```
   Name: VITE_SUPABASE_URL
   Value: https://pbrcqyeiaajrhucjvcuv.supabase.co
   Environment: Production ✓
   ```
3. For `VITE_SUPABASE_ANON_KEY`:
   ```
   Name: VITE_SUPABASE_ANON_KEY
   Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBicmNxeWVpYWFqcmh1Y2p2Y3V2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4NDQ3OTAsImV4cCI6MjA3ODQyMDc5MH0.13_7z5f5PQ12Wii45q8w6aWFe21TQ4rBGlsquJePZIQ
   Environment: Production ✓
   ```
4. Click **Save & Deploy** after each

---

## STEP 4: Test Order Placement (1 min)

**Wait for Vercel to finish deploying, then:**

1. Open your live site: 
   - **https://navaneethan-editor.vercel.app** (or your project's URL)
   - Found in Vercel Dashboard → **Deployments** → **Visit**

2. **Log in** (if not already logged in)
   - Use your test email/password

3. **Navigate to a pricing package:**
   - Click on one of the packages (e.g., "Reel" for $2000)
   - Click **Choose Plan** button

4. **Fill in the order form:**
   - **Footage Links:** Paste ANY URL (e.g., `https://drive.google.com/file/d/1ABCxyz` or `https://youtube.com/watch?v=abc`)
   - **Instructions/Notes:** Type something like "Please edit in 4K"
   - Click **Place Order**

5. **Watch for response:**
   - ✅ SUCCESS: "✓ Order placed successfully! Redirecting to dashboard..."
   - ❌ ERROR: "❌ [Error message]"

---

## STEP 5: Verify in Supabase

1. Open **https://app.supabase.com**
2. Select your project
3. Go to **Tables** → **orders**
4. You should see your new order at the top:
   - **service_id**: 1, 2, or 3 (depending on which package you ordered)
   - **status**: `pending`
   - **createdAt**: Today's date
   - **user_id**: Your user ID

---

## STEP 6: Debug If It Fails

If the order didn't create:

1. **Open Developer Console:**
   - Press `F12` on the order page
   - Go to **Console** tab

2. **Try placing an order again**

3. **Look for these messages:**
   ```
   🔵 Starting order creation...
   ✓ User authenticated: [user-id]
   ✓ Order payload prepared: {...}
   ⏳ Inserting order into Supabase...
   ✅ Order created successfully: {...}
   ```

   **Or if error:**
   ```
   🔴 Supabase insert error: {
       message: "[specific error]",
       code: "[error code]",
       details: "[details]"
   }
   ```

4. **Share the error message** and we can fix it

---

## Common Error Messages & Fixes

| Error | Cause | Fix |
|-------|-------|-----|
| "Supabase URL and Anon Key must be provided" | Env vars not in Vercel | Add them to Vercel Settings → Environment Variables |
| "User must be logged in to create an order" | Not authenticated | Log out and log back in |
| "new row violates row level security (RLS) policy" | RLS policies too strict | Create RLS policies in Supabase (see SUPABASE_CONFIG_CHECKLIST.md) |
| "relation 'public.orders' does not exist" | Table not created | Create orders table in Supabase |
| No error, but order doesn't appear in DB | Silent failure | Check console logs for 🔴 messages |

---

## Summary

✅ Push code to GitHub → Vercel auto-rebuilds
✅ Verify env vars in Vercel
✅ Test order placement on live site
✅ Check browser console for detailed error logs
✅ Verify order in Supabase database

**Time:** ~5 minutes
**Result:** Either orders work, or you have detailed error messages to fix

