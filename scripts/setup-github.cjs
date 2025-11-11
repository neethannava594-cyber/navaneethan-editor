const https = require('https');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const username = 'navaneethan2013';
const email = 'neethannava594@gmail.com';
const password = '@143NDeepika2013';
const repoName = 'navaneethan-editor';

async function createGitHubAccount() {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify({
      login: username,
      email: email,
      password: password
    });

    const options = {
      hostname: 'api.github.com',
      port: 443,
      path: '/user/repos',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Buffer.from(username + ':' + password).toString('base64')}`,
        'Content-Type': 'application/json',
        'User-Agent': 'Node.js'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        console.log('GitHub API response:', res.statusCode);
        if (res.statusCode === 201 || res.statusCode === 400) {
          resolve(true); // Repo created or already exists
        } else {
          reject(new Error(`GitHub API error: ${res.statusCode} - ${data}`));
        }
      });
    });

    req.on('error', reject);
    req.write(JSON.stringify({ name: repoName, private: false, description: 'Navaneethan Editor - Video Editing & Portfolio Platform' }));
    req.end();
  });
}

async function setupGit() {
  try {
    console.log('Setting up Git...');
    
    // Configure Git
    execSync(`git config --global user.email "${email}"`, { cwd: process.cwd() });
    execSync(`git config --global user.name "${username}"`, { cwd: process.cwd() });
    console.log('✓ Git configured');

    // Initialize repo if not already
    if (!fs.existsSync(path.join(process.cwd(), '.git'))) {
      execSync('git init', { cwd: process.cwd() });
      console.log('✓ Git repo initialized');
    }

    // Add remote
    try {
      execSync(`git remote remove origin`, { cwd: process.cwd() });
    } catch (e) {
      // Remote might not exist
    }

    const repoUrl = `https://${username}:${password}@github.com/${username}/${repoName}.git`;
    execSync(`git remote add origin ${repoUrl}`, { cwd: process.cwd() });
    console.log('✓ Remote added');

    // Stage files
    execSync('git add .', { cwd: process.cwd() });
    console.log('✓ Files staged');

    // Check git status
    const status = execSync('git status', { cwd: process.cwd() }).toString();
    console.log('Git status:\n', status);

    // Commit
    try {
      execSync(`git commit -m "Initial commit: Navaneethan Editor - Video editing and portfolio platform"`, { cwd: process.cwd() });
      console.log('✓ Changes committed');
    } catch (e) {
      console.log('Note: Commit may have failed (files might be up-to-date)');
    }

    // Push
    console.log('Pushing to GitHub...');
    execSync('git branch -M main', { cwd: process.cwd() });
    execSync('git push -u origin main --force', { cwd: process.cwd() });
    console.log('✓ Pushed to GitHub!');

    console.log(`\n✅ Repository ready at: https://github.com/${username}/${repoName}`);
    console.log('Next: Go to https://vercel.com/import and connect this repo');

  } catch (error) {
    console.error('Setup error:', error.message);
    process.exit(1);
  }
}

(async () => {
  try {
    console.log('Creating GitHub account and repo...');
    await createGitHubAccount();
    console.log('✓ GitHub repo ready');
    
    await setupGit();
    
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
})();
