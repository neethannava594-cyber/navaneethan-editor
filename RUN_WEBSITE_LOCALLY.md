# 🚀 HOW TO RUN YOUR WEBSITE LOCALLY

## Quick Start (Choose One Method)

### Method 1: Use Command Prompt (CMD) - Easiest ✅

1. **Open Command Prompt (not PowerShell)**
   - Press: `Windows Key + R`
   - Type: `cmd`
   - Press: Enter

2. **Navigate to your project:**
   ```
   cd C:\Users\SHIGADESIGN3\Downloads\Programs\navaneethan-editor
   ```

3. **Start development server:**
   ```
   npm run dev
   ```

4. **Open your website:**
   - Look for: `Local:   http://localhost:5173`
   - Copy that URL
   - Open in browser

---

### Method 2: Fix PowerShell Execution Policy

1. **Open PowerShell as Administrator**
   - Right-click PowerShell
   - Click "Run as Administrator"

2. **Run this command:**
   ```powershell
   Set-ExecutionPolicy RemoteSigned
   ```

3. **Answer: `Y` (Yes)**

4. **Then try:**
   ```powershell
   cd "C:\Users\SHIGADESIGN3\Downloads\Programs\navaneethan-editor"
   npm run dev
   ```

---

### Method 3: Use VS Code Terminal

1. **Open VS Code**
2. **Open your project folder**
3. **Open Terminal** (Ctrl+`)
4. **Run:**
   ```
   npm run dev
   ```

---

## What You'll See

```
VITE v6.4.1 ready in 100 ms

➜  Local:   http://localhost:5173/
➜  Press h + enter to show help
```

---

## Open in Browser

Click the URL or paste in browser:
```
http://localhost:5173
```

You'll see:
- Your website homepage
- Navigation menu
- Portfolio, pricing, contact pages
- All features working!

---

## Test Your Contact Form

1. Navigate to: `/contact` (in the site)
2. Fill the form:
   - Name: Test
   - Email: test@example.com
   - Phone: 555-1234
   - Service: Reel
   - Message: Test message
3. Click: "Send Enquiry"
4. Should see: ✅ Success message

---

## Next: Deploy to Production

Once you confirm it works locally:

1. Push to GitHub (need your GitHub URL)
2. Vercel auto-deploys
3. Your site goes LIVE! 🚀

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Port 5173 already in use | Kill other process: `netstat -ano | findstr 5173` |
| npm not found | Use Command Prompt (not PowerShell) |
| Permission denied | Run VS Code as Administrator |
| Still stuck | Use Method 1 (Command Prompt) - always works |

---

**Ready? Try Method 1 or 2 above! 👆**

