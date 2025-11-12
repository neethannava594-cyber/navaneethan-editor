# Troubleshooting: Why Enquiry is Not Being Added

## Quick Checklist - Check These First!

### ✅ Did You Redeploy?

**Question:** After adding the environment variables to Vercel, did you see the Redeploy complete?

- If **NO**: Go back and do the redeploy first! Without redeploy, the env vars won't be active.
- If **YES**: Continue to next step

---

## Step 1: Check Browser Console for Errors

The contact form might be failing silently. Let's see the actual error:

### On Your Website:

1. **Open:** https://navaneethan-editor.vercel.app/contact

2. **Press:** `F12` (opens Developer Tools)

3. **Click:** "Console" tab

   ```
   ┌─────────────────────────────────────────────────┐
   │ DevTools Window                                 │
   ├─────────────────────────────────────────────────┤
   │ Tabs: Elements | Console | Network | ...        │
   │              👆 Click here                      │
   └─────────────────────────────────────────────────┘
   ```

4. **Fill & Submit Form**

5. **Look for Error Messages** in Console

   ```
   Possible error messages you might see:

   ❌ "Cannot read property 'from' of undefined"
      → Supabase client not initialized

   ❌ "Invalid API key"
      → Environment variables not set correctly

   ❌ "Network error"
      → Can't reach Supabase

   ❌ "permission denied for schema public"
      → RLS policy problem
   ```

---

## Step 2: Verify Redeploy Completed

Go to: https://vercel.com/dashboard

1. Click your project: `navaneethan-editor`
2. Click `Deployments` tab
3. Look at your latest deployment:

```
Check the Status:

✅ GOOD - Says: Ready ✓
❌ BAD  - Says: Queued, Building, Failed

If it still says "Building" or "Queued":
  → Wait another 5 minutes

If it says "Failed":
  → Click on it to see the error
  → Tell me what the error says
```

---

## Step 3: Check Environment Variables Are Set

On Vercel, verify your environment variables were saved:

1. Go to: https://vercel.com/dashboard
2. Click your project: `navaneethan-editor`
3. Click `Settings` tab
4. Click `Environment Variables` on left sidebar
5. Look for both variables:

```
You should see:
✅ VITE_SUPABASE_URL ................. https://kz...
✅ VITE_SUPABASE_ANON_KEY ............ eyJhbG...
   (Both showing in Prod, Preview)

If you DON'T see them:
  → You need to add them again
```

---

## Step 4: Check Supabase Connection

Go to: https://app.supabase.com

1. Click your project
2. Click `SQL Editor` (left sidebar)
3. Click the query below to test:

```sql
SELECT * FROM enquiries ORDER BY created_at DESC LIMIT 5;
```

4. Click the **Play** button ▶️

```
Expected Result:

✅ GOOD - Shows: "Success. 0 rows"
         (even if no rows, it means table is working)

❌ BAD  - Shows error message like:
         "permission denied" or "relation does not exist"
```

---

## Common Problems & Solutions

### Problem 1: Form Shows Success But No Data in Supabase

**Cause:** Vercel env vars not active yet

**Fix:**
1. Go to Vercel dashboard
2. Wait 10+ minutes after redeploy
3. Refresh browser (F5)
4. Try form again

---

### Problem 2: Browser Console Shows "Cannot read property 'from' of undefined"

**Cause:** Supabase client not properly initialized

**Fix:**
1. Check `api.ts` file has the correct Supabase import
2. Make sure environment variables are set in Vercel

---

### Problem 3: "Invalid API key" Error

**Cause:** Wrong VITE_SUPABASE_ANON_KEY in Vercel

**Fix:**
1. Go to https://app.supabase.com
2. Select your project
3. Settings → API
4. Copy the correct "Anon public key"
5. Go to Vercel Settings → Environment Variables
6. Update VITE_SUPABASE_ANON_KEY with correct value
7. Redeploy again

---

### Problem 4: "permission denied" Error in Supabase

**Cause:** RLS policies are blocking inserts

**Fix:**
1. Go to Supabase
2. Click your project
3. Click `SQL Editor`
4. Run this to check RLS:

```sql
SELECT schemaname, tablename, rowsecurity FROM pg_tables WHERE tablename = 'enquiries';
```

Should show: `t` (TRUE - means RLS is enabled)

If RLS policies need to be added, run:

```sql
-- Allow anyone to insert
CREATE POLICY "Allow public insert" ON enquiries
    FOR INSERT WITH CHECK (true);

-- Allow anyone to select
CREATE POLICY "Allow public select" ON enquiries
    FOR SELECT USING (true);
```

---

## Detailed Troubleshooting Steps

### Did the form show "Message sent successfully!"?

**If YES:**
- Form itself is working
- Problem is between form and Supabase
- Check browser console (Step 1 above)

**If NO:**
- Form submission is failing
- Check browser console for error
- Verify all form fields are filled correctly

---

### Can you see the enquiries table in Supabase?

**If YES:**
- Database is fine
- Check environment variables on Vercel
- Check browser console for errors

**If NO:**
- Table doesn't exist or is deleted
- Need to recreate it with SQL script

---

## Quick Test

Let's do a quick test to see what's happening:

1. **Open browser console** (F12 → Console)
2. **Fill the contact form** with:
   ```
   Name: TestUser123
   Email: test@example.com
   Phone: 1234567890
   Service: reel
   Message: Testing123
   ```
3. **Submit the form**
4. **Tell me:**
   - What message appeared on the form? (success or error?)
   - What errors appear in the browser console? (if any)
   - Did the data appear in Supabase?

---

## What to Tell Me to Fix It

Tell me EXACTLY what you see:

1. **Form message:** (__success__ or __error__) - What does it say?
2. **Console errors:** (Copy any red error messages)
3. **Supabase data:** (Is there any data in the table?)
4. **Redeploy status:** (Does it say "Ready ✓"?)

Example:
```
Form message: Shows "Message sent successfully!"
Console error: "Cannot reach supabase"
Supabase data: No rows in enquiries table
Redeploy status: Says "Ready ✓"
```

---

## Let's Debug Together

**Please tell me:**
1. What error message do you see? (if any)
2. Does the redeploy say "Ready"?
3. Can you see the enquiries table in Supabase?

Then I'll help you fix it! 👇
