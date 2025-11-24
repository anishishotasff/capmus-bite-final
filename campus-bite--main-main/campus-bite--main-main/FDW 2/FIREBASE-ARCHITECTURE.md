# Firebase Integration Architecture

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     CampusBite Application                   │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                  Hybrid Storage Layer                        │
│  ┌──────────────────┐           ┌───────────────────┐      │
│  │  Firebase Mode   │    OR     │  LocalStorage Mode │      │
│  │  (When config'd) │           │  (Fallback)        │      │
│  └──────────────────┘           └───────────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    Firebase Services                         │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  Firebase    │  │  Firestore   │  │  Firebase    │     │
│  │  Auth        │  │  Database    │  │  Storage     │     │
│  │              │  │              │  │  (Future)    │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

## 🔄 Data Flow Diagram

### User Authentication Flow
```
User Opens App
     │
     ▼
Firebase Auth Check
     │
     ├─── Logged In ──────► Load User Data from Firestore
     │                             │
     │                             ▼
     │                      Load Cart from Firestore
     │                             │
     │                             ▼
     │                      Sync LocalStorage ← → Firestore
     │
     └─── Not Logged In ──► Show Login/Signup
                                   │
                                   ▼
                            User Signs Up/Logs In
                                   │
                                   ▼
                            Firebase Auth + Firestore
```

### Food Items Management Flow
```
┌─────────────────┐         ┌─────────────────┐
│   Admin Panel   │◄───────►│   Firestore     │
│                 │         │   /foods        │
│  Add/Edit/Del   │         │                 │
└─────────────────┘         └─────────────────┘
        │                           │
        │                           │
        ▼                           ▼
┌─────────────────┐         ┌─────────────────┐
│  LocalStorage   │◄───────►│  User Dashboard │
│  (Cache)        │         │  (Display)      │
└─────────────────┘         └─────────────────┘
```

### Shopping Cart Flow
```
User Adds Item to Cart
         │
         ▼
Update LocalStorage (Immediate)
         │
         ├────► User Logged In? ───► YES ───► Save to Firestore
         │                                    │
         └────► NO ────────────────────────► Store Locally Only
                                              │
                                              ▼
                                    (Sync when user logs in)
```

### Order Placement Flow
```
User Clicks "Place Order"
         │
         ▼
Calculate Total (Subtotal + Tax + Delivery)
         │
         ▼
Generate Order ID
         │
         ├────► Firebase Enabled?
         │              │
         │              ├─── YES ──► Save to Firestore /orders
         │              │                    │
         │              │                    ▼
         │              │            Clear Cart in Firestore
         │              │
         │              └─── NO ───► Save to LocalStorage Only
         │
         ▼
Clear LocalStorage Cart
         │
         ▼
Redirect to Order Confirmation
```

## 📊 Firestore Database Schema

### Collection: users
```javascript
/users/{userId}
{
  name: string,
  email: string,
  role: "user" | "admin",
  createdAt: Timestamp
}
```

### Collection: foods
```javascript
/foods/{foodId}
{
  name: string,
  category: string,
  price: number,
  image: string (URL),
  createdAt: Timestamp,
  updatedAt: Timestamp
}

Indexes: 
- name (ascending)
- category (ascending)
```

### Collection: carts
```javascript
/carts/{userId}
{
  items: [
    {
      id: string (foodId),
      qty: number
    }
  ],
  updatedAt: Timestamp
}
```

### Collection: orders
```javascript
/orders/{orderId}
{
  userId: string,
  orderId: string (SR-12345),
  items: [
    {
      id: string,
      name: string,
      price: number,
      qty: number,
      lineTotal: number
    }
  ],
  subtotal: number,
  delivery: number,
  tax: number,
  total: number,
  status: "pending" | "processing" | "delivered" | "cancelled",
  customerName: string,
  customerEmail: string,
  createdAt: Timestamp
}

Indexes:
- userId (ascending) + createdAt (descending)
- status (ascending)
```

## 🔐 Security Rules Logic

```javascript
// Pseudo-code representation

foods collection:
  READ: anyone
  WRITE: only admins

users collection:
  READ: only owner (userId == auth.uid)
  WRITE: only owner
  CREATE: any authenticated user

carts collection:
  READ/WRITE: only owner (userId == auth.uid)

orders collection:
  READ: owner OR admin
  CREATE: any authenticated user
  UPDATE: only admins
```

## 🔄 State Management

### Application State
```javascript
state = {
  foods: [],           // Cached from Firestore
  user: {              // Current logged-in user
    uid: string,
    email: string,
    name: string,
    type: "user" | "admin"
  },
  useFirebase: boolean // Feature flag
}
```

### Sync Strategy
1. **On App Load**: Check Firebase → Load data → Cache in LocalStorage
2. **On User Action**: Update LocalStorage → If logged in, sync to Firebase
3. **On Auth Change**: Reload user-specific data from Firebase
4. **On Offline**: Use LocalStorage cache, sync when back online

## 📈 Performance Optimizations

### Caching Strategy
- Food items: Loaded once, cached in LocalStorage
- Cart: Real-time sync with debouncing
- Orders: Fetch on demand, cache recent orders

### Loading Strategy
1. Show cached data immediately (LocalStorage)
2. Fetch fresh data from Firebase in background
3. Update UI when fresh data arrives
4. User never sees loading spinner for cached data

## 🛡️ Security Layers

```
User Request
     │
     ▼
Client-side Validation (JavaScript)
     │
     ▼
Firebase Authentication Check
     │
     ▼
Firestore Security Rules
     │
     ▼
Data Access Granted/Denied
```

### Security Features
1. **Email verification** (can be enabled)
2. **Password strength** (min 6 characters)
3. **Role-based access** (user/admin)
4. **XSS prevention** (Firebase handles)
5. **CSRF protection** (Firebase handles)
6. **SQL injection** (N/A - NoSQL database)

## 🔌 API Integration Points

### Firebase Auth API
- `createUserWithEmailAndPassword()`
- `signInWithEmailAndPassword()`
- `signOut()`
- `onAuthStateChanged()`

### Firestore API
- `collection().add()` - Create
- `collection().get()` - Read
- `doc().update()` - Update
- `doc().delete()` - Delete
- `where()` - Query
- `orderBy()` - Sort

## 📱 Offline Capabilities (Future)

```javascript
// Enable offline persistence
firebase.firestore().enablePersistence()
  .then(() => {
    console.log("Offline persistence enabled");
  })
  .catch((err) => {
    if (err.code == 'failed-precondition') {
      // Multiple tabs open
    } else if (err.code == 'unimplemented') {
      // Browser doesn't support
    }
  });
```

## 🎯 Error Handling Flow

```
User Action
     │
     ▼
Try Operation
     │
     ├─── Success ──► Update UI ──► Show Success Message
     │
     └─── Error ───► Log Error ───► Show User-Friendly Message
                          │
                          ▼
                    Rollback Changes (if needed)
                          │
                          ▼
                    Keep LocalStorage in sync
```

## 📊 Monitoring Points

### What to Monitor:
1. Authentication success/failure rates
2. Database read/write operations
3. Cart abandonment rates
4. Order completion rates
5. Error rates by type
6. Page load times
7. API response times

### Firebase Console Metrics:
- Active users (Authentication)
- Database reads/writes (Firestore)
- Storage usage (Firestore)
- Error logs (Functions - future)

---

**This architecture ensures:**
- ✅ Works with or without Firebase
- ✅ Graceful fallback to LocalStorage
- ✅ Real-time data synchronization
- ✅ Secure by design
- ✅ Scalable to thousands of users
- ✅ Offline-capable (with persistence enabled)
