
import { useEffect, useMemo, useState } from "react";
import {
  Search,
  ShoppingBag,
  Heart,
  Star,
  ArrowRight,
  SlidersHorizontal,
  Plus,
  Minus,
  Trash2,
  X,
  CheckCircle2,
  Truck,
  ShieldCheck,
  Headphones,
} from "lucide-react";
import products from "./data/products";
import "./App.css";

const categories = ["All", "Electronics", "Fashion", "Home", "Beauty"];

const money = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("featured");
  const [cart, setCart] = useState(() => {
  try {
    const savedCart = localStorage.getItem("shopease_cart");
    return savedCart ? JSON.parse(savedCart) : [];
  } catch {
    return [];
  }
});
  const [wishlist, setWishlist] = useState(() => {
  try {
    const savedWishlist = localStorage.getItem("shopease_wishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  } catch {
    return [];
  }
});
const [currentPage, setCurrentPage] = useState("home");

const [currentUser, setCurrentUser] = useState(() => {
  try {
    return JSON.parse(localStorage.getItem("shopease_user")) || null;
  } catch {
    return null;
  }
});
const [authForm, setAuthForm] = useState({
  name: "",
  email: "",
  password: "",
});

const [authError, setAuthError] = useState("");
const [authMessage, setAuthMessage] = useState("");
const [checkoutForm, setCheckoutForm] = useState({
  fullName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  pincode: "",
});

const [lastOrder, setLastOrder] = useState(() => {
  try {
    return JSON.parse(localStorage.getItem("shopease_last_order")) || null;
  } catch {
    return null;
  }
});

function handleAuthChange(event) {
  const { name, value } = event.target;
  setAuthForm((previous) => ({ ...previous, [name]: value }));
}

function handleRegister(event) {
  event.preventDefault();
  setAuthError("");
  setAuthMessage("");

  const name = authForm.name.trim();
  const email = authForm.email.trim().toLowerCase();
  const password = authForm.password;

  if (!name || !email || !password) {
    setAuthError("Please fill in every field.");
    return;
  }

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    setAuthError("Please enter a valid email address.");
    return;
  }

  if (password.length < 6) {
    setAuthError("Password must contain at least 6 characters.");
    return;
  }

  const accounts = JSON.parse(
    localStorage.getItem("shopease_demo_accounts") || "[]"
  );

  if (accounts.some((account) => account.email === email)) {
    setAuthError("An account with this email already exists. Please log in.");
    return;
  }

  // Demo only: store the profile, never the password.
  const user = { name, email };

  localStorage.setItem(
    "shopease_demo_accounts",
    JSON.stringify([...accounts, user])
  );
  localStorage.setItem("shopease_user", JSON.stringify(user));

  setCurrentUser(user);
  setAuthForm({ name: "", email: "", password: "" });
  setCurrentPage("home");
  showNotice("Demo account created successfully!");
}

function handleLogin(event) {
  event.preventDefault();
  setAuthError("");

  const email = authForm.email.trim().toLowerCase();
  const password = authForm.password;

  if (!email || !password) {
    setAuthError("Enter your email and password.");
    return;
  }

  if (password.length < 6) {
    setAuthError("Password must contain at least 6 characters.");
    return;
  }

  const accounts = JSON.parse(
    localStorage.getItem("shopease_demo_accounts") || "[]"
  );

  const user = accounts.find((account) => account.email === email);

  if (!user) {
    setAuthError("Demo account not found. Please register first.");
    return;
  }

  // Demo login: password is checked for basic form validity only.
  setCurrentUser(user);
  localStorage.setItem("shopease_user", JSON.stringify(user));
  setAuthForm({ name: "", email: "", password: "" });
  setCurrentPage("home");
  showNotice(`Welcome back, ${user.name}!`);
}

function handleLogout() {
  setCurrentUser(null);
  localStorage.removeItem("shopease_user");
  setCurrentPage("home");
  showNotice("You have logged out.");
}

function updateCheckoutForm(event) {
  const { name, value } = event.target;
  setCheckoutForm((previous) => ({ ...previous, [name]: value }));
}

function openCheckout() {
  if (cart.length === 0) {
    showNotice("Your cart is empty.");
    return;
  }

  if (!currentUser) {
    setCartOpen(false);
    setCurrentPage("login");
    setAuthMessage("Please log in before checkout.");
    return;
  }

  setCheckoutForm((previous) => ({
    ...previous,
    fullName: previous.fullName || currentUser.name,
    email: previous.email || currentUser.email,
  }));

  setCartOpen(false);
  setCurrentPage("checkout");
}

function placeOrder(event) {
  event.preventDefault();

  if (cart.length === 0) {
    showNotice("Your cart is empty.");
    setCurrentPage("home");
    return;
  }

  const order = {
    orderNumber: `SE${Date.now().toString().slice(-8)}`,
    customer: { ...checkoutForm },
    items: cart.map((item) => ({ ...item })),
    subtotal,
    shipping,
    total,
    date: new Date().toLocaleString("en-IN"),
  };

  localStorage.setItem("shopease_last_order", JSON.stringify(order));
  setLastOrder(order);
  setCart([]);
  setCurrentPage("order");
  window.scrollTo({ top: 0, behavior: "smooth" });
}
  useEffect(() => {
  localStorage.setItem("shopease_cart", JSON.stringify(cart));
}, [cart]);

useEffect(() => {
  localStorage.setItem("shopease_wishlist", JSON.stringify(wishlist));
}, [wishlist]);
  const [cartOpen, setCartOpen] = useState(false);
  const [notice, setNotice] = useState("");

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.trim().toLowerCase());

      const matchesCategory =
        category === "All" || product.category === category;

      return matchesSearch && matchesCategory;
    });

    if (sort === "low") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sort === "high") {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sort === "rating") {
      result = [...result].sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [search, category, sort]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const shipping = subtotal === 0 || subtotal >= 1999 ? 0 : 99;
  const total = subtotal + shipping;

  function showNotice(message) {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2200);
  }

  function addToCart(product) {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);

      if (existing) {
        return current.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...current, { ...product, quantity: 1 }];
    });

    showNotice("Added to your shopping bag");
  }

  function changeQuantity(id, amount) {
    setCart((current) =>
      current
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function removeFromCart(id) {
    setCart((current) => current.filter((item) => item.id !== id));
  }

  function toggleWishlist(id) {
    setWishlist((current) =>
      current.includes(id)
        ? current.filter((itemId) => itemId !== id)
        : [...current, id]
    );
  }

  function scrollToProducts() {
    document.getElementById("products")?.scrollIntoView({
      behavior: "smooth",
    });
  }

  return (
  <div className="app">
     <div className="account-actions">
  {currentUser ? (
    <>
      <span>Welcome, {currentUser.name}</span>
      <button
        onClick={handleLogout}
        className="account-button"
      >
        Log out
      </button>
    </>
  ) : (
    <button
      onClick={() => setCurrentPage("login")}
      className="account-button"
    >
      Log in
    </button>
  )}
</div>
      <div className="announcement">
        Free shipping on orders above ₹1,999
        <span> · </span>
        Thoughtful finds, everyday prices
      </div>

      <header className="header">
        <a href="#home" className="brand" aria-label="ShopEase home">
          shop<span>ease</span>
          <span className="brand-dot">.</span>
        </a>

        <nav className="main-nav" aria-label="Main navigation">
          <a className="active" href="#home">Home</a>
          <a href="#products">Shop</a>
          <a href="#benefits">Why ShopEase</a>
        </nav>

        <div className="header-actions">
          <label className="header-search">
            <Search size={18} />
            <input
              aria-label="Search products"
              placeholder="Search products..."
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                document.getElementById("products")?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
            />
            {search && (
              <button
                className="clear-search"
                onClick={() => setSearch("")}
                aria-label="Clear search"
              >
                <X size={15} />
              </button>
            )}
          </label>

          <button
            className="icon-button wishlist-header"
            onClick={() => {
              setSearch("");
              setCategory("All");
              showNotice(
                wishlist.length
                  ? `${wishlist.length} product(s) in your wishlist`
                  : "Your wishlist is empty"
              );
              scrollToProducts();
            }}
            aria-label={`Wishlist, ${wishlist.length} items`}
          >
            <Heart size={21} />
            {wishlist.length > 0 && (
              <span className="count">{wishlist.length}</span>
            )}
          </button>

          <button
            className="icon-button cart-header"
            onClick={() => setCartOpen(true)}
            aria-label={`Shopping bag, ${cartCount} items`}
          >
            <ShoppingBag size={21} />
            <span className="count">{cartCount}</span>
          </button>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <span className="eyebrow">
              <span className="eyebrow-line" />
              YOUR EVERYDAY DISCOVERY
            </span>

            <h1>
              Good things.
              <br />
              <span>Better prices.</span>
            </h1>

            <p>
              Discover thoughtful essentials for your lifestyle.
              Quality finds, lovely details, and prices you'll love.
            </p>

            <button className="primary-button" onClick={scrollToProducts}>
              Explore collection <ArrowRight size={18} />
            </button>

            <div className="hero-proof">
              <div className="avatar-stack" aria-hidden="true">
                <span>A</span><span>M</span><span>S</span>
              </div>
              <div>
                <div className="proof-stars">★★★★★</div>
                <small>Loved by everyday shoppers</small>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <img
              src="https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?auto=format&fit=crop&w=1100&q=85"
              alt="Curated lifestyle essentials in a bright, minimal interior"
              fetchPriority="high"
            />
            <div className="floating-card">
              <span className="floating-icon"><Star size={17} fill="currentColor" /></span>
              <div>
                <strong>Little things, big joy</strong>
                <span>Find your next favourite</span>
              </div>
            </div>
            <span className="hero-number">01 / DISCOVER</span>
          </div>
        </section>

        <section className="benefit-strip" id="benefits">
          <div><Truck size={21} /><span><strong>Easy delivery</strong><small>Free above ₹1,999</small></span></div>
          <div><ShieldCheck size={21} /><span><strong>Shopping made simple</strong><small>A smooth experience</small></span></div>
          <div><Headphones size={21} /><span><strong>Here to help</strong><small>Support when you need it</small></span></div>
        </section>

        <section className="catalog section-wrap" id="products">
          <div className="section-heading">
            <div>
              <span className="eyebrow">THE SHOP</span>
              <h2>Find your <span>favourite.</span></h2>
              <p>Everyday essentials, picked with care.</p>
            </div>
            <span className="product-count">
              {filteredProducts.length} products
            </span>
          </div>

          <div className="catalog-toolbar">
            <div className="category-list" aria-label="Filter by category">
              {categories.map((item) => (
                <button
                  key={item}
                  className={`category-chip ${category === item ? "selected" : ""}`}
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>
              ))}
            </div>

            <label className="sort-control">
              <SlidersHorizontal size={17} />
              <span>Sort:</span>
              <select
                aria-label="Sort products"
                value={sort}
                onChange={(event) => setSort(event.target.value)}
              >
                <option value="featured">Featured</option>
                <option value="low">Price: low to high</option>
                <option value="high">Price: high to low</option>
                <option value="rating">Top rated</option>
              </select>
            </label>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="product-grid">
              {filteredProducts.map((product) => {
                const isWishlisted = wishlist.includes(product.id);

                return (
                  <article className="product-card" key={product.id}>
                    <div className="product-image-wrap">
                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                      />
                      {product.badge && (
                        <span className="product-badge">{product.badge}</span>
                      )}
                      <button
                        className={`wishlist-button ${isWishlisted ? "wishlisted" : ""}`}
                        onClick={() => toggleWishlist(product.id)}
                        aria-label={
                          isWishlisted
                            ? `Remove ${product.name} from wishlist`
                            : `Add ${product.name} to wishlist`
                        }
                      >
                        <Heart
                          size={19}
                          fill={isWishlisted ? "currentColor" : "none"}
                        />
                      </button>
                      <button
                        className="quick-add"
                        onClick={() => addToCart(product)}
                      >
                        <Plus size={17} /> Add to bag
                      </button>
                    </div>

                    <div className="product-info">
                      <span className="product-category">{product.category}</span>
                      <h3>{product.name}</h3>
                      <div className="product-rating">
                        <Star size={14} fill="currentColor" />
                        <strong>{product.rating}</strong>
                        <span>({product.reviews} reviews)</span>
                      </div>
                      <div className="product-price">
                        <strong>{money(product.price)}</strong>
                        <del>{money(product.oldPrice)}</del>
                        <span>
                          {Math.round(
                            ((product.oldPrice - product.price) /
                              product.oldPrice) *
                              100
                          )}% off
                        </span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="empty-results">
              <Search size={32} />
              <h3>No products found</h3>
              <p>Try another search or select a different category.</p>
              <button
                className="primary-button"
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                }}
              >
                Clear filters
              </button>
            </div>
          )}
        </section>

        <section className="newsletter">
          <div>
            <span className="eyebrow">A LITTLE SOMETHING EXTRA</span>
            <h2>Good finds, straight to you.</h2>
            <p>Our newsletter form is coming soon. More lovely things await.</p>
          </div>
          <button className="newsletter-button" onClick={scrollToProducts}>
            Keep exploring <ArrowRight size={18} />
          </button>
        </section>
      </main>

      
      {currentPage === "login" && (
        <section className="page-wrap">
          <div className="form-card">
            <span className="eyebrow">WELCOME BACK</span>
            <h1>Log in to ShopEase</h1>
            <p>Enter your account details to continue shopping.</p>

            {authMessage && <p className="form-message">{authMessage}</p>}
            {authError && <p className="form-error">{authError}</p>}

            <form onSubmit={handleLogin}>
              <label>
                Email address
                <input
                  type="email"
                  name="email"
                  value={authForm.email}
                  onChange={handleAuthChange}
                  placeholder="you@example.com"
                  required
                />
              </label>

              <label>
                Password
                <input
                  type="password"
                  name="password"
                  value={authForm.password}
                  onChange={handleAuthChange}
                  placeholder="Enter at least 6 characters"
                  minLength={6}
                  required
                />
              </label>

              <button className="primary-button form-submit" type="submit">
                Log in <ArrowRight size={17} />
              </button>
            </form>

            <p className="form-switch">
              New to ShopEase?{" "}
              <button type="button" onClick={() => {
                setAuthError("");
                setAuthMessage("");
                setAuthForm({ name: "", email: "", password: "" });
                setCurrentPage("register");
              }}>
                Create an account
              </button>
            </p>

            <button className="text-button" onClick={() => setCurrentPage("home")}>
              Back to shopping
            </button>
          </div>
        </section>
      )}

      {currentPage === "register" && (
        <section className="page-wrap">
          <div className="form-card">
            <span className="eyebrow">JOIN SHOP EASE</span>
            <h1>Create an account</h1>
            <p>Set up your demo account to continue.</p>

            {authError && <p className="form-error">{authError}</p>}

            <form onSubmit={handleRegister}>
              <label>
                Full name
                <input
                  type="text"
                  name="name"
                  value={authForm.name}
                  onChange={handleAuthChange}
                  placeholder="Your full name"
                  required
                />
              </label>

              <label>
                Email address
                <input
                  type="email"
                  name="email"
                  value={authForm.email}
                  onChange={handleAuthChange}
                  placeholder="you@example.com"
                  required
                />
              </label>

              <label>
                Password
                <input
                  type="password"
                  name="password"
                  value={authForm.password}
                  onChange={handleAuthChange}
                  placeholder="At least 6 characters"
                  minLength={6}
                  required
                />
              </label>

              <button className="primary-button form-submit" type="submit">
                Create account <ArrowRight size={17} />
              </button>
            </form>

            <p className="form-switch">
              Already registered?{" "}
              <button type="button" onClick={() => {
                setAuthError("");
                setAuthMessage("");
                setAuthForm({ name: "", email: "", password: "" });
                setCurrentPage("login");
              }}>
                Log in
              </button>
            </p>
          </div>
        </section>
      )}

      {currentPage === "checkout" && (
        <section className="page-wrap">
          <div className="checkout-layout">
            <div className="form-card">
              <span className="eyebrow">ALMOST YOURS</span>
              <h1>Delivery details</h1>
              <p>Enter where your order should be delivered.</p>

              <form onSubmit={placeOrder}>
                <label>
                  Full name
                  <input name="fullName" value={checkoutForm.fullName}
                    onChange={updateCheckoutForm} required />
                </label>

                <label>
                  Email address
                  <input type="email" name="email" value={checkoutForm.email}
                    onChange={updateCheckoutForm} required />
                </label>

                <label>
                  Phone number
                  <input type="tel" name="phone" value={checkoutForm.phone}
                    onChange={updateCheckoutForm} pattern="[0-9+\-\s]{10,15}"
                    title="Enter a valid phone number" required />
                </label>

                <label>
                  Delivery address
                  <input name="address" value={checkoutForm.address}
                    onChange={updateCheckoutForm} required />
                </label>

                <label>
                  City
                  <input name="city" value={checkoutForm.city}
                    onChange={updateCheckoutForm} required />
                </label>

                <label>
                  PIN code
                  <input name="pincode" value={checkoutForm.pincode}
                    onChange={updateCheckoutForm} pattern="[0-9]{6}"
                    title="Enter a 6-digit PIN code" required />
                </label>

                <button className="primary-button form-submit" type="submit">
                  Place demo order <ArrowRight size={17} />
                </button>
              </form>

              <button className="text-button" onClick={() => setCurrentPage("home")}>
                Continue shopping
              </button>
            </div>

            <aside className="order-summary">
              <h2>Your order</h2>
              {cart.map((item) => (
                <div className="summary-item" key={item.id}>
                  <span>{item.name} × {item.quantity}</span>
                  <strong>{money(item.price * item.quantity)}</strong>
                </div>
              ))}
              <div className="summary-item">
                <span>Subtotal</span><strong>{money(subtotal)}</strong>
              </div>
              <div className="summary-item">
                <span>Shipping</span>
                <strong>{shipping === 0 ? "Free" : money(shipping)}</strong>
              </div>
              <div className="summary-item summary-total">
                <span>Total</span><strong>{money(total)}</strong>
              </div>
              <p>This is a student demo. No payment will be collected.</p>
            </aside>
          </div>
        </section>
      )}

      {currentPage === "order" && lastOrder && (
        <section className="page-wrap">
          <div className="form-card order-success">
            <CheckCircle2 size={46} />
            <span className="eyebrow">ORDER CONFIRMED</span>
            <h1>Thank you for shopping!</h1>
            <p>Your demo order has been placed successfully.</p>

            <div className="order-number">
              <span>Order number</span>
              <strong>{lastOrder.orderNumber}</strong>
            </div>

            <div className="summary-item">
              <span>Order total</span>
              <strong>{money(lastOrder.total)}</strong>
            </div>
            <div className="summary-item">
              <span>Deliver to</span>
              <strong>{lastOrder.customer.fullName}</strong>
            </div>
            <p>Order date: {lastOrder.date}</p>

            <button className="primary-button form-submit"
              onClick={() => setCurrentPage("home")}>
              Continue shopping <ArrowRight size={17} />
            </button>
          </div>
        </section>
      )}


      <footer className="footer">
        <a href="#home" className="brand">
          shop<span>ease</span><span className="brand-dot">.</span>
        </a>
        <p>Everyday essentials. A little easier.</p>
        <span>© {new Date().getFullYear()} ShopEase · Student project</span>
      </footer>

      {notice && (
        <div className="toast" role="status">
          <CheckCircle2 size={19} />
          {notice}
        </div>
      )}

      {cartOpen && (
        <div className="drawer-backdrop" onClick={() => setCartOpen(false)}>
          <aside
            className="cart-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Shopping bag"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="drawer-heading">
              <div>
                <span className="eyebrow">YOUR SELECTION</span>
                <h2>Shopping bag ({cartCount})</h2>
              </div>
              <button
                className="icon-button"
                onClick={() => setCartOpen(false)}
                aria-label="Close shopping bag"
              >
                <X size={22} />
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="empty-cart">
                <ShoppingBag size={42} />
                <h3>Your bag is waiting</h3>
                <p>Find something you'll love and add it here.</p>
                <button
                  className="primary-button"
                  onClick={() => {
                    setCartOpen(false);
                    scrollToProducts();
                  }}
                >
                  Explore products <ArrowRight size={17} />
                </button>
              </div>
            ) : (
              <>
                <div className="drawer-items">
                  {cart.map((item) => (
                    <div className="cart-item" key={item.id}>
                      <img src={item.image} alt={item.name} />
                      <div className="cart-item-info">
                        <h3>{item.name}</h3>
                        <strong>{money(item.price)}</strong>
                        <div className="quantity-control">
                          <button
                            onClick={() => changeQuantity(item.id, -1)}
                            aria-label={`Decrease ${item.name} quantity`}
                          >
                            <Minus size={14} />
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={() => changeQuantity(item.id, 1)}
                            aria-label={`Increase ${item.name} quantity`}
                          >
                            <Plus size={14} />
                          </button>
                          <button
                            className="remove-item"
                            onClick={() => removeFromCart(item.id)}
                            aria-label={`Remove ${item.name}`}
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="drawer-summary">
                  <div><span>Subtotal</span><strong>{money(subtotal)}</strong></div>
                  <div><span>Shipping</span><strong>{shipping === 0 ? "Free" : money(shipping)}</strong></div>
                  <div className="drawer-total"><span>Total</span><strong>{money(total)}</strong></div>
                  <p>Taxes, if applicable, are included in this demo pricing.</p>
                  <button
                    className="primary-button checkout-demo"
                    onClick={() => showNotice("Checkout is the next feature to build!")}
                  >
                    Proceed to checkout <ArrowRight size={17} />
                  </button>
                </div>
              </>
            )}
          </aside>
        </div>
      )}
    </div>
  );
}

export default App;
