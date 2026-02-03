# 🧹 Git Cleanup Guide - Remove Secrets from History

## ✅ Current Status

**Good news:** You've reset to a clean commit! The secrets are no longer in your working directory.

**Current HEAD:** `3171ff4 feat(app): Remove env`

**Problem remaining:** Commit `3a5aeb3` still exists in history with:

- `.env` file
- `.env.local` file
- SendGrid API key

---

## 🎯 Next Steps

### Option 1: Rebase to Remove Problematic Commit (RECOMMENDED)

This will remove commit `3a5aeb3` entirely from history:

```bash
# Interactive rebase to remove 3a5aeb3
git rebase -i 1d7a720

# In the editor that opens:
# - Find the line for commit 3a5aeb3 (feat(app): New Login)
# - Change "pick" to "drop" (or delete the entire line)
# - Save and close the editor

# If conflicts occur:
git rebase --continue
# Or abort if needed:
git rebase --abort
```

### Option 2: Use BFG Repo Cleaner (FASTEST)

```bash
# Install BFG
brew install bfg

# Backup first!
cp -r . ../jps-landing-page-backup

# Remove .env files from ALL history
bfg --delete-files .env
bfg --delete-files .env.local

# Clean up
git reflog expire --expire=now --all
git gc --prune=now --aggressive
```

### Option 3: Start Fresh (NUCLEAR OPTION)

If you don't care about keeping git history:

```bash
# Remove .git folder
rm -rf .git

# Initialize new repo
git init
git add .
git commit -m "Initial commit - clean"

# Force push to remote
git remote add origin git@github.com:Revelts/jps-landing-page.git
git push -u origin main --force
```

---

## 🚀 After Cleanup - Push to GitHub

Once you've removed the problematic commit:

```bash
# Verify cleanup
git log --all --oneline | grep "3a5aeb3"
# (should return nothing)

# Force push to GitHub
git push origin main --force

# Verify on GitHub
git log --oneline -10
```

---

## ⚠️ IMPORTANT: Update .gitignore

Make sure `.gitignore` includes:

```gitignore
# dotenv files - NEVER commit these!
.env
.env*.local
.env.local
.env.development.local
.env.test.local
.env.production.local
```

---

## 🔐 Rotate Credentials (CRITICAL!)

Even though GitHub blocked the push, **rotate ALL credentials immediately**:

### 1. SendGrid API Key

1. Go to: https://app.sendgrid.com/settings/api_keys
2. Delete the old key
3. Create new API key
4. Update `.env.local`

### 2. Neon Database

1. Go to: https://console.neon.tech
2. Reset password
3. Get new connection string
4. Update `.env.local`

### 3. JWT Secret

```bash
# Generate new secret
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Update `JWT_SECRET` in `.env.local`

---

## ✅ Verification Checklist

- [ ] Remove commit 3a5aeb3 from history (Option 1, 2, or 3)
- [ ] Verify removal: `git log --all | grep 3a5aeb3`
- [ ] Check .gitignore includes .env files
- [ ] Force push to GitHub
- [ ] Rotate SendGrid API key
- [ ] Rotate Neon database credentials
- [ ] Generate new JWT secret
- [ ] Update .env.local with new credentials
- [ ] Test application still works

---

## 🛡️ Prevention

### Pre-commit Hook

Create `.git/hooks/pre-commit`:

```bash
#!/bin/bash

if git diff --cached --name-only | grep -E "\.env$|\.env\.local$"; then
  echo "❌ ERROR: Attempting to commit .env file!"
  echo "Secrets should NEVER be committed to git."
  exit 1
fi
```

Make executable:

```bash
chmod +x .git/hooks/pre-commit
```

---

## 📚 Resources

- **Git Filter-Repo:** https://github.com/newren/git-filter-repo
- **BFG Repo Cleaner:** https://rtyley.github.io/bfg-repo-cleaner/
- **GitHub Secret Scanning:** https://docs.github.com/en/code-security/secret-scanning

---

**Remember: GitHub's push protection saved you! 🎉**

The secrets were never pushed to the remote repository, so you just need to:

1. Clean local git history
2. Rotate credentials (just to be safe)
3. Push the clean history
