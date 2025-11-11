# 👁️ QUICK VIEW - FIND CUSTOMERS & ORDERS

## YOU ASKED: "where to find customer details and order list how can i see"

## ANSWER: 2 WAYS

---

## WAY 1: SUPABASE DASHBOARD (Best Option) ⭐

### View All Orders:
```
1. Go to: https://app.supabase.com
2. Log in
3. Select your project
4. Click: Tables (left sidebar)
5. Click: orders
6. ✅ You see ALL orders in a table
```

**You'll see columns:**
- `id` - Order ID
- `user_id` - Customer ID
- `service_id` - Which package (1, 2, or 3)
- `status` - Current status (pending, completed, etc.)
- `priceEstimate` - Price quoted
- `createdAt` - When they ordered
- `footageLinks` - Links to footage
- `notes` - Customer instructions

### View All Customers:
```
1. Go to: https://app.supabase.com
2. Log in
3. Select your project
4. Click: Authentication (left sidebar)
5. Click: Users
6. ✅ You see ALL registered customers
```

**You'll see:**
- Email address
- When they signed up
- Their account status

---

## WAY 2: YOUR WEBSITE DASHBOARD

### View Your Profile & Orders:
```
1. Go to: https://navaneethan-editor.vercel.app
2. Log in
3. Click: Dashboard
4. ✅ You see your info and orders
```

---

## QUICK REFERENCE

| Need | Location | Steps |
|------|----------|-------|
| **See all orders** | Supabase Tables | Click orders table |
| **See all customers** | Supabase Auth | Click Users |
| **Find order details** | Supabase orders | Click row to expand |
| **Filter orders** | Supabase orders | Click filter icon |
| **Edit order status** | Supabase orders | Click status cell |
| **Contact customer** | Supabase Users | Search user email |

---

## EXAMPLE: FIND AN ORDER

### Step 1: Go to Supabase
```
https://app.supabase.com
```

### Step 2: Go to Orders Table
```
Tables → orders
```

### Step 3: You See (example data)
```
┌────────────────────────────────────────────┐
│ Order ID  │ Customer │ Service │ Status    │
├────────────────────────────────────────────┤
│ abc123    │ user1    │ 1       │ pending   │
│ def456    │ user2    │ 2       │ completed │
│ ghi789    │ user3    │ 3       │ editing   │
└────────────────────────────────────────────┘
```

### Step 4: Click Order Row
```
Click "abc123" to see full details:
- Footage links
- Notes from customer
- Quoted price
- When created
```

---

## FIND CUSTOMER DETAILS

### Method 1: From Order
```
1. Find order in orders table
2. See user_id column
3. Remember that ID
4. Go to Authentication → Users
5. Search for that user ID
6. ✓ Found customer!
```

### Method 2: Direct Search
```
1. Go to Supabase
2. Authentication → Users
3. You see list of all customers
4. Click customer name
5. ✓ See their details
```

---

## EXAMPLE DATA

### If you placed a test order:

**In orders table, you'd see:**
```
id: "123abc"
user_id: "456def"
service_id: 1 (Reel package)
status: "pending"
priceEstimate: 2000
footageLinks: ["https://youtube.com/...", "https://drive.google.com/..."]
notes: "Make it 4K, add music"
createdAt: "2025-11-11T10:30:00Z"
```

**In auth.users, you'd see:**
```
email: your@email.com
created_at: "2025-11-10T15:20:00Z"
user_metadata: {
  name: "Your Name"
}
```

---

## ORDER STATUS OPTIONS

```
pending      = Just created
editing      = You're working on it
draft_ready  = Draft is done
review       = Sent to customer
revision     = Customer wants changes
completed    = Finished, delivered
cancelled    = Order was cancelled
```

---

## FILTER ORDERS EXAMPLE

### Filter to show only completed orders:
```
1. Open orders table
2. Click filter icon (funnel)
3. Select: status = completed
4. Click Apply
5. ✓ See only completed orders
```

### Filter by date:
```
1. Open orders table
2. Click filter icon
3. Select: createdAt > [date]
4. Click Apply
5. ✓ See orders after that date
```

---

## EDIT ORDER STATUS

### To change an order:
```
1. Go to orders table
2. Find the order
3. Click the status cell
4. Change to: "completed" or "editing" etc
5. Press Enter
6. ✓ Updated!
```

---

## YOUR LINKS

| Access | Link |
|--------|------|
| **Supabase Orders** | https://app.supabase.com → Tables → orders |
| **Supabase Customers** | https://app.supabase.com → Authentication → Users |
| **Your Website** | https://navaneethan-editor.vercel.app |

---

## COMMON QUESTIONS

**Q: Where are all my customers?**
A: Supabase → Authentication → Users

**Q: Where are all my orders?**
A: Supabase → Tables → orders

**Q: How do I know which customer made which order?**
A: Use user_id from order to find customer in Users

**Q: Can I edit an order?**
A: Yes, click any cell in Supabase and type

**Q: How do I filter orders?**
A: Click filter icon in Supabase orders table

**Q: How do I see completed orders only?**
A: Filter: status = "completed"

---

## RIGHT NOW, GO TO:

```
https://app.supabase.com
→ Tables
→ orders
```

**You'll see your order list!** 📊

If no orders yet, place one first:
```
https://navaneethan-editor.vercel.app
→ Log in
→ Choose Plan
→ Place Order
→ Then check Supabase
```

