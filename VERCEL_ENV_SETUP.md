# Vercel Environment Variables Setup

## Your Supabase Credentials (Ready to Use)

**VARIABLE 1 (Project URL):**
```
https://kzheemfnnndvdhzslnfm.supabase.co
```

**VARIABLE 2 (Anon Key):**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt6aGVlbWZubm5kdmRoenNsbmZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4NDI4NTgsImV4cCI6MjA3ODQxODg1OH0.BfnnF6lKhH3baipOsfdUmNBWuGWmQbMX2tgh2x0LKX0
```

---

## How to Add to Vercel

### Step-by-Step Instructions:

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/dashboard

2. **Select Your Project**
   - Click on `navaneethan-editor` project

3. **Go to Settings**
   - Click the `Settings` tab (top navigation)

4. **Open Environment Variables**
   - Click on `Environment Variables` (left sidebar)

5. **Add First Variable**
   - Click `+ Add New` button
   - **Name:** `VITE_SUPABASE_URL`
   - **Value:** Paste the Project URL above
   - **Environments:** Check ✅ Production AND ✅ Preview
   - Click `Save`

6. **Add Second Variable**
   - Click `+ Add New` button again
   - **Name:** `VITE_SUPABASE_ANON_KEY`
   - **Value:** Paste the Anon Key above
   - **Environments:** Check ✅ Production AND ✅ Preview
   - Click `Save`

7. **Redeploy Your Application**
   - Go to `Deployments` tab (top navigation)
   - Find the latest deployment (should say "Ready")
   - Click the 3-dot menu `...` on the right
   - Select `Redeploy`
   - Wait 2-3 minutes for build to complete

---

## Verify It's Working

After redeploy completes:

1. **Visit Your Website**
   - Go to: https://navaneethan-editor.vercel.app/contact

2. **Test the Contact Form**
   - Fill in all fields
   - Click Submit
   - You should see "Message sent successfully!"

3. **Check Supabase**
   - Go to: https://app.supabase.com
   - Select your project
   - Click `Editor` (left sidebar)
   - Click `enquiries` table
   - You should now see your test entry! ✅

---

## If It Still Doesn't Work

**Check Browser Console (Advanced):**
- Press `F12` on the website
- Click `Console` tab
- Try submitting form again
- Look for any error messages
- Share the error with me

---

## Summary

You now have everything needed to:
1. ✅ Get Supabase credentials (DONE)
2. 📍 Add them to Vercel (NEXT - follow steps above)
3. 🔄 Redeploy on Vercel (AFTER adding variables)
4. ✔️ Test contact form (VERIFY data saves)

**Start with Step 1 above!**
