# ✅ CUSTOMER ENQUIRY SYSTEM - DEPLOYMENT CHECKLIST

## PRE-DEPLOYMENT (Do First)

- [ ] **1. Create Supabase Table**
  - Go to: https://app.supabase.com
  - Click: SQL Editor
  - Paste SQL from: `SUPABASE_ENQUIRIES_SETUP.sql`
  - Click: Run
  - Verify: See "enquiries" table in Tables list

- [ ] **2. Verify Code Changes**
  - ✅ `api.ts` - Updated with real enquiry saving
  - ✅ `pages.tsx` - Updated with enhanced form
  - ✅ No error messages in editor

- [ ] **3. Test Locally (Optional)**
  - Run: `npm run dev`
  - Go to: http://localhost:5173/contact
  - Fill form and submit
  - Check browser console for error details

---

## DEPLOYMENT (3 Steps)

### Step 1: Git Commit

```bash
cd c:\Users\SHIGADESIGN3\Downloads\Programs\navaneethan-editor

git add .

git commit -m "Add customer enquiry system with Supabase integration"

git push origin main
```

**Verify:**
- [ ] No errors during git commands
- [ ] See "files changed" message
- [ ] GitHub shows new commits

### Step 2: Vercel Auto-Deploy

- [ ] Wait 2-3 minutes for Vercel to build
- [ ] Check: https://vercel.com/navaneethan-editor
- [ ] See green checkmark (deployment successful)
- [ ] If red X, click to see error details

### Step 3: Test Live Site

- [ ] Go to: https://navaneethan-editor.vercel.app/contact
- [ ] Fill form:
  - Name: Test Name
  - Email: test@example.com
  - Phone: 555-1234
  - Service: Select "Reel"
  - Message: Test message
- [ ] Click: "Send Enquiry"
- [ ] See: Success message ✅
- [ ] Check: https://app.supabase.com → Tables → enquiries
- [ ] See: Your test enquiry saved

---

## POST-DEPLOYMENT (Verification)

- [ ] **Contact form works on live site**
  - Test from different device/browser
  - Verify success message appears

- [ ] **Enquiry saves to database**
  - Supabase → Tables → enquiries
  - See new entries after form submit

- [ ] **Status can be updated**
  - Click enquiry row
  - Change status field
  - Verify it saves

- [ ] **Admin notes work**
  - Click enquiry row
  - Edit admin_notes field
  - Verify it saves

- [ ] **No JavaScript errors**
  - Open browser console (F12)
  - Submit form
  - Should see SUCCESS logs, not errors

---

## ROLLBACK (If Something Breaks)

If deployment has issues:

```bash
# Revert last commit
git revert HEAD

# Push to GitHub
git push origin main

# Vercel auto-redeploys previous version
```

---

## VERIFICATION COMMANDS

### Check Git Status
```bash
git status
# Should show "On branch main, nothing to commit"
```

### Check Recent Commits
```bash
git log --oneline -5
# Should see your commit message
```

### Check GitHub
```
https://github.com/YOUR_USERNAME/navaneethan-editor
# Should show your new commits
```

### Check Vercel
```
https://vercel.com/navaneethan-editor
# Should show deployment timestamp
```

---

## FINAL CHECKLIST

- [ ] Supabase table created
- [ ] Code updated (api.ts, pages.tsx)
- [ ] Git changes committed and pushed
- [ ] Vercel deployment successful
- [ ] Contact form works on live site
- [ ] Test enquiry saved in database
- [ ] Can view enquiry in Supabase
- [ ] Status can be updated
- [ ] Admin notes can be edited
- [ ] No JavaScript errors in console

---

## SUCCESS! 🎉

When all boxes checked, your customer enquiry system is **LIVE**!

### What's Now Live:

✅ **Contact form** saves enquiries to database
✅ **Customers** can submit via website
✅ **You** can view in Supabase dashboard
✅ **Manage** enquiry status and add notes
✅ **Track** all customer leads

### Daily Operations:

1. Customer submits contact form
2. You get enquiry in Supabase database
3. You contact customer
4. Update status and add notes
5. Convert to order or close

---

## SUPPORT LINKS

| Issue | Link |
|-------|------|
| View enquiries | https://app.supabase.com → Tables → enquiries |
| Check deployment | https://vercel.com/navaneethan-editor |
| Contact form | https://navaneethan-editor.vercel.app/contact |
| GitHub code | https://github.com/YOUR_USERNAME/navaneethan-editor |
| SQL setup | SUPABASE_ENQUIRIES_SETUP.sql (in workspace) |

---

**Ready to deploy? Follow the Deployment section above! 🚀**

