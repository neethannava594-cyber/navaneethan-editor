/**
 * GitHub + Vercel Setup Script
 * Creates a GitHub account, repo, and prepares for Vercel deployment
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const config = {
  username: 'navaneethan2013',
  email: 'neethannava594@gmail.com',
  password: '@143NDeepika2013',
  repoName: 'navaneethan-editor'
};

console.log('📋 GitHub + Vercel Setup Guide');
console.log('=' .repeat(50));

// Step 1: GitHub Account Creation Instructions
console.log('\n✅ STEP 1: Create GitHub Account');
console.log('-'.repeat(50));
console.log(`
GitHub won't allow automated account creation via API for security reasons.
Please follow these MANUAL steps:

1. Go to: https://github.com/signup
2. Email: ${config.email}
3. Username: ${config.username}
4. Password: ${config.password}
5. Choose free plan
6. Verify your email

This should take 2 minutes.
`);

// Step 2: Create repository
console.log('\n✅ STEP 2: After Account Created, Create Repository');
console.log('-'.repeat(50));
console.log(`
1. Go to: https://github.com/new
2. Repository name: ${config.repoName}
3. Description: Navaneethan Editor - Video editing and portfolio platform
4. Public (free users)
5. Click "Create repository"
6. Click "uploading an existing file"
7. Drag & drop your project files from:
   c:\\Users\\SHIGADESIGN3\\Downloads\\Programs\\navaneethan-editor\\
   
   Include these folders/files:
   - src/ (all source files)
   - public/ (if exists)
   - package.json, package-lock.json
   - vite.config.ts, tsconfig.json
   - index.html
   - .env.local (with VITE_SUPABASE_* keys)
   - All other source files

8. Commit with message: "Initial commit"
`);

// Step 3: Vercel Deployment
console.log('\n✅ STEP 3: Deploy to Vercel');
console.log('-'.repeat(50));
console.log(`
1. Go to: https://vercel.com/signup
2. Click "Sign Up with GitHub"
3. Authorize Vercel to access your GitHub account
4. After login, click "Import Project" or "New Project"
5. Select your repository: ${config.username}/${config.repoName}
6. Framework Preset: Vite (should auto-detect)
7. Environment Variables - Add these:
   
   KEY: VITE_SUPABASE_URL
   VALUE: (Copy from your .env.local)
   
   KEY: VITE_SUPABASE_ANON_KEY
   VALUE: (Copy from your .env.local)

8. Click "Deploy"
9. Wait 2-3 minutes for deployment
10. You'll get a URL like: https://${config.repoName}.vercel.app
`);

// Step 4: Test the deployment
console.log('\n✅ STEP 4: Test Your Live Site');
console.log('-'.repeat(50));
console.log(`
1. Open your Vercel URL in browser
2. Sign up / Log in
3. Go to Pricing
4. Choose a plan
5. Fill checkout form
6. Place an order
7. Check if order appears in your orders list

If successful ✅ - your app is live and working!
If error ❌ - check browser console (F12) and share error message
`);

// Step 5: Summary
console.log('\n' + '=' .repeat(50));
console.log('📌 SUMMARY - Your Credentials:');
console.log('=' .repeat(50));
console.log(`
GitHub Username: ${config.username}
GitHub Email: ${config.email}
GitHub Password: [saved - use when prompted]
Repository: ${config.repoName}

Vercel will auto-deploy when you push to GitHub!
`);

console.log('\n🚀 Ready to start? Follow the steps above!\n');

// Create a reminder file
const reminderPath = path.join(__dirname, '..', 'DEPLOYMENT_GUIDE.md');
const reminderContent = `# Deployment Guide

## Your Credentials
- **GitHub Username:** ${config.username}
- **GitHub Email:** ${config.email}
- **Repository Name:** ${config.repoName}

## Steps to Deploy

### 1. Create GitHub Account
Visit https://github.com/signup and create account with above credentials

### 2. Create Repository
Visit https://github.com/new and create a public repo

### 3. Upload Files to GitHub
Use GitHub's web interface to upload all project files

### 4. Deploy to Vercel
Visit https://vercel.com and import the GitHub repo

### 5. Set Environment Variables
Add in Vercel dashboard:
- VITE_SUPABASE_URL
- VITE_SUPABASE_ANON_KEY

### 6. Deploy & Test
After deployment, test at your Vercel URL

## Troubleshooting
- Check browser console for errors (F12)
- Verify .env.local has correct Supabase keys
- Check Vercel deployment logs in dashboard
`;

fs.writeFileSync(reminderPath, reminderContent);
console.log(`\n📄 Saved guide to: DEPLOYMENT_GUIDE.md`);
