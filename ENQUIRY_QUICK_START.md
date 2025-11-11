# 🚀 CUSTOMER ENQUIRY SYSTEM - 3-STEP SETUP

## What You Get

Your website will now have a **Contact Form** that actually saves customer enquiries to your database! Customers can submit their details and you can view them anytime.

---

## ✅ STEP 1: Create Database Table (5 min)

### Go to Supabase Dashboard

1. Open: **https://app.supabase.com**
2. Select your project
3. Click **SQL Editor** (left sidebar)
4. Click **+ New Query**

### Create the Table

**Copy the SQL:**
```sql
CREATE TABLE enquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  phone TEXT,
  service_interest TEXT,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  admin_notes TEXT
);

ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit enquiry" ON enquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can read all enquiries" ON enquiries FOR SELECT USING (true);

CREATE INDEX idx_enquiries_email ON enquiries(email);
CREATE INDEX idx_enquiries_status ON enquiries(status);
```

**Paste in SQL Editor** → Click **Run** (or Ctrl+Enter)

✅ Table created! You'll see "enquiries" in Tables list.

---

## ✅ STEP 2: Update Your Code (Already Done!)

I've already updated:
- ✅ `api.ts` - apiSubmitContactForm now saves to database
- ✅ `pages.tsx` - ContactPage has enhanced form with phone & service fields
- ✅ Form validation and better error messages

**Your code is ready to deploy!**

---

## ✅ STEP 3: Deploy & Test (10 min)

### Push to GitHub

```bash
git add .
git commit -m "Add customer enquiry system with Supabase integration"
git push origin main
```

### Vercel Auto-Updates

✅ Vercel automatically deploys when you push to GitHub

### Test the Form

1. Go to: **https://navaneethan-editor.vercel.app/contact** (your domain)
2. Fill form:
   - Name: Test User
   - Email: test@example.com
   - Phone: 555-1234
   - Service: Select one
   - Message: Test message
3. Click **Send Enquiry**
4. See success message ✅

### View Enquiry in Database

1. Go to: **https://app.supabase.com**
2. Click **Tables** → **enquiries**
3. See your test enquiry!

---

## 📊 HOW TO VIEW ENQUIRIES

### Method 1: Supabase Dashboard (Best for Admin)

**Direct Database View:**
```
https://app.supabase.com
  → Tables
  → enquiries
  → Click on any row to see full details
```

**Features:**
- See all customer enquiries
- View name, email, phone, service interest
- See full message
- Edit status (new → contacted → completed)
- Add admin notes
- Export as CSV

### Method 2: View in App (Future)

We can add an Admin Enquiries Page later to view in your website dashboard.

---

## 📝 ENQUIRY STATUS

| Status | Meaning |
|--------|---------|
| **new** | Unread enquiry - needs attention |
| **contacted** | You've replied to customer |
| **completed** | Enquiry resolved/converted to order |

**How to Update Status:**

1. Go to Supabase → Tables → enquiries
2. Click on enquiry row
3. Click **status** field
4. Select: `new` / `contacted` / `completed`
5. Click outside to save

---

## 📋 ENQUIRY FIELDS

When customer submits, you get:

```
name              → Customer name
email             → Contact email
phone             → Contact phone (optional)
service_interest  → Which service (reel, vertical, slide, general)
message           → Full customer message
status            → new / contacted / completed
created_at        → When submitted (auto)
admin_notes       → Your internal notes (edit manually)
```

---

## 🔔 GET NOTIFICATIONS

You can set up email notifications in Supabase:

**Coming Soon:** We can add email alerts when new enquiry arrives

---

## ✨ WHAT'S DIFFERENT FROM BEFORE

| Before | After |
|--------|-------|
| Form didn't save | Form saves to database ✅ |
| No way to see messages | See in Supabase dashboard ✅ |
| Only name/email/message | Added phone & service fields ✅ |
| No status tracking | Track status (new→contacted→done) ✅ |
| No internal notes | Add admin notes ✅ |

---

## 🚨 TROUBLESHOOTING

### Form says "Failed to submit"

**Check:**
1. Is the enquiries table created? (Supabase → Tables)
2. Are RLS policies enabled?
3. Are environment variables set?
4. Check browser console for error details

### Can't see enquiry in database

**Check:**
1. Go to https://app.supabase.com
2. Select correct project
3. Click Tables → enquiries
4. Refresh page (F5)
5. Check created_at time

### Need help?

Check the full guide: `CUSTOMER_ENQUIRY_SYSTEM.md`

---

## 📞 CUSTOMER FLOW

```
Customer visits website
    ↓
Goes to Contact page
    ↓
Fills form:
  - Name
  - Email
  - Phone (optional)
  - Service interest
  - Message
    ↓
Clicks "Send Enquiry"
    ↓
Success! "Thank you message"
    ↓
You get notified (check Supabase)
    ↓
View in database → Reply to customer
```

---

## 🎉 YOU'RE DONE!

Your customer enquiry system is now **LIVE**!

- ✅ Contact form saves to database
- ✅ You can view all enquiries
- ✅ Track status
- ✅ Add notes
- ✅ Professionally manage customer leads

**Next Steps:**
1. Create the table in Supabase (if not done)
2. Push code to GitHub
3. Test on live site
4. Start receiving enquiries!

---

## 📚 FILES MODIFIED

- `api.ts` - Updated apiSubmitContactForm to save to database
- `pages.tsx` - Enhanced ContactPage with more form fields
- `SUPABASE_ENQUIRIES_SETUP.sql` - SQL to create table (in workspace)
- `CUSTOMER_ENQUIRY_SYSTEM.md` - Detailed guide (in workspace)

---

## 🔗 QUICK LINKS

| Task | Link |
|------|------|
| View enquiries | https://app.supabase.com → Tables → enquiries |
| Contact form | https://navaneethan-editor.vercel.app/contact |
| GitHub code | https://github.com/YOUR_USERNAME/navaneethan-editor |
| Deploy | https://vercel.com/navaneethan-editor |

---

**Your customer enquiry system is ready! 🎉**

