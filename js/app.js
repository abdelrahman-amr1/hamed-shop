// Aswan Shop Storefront Application Logic

let products = [];
let cart = [];
let currentCategory = "all";
let searchQuery = "";
const WHATSAPP_NUMBER = "201148666233"; // Egyptian code (20) + number (01148666233)
const FREE_SHIPPING_LIMIT = 1000;
const DEFAULT_SHIPPING_COST = 50;

// Category Names mapping
const CATEGORY_NAMES = {
  all: "الكل",
  spices: "توابل وبأهارات",
  drinks: "مشروبات طبيعية",
  herbs: "أعشاب طبيعية",
  oils: "زيوت خام",
  incense: "بخور أسواني H.M",
  famous: "أشهر منتجات أسوان"
};

// Category Icons mapping
const CATEGORY_ICONS = {
  spices: "🌱",
  drinks: "☕",
  herbs: "🌿",
  oils: "🧴",
  incense: "💨",
  famous: "✨"
};

// Initialize Application
document.addEventListener("DOMContentLoaded", () => {
  // Load products from database
  loadStoreProducts();
  
  // Load cart from sessionStorage if exists
  const savedCart = sessionStorage.getItem("aswan_shop_cart");
  if (savedCart) {
    try {
      cart = JSON.parse(savedCart);
      updateCartUI();
    } catch(e) {
      cart = [];
    }
  }

  // Listen for database changes from the admin page
  window.addEventListener("productsUpdated", () => {
    loadStoreProducts();
  });
  
  // Also check local storage updates periodically in case of cross-tab changes
  window.addEventListener("storage", (e) => {
    if (e.key === "aswan_shop_products") {
      loadStoreProducts();
    }
  });
});

// Load products and render
function loadStoreProducts() {
  products = getProducts(); // function defined in database.js
  renderProducts();
}

// Render products to grid
function renderProducts() {
  const grid = document.getElementById("productsGrid");
  if (!grid) return;
  
  grid.innerHTML = "";
  
  // Filter products by search and category
  const filtered = products.filter(p => {
    const matchesCategory = currentCategory === "all" || p.category === currentCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="cart-empty-message" style="grid-column: 1 / -1; padding: 4rem 0;">
        <i class="fa-solid fa-box-open"></i>
        <h3>لا توجد منتجات مطابقة للبحث حالياً</h3>
        <p>جرب البحث بكلمات أخرى أو اختر تصنيفاً مختلفاً</p>
      </div>
    `;
    return;
  }
  
  filtered.forEach(p => {
    const isAvailable = p.available !== false;
    const icon = CATEGORY_ICONS[p.category] || "📦";
    
    const card = document.createElement("div");
    card.className = `product-card ${!isAvailable ? 'out-of-stock' : ''}`;
    
    card.innerHTML = `
      <span class="product-category-badge">${CATEGORY_NAMES[p.category] || p.category}</span>
      <div class="product-image-container">
        <span>${icon}</span>
        ${!isAvailable ? '<div class="out-of-stock-overlay">غير متوفر حالياً</div>' : ''}
      </div>
      <div class="product-details">
        <h3 class="product-title">${p.name}</h3>
        <p class="product-desc" title="${p.description}">${p.description || "لا يوجد وصف لهذا المنتج حالياً."}</p>
        <div class="product-meta">
          <div class="product-price-info">
            <span class="product-price">${p.price} ج</span>
            <span class="product-unit">لكل ${p.unit}</span>
          </div>
          ${isAvailable ? `
            <button class="add-to-cart-btn" onclick="addToCart('${p.id}')">
              <i class="fa-solid fa-cart-plus"></i>
              <span>أضف للسلة</span>
            </button>
          ` : `
            <button class="add-to-cart-btn" disabled style="background: var(--gray-300); cursor: not-allowed;">
              <span>نفذ</span>
            </button>
          `}
        </div>
      </div>
    `;
    
    grid.appendChild(card);
  });
}

// Filter products based on search inputs
function filterProducts() {
  searchQuery = document.getElementById("searchInput").value.trim();
  renderProducts();
}

// Set category filter
function setCategory(category) {
  currentCategory = category;
  
  // Update Active Button Style
  const tabs = document.querySelectorAll(".category-tab");
  tabs.forEach(tab => {
    if (tab.getAttribute("data-category") === category) {
      tab.classList.add("active");
    } else {
      tab.classList.remove("active");
    }
  });
  
  renderProducts();
}

// Toggle Shopping Cart Drawer Open/Closed
function toggleCart(isOpen) {
  const overlay = document.getElementById("cartDrawerOverlay");
  const drawer = document.getElementById("cartDrawer");
  
  if (isOpen) {
    overlay.classList.add("open");
    drawer.classList.add("open");
  } else {
    overlay.classList.remove("open");
    drawer.classList.remove("open");
  }
}

// Add Item to Cart
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product || product.available === false) return;
  
  const cartItem = cart.find(item => item.product.id === productId);
  
  if (cartItem) {
    cartItem.quantity += 1;
  } else {
    cart.push({
      product: product,
      quantity: 1
    });
  }
  
  saveCartAndRefresh();
  showToast(`تمت إضافة "${product.name}" إلى السلة!`);
}

// Change Quantity in Cart Drawer
function updateQty(productId, amount) {
  const cartItem = cart.find(item => item.product.id === productId);
  if (!cartItem) return;
  
  cartItem.quantity += amount;
  
  if (cartItem.quantity <= 0) {
    cart = cart.filter(item => item.product.id !== productId);
    showToast(`تم إزالة المنتج من السلة.`);
  }
  
  saveCartAndRefresh();
}

// Remove item directly
function removeFromCart(productId) {
  const cartItem = cart.find(item => item.product.id === productId);
  const name = cartItem ? cartItem.product.name : "المنتج";
  cart = cart.filter(item => item.product.id !== productId);
  saveCartAndRefresh();
  showToast(`تم إزالة "${name}" من السلة.`);
}

// Save Cart to Session & Update Screen elements
function saveCartAndRefresh() {
  sessionStorage.setItem("aswan_shop_cart", JSON.stringify(cart));
  updateCartUI();
}

// Update Cart Badge, list of items, totals, and progress bar
function updateCartUI() {
  // Update header cart count
  const cartCount = document.getElementById("cartCount");
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalItems;
  
  // Render Items List
  const itemsContainer = document.getElementById("cartItemsList");
  const checkoutSection = document.getElementById("cartCheckoutSection");
  
  if (cart.length === 0) {
    itemsContainer.innerHTML = `
      <div class="cart-empty-message">
        <i class="fa-solid fa-basket-shopping"></i>
        <h3>السلة فارغة حالياً</h3>
        <p>تصفح المنتجات في المتجر وأضف ما يعجبك لتجهيز الطلب</p>
      </div>
    `;
    checkoutSection.style.display = "none";
    
    // Hide mobile sticky bar
    document.getElementById("floatingCartBar").classList.remove("visible");
    
    // Update progress tracker
    updateShippingTracker(0);
    return;
  }
  
  checkoutSection.style.display = "block";
  itemsContainer.innerHTML = "";
  
  let subtotal = 0;
  
  cart.forEach(item => {
    const itemTotal = item.product.price * item.quantity;
    subtotal += itemTotal;
    
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <div class="cart-item-details">
        <h4 class="cart-item-title">${item.product.name}</h4>
        <span class="cart-item-price">${item.product.price} ج × ${item.quantity} = <strong>${itemTotal} ج</strong></span>
      </div>
      <div class="cart-item-qty-control">
        <button onclick="updateQty('${item.product.id}', 1)">+</button>
        <span class="cart-item-qty-val">${item.quantity}</span>
        <button onclick="updateQty('${item.product.id}', -1)">-</button>
      </div>
      <button class="remove-cart-item-btn" onclick="removeFromCart('${item.product.id}')" title="حذف">
        <i class="fa-solid fa-trash-can"></i>
      </button>
    `;
    itemsContainer.appendChild(div);
  });
  
  // Update Mobile Sticky Bar info
  document.getElementById("floatingCartBar").classList.add("visible");
  document.getElementById("floatingCartTotal").textContent = `${subtotal} ج`;
  document.getElementById("floatingCartCount").textContent = `${totalItems} منتج في السلة`;

  // Calculate totals
  document.getElementById("cartSubtotal").textContent = `${subtotal} ج`;
  
  // Update progress tracker
  updateShippingTracker(subtotal);
  
  // Recalculate shipping price
  calculateShippingPrice();
}

// Manage shipping price display
function calculateShippingPrice() {
  const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const citySelect = document.getElementById("custCity");
  const shippingText = document.getElementById("cartShipping");
  const totalText = document.getElementById("cartTotal");
  
  if (subtotal === 0) return;
  
  if (!citySelect.value) {
    shippingText.textContent = "اختر المحافظة أولاً";
    totalText.textContent = `${subtotal} ج`;
    return;
  }
  
  let shippingCost = DEFAULT_SHIPPING_COST;
  let cityName = citySelect.value === "cairo" ? "القاهرة" : "الجيزة";
  
  if (subtotal >= FREE_SHIPPING_LIMIT) {
    shippingCost = 0;
    shippingText.innerHTML = `<span style="color: var(--success-color); font-weight: 700;">مجاني 🎉</span>`;
  } else {
    shippingText.textContent = `${shippingCost} ج (${cityName})`;
  }
  
  const finalTotal = subtotal + shippingCost;
  totalText.textContent = `${finalTotal} ج`;
}

// Update free shipping bar
function updateShippingTracker(subtotal) {
  const tracker = document.getElementById("shippingTracker");
  const progress = document.getElementById("shippingTrackerProgress");
  const msg = document.getElementById("shippingTrackerMsg");
  const amount = document.getElementById("shippingTrackerAmount");
  
  if (subtotal === 0) {
    progress.style.width = "0%";
    msg.textContent = "أضف منتجات بقيمة 1000ج للحصول على شحن مجاني";
    amount.textContent = "1000 ج متبقية";
    return;
  }
  
  const pct = Math.min((subtotal / FREE_SHIPPING_LIMIT) * 100, 100);
  progress.style.width = `${pct}%`;
  
  if (subtotal >= FREE_SHIPPING_LIMIT) {
    msg.innerHTML = `تهانينا! لقد حصلت على شحن مجاني لأي مكان في القاهرة والجيزة <i class="fa-solid fa-gifts" style="color: var(--secondary-color);"></i>`;
    amount.textContent = "شحن مجاني";
  } else {
    const diff = FREE_SHIPPING_LIMIT - subtotal;
    msg.textContent = "متبقي للشحن المجاني:";
    amount.textContent = `${diff} ج فقط`;
  }
}

// Handle Order Checkout to WhatsApp
function handleCheckout(event) {
  event.preventDefault();
  
  if (cart.length === 0) {
    showToast("سلتك فارغة، أضف منتجات أولاً لتجهيز الطلب", "danger");
    return;
  }
  
  const name = document.getElementById("custName").value.trim();
  const cityVal = document.getElementById("custCity").value;
  const address = document.getElementById("custAddress").value.trim();
  const phone = document.getElementById("custPhone").value.trim();
  
  if (!name || !cityVal || !address || !phone) {
    showToast("يرجى ملء جميع الحقول المطلوبة لتأكيد الطلب", "danger");
    return;
  }
  
  const cityName = cityVal === "cairo" ? "القاهرة" : "الجيزة";
  const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const shippingCost = subtotal >= FREE_SHIPPING_LIMIT ? 0 : DEFAULT_SHIPPING_COST;
  const finalTotal = subtotal + shippingCost;
  
  // Format the WhatsApp message
  let message = `السلام عليكم ورحمة الله وبركاته،\n`;
  message += `أود طلب المنتجات التالية من *H. M أونلاين*:\n`;
  message += `---------------------------------\n`;
  
  cart.forEach((item, index) => {
    const itemTotal = item.product.price * item.quantity;
    message += `${index + 1}. *${item.product.name}* (${item.product.price}ج) × ${item.quantity} = *${itemTotal}ج*\n`;
  });
  
  message += `---------------------------------\n`;
  message += `🔹 إجمالي المنتجات: *${subtotal} ج*\n`;
  message += `🚚 مصاريف الشحن: ${shippingCost === 0 ? '*مجاناً 🎉*' : `*${shippingCost} ج* (${cityName})`}\n`;
  message += `💰 إجمالي الحساب الكلي: *${finalTotal} ج*\n`;
  message += `---------------------------------\n`;
  message += `📝 *بيانات التوصيل للعميل*:\n`;
  message += `👤 *الاسم*: ${name}\n`;
  message += `📍 *المحافظة*: ${cityName}\n`;
  message += `🏠 *العنوان بالتفصيل*: ${address}\n`;
  message += `📞 *رقم الهاتف للاتصال*: ${phone}\n`;
  message += `---------------------------------\n`;
  message += `شكراً جزيلاً وفي انتظار تأكيد الأوردر 🌟`;
  
  // Encode URI text
  const encodedText = encodeURIComponent(message);
  
  // Create WhatsApp URL
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedText}`;
  
  // Redirect
  window.open(waUrl, "_blank");
  
  // Clear cart and UI
  cart = [];
  saveCartAndRefresh();
  document.getElementById("checkoutForm").reset();
  toggleCart(false);
  
  showToast("تم تحويلك إلى الواتساب لإكمال الطلب! شكراً لك.");
}

// Premium Toast Notification Helper
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
  
  // Animation Triggers
  setTimeout(() => {
    toast.classList.add("show");
  }, 10);
  
  // Remove after 3.5s
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3500);
}
