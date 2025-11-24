const STORAGE_KEYS = {
  foods: "fdw_food_items",
  cart: "fdw_cart",
  user: "fdw_user_session",
  order: "fdw_latest_order",
  userAccounts: "fdw_user_accounts",
  adminAccounts: "fdw_admin_accounts",
};

const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "admin123",
};

const DEFAULT_ADMIN_ACCOUNTS = [
  {
    id: "admin-seed",
    name: "Super Admin",
    email: "admin@campusbite.com",
    password: "admin123",
  },
];

const DEFAULT_FOODS = [
  {
    id: "chicken-biryani",
    name: "Chicken Biryani",
    category: "Biryani & Rice",
    price: 199,
    image: "",
  },
  {
    id: "hyderabadi-biryani",
    name: "Hyderabadi Biryani",
    category: "Biryani & Rice",
    price: 249,
    image: "https://img.freepik.com/free-psd/delicious-chicken-biryani-bowl_632498-25547.jpg?semt=ais_hybrid&w=740&q=80",
  },
  {
    id: "veg-biryani",
    name: "Veg Biryani",
    category: "Biryani & Rice",
    price: 159,
    image: "https://www.pngmart.com/files/5/Biryani-PNG-Transparent-Image.png",
  },
  {
    id: "paneer-pulao",
    name: "Paneer Pulao",
    category: "Biryani & Rice",
    price: 149,
    image: "https://www.pngmart.com/files/1/Rice-PNG-Photos.png",
  },
  {
    id: "chicken-65",
    name: "Chicken 65",
    category: "Snacks & Starters",
    price: 189,
    image: "https://www.pngmart.com/files/5/Fried-Chicken-PNG-Transparent-Image.png",
  },
  {
    id: "paneer-tikka",
    name: "Paneer Tikka",
    category: "Snacks & Starters",
    price: 159,
    image: "https://www.pngmart.com/files/1/Paneer-PNG-File.png",
  },
  {
    id: "samosa",
    name: "Samosa",
    category: "Snacks & Starters",
    price: 20,
    image: "https://www.pngmart.com/files/5/Samosa-PNG-Transparent-Image.png",
  },
  {
    id: "veg-cutlet",
    name: "Veg Cutlet",
    category: "Snacks & Starters",
    price: 40,
    image: "https://www.pngmart.com/files/5/Cutlet-PNG-Transparent-Image.png",
  },
  {
    id: "butter-chicken",
    name: "Butter Chicken",
    category: "Indian Main Course",
    price: 249,
    image: "https://www.pngmart.com/files/5/Butter-Chicken-PNG-Pic.png",
  },
  {
    id: "paneer-butter-masala",
    name: "Paneer Butter Masala",
    category: "Indian Main Course",
    price: 199,
    image: "https://www.pngmart.com/files/5/Indian-Food-PNG-Pic.png",
  },
  {
    id: "dal-makhani",
    name: "Dal Makhani",
    category: "Indian Main Course",
    price: 149,
    image: "https://www.pngmart.com/files/22/Dal-Makhani-PNG-Photo.png",
  },
  {
    id: "chole-bhature",
    name: "Chole Bhature",
    category: "Indian Main Course",
    price: 99,
    image: "https://www.pngmart.com/files/5/Poori-PNG-File.png",
  },
  {
    id: "masala-dosa",
    name: "Masala Dosa",
    category: "South Indian",
    price: 79,
    image: "https://www.pngmart.com/files/5/Dosa-PNG-Free-Download.png",
  },
  {
    id: "idli-sambar",
    name: "Idli Sambar",
    category: "South Indian",
    price: 59,
    image: "https://www.pngmart.com/files/3/Idly-PNG-Photos.png",
  },
  {
    id: "vada-sambar",
    name: "Vada Sambar",
    category: "South Indian",
    price: 49,
    image: "https://www.pngmart.com/files/1/Vada-Pav-PNG-Photos.png",
  },
  {
    id: "garlic-naan",
    name: "Garlic Naan",
    category: "Breads",
    price: 35,
    image: "https://www.pngmart.com/files/5/Naan-PNG-Image.png",
  },
  {
    id: "tandoori-roti",
    name: "Tandoori Roti",
    category: "Breads",
    price: 12,
    image: "https://www.pngmart.com/files/5/Roti-PNG-Pic.png",
  },
  {
    id: "butter-roti",
    name: "Butter Roti",
    category: "Breads",
    price: 15,
    image: "https://www.pngmart.com/files/5/Roti-PNG-Transparent-Image.png",
  },
  {
    id: "gulab-jamun",
    name: "Gulab Jamun",
    category: "Desserts",
    price: 25,
    image: "https://www.pngmart.com/files/15/Gulab-Jamun-PNG-Image.png",
  },
  {
    id: "rasmalai",
    name: "Rasmalai",
    category: "Desserts",
    price: 40,
    image: "https://www.pngmart.com/files/23/Rasmalai-PNG-File.png",
  },
  {
    id: "kheer",
    name: "Kheer",
    category: "Desserts",
    price: 60,
    image: "https://www.pngmart.com/files/1/Kheer-PNG-Pic.png",
  },
  {
    id: "masala-chai",
    name: "Masala Chai",
    category: "Drinks",
    price: 20,
    image: "https://www.pngmart.com/files/5/Tea-PNG-Transparent-Image.png",
  },
  {
    id: "cold-coffee",
    name: "Cold Coffee",
    category: "Drinks",
    price: 89,
    image: "https://www.pngmart.com/files/20/Iced-Coffee-PNG-Isolated-Photo.png",
  },
  {
    id: "sweet-lassi",
    name: "Sweet Lassi",
    category: "Drinks",
    price: 49,
    image: "https://www.pngmart.com/files/5/Lassi-PNG-Photos.png",
  },
];

const state = {
  foods: [],
  user: null,
  useFirebase: typeof FirebaseService !== 'undefined',
};

document.addEventListener("DOMContentLoaded", async () => {
  // Check if Firebase is available
  if (state.useFirebase && FirebaseService) {
    console.log("Using Firebase for data storage");
    await initFirebase();
  } else {
    console.log("Using LocalStorage for data storage");
    await ensureFoodsSeeded();
    ensureAccountsSeeded();
    state.foods = getFoods();
    state.user = getActiveUser();
  }
  
  setCurrentYear();
  updateCartChip();
  attachGlobalCartHandler();
  initMobileNavigation();
  routePage();
});

async function initFirebase() {
  // Listen to auth state changes
  FirebaseService.onAuthStateChanged(async (user) => {
    if (user) {
      const userDoc = await db.collection('users').doc(user.uid).get();
      const userData = userDoc.data();
      state.user = {
        uid: user.uid,
        email: user.email,
        name: userData?.name || user.email,
        type: userData?.role || 'user'
      };
      
      // Load cart from Firebase
      if (state.user.uid) {
        const cartResult = await FirebaseService.getCart(state.user.uid);
        if (cartResult.success) {
          saveCart(cartResult.cart);
        }
      }
    } else {
      state.user = null;
    }
    updateCartChip();
  });

  // Seed default foods if needed
  const foodsResult = await FirebaseService.getFoodItems();
  if (foodsResult.success) {
    if (foodsResult.foods.length === 0) {
      await FirebaseService.seedFoodItems(DEFAULT_FOODS);
      const newFoodsResult = await FirebaseService.getFoodItems();
      state.foods = newFoodsResult.foods;
    } else {
      state.foods = foodsResult.foods;
    }
    saveFoods(state.foods);
  }
}

function routePage() {
  const page = document.body.dataset.page;
  switch (page) {
    case "home":
      renderFeaturedSection();
      break;
    case "user-login":
      initAuthFlows("user");
      break;
    case "user-signup":
      initAuthFlows("user");
      break;
    case "user-dashboard":
      guardSession("user", "login.html");
      setupUserDashboard();
      break;
    case "admin-login":
      initAuthFlows("admin");
      break;
    case "admin-signup":
      initAuthFlows("admin");
      break;
    case "admin-dashboard":
      guardSession("admin", "admin-login.html");
      break;
    default:
      break;
  }
}

async function ensureFoodsSeeded() {
  const stored = getFoods();
  if (stored.length) return;
  try {
    const response = await fetch("data/foods.json");
    if (!response.ok) throw new Error("Seed file missing");
    const payload = await response.json();
    if (Array.isArray(payload) && payload.length) {
      saveFoods(payload);
      return;
    }
  } catch (err) {
    console.warn("Using baked-in defaults:", err.message);
  }
  saveFoods(DEFAULT_FOODS);
}

function getFoods() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.foods) || "[]");
}

function saveFoods(items) {
  localStorage.setItem(STORAGE_KEYS.foods, JSON.stringify(items));
  state.foods = items;
}

function getFoodById(id) {
  return getFoods().find((item) => item.id === id);
}

function getCart() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.cart) || "[]");
}

function saveCart(items) {
  localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(items));
}

async function addToCart(id) {
  const cart = getCart();
  const existing = cart.find((item) => item.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id, qty: 1 });
  }
  saveCart(cart);
  
  // Sync with Firebase if user is logged in
  if (state.useFirebase && state.user?.uid) {
    await FirebaseService.saveCart(state.user.uid, cart);
  }
  
  updateCartChip();
}

async function updateCartQuantity(id, qty) {
  const cart = getCart().map((item) => (item.id === id ? { ...item, qty } : item));
  const filteredCart = cart.filter((item) => item.qty > 0);
  saveCart(filteredCart);
  
  // Sync with Firebase if user is logged in
  if (state.useFirebase && state.user?.uid) {
    await FirebaseService.saveCart(state.user.uid, filteredCart);
  }
  
  updateCartChip();
}

async function removeFromCart(id) {
  const updated = getCart().filter((item) => item.id !== id);
  saveCart(updated);
  
  // Sync with Firebase if user is logged in
  if (state.useFirebase && state.user?.uid) {
    await FirebaseService.saveCart(state.user.uid, updated);
  }
  
  updateCartChip();
}

async function clearCart() {
  localStorage.removeItem(STORAGE_KEYS.cart);
  
  // Clear from Firebase if user is logged in
  if (state.useFirebase && state.user?.uid) {
    await FirebaseService.clearCart(state.user.uid);
  }
  
  updateCartChip();
}

function getCartCount() {
  return getCart().reduce((sum, item) => sum + item.qty, 0);
}

function updateCartChip() {
  const badge = document.getElementById("cart-count");
  if (!badge) return;
  const count = getCartCount();
  badge.textContent = count ? count : "";
}

function attachGlobalCartHandler() {
  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-add-to-cart]");
    if (!button) return;
    const id = button.dataset.addToCart;
    addToCart(id);
    button.classList.add("active");
    button.textContent = "Added ✓";
    setTimeout(() => {
      button.classList.remove("active");
      button.textContent = "Add to cart";
    }, 1200);
    renderQuickCart();
  });
}

function bindUserLoginForm() {
  const form = document.getElementById("userLoginForm");
  if (!form) return;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const payload = {
      type: "user",
      name: formData.get("name"),
      email: formData.get("email"),
    };
    setActiveUser(payload);
    window.location.href = "user-dashboard.html";
  });
}

function guardSession(type, redirectPath) {
  // Check state.user first (Firebase), then fallback to localStorage
  const session = state.user || getActiveUser();
  if (!session || session.type !== type) {
    // Wait a bit for Firebase auth to initialize
    if (state.useFirebase && FirebaseService) {
      setTimeout(() => {
        const retrySession = state.user || getActiveUser();
        if (!retrySession || retrySession.type !== type) {
          window.location.href = redirectPath;
        }
      }, 500);
    } else {
      window.location.href = redirectPath;
    }
  }
}

function setActiveUser(user) {
  localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(user));
  state.user = user;
}

function getActiveUser() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.user) || "null");
}

function clearSession() {
  localStorage.removeItem(STORAGE_KEYS.user);
  state.user = null;
}

function setupUserDashboard() {
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
      if (state.useFirebase && FirebaseService) {
        await FirebaseService.signOut();
      }
      clearSession();
      window.location.href = "login.html";
    });
  }

  const categoryFilter = document.getElementById("categoryFilter");
  const categories = Array.from(new Set(state.foods.map((item) => item.category)));
  if (categoryFilter) {
    categories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category;
      option.textContent = category;
      categoryFilter.appendChild(option);
    });
  }

  const searchInput = document.getElementById("searchInput");
  const grid = document.getElementById("user-food-grid");

  function renderGrid(items) {
    if (!grid) return;
    grid.innerHTML = items
      .map(
        (item) => `
        <article class="food-card">
          <img src="${item.image}" alt="${item.name}" loading="lazy" />
          <p class="pill">${item.category}</p>
          <h3>${item.name}</h3>
          <div class="price">₹${item.price}</div>
          <button class="btn btn-outline" data-add-to-cart="${item.id}">Add to cart</button>
        </article>
      `
      )
      .join("");
  }

  function applyFilters() {
    const term = searchInput?.value.toLowerCase() ?? "";
    const category = categoryFilter?.value ?? "all";
    const filtered = state.foods.filter((item) => {
      const matchesTerm =
        !term || item.name.toLowerCase().includes(term) || item.category.toLowerCase().includes(term);
      const matchesCategory = category === "all" || item.category === category;
      return matchesTerm && matchesCategory;
    });
    renderGrid(filtered);
  }

  searchInput?.addEventListener("input", applyFilters);
  categoryFilter?.addEventListener("change", applyFilters);

  applyFilters();
  renderQuickCart();
}

function renderQuickCart() {
  const list = document.getElementById("quickCartList");
  const totalEl = document.getElementById("quickCartTotal");
  if (!list || !totalEl) return;

  const cart = getCart();
  if (!cart.length) {
    list.innerHTML = `<p class="summary-light">No items yet. Explore dishes to add them here.</p>`;
    totalEl.textContent = "₹0";
    return;
  }

  const foods = getFoods();
  let total = 0;
  list.innerHTML = cart
    .map((item) => {
      const food = foods.find((entry) => entry.id === item.id);
      const lineTotal = food.price * item.qty;
      total += lineTotal;
      return `
        <div>
          <span>${food.name} × ${item.qty}</span>
          <strong>₹${lineTotal}</strong>
        </div>
      `;
    })
    .join("");
  totalEl.textContent = `₹${total}`;
}

function renderFeaturedSection() {
  const grid = document.getElementById("featured-grid");
  if (!grid) return;
  const highlighted = state.foods.slice(0, 6);
  grid.innerHTML = highlighted
    .map(
      (item) => `
      <article class="food-card">
        <img src="${item.image}" alt="${item.name}" loading="lazy" />
        <p class="pill">${item.category}</p>
        <h3>${item.name}</h3>
        <div class="price">₹${item.price}</div>
        <button class="btn btn-outline" data-add-to-cart="${item.id}">Add to cart</button>
      </article>
    `
    )
    .join("");
}

function setCurrentYear() {
  const el = document.getElementById("year");
  if (el) {
    el.textContent = new Date().getFullYear();
  }
}

function initMobileNavigation() {
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  
  if (!navToggle || !navLinks) return;
  
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
  
  // Close menu when clicking outside
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".navbar")) {
      navLinks.classList.remove("active");
    }
  });
  
  // Close menu when clicking a link
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
    });
  });
}

function formatCurrency(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function setLatestOrder(details) {
  localStorage.setItem(STORAGE_KEYS.order, JSON.stringify(details));
}

function getLatestOrder() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.order) || "null");
}

function clearLatestOrder() {
  localStorage.removeItem(STORAGE_KEYS.order);
}

function getAccountKey(role) {
  return role === "admin" ? STORAGE_KEYS.adminAccounts : STORAGE_KEYS.userAccounts;
}

function getAccounts(role) {
  return JSON.parse(localStorage.getItem(getAccountKey(role)) || "[]");
}

function saveAccounts(role, accounts) {
  localStorage.setItem(getAccountKey(role), JSON.stringify(accounts));
}

function ensureAccountsSeeded() {
  if (!getAccounts("admin").length) {
    saveAccounts("admin", DEFAULT_ADMIN_ACCOUNTS);
  }
  if (!getAccounts("user").length) {
    saveAccounts("user", []);
  }
}

function initAuthFlows(role) {
  const wrapper = document.querySelector(`[data-auth-role="${role}"]`);
  if (!wrapper) return;

  const toggles = wrapper.querySelectorAll("[data-auth-toggle]");
  const loginForm = wrapper.querySelector(`[data-auth-form="login"]`);
  const signupForm = wrapper.querySelector(`[data-auth-form="signup"]`);
  const heading = document.getElementById(`${role}AuthHeading`);
  const subtitle = document.getElementById(`${role}AuthSubtitle`);

  function setMode(mode) {
    const isSignup = mode === "signup";
    loginForm?.classList.toggle("hidden", isSignup);
    signupForm?.classList.toggle("hidden", !isSignup);
    toggles.forEach((btn) => btn.classList.toggle("active", btn.dataset.authToggle === mode));
    if (heading && subtitle) {
      if (isSignup) {
        heading.textContent = role === "admin" ? "Create admin access" : "Join CampusBite";
        subtitle.textContent =
          role === "admin"
            ? "Grant trusted managers dashboard controls."
            : "Sign up to save favourites and order faster.";
      } else {
        heading.textContent = role === "admin" ? "Admin Control" : "Welcome back, foodie!";
        subtitle.textContent =
          role === "admin"
            ? "Enter credentials to manage the catalogue."
            : "Login to access your personalised dashboard.";
      }
    }
  }

  toggles.forEach((btn) =>
    btn.addEventListener("click", () => {
      setMode(btn.dataset.authToggle);
    })
  );

  setMode(wrapper.dataset.authMode || "login");

  loginForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(loginForm);
    const email = formData.get("email").toLowerCase();
    const password = formData.get("password");
    
    if (state.useFirebase && FirebaseService) {
      // Firebase login
      const result = await FirebaseService.signIn(email, password);
      if (!result.success) {
        alert(result.error || "Invalid credentials. Please try again.");
        return;
      }
      
      // Check if user role matches
      if (result.userData.role !== role) {
        await FirebaseService.signOut();
        alert(`This account is not registered as ${role}. Please use the correct login page.`);
        return;
      }
      
      // Set user session in both state and localStorage for immediate access
      const userSession = {
        uid: result.user.uid,
        email: result.user.email,
        name: result.userData.name,
        type: role
      };
      state.user = userSession;
      setActiveUser(userSession);
      
      window.location.href = role === "admin" ? "admin-dashboard.html" : "user-dashboard.html";
    } else {
      // LocalStorage login
      const account = authenticateAccount(role, email, password);
      if (!account) {
        alert("Invalid credentials. Please try again.");
        return;
      }
      setActiveUser({ type: role, name: account.name, email: account.email });
      window.location.href = role === "admin" ? "admin-dashboard.html" : "user-dashboard.html";
    }
  });

  signupForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(signupForm);
    const name = formData.get("name").trim();
    const email = formData.get("email").toLowerCase();
    const password = formData.get("password");
    
    if (!name || !email || password.length < 6) {
      alert("Provide valid details. Password must be at least 6 characters.");
      return;
    }
    
    if (state.useFirebase && FirebaseService) {
      // Firebase signup
      const result = await FirebaseService.signUp(email, password, {
        name: name,
        role: role
      });
      
      if (!result.success) {
        alert(result.error || "Registration failed. Please try again.");
        return;
      }
      
      // Set user session in both state and localStorage for immediate access
      const userSession = {
        uid: result.user.uid,
        email: email,
        name: name,
        type: role
      };
      state.user = userSession;
      setActiveUser(userSession);
      
      signupForm.reset();
      window.location.href = role === "admin" ? "admin-dashboard.html" : "user-dashboard.html";
    } else {
      // LocalStorage signup
      if (getAccounts(role).some((account) => account.email === email)) {
        alert("Account already exists with this email.");
        return;
      }
      const newAccount = {
        id: `${role}-${Date.now().toString(36)}`,
        name,
        email,
        password,
      };
      const accounts = [...getAccounts(role), newAccount];
      saveAccounts(role, accounts);
      setActiveUser({ type: role, name, email });
      signupForm.reset();
      window.location.href = role === "admin" ? "admin-dashboard.html" : "user-dashboard.html";
    }
  });
}

function authenticateAccount(role, email, password) {
  return getAccounts(role).find((account) => account.email === email && account.password === password);
}

window.FDW = {
  state,
  ADMIN_CREDENTIALS,
  getAccounts,
  saveAccounts,
  getFoods,
  saveFoods,
  getFoodById,
  getCart,
  saveCart,
  addToCart,
  updateCartQuantity,
  removeFromCart,
  clearCart,
  getCartCount,
  updateCartChip,
  setActiveUser,
  getActiveUser,
  clearSession,
  formatCurrency,
  setLatestOrder,
  getLatestOrder,
  clearLatestOrder,
};

