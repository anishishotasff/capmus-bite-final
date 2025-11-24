# CampusBite - Food Delivery Platform 🍕

[![Firebase](https://img.shields.io/badge/Firebase-Integrated-orange)](https://firebase.google.com/)
[![Mobile Responsive](https://img.shields.io/badge/Mobile-Responsive-success)](/)
[![License](https://img.shields.io/badge/License-MIT-blue)](/)

## 🚀 Quick Start

### Without Firebase (LocalStorage Mode)
1. Open `FDW 2/index.html` in your browser
2. Application works immediately with local storage

### With Firebase (Full Featured)
1. Follow **FIREBASE-QUICK-START.md** (~10 minutes)
2. Configure `js/firebase-config.js` with your credentials
3. Enjoy cloud sync and authentication!

## ✨ Key Features

- 🔐 Firebase Authentication (Email/Password)
- 📊 Firestore Database Integration
- 📱 100% Mobile Responsive
- 🛒 Real-time Cart Synchronization
- 👨‍💼 Separate Admin Panel
- 💾 Hybrid Storage (Works with or without Firebase)
- ⚡ Fast and Lightweight
- 🎨 Modern UI/UX

## 📖 Documentation

- **[FIREBASE-SETUP-GUIDE.md](FDW%202/FIREBASE-SETUP-GUIDE.md)** - Complete Firebase integration guide
- **[FIREBASE-QUICK-START.md](FDW%202/FIREBASE-QUICK-START.md)** - 10-minute setup checklist
- **[MOBILE-RESPONSIVE-UPDATES.md](FDW%202/MOBILE-RESPONSIVE-UPDATES.md)** - Mobile optimization details
- **[RESPONSIVE-QUICK-REFERENCE.md](FDW%202/RESPONSIVE-QUICK-REFERENCE.md)** - Developer quick reference

## 🎯 What's New in v2.0

✅ **Firebase Integration**
- Full authentication system
- Cloud database storage
- Real-time data sync
- Role-based access control

✅ **Mobile Responsive**
- Hamburger navigation menu
- Touch-optimized UI (44px targets)
- 5 breakpoints (960px, 768px, 600px, 480px)
- Landscape orientation support
- Smooth scrolling and animations

✅ **Enhanced Features**
- Admin can add/edit/delete items
- Cart syncs across devices
- Order history in database
- Secure user sessions

## 📁 Project Structure

```
campus-bite--main/
└── FDW 2/
    ├── index.html                     # Homepage
    ├── login.html / user-signup.html  # User auth
    ├── user-dashboard.html            # Browse menu
    ├── cart.html                      # Shopping cart
    ├── order-confirmation.html        # Order success
    ├── admin-login.html / admin-signup.html  # Admin auth
    ├── admin-dashboard.html           # Admin panel
    ├── css/style.css                  # Complete styles (1242 lines)
    ├── js/
    │   ├── firebase-config.js         # 🔥 Firebase setup
    │   ├── main.js                    # Core logic + Firebase integration
    │   ├── admin.js                   # Admin + Firebase CRUD
    │   └── cart.js                    # Cart + Firebase orders
    └── Documentation files (.md)
```

## 🔥 Firebase Collections

```
firestore/
├── users/{userId}        # User profiles + roles
├── foods/{foodId}        # Menu items
├── carts/{userId}        # Shopping carts
└── orders/{orderId}      # Order history
```

## 🧪 Test It Out

1. **View without Firebase**: Open `index.html` - works immediately!
2. **Setup Firebase**: Follow FIREBASE-QUICK-START.md
3. **Create accounts**:
   - User: signup → browse → add to cart → order
   - Admin: signup → add/edit/delete menu items

## 🌐 Deploy

**Firebase Hosting:**
```bash
npm install -g firebase-tools
firebase init hosting
firebase deploy
```

**Other Hosting:** Upload `FDW 2` folder to Netlify, Vercel, GitHub Pages, etc.

## 📱 Responsive Breakpoints

| Device | Width | Navigation |
|--------|-------|-----------|
| Desktop | > 960px | Full navbar |
| Tablet | ≤ 960px | Wrapped navbar |
| Mobile | ≤ 768px | Hamburger menu |
| Small | ≤ 600px | Optimized layout |
| XSmall | ≤ 480px | Compact design |

## 💡 Tech Stack

- HTML5, CSS3, Vanilla JavaScript
- Firebase Authentication
- Cloud Firestore
- Google Fonts (Poppins)
- LocalStorage fallback

## 🎨 Customization

**Colors:** Edit `css/style.css` CSS variables  
**Menu:** Edit `data/foods.json` or Firebase collection  
**Config:** Edit `js/firebase-config.js` with your credentials

## 📈 Status

- ✅ Firebase integrated for all data operations
- ✅ Mobile responsive on all pages
- ✅ Authentication working (user + admin)
- ✅ CRUD operations on food items
- ✅ Cart and orders saved to Firebase
- ✅ Ready for production deployment

---

**Version:** 2.0.0 | **Date:** November 24, 2025 | **License:** MIT
