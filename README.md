# ছাত্রশিবির, বগুড়া জেলা পূর্ব — ওয়েবসাইট সেটআপ গাইড

## ফাইল কাঠামো
- `index.html` — হোমপেজ (হিরো, সম্পর্কে, ১৩টি থানা শাখা)
- `gallery.html` — পাবলিক ফটো গ্যালারি (লাইভ, Firestore থেকে অটো-লোড হয়)
- `admin.html` — এডমিন প্যানেল (লগইন করে সরাসরি ছবি আপলোড/ডিলিট করা যায়)
- `config.js` — **একমাত্র ফাইল যেটা এডিট করতে হবে** (Firebase কনফিগ + থানার নাম)
- `styles.css` — ডিজাইন/স্টাইল

## ধাপ ১ — Firebase প্রজেক্ট তৈরি
1. https://console.firebase.google.com এ যাও, নতুন প্রজেক্ট বানাও (যেমন: `shibir-bogura-east`)
2. বাম মেনু থেকে **Build > Firestore Database** → "Create database" → **production mode**
3. বাম মেনু থেকে **Build > Storage** → "Get started" → production mode
4. বাম মেনু থেকে **Build > Authentication** → "Get started" → **Email/Password** পদ্ধতি চালু করো
5. Authentication > Users ট্যাব থেকে "Add user" দিয়ে এডমিনের ইমেইল ও পাসওয়ার্ড যোগ করো (এই ইমেইল-পাসওয়ার্ড দিয়েই `admin.html`-এ লগইন হবে)

## ধাপ ২ — Web App কনফিগ কপি করা
1. প্রজেক্ট Settings (⚙️ আইকন) > General > "Your apps" > Web (`</>`)
2. একটা নাম দাও, "Register app" করো
3. যে `firebaseConfig = {...}` অবজেক্টটা দেখাবে, সেটা পুরোপুরি কপি করে `config.js` ফাইলের `firebaseConfig` অংশে বসাও

## ধাপ ৩ — নিরাপত্তা নিয়ম (Security Rules)
এটা না করলে যেকেউ ছবি আপলোড/ডিলিট করতে পারবে — অবশ্যই করতে হবে।

**Firestore Rules** (Firestore Database > Rules):
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /gallery_photos/{photoId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

**Storage Rules** (Storage > Rules):
```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /gallery/{fileName} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## ধাপ ৪ — থানা শাখার নাম বসানো
`config.js` ফাইলে `THANA_BRANCHES` অ্যারেতে ১৩টি থানার আসল নাম বসাও। যেমন:
```js
{ name: "শেরপুর থানা শাখা", info: "" },
```

## ধাপ ৫ — হোস্টিং
সবচেয়ে সহজ: **Firebase Hosting** (ফ্রি)
```
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```
অথবা এই ফোল্ডারটাই যেকোনো স্ট্যাটিক হোস্টিং (Netlify, GitHub Pages, নিজের সার্ভার) এ আপলোড করলেও কাজ করবে — শুধু Firebase প্রজেক্টের ডোমেইন Authentication > Settings > Authorized domains-এ যোগ করে নিতে হবে।

## ব্যবহার
- **এডমিন:** `admin.html` এ গিয়ে ইমেইল-পাসওয়ার্ড দিয়ে লগইন → ছবি ড্র্যাগ করে ছাড়ো বা ক্লিক করে বেছে নাও → ক্যাপশন দিয়ে আপলোড
- **সবাই:** `gallery.html` এ গেলে আপলোড করা ছবি সাথে সাথে দেখা যাবে (রিয়েল-টাইম, পেজ রিফ্রেশ লাগে না)
- একাধিক এডমিন রাখতে চাইলে Authentication > Users এ আরও ইমেইল যোগ করো
