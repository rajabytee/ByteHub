# 🔄 Auto-Update সেটআপ গাইড (বাংলা)

অ্যাপের ভেতরে `electron-updater`-এর কোড বসানো আছে, কিন্তু আপডেট **সত্যিই কাজ করতে** GitHub-এ একটা release সেটআপ করতে হবে। নিচে ধাপে ধাপে:

## যা যা লাগবে
- একটা GitHub অ্যাকাউন্ট
- তোমার ল্যাপটপে Node.js ইনস্টল (অ্যাপ বানানোর সময় যেটা দিয়ে `npm install` করেছিলে)

## ধাপ ১ — GitHub-এ repo বানাও
1. github.com →右上角 **+** → **New repository**
2. নাম দাও `workspace-hub`
3. **Public** রাখো (auto-update সবচেয়ে সহজে কাজ করে; private চাইলে নিচে নোট দেখো)
4. README ছাড়াই খালি repo বানাও

## ধাপ ২ — package.json-এ তোমার username বসাও
`package.json`-এর `build.publish` অংশে:
```json
"publish": {
  "provider": "github",
  "owner": "তোমার-github-username",
  "repo": "workspace-hub"
}
```
(`YOUR_GITHUB_USERNAME` লেখাটা বদলে তোমার আসল username দাও)

## ধাপ ৩ — অ্যাপ প্যাকেজ করো (ল্যাপটপে)
```bash
cd workspace-hub-fixed
npm install
npm run dist
```
`dist/` ফোল্ডারে তৈরি হবে:
- `Pro Workspace Hub Setup 10.0.0.exe`
- `latest.yml` (+ `.blockmap` ফাইল)

## ধাপ ৪ — GitHub-এ Release দাও
1. repo-তে গিয়ে **Releases** → **Create a new release**
2. **Tag:** `v10.0.0` দাও (v অক্ষরসহ), **Title**-ও `v10.0.0`
3. `dist/` ফোল্ডারের **সব ফাইল** (exe + yml + blockmap) ড্র্যাগ করে আপলোড করো
4. **Publish release** চাপো

## ধাপ ৫ — Release-এর exe দিয়ে ইনস্টল করো
1. Release পেজ থেকে `Pro Workspace Hub Setup 10.0.0.exe` ডাউনলোড করে ইনস্টল করো
2. SmartScreen warning এলে → **More info** → **Run anyway**
3. অ্যাপের Settings → **Auto-check updates** ON রাখো

## ধাপ ৬ — টেস্ট করো
1. `package.json`-এ version বাড়িয়ে `10.0.1` করো
2. আবার ধাপ ৩–৪ (নতুন tag `v10.0.1` দিয়ে release)
3. পুরনো 10.0.0 অ্যাপ চালাও → Settings-এ **Check for updates** চাপো
4. নতুন ভার্সন পেলে ডাউনলোড করে নোটিফিকেশন দেখাবে → রিস্টার্ট করলেই আপডেট!

## পরের প্রতিটি আপডেটে
version বাড়াও → `npm run dist` → নতুন tag দিয়ে release — ব্যস, ব্যবহারকারীরা auto-update পেয়ে যাবে।

## সৎ নোট
- `npm start` দিয়ে চালালে auto-update কাজ করবে **না** — শুধু ইনস্টল করা অ্যাপে কাজ করে
- Code signing ছাড়া Windows-এ প্রথম ইনস্টলে SmartScreen warning আসবেই → "More info" → "Run anyway"
- **Private repo** চাইলে আমাকে বলো — `main.js`-এ এক লাইন token-এর কোড যোগ করে দেবো (public-এ কিছু লাগে না)
