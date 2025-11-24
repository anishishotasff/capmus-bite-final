document.addEventListener("DOMContentLoaded", () => {
  if (document.body.dataset.page === "admin-dashboard") {
    initAdminDashboard();
  }
});

async function initAdminDashboard() {
  const session = window.FDW.getActiveUser();
  if (!session || session.type !== "admin") {
    window.location.href = "admin-login.html";
    return;
  }

  const logoutBtn = document.getElementById("adminLogoutBtn");
  logoutBtn?.addEventListener("click", async () => {
    if (window.FDW.state.useFirebase && FirebaseService) {
      await FirebaseService.signOut();
    }
    window.FDW.clearSession();
    window.location.href = "admin-login.html";
  });

  const searchInput = document.getElementById("adminSearch");
  const addItemForm = document.getElementById("addItemForm");
  const tableBody = document.getElementById("adminItemsTable");

  function getFilteredFoods() {
    const term = searchInput?.value.toLowerCase() ?? "";
    return window.FDW
      .getFoods()
      .filter((item) => item.name.toLowerCase().includes(term) || item.category.toLowerCase().includes(term));
  }

  function renderTable() {
    const items = getFilteredFoods();
    tableBody.innerHTML = items
      .map(
        (item) => `
        <tr>
          <td>
            <div class="admin-dish">
              <strong>${item.name}</strong>
            </div>
          </td>
          <td>${item.category}</td>
          <td>${window.FDW.formatCurrency(item.price)}</td>
          <td>
            <div class="admin-actions">
              <button class="edit" data-action="edit" data-id="${item.id}">Edit</button>
              <button class="delete" data-action="delete" data-id="${item.id}">Delete</button>
            </div>
          </td>
        </tr>
      `
      )
      .join("");
    updateAdminStats();
  }

  function updateAdminStats() {
    const foods = window.FDW.getFoods();
    const categoryCount = new Set(foods.map((item) => item.category)).size;
    const totalItemsEl = document.getElementById("adminTotalItems");
    const totalCategoriesEl = document.getElementById("adminTotalCategories");
    if (totalItemsEl) totalItemsEl.textContent = foods.length;
    if (totalCategoriesEl) totalCategoriesEl.textContent = categoryCount;
  }

  searchInput?.addEventListener("input", renderTable);

  addItemForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(addItemForm);
    const name = formData.get("name").trim();
    const category = formData.get("category").trim();
    const price = Number(formData.get("price"));
    const image = formData.get("image").trim();

    if (!name || !category || !price || !image) {
      alert("Please fill all fields with valid values.");
      return;
    }

    const foodData = { name, category, price, image };

    if (window.FDW.state.useFirebase && FirebaseService) {
      // Add to Firebase
      const result = await FirebaseService.addFoodItem(foodData);
      if (result.success) {
        foodData.id = result.id;
        const foods = window.FDW.getFoods();
        foods.push(foodData);
        window.FDW.saveFoods(foods);
        addItemForm.reset();
        renderTable();
        alert(`${name} added successfully!`);
      } else {
        alert("Failed to add item: " + result.error);
      }
    } else {
      // Add to LocalStorage
      const id = name.toLowerCase().replace(/\s+/g, "-") + "-" + Date.now().toString(36);
      foodData.id = id;
      const foods = window.FDW.getFoods();
      foods.push(foodData);
      window.FDW.saveFoods(foods);
      addItemForm.reset();
      renderTable();
      alert(`${name} added successfully!`);
    }
  });

  tableBody?.addEventListener("click", async (event) => {
    const button = event.target.closest("button[data-action]");
    if (!button) return;
    const id = button.dataset.id;
    
    if (button.dataset.action === "delete") {
      if (confirm("Delete this dish?")) {
        if (window.FDW.state.useFirebase && FirebaseService) {
          // Delete from Firebase
          const result = await FirebaseService.deleteFoodItem(id);
          if (result.success) {
            const filtered = window.FDW.getFoods().filter((item) => item.id !== id);
            window.FDW.saveFoods(filtered);
            renderTable();
          } else {
            alert("Failed to delete item: " + result.error);
          }
        } else {
          // Delete from LocalStorage
          const filtered = window.FDW.getFoods().filter((item) => item.id !== id);
          window.FDW.saveFoods(filtered);
          renderTable();
        }
      }
    } else if (button.dataset.action === "edit") {
      const target = window.FDW.getFoods().find((item) => item.id === id);
      if (!target) return;
      const newPrice = Number(prompt(`Set new price for ${target.name}`, target.price));
      if (Number.isNaN(newPrice) || newPrice <= 0) {
        alert("Please enter a valid numeric price.");
        return;
      }
      
      const updatedPrice = Math.round(newPrice);
      
      if (window.FDW.state.useFirebase && FirebaseService) {
        // Update in Firebase
        const result = await FirebaseService.updateFoodItem(id, { price: updatedPrice });
        if (result.success) {
          const updated = window.FDW.getFoods().map((item) =>
            item.id === id ? { ...item, price: updatedPrice } : item
          );
          window.FDW.saveFoods(updated);
          renderTable();
        } else {
          alert("Failed to update item: " + result.error);
        }
      } else {
        // Update in LocalStorage
        const updated = window.FDW.getFoods().map((item) =>
          item.id === id ? { ...item, price: updatedPrice } : item
        );
        window.FDW.saveFoods(updated);
        renderTable();
      }
    }
  });

  renderTable();
}

