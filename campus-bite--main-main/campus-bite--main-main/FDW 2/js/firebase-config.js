// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDqo27E5UwKdBfd-igYvD4lRIySyJvUt78",
  authDomain: "campusbite-4799e.firebaseapp.com",
  projectId: "campusbite-4799e",
  storageBucket: "campusbite-4799e.firebasestorage.app",
  messagingSenderId: "915567417676",
  appId: "1:915567417676:web:c01294f6845f45bb5c97e9",
  databaseURL: "https://campusbite-4799e.firebaseio.com"
};

// Initialize Firebase
let app, auth, db;

try {
  app = firebase.initializeApp(firebaseConfig);
  auth = firebase.auth();
  db = firebase.firestore();
  console.log("Firebase initialized successfully");
} catch (error) {
  console.error("Firebase initialization error:", error);
}

// Firebase helper functions
const FirebaseService = {
  // Authentication
  async signUp(email, password, userData) {
    try {
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;
      
      // Store additional user data in Firestore
      await db.collection('users').doc(user.uid).set({
        ...userData,
        email: email,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        role: userData.role || 'user'
      });
      
      return { success: true, user };
    } catch (error) {
      console.error("Signup error:", error);
      return { success: false, error: error.message };
    }
  },

  async signIn(email, password) {
    try {
      const userCredential = await auth.signInWithEmailAndPassword(email, password);
      const user = userCredential.user;
      
      // Get user data from Firestore
      const userDoc = await db.collection('users').doc(user.uid).get();
      const userData = userDoc.data();
      
      return { success: true, user, userData };
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, error: error.message };
    }
  },

  async signOut() {
    try {
      await auth.signOut();
      return { success: true };
    } catch (error) {
      console.error("Logout error:", error);
      return { success: false, error: error.message };
    }
  },

  getCurrentUser() {
    return auth.currentUser;
  },

  onAuthStateChanged(callback) {
    return auth.onAuthStateChanged(callback);
  },

  // Food Items
  async getFoodItems() {
    try {
      const snapshot = await db.collection('foods').orderBy('name').get();
      const foods = [];
      snapshot.forEach(doc => {
        foods.push({ id: doc.id, ...doc.data() });
      });
      return { success: true, foods };
    } catch (error) {
      console.error("Error fetching foods:", error);
      return { success: false, error: error.message };
    }
  },

  async addFoodItem(foodData) {
    try {
      const docRef = await db.collection('foods').add({
        ...foodData,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      return { success: true, id: docRef.id };
    } catch (error) {
      console.error("Error adding food:", error);
      return { success: false, error: error.message };
    }
  },

  async updateFoodItem(foodId, foodData) {
    try {
      await db.collection('foods').doc(foodId).update({
        ...foodData,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      return { success: true };
    } catch (error) {
      console.error("Error updating food:", error);
      return { success: false, error: error.message };
    }
  },

  async deleteFoodItem(foodId) {
    try {
      await db.collection('foods').doc(foodId).delete();
      return { success: true };
    } catch (error) {
      console.error("Error deleting food:", error);
      return { success: false, error: error.message };
    }
  },

  // Cart Management
  async getCart(userId) {
    try {
      const cartDoc = await db.collection('carts').doc(userId).get();
      if (cartDoc.exists) {
        return { success: true, cart: cartDoc.data().items || [] };
      }
      return { success: true, cart: [] };
    } catch (error) {
      console.error("Error fetching cart:", error);
      return { success: false, error: error.message };
    }
  },

  async saveCart(userId, cartItems) {
    try {
      await db.collection('carts').doc(userId).set({
        items: cartItems,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      return { success: true };
    } catch (error) {
      console.error("Error saving cart:", error);
      return { success: false, error: error.message };
    }
  },

  async clearCart(userId) {
    try {
      await db.collection('carts').doc(userId).delete();
      return { success: true };
    } catch (error) {
      console.error("Error clearing cart:", error);
      return { success: false, error: error.message };
    }
  },

  // Orders
  async createOrder(userId, orderData) {
    try {
      const docRef = await db.collection('orders').add({
        userId: userId,
        ...orderData,
        status: 'pending',
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      return { success: true, orderId: docRef.id };
    } catch (error) {
      console.error("Error creating order:", error);
      return { success: false, error: error.message };
    }
  },

  async getUserOrders(userId) {
    try {
      const snapshot = await db.collection('orders')
        .where('userId', '==', userId)
        .orderBy('createdAt', 'desc')
        .get();
      
      const orders = [];
      snapshot.forEach(doc => {
        orders.push({ id: doc.id, ...doc.data() });
      });
      return { success: true, orders };
    } catch (error) {
      console.error("Error fetching orders:", error);
      return { success: false, error: error.message };
    }
  },

  async getAllOrders() {
    try {
      const snapshot = await db.collection('orders')
        .orderBy('createdAt', 'desc')
        .get();
      
      const orders = [];
      snapshot.forEach(doc => {
        orders.push({ id: doc.id, ...doc.data() });
      });
      return { success: true, orders };
    } catch (error) {
      console.error("Error fetching all orders:", error);
      return { success: false, error: error.message };
    }
  },

  // Seed Initial Data
  async seedFoodItems(defaultFoods) {
    try {
      const snapshot = await db.collection('foods').get();
      if (snapshot.empty) {
        const batch = db.batch();
        defaultFoods.forEach(food => {
          const docRef = db.collection('foods').doc(food.id);
          batch.set(docRef, {
            ...food,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
          });
        });
        await batch.commit();
        console.log("Food items seeded successfully");
        return { success: true };
      }
      return { success: true, message: "Food items already exist" };
    } catch (error) {
      console.error("Error seeding foods:", error);
      return { success: false, error: error.message };
    }
  },

  // Admin functions
  async isAdmin(userId) {
    try {
      const userDoc = await db.collection('users').doc(userId).get();
      if (userDoc.exists) {
        const userData = userDoc.data();
        return userData.role === 'admin';
      }
      return false;
    } catch (error) {
      console.error("Error checking admin status:", error);
      return false;
    }
  }
};

// Export for use in other files
window.FirebaseService = FirebaseService;
