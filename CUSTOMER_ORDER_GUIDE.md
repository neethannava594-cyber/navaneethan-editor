# 📋 CUSTOMER & ORDER GUIDE

## Your Question: "where to find customer details and order list"

---

## ANSWER: 2 PLACES

### 1️⃣ SUPABASE (Database) - BEST FOR COMPLETE DATA

**Go to:** https://app.supabase.com

#### To see ALL Orders:
```
1. Click Tables (left sidebar)
2. Click orders
3. See all orders in a table
4. Columns: id, user_id, service_id, status, createdAt, etc.
```

#### To see ALL Customers:
```
1. Click Authentication (left sidebar)
2. Click Users
3. See all registered customers
4. Columns: email, created_at, status, etc.
```

---

### 2️⃣ YOUR WEBSITE - QUICK VIEW

**Go to:** https://navaneethan-editor.vercel.app

```
1. Log in
2. Click Dashboard
3. See your profile and orders
```

---

## QUICK DATA VIEW

### Orders Table Shows:
| Column | Meaning |
|--------|---------|
| `id` | Unique order ID |
| `user_id` | Which customer |
| `service_id` | Which package (1=Reel, 2=Vertical, 3=Slide) |
| `status` | pending / editing / completed / etc |
| `priceEstimate` | Quoted price |
| `createdAt` | When they ordered |
| `footageLinks` | Customer's video links |
| `notes` | Instructions from customer |

### Customers Table Shows:
| Column | Meaning |
|--------|---------|
| `email` | Customer email |
| `created_at` | When signed up |
| `status` | active / inactive |

---

## HOW TO MATCH CUSTOMER TO ORDER

```
1. Open orders table
2. Find the order
3. Note the user_id
4. Go to Users (Authentication)
5. Find that user_id
6. ✓ Found the customer!
```

---

## FILTER ORDERS

**To see only completed orders:**
```
1. Open orders table
2. Click filter icon
3. Set: status = completed
4. ✓ See only completed
```

**To see orders from today:**
```
1. Open orders table
2. Click filter icon
3. Set: createdAt = today
4. ✓ See today's orders
```

---

## EDIT ORDER STATUS

**To change status of an order:**
```
1. Open orders table
2. Find the order
3. Click status cell
4. Change to: completed / editing / etc
5. Save
6. ✓ Status updated
```

---

## SERVICE IDS (What They Mean)

```
service_id = 1  →  Reel Package ($2000)
service_id = 2  →  Vertical Package ($3000)
service_id = 3  →  Slide Package ($2500)
```

---

## ORDER STATUS VALUES

```
pending    = Just placed, not started
editing    = Currently working on it
completed  = Finished, delivered
review     = Sent to customer for feedback
revision   = Customer wants changes
draft_ready = Draft complete
cancelled   = Cancelled order
```

---

## QUICK ACTIONS

| Want To | Go To |
|---------|-------|
| See all orders | Supabase → Tables → orders |
| See all customers | Supabase → Authentication → Users |
| Edit an order | Click order row, edit fields |
| Filter orders | Click filter icon in table |
| Export orders | Click export/download button |
| Find customer email | Authentication → Users → search |

---

## RIGHT NOW

### Go Here to See Orders:
```
https://app.supabase.com
  → Tables
  → orders
```

### Go Here to See Customers:
```
https://app.supabase.com
  → Authentication
  → Users
```

---

## EXAMPLE

**If you see order like this:**
```
id: "order123"
user_id: "user456"
service_id: 1
status: "pending"
priceEstimate: 2000
createdAt: "2025-11-11 10:30 AM"
notes: "Make it 4K"
footageLinks: ["link1", "link2"]
```

**It means:**
- Customer with ID "user456" ordered
- They want the Reel package ($2000)
- Status: Just created (pending)
- They want it in 4K
- They provided 2 video links

---

**That's it! Go to Supabase and check your orders! 📊**

