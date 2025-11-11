# 🔧 SQL ERROR TROUBLESHOOTING

## Common SQL Errors & Solutions

### ❌ Error 1: "Table already exists"
```
Error: relation "enquiries" already exists
```
**Solution:**
- The table was already created successfully! ✅
- You can skip this and start using it
- Or go to Tables → enquiries to verify it exists

---

### ❌ Error 2: "Syntax error"
```
Error: syntax error at or near "CREATE"
```
**Solutions:**
1. Make sure you're copying the **entire SQL** (all lines)
2. Check for typos
3. Try copying again from `SUPABASE_ENQUIRIES_SETUP.sql`
4. Paste in a fresh New Query

---

### ❌ Error 3: "Permission denied"
```
Error: permission denied for schema public
```
**Solutions:**
1. Check you're logged in with correct user
2. Make sure you have admin access to this project
3. Try refreshing Supabase (F5)
4. Contact Supabase support if persists

---

### ❌ Error 4: "Invalid input"
```
Error: invalid input syntax for type...
```
**Solutions:**
1. Copy the SQL again carefully
2. Make sure nothing is cut off
3. Delete everything and paste fresh

---

## 📋 How to Get More Details

When you get an error:

1. **Screenshot the error** - What does it say exactly?
2. **Copy the error message** - The full text
3. **Tell me:**
   - What's the exact error?
   - What line is it on?
   - What did you do before it happened?

---

## ✅ How to Fix Most Errors

### Step 1: Clear Everything
```
Delete all text in SQL editor
```

### Step 2: Get Fresh SQL
```
Open: SUPABASE_ENQUIRIES_SETUP.sql (in your workspace)
Select ALL (Ctrl+A)
Copy (Ctrl+C)
```

### Step 3: Paste in Supabase
```
Go to: https://app.supabase.com
SQL Editor → New Query
Paste (Ctrl+V)
```

### Step 4: Run
```
Click [Run] button
OR
Press Ctrl+Enter
```

---

## 🆘 Common Issues

| Issue | Check |
|-------|-------|
| Nothing happens | Click Run button / Press Ctrl+Enter |
| Black text on SQL | SQL is commented out (starts with --) |
| Error at line 1 | Make sure full SQL is copied |
| Query won't run | Check for red X on Run button |
| Still see error | Try refreshing page (F5) |

---

## 📝 Tell Me the Error

**What's the exact error message you're seeing?**

Please copy and paste:
1. The error message exactly
2. Any line numbers mentioned
3. Any SQL code shown in the error

Then I can help you fix it! 🔧

---

## Quick Check List

- [ ] Using SQL Editor (not Tables)
- [ ] Clicked "+ New Query"
- [ ] Copied entire SQL file
- [ ] Pasted into editor
- [ ] Clicked Run button
- [ ] Waiting for response

If all checked ✓ and still error → tell me the error message!

