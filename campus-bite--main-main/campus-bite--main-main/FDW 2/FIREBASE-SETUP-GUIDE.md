# Firebase Integration Guide - CampusBite

## 🔥 Firebase Setup Complete!

Your CampusBite application now has full Firebase integration for authentication, database storage, and real-time data synchronization.

## 📋 What's Been Integrated

### ✅ Features Implemented:

1. **Firebase Authentication**
   - User signup and login with email/password
   - Admin signup and login with role-based access
   - Secure session management
   - Auto logout functionality

2. **Firestore Database**
   - Food items storage and management
   - User profiles with role-based access (user/admin)
   - Shopping cart synchronization across devices
   - Order history and tracking
   - Real-time data updates

3. **Hybrid Mode**
   - Works with Firebase when configured
   - Falls back to LocalStorage if Firebase is not set up
   - Seamless transition between modes

## 🚀 Setup Instructions

### Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add Project"
3. Enter project name: **CampusBite**
4. Follow the setup wizard

### Step 2: Enable Authentication

1. In Firebase Console, go to **Authentication**
2. Click "Get Started"
3. Enable **Email/Password** sign-in method
4. Click "Enable" and "Save"

### Step 3: Create Firestore Database

1. In Firebase Console, go to **Firestore Database**
2. Click "Create Database"
3. Choose **Start in test mode** (for development)
4. Select your preferred region
5. Click "Enable"

### Step 4: Configure Security Rules

In Firestore Database > Rules, update with these rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to all users for food items
    match /foods/{foodId} {
      allow read: if true;
      allow write: if request.auth != null && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Users collection - users can read/write their own data
    match /users/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow write: if request.auth != null && request.auth.uid == userId;
      allow create: if request.auth != null;
    }
    
    // Carts - users can only access their own cart
    match /carts/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Orders - users can read their own orders, admins can read all
    match /orders/{orderId} {
      allow read: if request.auth != null && 
                     (resource.data.userId == request.auth.uid || 
                      get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
      allow create: if request.auth != null;
    }
  }
}
```

### Step 5: Get Your Firebase Configuration

1. In Firebase Console, go to **Project Settings** (gear icon)
2. Scroll down to "Your apps"
3. Click the **Web** icon (</>)
4. Register your app with nickname: **CampusBite Web**
5. Copy the `firebaseConfig` object

### Step 6: Update Configuration File

Open `js/firebase-config.js` and replace the placeholder values:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",              // Replace with your API key
  authDomain: "YOUR_AUTH_DOMAIN_HERE",       // Replace with your auth domain
  projectId: "YOUR_PROJECT_ID_HERE",         // Replace with your project ID
  storageBucket: "YOUR_STORAGE_BUCKET_HERE", // Replace with your storage bucket
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID_HERE", // Replace
  appId: "YOUR_APP_ID_HERE",                 // Replace with your app ID
  databaseURL: "YOUR_DATABASE_URL_HERE"      // Replace with your database URL
};
```

### Example Configuration:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyC1xY2z3B4c5D6e7F8g9H0i1J2k3L4m5N6",
  authDomain: "campusbite-12345.firebaseapp.com",
  projectId: "campusbite-12345",
  storageBucket: "campusbite-12345.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abc123def456ghi789",
  databaseURL: "https://campusbite-12345.firebaseio.com"
};
```

## 📊 Database Structure

### Collections:

#### 1. **users**
```javascript
{
  "userId": {
    name: "John Doe",
    email: "john@example.com",
    role: "user" | "admin",
    createdAt: Timestamp
  }
}
```

#### 2. **foods**
```javascript
{
  "foodId": {
    name: "Chicken Biryani",
    category: "Biryani & Rice",
    price: 199,
    image: "https://...",
    createdAt: Timestamp,
    updatedAt: Timestamp
  }
}
```

#### 3. **carts**
```javascript
{
  "userId": {
    items: [
      { id: "chicken-biryani", qty: 2 },
      { id: "paneer-tikka", qty: 1 }
    ],
    updatedAt: Timestamp
  }
}
```

#### 4. **orders**
```javascript
{
  "orderId": {
    userId: "user123",
    orderId: "SR-12345",
    items: [...],
    subtotal: 500,
    delivery: 35,
    tax: 25,
    total: 560,
    status: "pending" | "processing" | "delivered",
    customerName: "John Doe",
    customerEmail: "john@example.com",
    createdAt: Timestamp
  }
}
```

## 🧪 Testing

### Test User Accounts:
After setup, create test accounts:

**Regular User:**
- Email: user@campusbite.com
- Password: user123456

**Admin User:**
- Email: admin@campusbite.com
- Password: admin123456

### Testing Checklist:

- [ ] User signup and login
- [ ] Admin signup and login
- [ ] Add items to cart (syncs to Firebase)
- [ ] Cart persists across browser sessions
- [ ] Place an order
- [ ] Admin can add/edit/delete food items
- [ ] Admin can view all orders
- [ ] Logout functionality works

## 🔧 Features Available

### For Users:
- ✅ Secure authentication
- ✅ Browse food items from database
- ✅ Add items to cart (synced to cloud)
- ✅ Cart persists across devices
- ✅ Place orders saved to database
- ✅ View order confirmation

### For Admins:
- ✅ Secure admin authentication
- ✅ Add new food items to database
- ✅ Edit existing food items
- ✅ Delete food items
- ✅ View all orders (future feature)
- ✅ Manage pricing in real-time

## 🔒 Security Features

1. **Authentication Required**: All user/admin actions require login
2. **Role-Based Access**: Admins can't access user dashboard and vice versa
3. **Firestore Rules**: Database rules prevent unauthorized access
4. **Password Security**: Firebase handles password hashing and security
5. **Session Management**: Automatic session handling with Firebase Auth

## 📱 Offline Support (Future Enhancement)

Firebase provides offline persistence which can be enabled:

```javascript
db.enablePersistence()
  .catch((err) => {
    console.error("Persistence error:", err);
  });
```

## 🐛 Troubleshooting

### Issue: "Firebase not initialized"
**Solution:** Ensure firebase-config.js is loaded before main.js

### Issue: "Permission denied"
**Solution:** Check Firestore security rules and user authentication status

### Issue: "Network error"
**Solution:** Check Firebase project configuration and internet connection

### Issue: "App falls back to LocalStorage"
**Solution:** Verify Firebase configuration values are correct in firebase-config.js

## 🔄 Migration from LocalStorage to Firebase

The app automatically detects if Firebase is available:
- If Firebase is configured: Uses Firebase for all data
- If Firebase is not configured: Falls back to LocalStorage
- No data loss during transition

## 📈 Monitoring & Analytics

1. Go to Firebase Console > Analytics
2. View user activity, popular items, and order trends
3. Set up custom events for better tracking

## 🚀 Deployment

### Option 1: Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

### Option 2: Any Web Server
Simply upload the entire project folder to your web server.

## 📝 Notes

- Default food items are automatically seeded on first load
- Cart syncs to Firebase only for logged-in users
- Anonymous users use LocalStorage only
- All timestamps are server-side for consistency

## 🎯 Next Steps

1. Set up Firebase configuration
2. Test authentication flows
3. Test cart and order functionality
4. Customize Firestore rules for production
5. Enable analytics
6. Deploy to Firebase Hosting

---

**Version:** 2.0.0 with Firebase  
**Date:** November 24, 2025  
**Status:** ✅ Ready for Configuration
