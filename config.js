// ============================================================
// এই ফাইলে একবার তথ্য বসালেই পুরো সাইটে কাজ করবে
// ============================================================

// ধাপ ১: Firebase Console (https://console.firebase.google.com) থেকে
// একটা প্রজেক্ট বানিয়ে Firestore + Storage চালু করো।
// প্রজেক্ট সেটিংস > General > "Your apps" > Web app থেকে নিচের কনফিগটা কপি করে বসাও।
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// ধাপ ২: এখানে ১৩টি থানা শাখার আসল নাম বসাও (ক্রমানুসারে)
const THANA_BRANCHES = [
  { name: "থানা শাখা - ১", info: "" },
  { name: "থানা শাখা - ২", info: "" },
  { name: "থানা শাখা - ৩", info: "" },
  { name: "থানা শাখা - ৪", info: "" },
  { name: "থানা শাখা - ৫", info: "" },
  { name: "থানা শাখা - ৬", info: "" },
  { name: "থানা শাখা - ৭", info: "" },
  { name: "থানা শাখা - ৮", info: "" },
  { name: "থানা শাখা - ৯", info: "" },
  { name: "থানা শাখা - ১০", info: "" },
  { name: "থানা শাখা - ১১", info: "" },
  { name: "থানা শাখা - ১২", info: "" },
  { name: "থানা শাখা - ১৩", info: "" }
];

// ধাপ ৩: সংগঠনের নাম / ট্যাগলাইন চাইলে এখানে বদলাও
const ORG_NAME = "বাংলাদেশ ইসলামী ছাত্রশিবির — বগুড়া জেলা পূর্ব";
const ORG_NAME_SHORT = "ছাত্রশিবির, বগুড়া জেলা পূর্ব";
