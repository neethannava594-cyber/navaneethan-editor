# How to Fill and Submit the Form - Picture by Picture

## Step 1: Open Your Website

**Copy this and paste in your browser address bar:**
```
https://navaneethan-editor.vercel.app/contact
```

**Or just click this link:** https://navaneethan-editor.vercel.app/contact

When it opens, you'll see your contact form page.

---

## Step 2: Look for the Form

You should see something like this on your screen:

```
┌─────────────────────────────────────────────────┐
│                                                 │
│              GET IN TOUCH                       │
│              Contact Me                         │
│                                                 │
│  ┌───────────────────────────────────────────┐ │
│  │ This is the FORM (white/dark box)        │ │
│  │                                           │ │
│  │ Name *                                    │ │
│  │ ┌─────────────────────────────────────┐  │ │
│  │ │ Your name                       ▌   │  │ │
│  │ └─────────────────────────────────────┘  │ │
│  │                                           │ │
│  │ Email *                                   │ │
│  │ ┌─────────────────────────────────────┐  │ │
│  │ │ your@email.com                  ▌   │  │ │
│  │ └─────────────────────────────────────┘  │ │
│  │                                           │ │
│  │ ... (more fields below)                  │ │
│  └───────────────────────────────────────────┘ │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## Step 3: Click on "Name" Box and Type

**Click inside the Name box** (where it says "Your name"):

```
┌────────────────────────────────────┐
│ Name *                             │
│ ┌──────────────────────────────┐  │
│ │ TestUser        ▌            │  │  ← Click here and type
│ └──────────────────────────────┘  │
└────────────────────────────────────┘
```

**Type this:**
```
TestUser
```

---

## Step 4: Click on "Email" Box and Type

**Click inside the Email box**:

```
┌────────────────────────────────────┐
│ Email *                            │
│ ┌──────────────────────────────┐  │
│ │ test@example.com   ▌         │  │  ← Click here and type
│ └──────────────────────────────┘  │
└────────────────────────────────────┘
```

**Type this:**
```
test@example.com
```

---

## Step 5: Click on "Phone" Box (Optional)

**Click inside the Phone box**:

```
┌────────────────────────────────────┐
│ Phone (Optional)                   │
│ ┌──────────────────────────────┐  │
│ │ 1234567890      ▌            │  │  ← Click here and type
│ └──────────────────────────────┘  │
└────────────────────────────────────┘
```

**Type this:**
```
1234567890
```

---

## Step 6: Click on "Service Interest" Dropdown

**Click on the dropdown box**:

```
┌────────────────────────────────────┐
│ Service Interest                   │
│ ┌──────────────────────────────┐  │
│ │ Pick one             ▼       │  │  ← Click here
│ └──────────────────────────────┘  │
└────────────────────────────────────┘
```

**When you click, a menu appears with options:**
```
┌──────────────────┐
│ reel             │  ← Pick this one
│ vertical         │
│ slide            │
│ general          │
└──────────────────┘
```

**Click on "reel"**

---

## Step 7: Click on "Message" Box and Type

**Click inside the Message box** (the big text area):

```
┌────────────────────────────────────┐
│ Message *                          │
│ ┌──────────────────────────────┐  │
│ │ Testing the form   ▌         │  │
│ │                              │  │
│ └──────────────────────────────┘  │
└────────────────────────────────────┘
```

**Type this:**
```
Testing the form to see if it works
```

---

## Step 8: Find and Click the Submit Button

**Scroll down a bit if you need to, and look for the Submit button at the bottom:**

```
┌────────────────────────────┐
│      Submit Button         │
│  ┌──────────────────────┐  │
│  │   SUBMIT             │  │  ← Click this button
│  └──────────────────────┘  │
└────────────────────────────┘
```

**Click it!**

---

## Step 9: Wait for Message

After clicking Submit, you'll see either:

### ✅ GREEN SUCCESS MESSAGE:
```
┌─────────────────────────────────────┐
│ ✅ Thank you for your enquiry!      │
│ I will get back to you within 24    │
│ hours.                              │
└─────────────────────────────────────┘
```

### ❌ RED ERROR MESSAGE:
```
┌─────────────────────────────────────┐
│ ❌ Error: Something went wrong      │
└─────────────────────────────────────┘
```

---

## Step 10: Check Browser Console

**While the form is showing the message, do this:**

1. **Press `F12`** (opens Developer Tools on bottom of screen)

2. **Click `Console` tab**

```
At bottom of browser:
┌─────────────────────────────────┐
│ Elements Console Sources Network │
│          👆 Click Console
└─────────────────────────────────┘
```

3. **Look for messages that say:**

```
🔵 Submitting customer enquiry...
```

Then look for:

```
✅ Enquiry submitted successfully: { ... }
```

OR

```
🔴 Enquiry submission error: { message: "..." }
```

---

## Summary - What You're Looking For

**GOOD (Form works):**
- ✅ Form shows GREEN success message
- ✅ Console shows: "✅ Enquiry submitted successfully"
- ✅ Data appears in Supabase table

**BAD (Form doesn't work):**
- ❌ Form shows RED error message
- ❌ Console shows: "🔴 Enquiry submission error"
- ❌ No data in Supabase table
- ❌ Red error text in console

---

## What to Tell Me

After you fill the form and submit, tell me:

1. **What color message did you see?** (green or red?)
2. **What did the message say exactly?**
3. **What do you see in the Console?** (copy-paste the text you see)
4. **Any red errors in Console?**

Then I'll fix it! 👇
