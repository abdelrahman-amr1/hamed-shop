// Aswan Shop Admin Application Logic

let products = [];
let filteredProducts = [];
let searchQuery = "";
let selectedCategory = "all";

// Category Names Arabic mapping
const CATEGORY_LABELS = {
  spices: "التوابل والبهارات",
  drinks: "المشروبات الطبيعية",
  herbs: "الأعشاب الطبيعية",
  oils: "الزيوت الخام",
  incense: "البخور المشكل",
  famous: "الأشهر في أسوان"
};

const ADMIN_USER = "admin";
const ADMIN_PASS = "aswan_group_admin";

// Initialize Admin Interface
document.addEventListener("DOMContentLoaded", () => {
  checkAuth();
  
  // Custom event listener for database updates
  window.addEventListener("productsUpdated", () => {
    if (isAuthenticated()) {
      loadAdminProducts();
    }
  });
});

// Check if authenticated
function isAuthenticated() {
  return sessionStorage.getItem("aswan_admin_auth") === "true";
}

// Check session storage and toggle views
function checkAuth() {
  const loginContainer = document.getElementById("adminLoginContainer");
  const dashboardContent = document.getElementById("adminDashboardContent");
  const logoutBtn = document.getElementById("logoutBtn");
  
  if (isAuthenticated()) {
    if (loginContainer) loginContainer.style.display = "none";
    if (dashboardContent) dashboardContent.style.display = "block";
    if (logoutBtn) logoutBtn.style.display = "flex";
    loadAdminProducts();
  } else {
    if (loginContainer) loginContainer.style.display = "flex";
    if (dashboardContent) dashboardContent.style.display = "none";
    if (logoutBtn) logoutBtn.style.display = "none";
  }
}

// Handle Login Form Submission
function handleAdminLogin(event) {
  event.preventDefault();
  const user = document.getElementById("loginUser").value.trim();
  const pass = document.getElementById("loginPass").value.trim();
  
  if (user === ADMIN_USER && pass === ADMIN_PASS) {
    sessionStorage.setItem("aswan_admin_auth", "true");
    checkAuth();
    showToast("تم تسجيل الدخول بنجاح! مرحباً بك.");
  } else {
    showToast("خطأ في اسم المستخدم أو كلمة المرور!", "danger");
  }
}

// Handle Logout
function handleAdminLogout() {
  const confirmLogout = confirm("هل أنت متأكد من رغبتك في تسجيل الخروج؟");
  if (!confirmLogout) return;
  
  sessionStorage.removeItem("aswan_admin_auth");
  checkAuth();
  showToast("تم تسجيل الخروج بنجاح.");
}

// Load products and render admin UI
function loadAdminProducts() {
  products = getProducts(); // Loaded from database.js
  updateStats();
  applyFiltersAndRender();
}

// Update Stats Cards
function updateStats() {
  const total = products.length;
  const active = products.filter(p => p.available !== false).length;
  const outOfStock = total - active;
  
  document.getElementById("statTotalProducts").textContent = total;
  document.getElementById("statActiveProducts").textContent = active;
  document.getElementById("statOutOfStock").textContent = outOfStock;
}

// Filter products based on search input and dropdown category
function filterAdminProducts() {
  searchQuery = document.getElementById("adminSearchInput").value.trim().toLowerCase();
  selectedCategory = document.getElementById("adminCategorySelect").value;
  applyFiltersAndRender();
}

// Filter and render helper
function applyFiltersAndRender() {
  filteredProducts = products.filter(p => {
    const matchesCategory = selectedCategory === "all" || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery) || 
                          (p.description && p.description.toLowerCase().includes(searchQuery));
    return matchesCategory && matchesSearch;
  });
  
  renderAdminTable();
}

// Render Products Table
function renderAdminTable() {
  const tbody = document.getElementById("adminProductsTableBody");
  if (!tbody) return;
  
  tbody.innerHTML = "";
  
  if (filteredProducts.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6" style="text-align: center; color: var(--gray-600); padding: 3rem;">
          <i class="fa-solid fa-folder-open" style="font-size: 2.5rem; margin-bottom: 0.5rem; display: block; color: var(--gray-300)"></i>
          لا توجد منتجات مسجلة مطابقة للبحث حالياً
        </td>
      </tr>
    `;
    return;
  }
  
  filteredProducts.forEach(p => {
    const tr = document.createElement("tr");
    
    const categoryLabel = CATEGORY_LABELS[p.category] || p.category;
    const categoryBadgeClass = `product-row-badge badge-${p.category}`;
    const isAvailable = p.available !== false;
    
    tr.innerHTML = `
      <td>
        <span class="${categoryBadgeClass}">${categoryLabel}</span>
      </td>
      <td>
        <strong style="color: var(--dark-color);">${p.name}</strong>
        ${p.description ? `<p style="font-size: 0.75rem; color: var(--gray-600); margin-top: 0.2rem; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden;">${p.description}</p>` : ''}
      </td>
      <td><span style="font-weight: 700; color: var(--primary-color);">${p.price} ج</span></td>
      <td><span style="font-size: 0.85rem; color: var(--gray-600);">${p.unit}</span></td>
      <td style="text-align: center;">
        <label class="switch">
          <input type="checkbox" ${isAvailable ? 'checked' : ''} onchange="toggleProductAvailability('${p.id}', this.checked)">
          <span class="slider"></span>
        </label>
      </td>
      <td style="text-align: center;">
        <div style="display: flex; gap: 0.5rem; justify-content: center;">
          <button class="btn btn-outline" style="padding: 0.35rem 0.6rem;" onclick="openProductModal('${p.id}')" title="تعديل">
            <i class="fa-solid fa-pencil" style="color: var(--secondary-color)"></i>
          </button>
          <button class="btn btn-outline" style="padding: 0.35rem 0.6rem;" onclick="deleteProduct('${p.id}')" title="حذف">
            <i class="fa-solid fa-trash-can" style="color: var(--danger-color)"></i>
          </button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// Toggle product availability status
function toggleProductAvailability(productId, isChecked) {
  const index = products.findIndex(p => p.id === productId);
  if (index === -1) return;
  
  products[index].available = isChecked;
  saveProducts(products); // Saved to localStorage and fires event
  updateStats();
  
  const statusMsg = isChecked ? "متوفر للبيع" : "غير متوفر حالياً";
  showToast(`تم تعديل حالة المنتج "${products[index].name}" إلى: ${statusMsg}`);
}

// Open Form Modal for Add or Edit
function openProductModal(productId) {
  const overlay = document.getElementById("productModalOverlay");
  const form = document.getElementById("productForm");
  const modalTitle = document.getElementById("modalTitle");
  const saveBtn = document.getElementById("saveModalBtn");
  
  form.reset();
  
  if (productId === null) {
    // Add Mode
    modalTitle.textContent = "إضافة منتج جديد";
    saveBtn.textContent = "إضافة المنتج";
    document.getElementById("modalProductId").value = "";
    document.getElementById("prodAvailable").value = "true";
  } else {
    // Edit Mode
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    modalTitle.textContent = "تعديل بيانات المنتج";
    saveBtn.textContent = "حفظ التعديلات";
    
    document.getElementById("modalProductId").value = product.id;
    document.getElementById("prodName").value = product.name;
    document.getElementById("prodCategory").value = product.category;
    document.getElementById("prodPrice").value = product.price;
    document.getElementById("prodUnit").value = product.unit;
    document.getElementById("prodDesc").value = product.description || "";
    document.getElementById("prodAvailable").value = (product.available !== false).toString();
  }
  
  overlay.classList.add("open");
}

// Close Modal Form
function closeProductModal() {
  document.getElementById("productModalOverlay").classList.remove("open");
}

// Save Product (Create or Update)
function saveProductForm(event) {
  event.preventDefault();
  
  const id = document.getElementById("modalProductId").value;
  const name = document.getElementById("prodName").value.trim();
  const category = document.getElementById("prodCategory").value;
  const price = parseFloat(document.getElementById("prodPrice").value);
  const unit = document.getElementById("prodUnit").value.trim();
  const description = document.getElementById("prodDesc").value.trim();
  const available = document.getElementById("prodAvailable").value === "true";
  
  if (!name || !category || isNaN(price) || !unit) {
    showToast("يرجى ملء جميع الحقول الإلزامية", "danger");
    return;
  }
  
  if (!id) {
    // CREATE new product
    const newProduct = {
      id: "p_" + Date.now(),
      name,
      category,
      price,
      unit,
      description,
      available
    };
    products.push(newProduct);
    showToast(`تمت إضافة منتج "${name}" بنجاح!`);
  } else {
    // UPDATE existing product
    const index = products.findIndex(p => p.id === id);
    if (index === -1) return;
    
    products[index] = {
      id,
      name,
      category,
      price,
      unit,
      description,
      available
    };
    showToast(`تم تعديل منتج "${name}" بنجاح!`);
  }
  
  saveProducts(products); // Writes to localStorage
  closeProductModal();
  loadAdminProducts();
}

// Delete Product
function deleteProduct(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;
  
  const confirmDel = confirm(`هل أنت متأكد من رغبتك في حذف منتج "${product.name}" نهائياً من المتجر؟`);
  if (!confirmDel) return;
  
  products = products.filter(p => p.id !== productId);
  saveProducts(products);
  
  // Delete from Firestore directly
  if (typeof window.db !== "undefined") {
    window.db.collection("products").doc(productId).delete().catch(e => console.error("Firestore delete error:", e));
  }
  
  loadAdminProducts();
  showToast(`تم حذف منتج "${product.name}" بنجاح.`, "danger");
}

// Reset Database Confirmation
function confirmResetDB() {
  const confirmReset = confirm("تنبيه هام!\nهل أنت متأكد من رغبتك في إعادة تعيين كافة المنتجات والأسعار؟\nسيؤدي هذا إلى حذف المنتجات الجديدة واستعادة الأسعار الأصلية الافتراضية.");
  if (!confirmReset) return;
  
  products = resetDatabase(); // Defined in database.js
  loadAdminProducts();
  showToast("تم إعادة ضبط المتجر بنجاح واستعادة المنتجات الافتراضية.");
}

// Export Database as JSON
function exportData() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(products, null, 2));
  const downloadAnchor = document.createElement("a");
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `aswan_shop_products_${new Date().toISOString().slice(0,10)}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
  showToast("تم تصدير نسخة الاحتياط بنجاح!");
}

// Trigger hidden file input click
function triggerImport() {
  document.getElementById("importFileInput").click();
}

// Import Database from JSON file
function importData(event) {
  const file = event.target.files[0];
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const importedData = JSON.parse(e.target.result);
      
      // Basic validation
      if (Array.isArray(importedData) && importedData.length > 0 && importedData[0].hasOwnProperty("name")) {
        const confirmImp = confirm(`تم العثور على ${importedData.length} منتج في الملف. هل تريد استبدال قاعدة البيانات الحالية بها؟`);
        if (!confirmImp) return;
        
        products = importedData;
        saveProducts(products);
        loadAdminProducts();
        showToast("تم استيراد المنتجات وتحديث قاعدة البيانات بنجاح!");
      } else {
        showToast("صيغة الملف غير صالحة. يرجى اختيار ملف نسخ احتياطي صحيح.", "danger");
      }
    } catch (err) {
      showToast("حدث خطأ أثناء قراءة الملف. تأكد من أن الملف بصيغة JSON صحيحة.", "danger");
    }
  };
  reader.readAsText(file);
  event.target.value = ""; // Reset input file so same file can be selected again
}

// Toast helper
function showToast(message, type = "success") {
  const container = document.getElementById("toastContainer");
  if (!container) return;
  
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  
  const icon = type === "success" ? "fa-circle-check" : "fa-circle-exclamation";
  
  toast.innerHTML = `
    <i class="fa-solid ${icon}"></i>
    <span>${message}</span>
  `;
  
  container.appendChild(toast);
  
  setTimeout(() => {
    toast.classList.add("show");
  }, 10);
  
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3500);
}
