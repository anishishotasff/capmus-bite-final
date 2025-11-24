# Firebase Configuration Template

## Quick Setup Checklist

### 1. Create Firebase Project
- [ ] Go to https://console.firebase.google.com/
- [ ] Click "Add Project"
- [ ] Name: CampusBite
- [ ] Disable Google Analytics (optional)
- [ ] Click "Create Project"

### 2. Enable Authentication
- [ ] Navigate to Authentication section
- [ ] Click "Get Started"
- [ ] Select "Email/Password"
- [ ] Enable and Save

### 3. Create Firestore Database
- [ ] Navigate to Firestore Database
- [ ] Click "Create Database"
- [ ] Select "Start in test mode"
- [ ] Choose region (closest to your users)
- [ ] Click "Enable"

### 4. Get Configuration
- [ ] Go to Project Settings (gear icon)
- [ ] Scroll to "Your apps"
- [ ] Click Web icon (</>)
- [ ] Register app: "CampusBite Web"
- [ ] Copy firebaseConfig object

### 5. Update firebase-config.js
Replace this section in `js/firebase-config.js`:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "YOUR_AUTH_DOMAIN_HERE",
  projectId: "YOUR_PROJECT_ID_HERE",
  storageBucket: "YOUR_STORAGE_BUCKET_HERE",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID_HERE",
  appId: "YOUR_APP_ID_HERE",
  databaseURL: "YOUR_DATABASE_URL_HERE"
};
```

With your actual values:

```javascript
const firebaseConfig = {
  apiKey: "AIza...",           // Paste your API key
  authDomain: "yourapp.firebaseapp.com",
  projectId: "yourapp",
  storageBucket: "yourapp.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123",
  databaseURL: "https://yourapp.firebaseio.com"
};
```

### 6. Update Firestore Rules
In Firebase Console > Firestore Database > Rules, paste:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /foods/{foodId} {
      allow read: if true;
      allow write: if request.auth != null && 
                      get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      allow create: if request.auth != null;
    }
    
    match /carts/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    match /orders/{orderId} {
      allow read: if request.auth != null && 
                     (resource.data.userId == request.auth.uid || 
                      get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
      allow create: if request.auth != null;
    }
  }
}
```

### 7. Test the Application
- [ ] Open index.html in browser
- [ ] Check console for "Firebase initialized successfully"
- [ ] Try signing up a new user
- [ ] Try logging in
- [ ] Add items to cart
- [ ] Test admin login with role check

## Expected Console Output

When Firebase is properly configured:
```
Firebase initialized successfully
Using Firebase for data storage
```

When Firebase is not configured:
```
Using LocalStorage for data storage
```

## Testing Credentials

Create these test accounts after setup:

**Admin Account:**
- Email: admin@campusbite.com
- Password: admin123456
- (Create via admin signup page)

**User Account:**
- Email: user@campusbite.com
- Password: user123456
- (Create via user signup page)

## Troubleshooting

**Can't sign up?**
- Check if Email/Password is enabled in Authentication
- Verify password is at least 6 characters

**Permission denied errors?**
- Update Firestore security rules as shown above
- Make sure you're logged in

**Firebase not initializing?**
- Verify all config values are correct
- Check browser console for specific errors
- Ensure no typos in configuration

## Need Help?

1. Check Firebase Console for error messages
2. View browser console (F12) for JavaScript errors
3. Verify all configuration steps completed
4. Check FIREBASE-SETUP-GUIDE.md for detailed instructions

---

**Total Setup Time:** ~10 minutes  
**Difficulty:** Easy  
**Cost:** Free (Firebase Spark Plan)
