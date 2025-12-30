# Have Mind Media - Deployment Guide

## Overview

**Website:** www.havemindmedia.com
**Hosting:** Netlify
**Source:** GitHub (HaveMindHive/havemindmedia.com)
**DNS:** GoDaddy

---

## One-Time Setup: Connect Netlify to GitHub

### Step 1: Log into Netlify
1. Go to https://app.netlify.com
2. Log in with your account

### Step 2: Find Your Site
1. Click on your havemindmedia site in the dashboard
2. Go to **Site settings** (top menu)

### Step 3: Link to GitHub
1. Click **Build & deploy** in the left sidebar
2. Under "Build settings", click **Link site to Git**
3. Choose **GitHub**
4. Authorize Netlify to access your GitHub (if prompted)
5. Select repository: `HaveMindHive/havemindmedia.com`
6. Configure build settings:
   - **Branch to deploy:** `main`
   - **Build command:** (leave empty)
   - **Publish directory:** `.` (just a dot)
7. Click **Deploy site**

### Step 4: Verify Connection
- Push a small change to GitHub
- Check Netlify dashboard - should show "Building" then "Published"
- Visit www.havemindmedia.com to confirm

---

## Daily Workflow: Making Changes

### Method 1: Using Claude Code (Recommended)

```
1. Open terminal in /Users/paymore/Downloads/havemindmedia.com
2. Make your changes (edit files, add pages)
3. Commit and push:
   git add .
   git commit -m "Description of changes"
   git push
4. Netlify auto-deploys in ~30 seconds
```

### Method 2: Manual File Editing

```
1. Edit files in /Users/paymore/Downloads/havemindmedia.com
2. Open terminal, navigate to folder
3. Run:
   git add .
   git commit -m "Your change description"
   git push
```

---

## Adding New Pages

### To add a new HTML page:

1. Create the file in the appropriate folder:
   - `/ancient-mysteries/` - decoded texts, manuscripts
   - `/physics-viz/` - visualizations, interactive tools
   - `/teaching/` - educational documents
   - `/s-signature/` - S-Signature tools (when ready)

2. Add a link to it from index.html or relevant navigation

3. Commit and push:
   ```
   git add .
   git commit -m "Add new page: [page name]"
   git push
   ```

---

## Folder Structure

```
havemindmedia.com/
├── index.html              ← Homepage [1=-1]
├── css/                    ← Stylesheets
├── js/                     ← JavaScript
├── images/                 ← Images, icons
├── ancient-mysteries/
│   ├── voynich/           ← 9 Voynich manuscript pages
│   └── texts/             ← Rongorongo, Phaistos, Ancient Math
├── physics-viz/           ← Scalar crossroads, quad-helix
├── teaching/              ← Educational documents
└── netlify.toml           ← Netlify configuration
```

---

## Important Files

| File | Purpose |
|------|---------|
| `index.html` | Main homepage - the [1=-1] page |
| `netlify.toml` | Netlify build/deploy settings |
| `css/styles.css` | Main stylesheet |
| `css/unified-theme.css` | Theme variables |

---

## Troubleshooting

### Changes not showing up?
1. Check Netlify dashboard for build status
2. Clear browser cache (Cmd+Shift+R on Mac)
3. Verify git push succeeded: `git status` should show "nothing to commit"

### Build failed on Netlify?
1. Check Netlify deploy logs for error
2. Most common: missing file or broken link
3. Fix locally, commit, push again

### Can't push to GitHub?
```
gh auth status          # Check if logged in
gh auth login           # Re-authenticate if needed
```

---

## Key Locations

| What | Where |
|------|-------|
| Local website folder | `/Users/paymore/Downloads/havemindmedia.com` |
| GitHub repo | https://github.com/HaveMindHive/havemindmedia.com |
| Netlify dashboard | https://app.netlify.com |
| Live website | https://www.havemindmedia.com |
| Archive (all ideas) | `/Users/paymore/Downloads/HaveMindHive` |

---

## The Golden Rule

**HaveMindHive** = Your archive of everything (ideas, research, experiments)
**havemindmedia.com** = Only what's ready to publish

Copy from HaveMindHive → havemindmedia.com when ready to deploy.

---

*Dr. Robert "Bobby" Hill, Senior Research Assistant*
*(*satire)*
