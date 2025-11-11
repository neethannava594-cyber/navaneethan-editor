# 📊 HOW TO VIEW CUSTOMER DETAILS & ORDER LIST

## WHERE TO FIND EVERYTHING

You can access all customer and order information in **2 places:**

1. **Your Live Website Dashboard** (easiest - for quick viewing)
2. **Supabase Dashboard** (complete database view - most detailed)

---

## OPTION 1: VIEW ON YOUR WEBSITE (EASIEST)

### Access Your Dashboard
1. Go to your live site: https://navaneethan-editor.vercel.app (or your domain)
2. **Log in** as admin (use your email/password)
3. Click **Dashboard** in navigation
4. You should see order information there

**What you can see:**
- Your profile information
- Order history (if created any)
- Services you offer
- Your portfolio

---

## OPTION 2: VIEW IN SUPABASE (MOST COMPLETE) ⭐ RECOMMENDED

This shows ALL customer data and orders directly from the database.

### Step 1: Open Supabase Dashboard
1. Go to: https://app.supabase.com
2. Log in with your Supabase account
3. Select your project: **navaneethan-editor**

### Step 2: View Customer/User Data
1. In left sidebar, click **SQL Editor** or **Tables**
2. If using Tables:
   - Click **auth** folder (or look for **users** table)
   - This shows all registered users (customers)

**Columns you'll see:**
- `id` - User ID (unique identifier)
- `email` - User email address
- `created_at` - When they signed up
- `user_metadata` - Additional info like name

### Step 3: View All Orders
1. In left sidebar, click **Tables**
2. Click **orders** table
3. You'll see all orders ever created

**Columns in orders table:**
```
id                  - Order ID (unique)
user_id             - Which customer placed order
service_id          - Which package (1=Reel, 2=Vertical, 3=Slide)
footageLinks        - Links to footage provided by customer
notes               - Special instructions from customer
priceEstimate       - Amount quoted
status              - Current status (pending, completed, etc.)
createdAt           - When order was placed
updatedAt           - Last update time
```

---

## WHAT DATA IS AVAILABLE

### 📋 CUSTOMER INFORMATION (In Supabase → auth.users)

You can see:
- ✅ Customer email
- ✅ When they signed up
- ✅ Their name (in metadata)
- ✅ Their account status

### 📦 ORDER INFORMATION (In Supabase → orders table)

You can see:
- ✅ Order ID
- ✅ Which customer placed it (user_id)
- ✅ Which service/package they ordered
- ✅ Footage links they provided
- ✅ Special notes/instructions
- ✅ Price quoted
- ✅ Current status (pending, editing, completed, etc.)
- ✅ When order was created
- ✅ When it was last updated

---

## DETAILED STEP-BY-STEP GUIDE

### To See All Orders:

1. **Go to Supabase Dashboard:** https://app.supabase.com
2. **Select your project**
3. **Click "Tables" in sidebar** (left side)
4. **Click "orders"**
5. **You see:**
   - All orders in a table view
   - Each row is one order
   - Columns show: id, user_id, service_id, status, createdAt, etc.

**To see more details of one order:**
- Click on any row to expand it
- You'll see all columns including footageLinks, notes, etc.

### To See All Customers:

1. **Go to Supabase Dashboard:** https://app.supabase.com
2. **Select your project**
3. **Click "Authentication" in sidebar**
4. **Click "Users"**
5. **You see:**
   - All registered users
   - Email addresses
   - When they signed up
   - Their metadata (name, etc.)

**To see details of one customer:**
- Click on any user row
- View their full profile information

---

## FILTER & SEARCH ORDERS

### In Supabase Tables:

1. Open the **orders** table
2. Click on **filter icon** (funnel shape)
3. **Filter options:**
   - By status: `pending`, `completed`, `editing`, etc.
   - By date range
   - By customer (user_id)
   - By service_id

**Example filters:**
- Show only completed orders: `status = 'completed'`
- Show orders from this week: `createdAt > 2025-11-04`
- Show orders for service 1 (Reel): `service_id = 1`

---

## EXPORT ORDER DATA

### Download Orders as CSV:

1. Open **orders** table in Supabase
2. Click **gear icon** (settings)
3. Click **Export as CSV**
4. Open in Excel or Google Sheets
5. Analyze all your order data

---

## UNDERSTANDING THE DATA

### Service IDs:
```
service_id = 1 → Reel ($2000)
service_id = 2 → Vertical ($3000)
service_id = 3 → Slide ($2500)
```

### Order Status:
```
'pending'       → New order, waiting to start
'editing'       → Currently being edited
'draft_ready'   → Draft completed, ready for review
'review'        → With customer for review
'revision'      → Customer asked for changes
'completed'     → Order finished, delivered
'cancelled'     → Order was cancelled
```

### Example Order Entry:
```
id: "abc123def456"
user_id: "user@email.com"
service_id: 1
footageLinks: ["https://drive.google.com/file/d/...", "https://youtube.com/watch?v=..."]
notes: "Please make it 4K, add music, fast pacing"
priceEstimate: 2000
status: "pending"
createdAt: "2025-11-10T14:30:00Z"
updatedAt: "2025-11-10T14:30:00Z"
```

---

## MATCH CUSTOMER TO ORDER

### To find orders for a specific customer:

1. **Get their user_id** from Authentication → Users
2. **Go to orders table**
3. **Filter:** `user_id = [their-user-id]`
4. **You see:** All orders from that customer

---

## SQL QUERIES (Advanced)

If you want to use **SQL Editor** in Supabase:

### Get all orders with customer email:
```sql
SELECT 
  o.id as order_id,
  o.user_id,
  u.email,
  o.service_id,
  o.status,
  o.priceEstimate,
  o.createdAt
FROM orders o
JOIN auth.users u ON o.user_id = u.id
ORDER BY o.createdAt DESC;
```

### Get count of orders by status:
```sql
SELECT 
  status,
  COUNT(*) as count
FROM orders
GROUP BY status;
```

### Get total revenue:
```sql
SELECT 
  SUM(priceEstimate) as total_revenue
FROM orders
WHERE status = 'completed';
```

---

## QUICK ACCESS LINKS

| What | Where | Link |
|-----|-------|------|
| View Orders | Supabase Tables | https://app.supabase.com → Tables → orders |
| View Customers | Supabase Auth | https://app.supabase.com → Authentication → Users |
| Edit Data | Supabase | https://app.supabase.com (can edit directly in tables) |
| Website Dashboard | Your Site | https://navaneethan-editor.vercel.app → Dashboard |

---

## COMMON TASKS

### "I want to see all orders from today"
1. Go to Supabase → Tables → orders
2. Filter: `createdAt > today`
3. ✓ You see all today's orders

### "I want to see how many completed orders I have"
1. Go to Supabase → Tables → orders
2. Filter: `status = 'completed'`
3. Count the rows
4. ✓ You have that number of completed orders

### "I want to contact a customer who ordered"
1. Go to Supabase → Tables → orders
2. Find the order
3. Note the user_id
4. Go to Supabase → Authentication → Users
5. Search for that user_id
6. ✓ You see their email address

### "I want to update an order status"
1. Go to Supabase → Tables → orders
2. Find the order row
3. Click the **status** cell
4. Change it to: `completed`, `editing`, `review`, etc.
5. Click **Save**
6. ✓ Order status updated

---

## SECURITY NOTE

⚠️ **Important:**
- Only you (logged into Supabase) can see customer data
- Customer passwords are encrypted (not visible)
- Your Supabase project is private

---

## NEXT STEPS

1. **Go to:** https://app.supabase.com
2. **Log in** with your Supabase account
3. **Select** your project
4. **Click "Tables"** → **Click "orders"**
5. **You see:** All your orders! 👀

Or if you haven't placed any test orders yet:
1. Go to your live site
2. Log in as customer
3. Place a test order
4. Then check Supabase → orders table
5. ✓ You'll see it there!

---

## SUMMARY

**Customer Details:** Supabase → Authentication → Users
**Order List:** Supabase → Tables → orders
**Filter & Search:** Use filter button in Supabase
**Edit Data:** Click any cell to edit directly
**Export:** Use CSV export option

You can now view all customer and order information! 📊

