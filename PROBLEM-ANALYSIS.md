# 🔍 Problem Analysis: CSS/JS Not Loading with PM2 + Nginx

## ❌ The Problem

**Symptom**: Website displays HTML only, CSS/JS files not loading  
**Files affected**: `/_next/static/*` (all static assets)  
**Status Code**: 404 or not found

---

## 🎯 Root Cause Analysis

### 1. **`output: 'standalone'` Mode (PRIMARY CAUSE)**

```typescript
// ❌ PROBLEMATIC CONFIGURATION
const nextConfig = {
  output: 'standalone', // This is the culprit!
};
```

**Why it causes problems:**

#### In Docker (works fine):
```bash
.next/
├── standalone/          # ✅ Self-contained server
│   ├── server.js       # Custom server that knows where static files are
│   ├── .next/
│   └── public/
├── static/             # ✅ Static files copied here
└── public/             # ✅ Public files copied here
```

#### Without Docker (fails):
```bash
.next/
├── server/             # ⚠️ Regular server build
│   └── pages/
├── static/             # ❌ Files here, but server doesn't know!
└── build-manifest.json
```

**The Issue:**
- `standalone` mode creates a **custom server** optimized for Docker
- It expects static files to be **copied** to specific locations
- When you use `next start` (not Docker), it uses the **standard server**
- The standard server looks for static files in `.next/static/`
- But in standalone mode, the paths are **different**!

---

### 2. **How Next.js Serves Static Files**

#### Normal Mode (what we need):
```
User Request: /_next/static/css/main.css
     ↓
Next.js Server (port 3000)
     ↓
Looks in: .next/static/css/main.css
     ↓
✅ File Found → Served
```

#### Standalone Mode (Docker only):
```
User Request: /_next/static/css/main.css
     ↓
Standalone Server (custom)
     ↓
Looks in: .next/standalone/.next/static/css/main.css
     ↓
❌ File Not Found (wrong path when using 'next start')
```

---

### 3. **Why It Worked in Docker**

Docker setup typically includes:
```dockerfile
# Dockerfile
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# This ensures files are in the right place for standalone mode
```

**Without Docker:**
- No file copying happens
- `next start` uses standard paths
- Standalone paths don't match
- Static files not found!

---

## ✅ The Solution

### Step 1: Remove `standalone` Output

```typescript
// next.config.ts
const nextConfig = {
  // output: 'standalone', // ❌ REMOVED - only for Docker
  
  // ✅ Use default output mode for pm2 + nginx
  // This makes Next.js serve static files normally
};
```

### Step 2: Verify Static File Structure

After `npm run build` (without standalone):
```bash
.next/
├── cache/
├── server/
│   └── pages/
├── static/              # ✅ Static files here
│   ├── chunks/
│   ├── css/
│   └── media/
└── build-manifest.json  # ✅ Tells Next.js where files are
```

### Step 3: Nginx Configuration

```nginx
# ✅ CRITICAL: Proxy /_next/static/ to Next.js server
location /_next/static/ {
    proxy_pass http://localhost:3000;
    # Next.js server knows where to find files
    # (in .next/static/) when not in standalone mode
}
```

---

## 📊 Before vs After Comparison

### ❌ Before (with standalone):

```
Browser Request: GET /_next/static/css/main.css
      ↓
Nginx: proxy_pass → localhost:3000
      ↓
Next.js (next start): Looks in .next/standalone/.next/static/
      ↓
❌ 404 Not Found (wrong path!)
      ↓
Browser: No CSS loaded
```

### ✅ After (without standalone):

```
Browser Request: GET /_next/static/css/main.css
      ↓
Nginx: proxy_pass → localhost:3000
      ↓
Next.js (next start): Looks in .next/static/
      ↓
✅ 200 OK (correct path!)
      ↓
Browser: CSS loaded successfully
```

---

## 🔑 Key Takeaways

### When to use `standalone`:
- ✅ Docker deployments
- ✅ Containerized environments
- ✅ AWS Lambda, Vercel, etc.

### When NOT to use `standalone`:
- ❌ PM2 deployment
- ❌ Traditional VPS with nginx
- ❌ Any non-containerized deployment

### Why the confusion happens:
1. Docker tutorials show `standalone` mode
2. Many developers copy without understanding
3. Works locally (dev mode doesn't use standalone)
4. Breaks in production with pm2

---

## 🛠️ How to Verify the Fix

### 1. Check Next.js Build Output
```bash
npm run build

# Should see:
# ✓ Generating static pages
# ✓ Finalizing page optimization
# (no mention of "standalone")

# Check structure:
ls -la .next/static/
# Should show: chunks/, css/, media/, etc.
```

### 2. Test Local Server
```bash
npm start

# In another terminal:
curl -I http://localhost:3000/_next/static/chunks/main.js
# Should return: HTTP/1.1 200 OK
```

### 3. Test with Nginx
```bash
# After nginx setup:
curl -I http://your-domain.com/_next/static/chunks/main.js
# Should return: HTTP/1.1 200 OK
```

### 4. Check Browser Console
```
Open browser → Developer Tools → Network Tab
Should see:
  main.css     Status: 200  Type: text/css
  main.js      Status: 200  Type: text/javascript
  chunks/*.js  Status: 200  Type: text/javascript
```

---

## 📚 Additional Resources

- Next.js Output Modes: https://nextjs.org/docs/app/building-your-application/deploying#standalone-mode
- Nginx Reverse Proxy: https://docs.nginx.com/nginx/admin-guide/web-server/reverse-proxy/
- PM2 Process Management: https://pm2.keymetrics.io/docs/usage/quick-start/

---

## ⚠️ Common Mistakes to Avoid

1. **Don't use `standalone` outside Docker**
2. **Don't set `assetPrefix` unless using CDN**
3. **Don't set `basePath` unless app is in subdirectory**
4. **Do proxy `/_next/static/` in nginx**
5. **Do verify build output before deployment**

---

This analysis explains exactly why the problem occurred and how the solution fixes it at the root cause level.
