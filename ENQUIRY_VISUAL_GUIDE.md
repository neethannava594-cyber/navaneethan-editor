# 📸 CUSTOMER ENQUIRY SYSTEM - VISUAL GUIDE

## 1️⃣ CONTACT FORM (Customer Side)

```
┌─────────────────────────────────────┐
│     GET IN TOUCH - CONTACT ME       │
├─────────────────────────────────────┤
│                                     │
│ Name *                              │
│ [Your name _______________]         │
│                                     │
│ Email *                             │
│ [your@email.com ___________]        │
│                                     │
│ Phone (Optional)                    │
│ [555-1234 _________________]        │
│                                     │
│ Service Interest                    │
│ [▼ Select a service...]             │
│   - Reel ($2000)                    │
│   - Vertical ($3000)                │
│   - Slide ($2500)                   │
│   - General Enquiry                 │
│                                     │
│ Message *                           │
│ [Tell me about your project...      │
│  _________________________________  │
│  _________________________________] │
│                                     │
│        [SEND ENQUIRY]               │
│                                     │
│ ✅ Thank you for your enquiry!     │
│ I will get back within 24 hours.   │
│                                     │
└─────────────────────────────────────┘
```

---

## 2️⃣ DATABASE (YOUR VIEW IN SUPABASE)

```
┌─────────────────────────────────────────────────────────────────┐
│ supabase.com → Tables → enquiries                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ ID               Name          Email            Status   Date   │
│ ────────────────────────────────────────────────────────────── │
│ enq_001         John Smith    john@ex...       new      11/11   │
│ enq_002         Sarah James   sarah@ex...      new      11/10   │
│ enq_003         Mike Brown    mike@ex...       contacted 11/09  │
│ enq_004         Lisa Patel    lisa@ex...       completed 11/08  │
│                                                                 │
│ [Click on row to see full details ↓]                            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 3️⃣ ENQUIRY DETAIL VIEW (IN SUPABASE)

```
┌─────────────────────────────────────────────────────────┐
│ Enquiry Details (Click on row above)                    │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ id: abc123xyz789                                        │
│ name: John Smith                                        │
│ email: john@example.com                                 │
│ phone: +1-555-1234                                      │
│ service_interest: reel                                  │
│ status: [new ▼] (editable)                              │
│                                                         │
│ message:                                                │
│ "Hi, I need a 30-second reel for my business.          │
│  The budget is around $2000 and I need it by            │
│  Friday. Can you help?"                                 │
│                                                         │
│ admin_notes:                                            │
│ [Budget $2000, needs Friday, urgent ____]              │
│                                                         │
│ created_at: 2025-11-11T10:30:00Z                       │
│ updated_at: 2025-11-11T10:30:00Z                       │
│                                                         │
│ [Save] [Delete]                                         │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 4️⃣ YOUR WORKFLOW

```
┌──────────────────────────────────────────────────────────────────┐
│                    ENQUIRY MANAGEMENT FLOW                        │
└──────────────────────────────────────────────────────────────────┘

CUSTOMER SIDE:
  Customer visits website
        ↓
  Clicks "Contact" page
        ↓
  Fills form:
  ├─ Name: John Smith
  ├─ Email: john@example.com
  ├─ Phone: +1-555-1234
  ├─ Service: Reel ($2000)
  └─ Message: I need a video...
        ↓
  Clicks "Send Enquiry"
        ↓
  Sees: ✅ "Thank you! I'll get back in 24 hours"
        ↓
        ↓
YOUR SIDE (SUPABASE DASHBOARD):
        ↓
  Check emails / Visit Supabase
        ↓
  View new enquiry in database
        ↓
  Read customer message
        ↓
  Add notes: "Budget $2000, needs Friday"
        ↓
  Update status: new → contacted
        ↓
  Send email/call customer
        ↓
  Update status: contacted → completed
        ↓
  When order placed: status = completed
```

---

## 5️⃣ STATUS LIFECYCLE

```
ENQUIRY JOURNEY:

Step 1: Customer submits
┌──────────────────────┐
│ Status: new          │
│ = Unread enquiry     │
│ = Needs attention    │
└──────────────────────┘
         ↓
Step 2: You read & reply
┌──────────────────────┐
│ Status: contacted    │
│ = You've emailed/    │
│   called customer    │
└──────────────────────┘
         ↓
Step 3: End result
┌──────────────────────┐
│ Status: completed    │
│ = Customer placed    │
│   order OR declined  │
└──────────────────────┘
```

---

## 6️⃣ ACCESSING THE SYSTEM

```
FOR CUSTOMERS:
═════════════════════════════════════════════
Website → Contact Page → Fill Form → Submit
   ↓
https://navaneethan-editor.vercel.app/contact
═════════════════════════════════════════════

FOR YOU (ADMIN):
═════════════════════════════════════════════
Supabase Dashboard → Tables → enquiries
   ↓
https://app.supabase.com
   ↓
Login → Select Project → Tables → enquiries
═════════════════════════════════════════════
```

---

## 7️⃣ ENQUIRY FIELDS

```
Field Name          What Goes Here          Example
───────────────────────────────────────────────────────────
name                Customer name            John Smith
email               Contact email            john@email.com
phone               Phone number (opt)       +1-555-1234
service_interest    Which service            reel
message             Their message            30-sec video needed...
status              new/contacted/done       new
created_at          Submitted time           2025-11-11 10:30
admin_notes         Your internal notes      "Urgent, budget $2k"
```

---

## 8️⃣ QUICK ACTIONS IN SUPABASE

```
TASK: Update Status
─────────────────────────────────────
1. Open Supabase → Tables → enquiries
2. Click on enquiry row
3. Click "status" field
4. Select: new / contacted / completed
5. Click outside to save ✓

TASK: Add Notes
─────────────────────────────────────
1. Open Supabase → Tables → enquiries
2. Click on enquiry row
3. Click "admin_notes" field
4. Type: "Your notes here"
5. Click outside to save ✓

TASK: View Message
─────────────────────────────────────
1. Open Supabase → Tables → enquiries
2. Click on enquiry row
3. See full "message" field
4. Read customer's complete message

TASK: Export All Enquiries
─────────────────────────────────────
1. Open Supabase → Tables → enquiries
2. Click "..." menu (top right)
3. Select "Export as CSV"
4. Download file
5. Open in Excel/Google Sheets
```

---

## 9️⃣ FORM VALIDATION

```
WHEN CUSTOMER SUBMITS:

✅ VALID (Accepted)
├─ Name: Not empty
├─ Email: Valid format (has @)
└─ Message: Not empty

❌ INVALID (Shows error)
├─ Name: Empty → "Please fill name"
├─ Email: Empty/wrong → "Please fill email"
└─ Message: Empty → "Please fill message"

Optional fields (won't block):
├─ Phone: Can be empty
└─ Service: Can skip
```

---

## 🔟 SECURITY

```
WHO CAN DO WHAT:

ANYONE (Public):
  ✓ View contact form
  ✓ Submit enquiry
  ✗ See other enquiries

YOU (Admin):
  ✓ View all enquiries
  ✓ Edit status
  ✓ Add notes
  ✓ Update enquiries
  ✗ Delete from form

DATABASE (Supabase RLS):
  ✓ Validates all input
  ✓ Only saves to enquiries table
  ✓ Prevents unauthorized access
  ✗ No direct SQL injection possible
```

---

## 1️⃣1️⃣ EXAMPLE: FULL ENQUIRY

```
CUSTOMER SUBMITS:
══════════════════════════════════════════════

Name:              Sarah Johnson
Email:             sarah@businesses.com
Phone:             +1-206-555-7890
Service Interest:  vertical
Message:           "Hi! I need a vertical video for Instagram Stories.
                   We want to showcase our product. Budget is flexible.
                   Looking for quick turnaround - ideally 1 week?"

GETS SAVED IN DATABASE:
══════════════════════════════════════════════

id:               enq_005_xyz
name:             Sarah Johnson
email:            sarah@businesses.com
phone:            +1-206-555-7890
service_interest: vertical
message:          "Hi! I need a vertical video..."
status:           new
created_at:       2025-11-11T14:45:30Z
updated_at:       2025-11-11T14:45:30Z
admin_notes:      (empty until you add notes)

YOU UPDATE IN SUPABASE:
══════════════════════════════════════════════

status:           new → contacted
admin_notes:      "Called - confirmed, needs 1 week, flexible budget"
```

---

## 1️⃣2️⃣ TROUBLESHOOTING VISUAL

```
PROBLEM: Form says "Failed to submit"
┌─────────────────────────────────────────┐
│ ❌ Failed to submit enquiry               │
│                                          │
│ SOLUTIONS:                               │
│ 1. Is enquiries table created?           │
│    → Go to Supabase → Tables            │
│    → Should see "enquiries" listed      │
│                                          │
│ 2. Check internet connection            │
│    → Try again in a moment              │
│                                          │
│ 3. Open browser console (F12)           │
│    → Look for error message             │
│    → Take screenshot of error           │
└─────────────────────────────────────────┘

PROBLEM: Can't see enquiry in database
┌─────────────────────────────────────────┐
│ SOLUTIONS:                               │
│ 1. Refresh page (F5)                    │
│ 2. Check project selected               │
│    → app.supabase.com                   │
│    → Is your project selected?          │
│ 3. Check Tables section                 │
│    → Tables → enquiries                 │
│    → Should list all submissions        │
│ 4. Check timestamp                      │
│    → Did you just submit?               │
│    → Check created_at time              │
└─────────────────────────────────────────┘
```

---

**That's the complete visual guide! You now understand the entire system.** 🎉

