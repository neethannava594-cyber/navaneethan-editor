# WHERE to Add Environment Variables in Vercel - Visual Guide

## Step 1: Go to Vercel Website

**Open this link in your browser:**
```
https://vercel.com
```

You'll see the Vercel homepage.

---

## Step 2: Login to Your Account

**Click on your profile picture** (top right corner):

```
┌──────────────────────────────────────────┐
│ Vercel Website                           │
│                                          │
│ Top Right Corner:                        │
│ ┌─────────────────────────────────────┐ │
│ │ ... | ... | [Profile Picture] ← HERE│ │
│ └─────────────────────────────────────┘ │
└──────────────────────────────────────────┘
```

**Click on your profile picture or name**

---

## Step 3: Go to Dashboard

After logging in, you should see a menu. Click **"Dashboard"**:

```
Menu that appears:
├─ Dashboard        ← CLICK THIS
├─ Settings
├─ Billing
└─ Logout
```

Or go directly to: **https://vercel.com/dashboard**

---

## Step 4: Find Your Project

You'll see a list of your projects:

```
┌──────────────────────────────────────────────┐
│ Dashboard                                    │
│                                              │
│ Your projects:                               │
│                                              │
│ ┌────────────────────────────────────────┐  │
│ │ navaneethan-editor              ← HERE│  │
│ │ Production • github.com/..     │        │  │
│ └────────────────────────────────────────┘  │
│                                              │
│ ┌────────────────────────────────────────┐  │
│ │ (other projects if you have any)      │  │
│ └────────────────────────────────────────┘  │
│                                              │
└──────────────────────────────────────────────┘
```

**Click on "navaneethan-editor"**

---

## Step 5: You're Now in Your Project

After clicking your project, you'll see this page:

```
┌──────────────────────────────────────────────────┐
│ navaneethan-editor                               │
│ Production                                       │
│                                                  │
│ Top Navigation Tabs:                             │
│ ┌─────────────────┬──────────┬─────────────────┐ │
│ │ Deployments     │ Settings │ Domains  | ...  │ │
│ └─────────────────┴──────────┴─────────────────┘ │
│       (current tab)  ← CLICK Settings next     │
│                                                  │
│ Your Deployments (list of past builds):          │
│ ├─ Latest deployment...                          │
│ └─ ...                                           │
│                                                  │
└──────────────────────────────────────────────────┘
```

**Click on the "Settings" tab** (at the top)

---

## Step 6: Click Settings Tab

You're now in Settings. Look at the top navigation:

```
┌──────────────────────────────────────────────┐
│ navaneethan-editor                           │
│                                              │
│ ┌──────────────┬──────────┬──────────────┐  │
│ │ Deployments  │ Settings │ Domains      │  │
│ └──────────────┴──────────┴──────────────┘  │
│                 ← YOU ARE HERE (Settings)   │
└──────────────────────────────────────────────┘
```

---

## Step 7: Click Environment Variables

On the **LEFT SIDE** of the Settings page, you'll see a menu:

```
Settings Menu (Left Side):

├─ General
├─ Git
├─ Environment Variables        ← CLICK THIS
├─ Domains
├─ Functions
├─ Analytics
└─ ...
```

**Click on "Environment Variables"**

---

## Step 8: You're in the Right Place!

Now you should see this:

```
┌────────────────────────────────────────────────┐
│ Environment Variables                          │
│                                                │
│ Environment Variables in the Production,       │
│ Preview, and Development environments are      │
│ available to your Deployments and Functions.   │
│                                                │
│ ┌────────────────────────────────────────────┐ │
│ │ + Add New                               ←  │ │
│ └────────────────────────────────────────────┘ │
│                                                │
│ Existing Variables:                            │
│ ┌────────────────────────────────────────────┐ │
│ │ Name              Value          Envs      │ │
│ ├────────────────────────────────────────────┤ │
│ │ (empty or your existing vars)              │ │
│ └────────────────────────────────────────────┘ │
│                                                │
└────────────────────────────────────────────────┘
```

---

## Step 9: Check if Variables Already Exist

**Look at the table to see if these two variables are already there:**

```
Existing Variables table:

Should show something like:
┌─────────────────────────────────────────────────┐
│ Name                │ Value      │ Environments │
├─────────────────────────────────────────────────┤
│ VITE_SUPABASE_URL   │ https://..  │ Prod, Prev  │
├─────────────────────────────────────────────────┤
│ VITE_SUPABASE_ANON_KEY │ eyJh...  │ Prod, Prev  │
└─────────────────────────────────────────────────┘
```

**If you see BOTH variables listed → ✅ They're already added! Skip to Step 12**

**If you DON'T see them → Continue to Step 10**

---

## Step 10: Add First Variable

**Click the "+ Add New" button**

```
┌────────────────────────────────────────────────┐
│ + Add New                                      │
│ ▲ Click this button                           │
└────────────────────────────────────────────────┘
```

A form appears with 3 sections:

```
┌────────────────────────────────────────────────┐
│ NAME SECTION:                                  │
│ ┌────────────────────────────────────────────┐ │
│ │ Name *                                     │ │
│ │ ┌──────────────────────────────────────┐  │ │
│ │ │ [empty box] ← TYPE YOUR NAME HERE  │  │ │
│ │ └──────────────────────────────────────┘  │ │
│ └────────────────────────────────────────────┘ │
│                                                │
│ VALUE SECTION:                                 │
│ ┌────────────────────────────────────────────┐ │
│ │ Value *                                    │ │
│ │ ┌──────────────────────────────────────┐  │ │
│ │ │ [empty box] ← PASTE YOUR VALUE HERE│  │ │
│ │ └──────────────────────────────────────┘  │ │
│ └────────────────────────────────────────────┘ │
│                                                │
│ ENVIRONMENTS SECTION:                          │
│ ┌────────────────────────────────────────────┐ │
│ │ Environments *                             │ │
│ │ ☐ Production  ← CHECK THIS                │ │
│ │ ☐ Preview     ← CHECK THIS                │ │
│ │ ☐ Development                             │ │
│ └────────────────────────────────────────────┘ │
│                                                │
│ BUTTONS:                                       │
│ ┌──────────┐  ┌────────┐                      │
│ │ Save     │  │ Cancel │                      │
│ └──────────┘  └────────┘                      │
└────────────────────────────────────────────────┘
```

---

## Step 11: Fill in First Variable (VITE_SUPABASE_URL)

**In the NAME box, type:**
```
VITE_SUPABASE_URL
```

**In the VALUE box, paste:**
```
https://kzheemfnnndvdhzslnfm.supabase.co
```

**Check the boxes:**
- ✅ Production (click to check)
- ✅ Preview (click to check)

**Click "Save"**

---

## Step 12: Add Second Variable

Click "+ Add New" again

**In the NAME box, type:**
```
VITE_SUPABASE_ANON_KEY
```

**In the VALUE box, paste:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt6aGVlbWZubm5kdmRoenNsbmZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4NDI4NTgsImV4cCI6MjA3ODQxODg1OH0.BfnnF6lKhH3baipOsfdUmNBWuGWmQbMX2tgh2x0LKX0
```

**Check the boxes:**
- ✅ Production (click to check)
- ✅ Preview (click to check)

**Click "Save"**

---

## Step 13: Verify Both Variables Added

You should now see BOTH variables in the table:

```
Existing Variables:
┌──────────────────────────────────────────────┐
│ Name                   │ Value    │ Envs     │
├──────────────────────────────────────────────┤
│ VITE_SUPABASE_URL      │ https... │ P, Pr   │
├──────────────────────────────────────────────┤
│ VITE_SUPABASE_ANON_KEY │ eyJha... │ P, Pr   │
└──────────────────────────────────────────────┘
```

✅ **Done adding variables!**

---

## Step 14: Redeploy Your Website

Now you need to rebuild with these new variables:

1. **Click "Deployments" tab** (at top, next to Settings)

```
┌──────────────────────┬──────────┐
│ Deployments          │ Settings │ ← WAS HERE
└──────────────────────┴──────────┘
   ← CLICK HERE
```

2. **Find your latest deployment** (at top of list)

3. **Click the "..." menu** on the right side

```
Latest Deployment
Add customer enquiry system...
Ready ✓  | master | 2 hours ago | [...]
                                    ← CLICK HERE
```

4. **Click "Redeploy"**

```
Menu:
├─ Inspect
├─ Redeploy    ← CLICK THIS
├─ Promote
└─ Delete
```

5. **Confirm by clicking "Redeploy" button**

---

## Step 15: Wait for Build

Watch the deployment status:

```
Status: Building ⏳
[████░░░░░░░░░] 40%

Please wait... (2-3 minutes)
```

When it says **"Ready ✓"**, you're done! ✅

---

## Summary - Quick Checklist

- [ ] Opened https://vercel.com/dashboard
- [ ] Clicked your project (navaneethan-editor)
- [ ] Clicked Settings tab
- [ ] Clicked Environment Variables
- [ ] Added VITE_SUPABASE_URL
- [ ] Added VITE_SUPABASE_ANON_KEY
- [ ] Both set to Production AND Preview
- [ ] Clicked Deployments tab
- [ ] Clicked "..." on latest deployment
- [ ] Clicked Redeploy
- [ ] Waited for "Ready ✓"

**All done? Now test your form!** 👇
