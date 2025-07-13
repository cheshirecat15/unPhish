# unPhish
A Chrome extension that detects phishing links based on URL patterns.

**unPhish** is a simple yet powerful Chrome extension that helps users detect **phishing websites** in real-time by analyzing the URL of the current tab. It alerts users about suspicious websites based on common phishing patterns — making the web a safer place to browse.

---

## 🚀 Features

- ✅ Detects phishing indicators in the current tab’s URL
- 🧠 Flags:
  - IP-based URLs (e.g., `http://123.45.67.89`)
  - Suspicious top-level domains (e.g., `.xyz`, `.tk`, `.ru`)
  - Homograph attacks using Unicode domains (`xn--`)
  - Brand spoofing via character substitution (`go0gle`, `paypa1`)
  - Suspicious keywords (`login`, `free`, `gift`, `verify`)
  - Non-HTTPS pages

- 📊 Classifies URLs into:
  - 🛑 **Danger**
  - ⚠️ **Caution**
  - ✅ **Safe**

- 🎨 Clean and color-coded UI
- 💻 Fully local — no data sent to external servers

---

## 📸 Demo

Watch the video demo here: [YouTube Link](https://youtu.be/YkWIHMg5fNM)

---

## 🛠️ Built With

- JavaScript (ES6+)
- HTML5
- CSS3
- Chrome Extensions API (Manifest v3)
- Regex & URL API
- Canva (for icons)

---

## 📦 Installation

1. Download the latest version of the extension folder  
   _(Click “Code → Download ZIP” on this repo and extract it)_
2. Open Google Chrome and go to:
    chrome://extensions
3. Enable Developer Mode (top-right)
4. Click "Load unpacked" and select the unPhish directory

Done! The extension should now be active in your browser.

## What I Learned
1. This was my first time using JavaScript, and I gained practical experience with:
    conditionals, string logic, regex, and the URL object
2. Learned to configure manifest.json for Chrome’s Manifest v3
3. Understood the difference between hostname, pathname, and full URLs
4. Discovered the concept of homograph attacks (e.g., xn--pple domains)
5. Gained insight into brand spoofing, phishing strategies, and detection logic
6. Learned how to design a browser extension with a smooth, responsive UI


## Challenges I Ran Into
1. Dealing with false positives from legitimate sites (e.g., paypal.com)
2. Implementing accurate detection for brand spoofing using letter substitutions
3. Learning and applying Chrome Extension permissions (e.g., activeTab, scripting)
4. Building with Manifest V3 for the first time
5. Differentiating between safe, suspicious, and dangerous URLs in real time

## Accomplishments that I'm proud of
1. Successfully built a fully working Chrome extension that detects phishing threats in real time.
2. Designed and implemented a multi-level threat detection system (Safe / Caution / Danger)
3. Built a functioning spoof detection system without relying on any third-party backend or API.
4. Created a clean, user-friendly popup UI that communicates the site's risk level.

## Inspiration
Phishing scams are everywhere — and they’re getting harder to spot. From fake login pages to spoofed domains, attackers trick users into giving up sensitive info. "unPhish" was born from the idea of creating a simple safety layer that helps users pause, think, and protect themselves — before it's too late.

## What’s Next for unPhish
 -VirusTotal API integration for more accurate threat analysis

 -"Report this site" feature

 -Tooltip explanations for flagged warnings

 -Add animations and loaders for better UI

 -Firefox & Edge support

 -Publish on Chrome Web Store