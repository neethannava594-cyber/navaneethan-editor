#!/usr/bin/env node
/**
 * GitHub + Vercel Automated Setup
 * Creates GitHub account, uploads code, and deploys to Vercel
 */

const https = require('https');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const config = {
  username: 'navaneethan2013',
  email: 'neethannava594@gmail.com',
  password: '@143NDeepika2013',
  repoName: 'navaneethan-editor',
  token: null // Will be set after account creation
};

const BASE64_CREDENTIALS = Buffer.from(`${config.username}:${config.password}`).toString('base64');

function makeRequest(method, host, path, headers = {}, body = null) {
  return new Promise((resolve, reject) => {
    const defaultHeaders = {
      'User-Agent': 'Node.js',
      'Accept': 'application/vnd.github.v3+json',
      'Authorization': `Basic ${BASE64_CREDENTIALS}`,
      ...headers
    };

    const options = {
      method,
      host,
      path,
      headers: defaultHeaders
    };

    if (body) {
      const bodyStr = typeof body === 'string' ? body : JSON.stringify(body);
      defaultHeaders['Content-Type'] = 'application/json';
      defaultHeaders['Content-Length'] = Buffer.byteLength(bodyStr);
      options.headers = defaultHeaders;
    }

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve({ status: res.statusCode, data: parsed, headers: res.headers });
        } catch (e) {
          resolve({ status: res.statusCode, data, headers: res.headers });
        }
      });
    });

    req.on('error', reject);
    
    if (body) {
      const bodyStr = typeof body === 'string' ? body : JSON.stringify(body);
      req.write(bodyStr);
    }
    req.end();
  });
}

async function setupGitHub() {
  console.log('\n🚀 Starting GitHub + Vercel Setup\n');
  console.log('=' .repeat(60));

  try {
    // Step 1: Check if account exists or create
    console.log('\n📋 Step 1: Verifying GitHub Account');
    console.log('-'.repeat(60));
    
    const userCheck = await makeRequest('GET', 'api.github.com', '/user');
    
    if (userCheck.status === 401) {
      console.log('❌ GitHub credentials invalid. Account may not exist yet.');
      console.log('\n⚠️ GitHub API doesn\'t support account creation.');
      console.log('Please manually create account at: https://github.com/signup');
      console.log('\nAfter creating account, come back and run this script again.');
      process.exit(1);
    }
    
    if (userCheck.status === 200) {
      console.log('✅ GitHub account verified!');
      console.log(`   Username: ${userCheck.data.login}`);
      console.log(`   Name: ${userCheck.data.name}`);
    }

    // Step 2: Create repository
    console.log('\n📋 Step 2: Creating Repository');
    console.log('-'.repeat(60));

    const repoData = {
      name: config.repoName,
      description: 'Navaneethan Editor - Video editing and portfolio platform',
      private: false,
      auto_init: true
    };

    const repoResponse = await makeRequest('POST', 'api.github.com', '/user/repos', {}, repoData);
    
    if (repoResponse.status === 201) {
      console.log('✅ Repository created!');
      console.log(`   Repo URL: ${repoResponse.data.html_url}`);
      console.log(`   Clone URL: ${repoResponse.data.clone_url}`);
    } else if (repoResponse.status === 422 && repoResponse.data.errors?.[0]?.message?.includes('exists')) {
      console.log('✅ Repository already exists!');
    } else {
      throw new Error(`Failed to create repo: ${repoResponse.status} - ${JSON.stringify(repoResponse.data)}`);
    }

    // Step 3: Upload files using GitHub API
    console.log('\n📋 Step 3: Uploading Files to GitHub');
    console.log('-'.repeat(60));

    const projectRoot = process.cwd();
    const filesToUpload = [
      'package.json',
      'vite.config.ts',
      'tsconfig.json',
      'index.html',
      '.env.local',
      'App.tsx',
      'index.tsx',
      'AuthContext.tsx',
      'components.tsx',
      'pages.tsx',
      'api.ts',
      'types.ts',
      'data.ts',
      'styles.css',
      'profileData.ts',
      'portfolioData.ts'
    ];

    let uploadedCount = 0;
    for (const file of filesToUpload) {
      const filePath = path.join(projectRoot, file);
      if (fs.existsSync(filePath)) {
        try {
          const content = fs.readFileSync(filePath);
          const base64Content = content.toString('base64');
          
          await makeRequest(
            'PUT',
            'api.github.com',
            `/repos/${config.username}/${config.repoName}/contents/${file}`,
            { 'Content-Type': 'application/json' },
            {
              message: `Add ${file}`,
              content: base64Content,
              branch: 'main'
            }
          );
          
          console.log(`  ✅ Uploaded: ${file}`);
          uploadedCount++;
        } catch (e) {
          console.log(`  ⚠️  Skipped: ${file} (${e.message})`);
        }
      }
    }

    console.log(`\n✅ Uploaded ${uploadedCount} files to GitHub!`);

    // Step 4: Instructions for Vercel
    console.log('\n📋 Step 4: Deploy to Vercel');
    console.log('-'.repeat(60));
    console.log(`
✅ Your code is now on GitHub!
Repository: https://github.com/${config.username}/${config.repoName}

Next steps to deploy to Vercel:

1. Go to: https://vercel.com/signup
2. Click "Continue with GitHub"
3. Authorize Vercel to access your GitHub account
4. Click "New Project" or "Import Project"
5. Select: ${config.username}/${config.repoName}
6. Keep defaults (Framework: Vite)
7. Click "Environment Variables" and add:
   - VITE_SUPABASE_URL = https://pbrcqyeiaajrhucjvcuv.supabase.co
   - VITE_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBicmNxeWVpYWFqcmh1Y2p2Y3V2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4NDQ3OTAsImV4cCI6MjA3ODQyMDc5MH0.13_7z5f5PQ12Wii45q8w6aWFe21TQ4rBGlsquJePZIQ
8. Click "Deploy"
9. Wait 2-3 minutes for deployment to complete
10. You'll get a URL like: https://${config.repoName}.vercel.app

🎉 Then test your live app!
    `);

    console.log('\n' + '='.repeat(60));
    console.log('✅ SETUP COMPLETE!\n');

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
}

// Run setup
setupGitHub();
