# Supabase Configuration Checklist

## What You Need to Check

### 1. Orders Table Structure ✓ CONFIRMED

Your Supabase database should have an `orders` table with these columns:
- `id` (Primary Key, UUID)
- `user_id` (UUID, Foreign Key to auth.users)
- `service_id` (Integer)
- `footageLinks` (Text or Array)
- `notes` (Text)
- `priceEstimate` (Decimal/Float)
- `status` (Text: 'pending', 'completed', etc.)
- `createdAt` (Timestamp)
- `updatedAt` (Timestamp)

**Status:** ✅ VERIFIED - Table exists and has these columns

### 2. Row Level Security (RLS) Policies

**IMPORTANT:** If RLS is enabled on the `orders` table, you must configure policies to allow authenticated users to:
- INSERT their own orders
- SELECT their own orders
- UPDATE their own orders

#### How to Check RLS Policies:

1. Go to **Supabase Dashboard**: https://app.supabase.com
2. Select your project
3. Go to **Authentication** → **Policies**
4. Or go to **Tables** → **orders** → **RLS** tab
5. Look for policies on the `orders` table

#### If RLS is Disabled (Simple Case):
- Click **Enable RLS** (if not already enabled)
- Create these 3 policies:

**Policy 1: Users can INSERT their own orders**
```sql
CREATE POLICY "Users can insert own orders" 
ON orders 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);
```

**Policy 2: Users can SELECT their own orders**
```sql
CREATE POLICY "Users can read own orders" 
ON orders 
FOR SELECT 
USING (auth.uid() = user_id);
```

**Policy 3: Users can UPDATE their own orders**
```sql
CREATE POLICY "Users can update own orders" 
ON orders 
FOR UPDATE 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);
```

#### How to Add These Policies in Supabase UI:

1. Go to **Tables** → **orders**
2. Click **RLS** tab
3. Click **Add RLS Policy** or **Create a new policy**
4. Choose:
   - **Command**: INSERT (or SELECT, or UPDATE for each policy)
   - **Who can access**: Logged-in users
   - **Using expression**: `auth.uid() = user_id`
   - **With check expression** (for INSERT/UPDATE): `auth.uid() = user_id`
5. Click **Save policy**

### 3. Authentication Setup

**Verify Users Table is Set Up:**
1. Go to **Supabase Dashboard** → **Authentication**
2. Click **Users**
3. You should see your user account listed

**Verify JWT Secret:**
- Your JWT token (VITE_SUPABASE_ANON_KEY) should match your Supabase project
- It should start with `eyJhbGci...`

### 4. Service/Pricing Table

**Verify `services` table exists:**
1. Go to **Tables** → **services**
2. Should have these columns:
   - `id` (Integer, Primary Key)
   - `name` (Text)
   - `description` (Text)
   - `price` (Decimal)
   - `deliveryTimeDays` (Integer)

**Verify sample services are inserted:**
```
ID | Name      | Price
1  | Reel      | 2000
2  | Vertical  | 3000
3  | Slide     | 2500
```

### 5. Environment Variables on Vercel

**Required:**
- `VITE_SUPABASE_URL` = Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY` = Your anon public key

**Verify in Vercel:**
1. Go to **Vercel Dashboard** → Your Project → **Settings** → **Environment Variables**
2. Confirm both variables are set
3. Confirm they're set for **Production** environment
4. Click **Redeploy** if variables were missing

---

## Testing Steps

### Local Testing (Before Vercel)
```bash
# Start local dev server
npm run dev

# Open https://localhost:3000
# Log in
# Try placing an order
# Check browser console (F12) for detailed logs
```

### Live Testing (Vercel)
```
1. Go to your live site
2. Log in
3. Place an order
4. Check browser console (F12)
5. Look for messages with 🔵✓🔴 emoji
6. Check Supabase Dashboard → Tables → orders for new rows
```

---

## Debug Flow

When you place an order, the flow is:

```
1. CheckoutPage form → [handleSubmit]
   ↓
2. Calls: apiCreateOrder(serviceId, footageLinks, notes, priceEstimate)
   ↓
3. apiCreateOrder:
   a. Gets current user: supabase.auth.getUser()
   b. Validates serviceId is numeric
   c. Creates payload with user_id, service_id, etc.
   d. Inserts into Supabase: supabase.from('orders').insert([payload])
   ↓
4. If success → Show "✓ Order placed successfully!"
   If error → Show "❌ [Error message from Supabase]"
   ↓
5. Check Supabase orders table for new row
```

**Each step now logs to console with emoji indicators.**

---

## If Orders Still Don't Create

1. **Check Console Logs** (F12 → Console)
   - Look for 🔴 messages
   - They tell you exactly which step failed

2. **Most Common Issues:**
   - 🔴 "Supabase URL and Anon Key must be provided" → Env vars not set in Vercel
   - 🔴 "User must be logged in" → Not authenticated
   - 🔴 "Failed to create order: new row violates row level security (RLS) policy" → RLS needs configuration
   - 🔴 "Failed to create order: relation 'public.orders' does not exist" → Table not created

3. **Share the console error message** and we can fix it specifically

---

## Production Deployment Checklist

- [ ] VITE_SUPABASE_URL set in Vercel
- [ ] VITE_SUPABASE_ANON_KEY set in Vercel
- [ ] Vercel redeployed after adding env vars
- [ ] Supabase RLS policies configured on orders table
- [ ] Services table has sample data (3 packages)
- [ ] Orders table structure matches API expectations
- [ ] Can log in successfully
- [ ] Can place order on live site
- [ ] Order appears in Supabase database
- [ ] No 🔴 errors in browser console

