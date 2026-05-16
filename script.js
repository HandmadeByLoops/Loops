/* ============================================================
   HANDMADE BY LOOPS — script.js (Polished & Performance Upgraded)
   ✅ All original functionality preserved
   ✅ Cursor, scroll, tilt, nav, toast, page nav — all upgraded
   ============================================================ */


/* ─────────────────────────────────────────────────────────────
   CURSOR — rAF loop (GPU-friendly, no layout thrashing)
   ───────────────────────────────────────────────────────────── */
(function initCursor() {
  const dot  = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  const glow = document.getElementById('cursor-glow');
  if (!dot || !ring || !glow) return;

  if (window.matchMedia('(max-width: 768px)').matches) return;

  let mx = 0, my = 0;
  let rx = 0, ry = 0;
  let rafId = null;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
  }, { passive: true });

  function animateCursor() {
    dot.style.left  = mx + 'px';
    dot.style.top   = my + 'px';
    glow.style.left = mx + 'px';
    glow.style.top  = my + 'px';

    rx += (mx - rx) * 0.13;
    ry += (my - ry) * 0.13;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';

    rafId = requestAnimationFrame(animateCursor);
  }

  rafId = requestAnimationFrame(animateCursor);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(rafId);
    } else {
      rafId = requestAnimationFrame(animateCursor);
    }
  });
})();


/* ─────────────────────────────────────────────────────────────
   LOADER
   ───────────────────────────────────────────────────────────── */
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (!loader) return;
    loader.classList.add('out');
    setTimeout(() => {
      loader.style.display = 'none';
      initReveal();
    }, 950);
  }, 3300);
});


/* ─────────────────────────────────────────────────────────────
   SCROLL — throttled via rAF (no layout thrashing)
   ───────────────────────────────────────────────────────────── */
(function initScroll() {
  const navbar = document.getElementById('navbar');
  let ticking = false;

  function onScrollFrame() {
    const scrollY = window.scrollY;

    if (navbar) {
      navbar.classList.toggle('scrolled', scrollY > 40);
    }

    const hp = document.querySelector('.hero-parallax');
    if (hp) {
      hp.style.transform = `translateY(${scrollY * 0.28}px)`;
    }

    const reveals = document.querySelectorAll('.reveal:not(.visible)');
    const vh = window.innerHeight;
    reveals.forEach(el => {
      if (el.getBoundingClientRect().top < vh - 80) {
        el.classList.add('visible');
      }
    });

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(onScrollFrame);
      ticking = true;
    }
  }, { passive: true });
})();


/* ─────────────────────────────────────────────────────────────
   REVEAL INITIALISER — runs once, not on every scroll tick
   ───────────────────────────────────────────────────────────── */
function initReveal() {
  const vh = window.innerHeight;
  document.querySelectorAll('.reveal').forEach(el => {
    if (el.getBoundingClientRect().top < vh - 80) {
      el.classList.add('visible');
    }
  });
}


/* ─────────────────────────────────────────────────────────────
   TILT — rAF-driven with lerp inertia, properly cleaned up
   ───────────────────────────────────────────────────────────── */
function setupTilt() {
  document.querySelectorAll(
    '.product-card, .feature-card, .blog-card, .portfolio-item'
  ).forEach(card => {
    let rafId = null;
    let targetDx = 0, targetDy = 0;
    let currentDx = 0, currentDy = 0;
    let isHovered = false;

    card.addEventListener('mousemove', e => {
      const r  = card.getBoundingClientRect();
      targetDx = (e.clientX - r.left - r.width  / 2) / (r.width  / 2);
      targetDy = (e.clientY - r.top  - r.height / 2) / (r.height / 2);
    }, { passive: true });

    function animateTilt() {
      if (!isHovered) return;
      currentDx += (targetDx - currentDx) * 0.18;
      currentDy += (targetDy - currentDy) * 0.18;

      card.style.transform = `
        perspective(900px)
        rotateY(${currentDx * 6}deg)
        rotateX(${-currentDy * 6}deg)
        translateZ(10px)
        scale(1.012)
      `;
      card.style.boxShadow = `
        ${-currentDx * 16}px ${currentDy * 16}px 60px rgba(0,0,0,.38),
        0 0 60px rgba(107,143,113,.08)
      `;

      rafId = requestAnimationFrame(animateTilt);
    }

    card.addEventListener('mouseenter', () => {
      isHovered = true;
      rafId = requestAnimationFrame(animateTilt);
    });

    card.addEventListener('mouseleave', () => {
      isHovered = false;
      cancelAnimationFrame(rafId);

      card.style.transition = 'transform 0.55s cubic-bezier(0.23,1,0.32,1), box-shadow 0.55s cubic-bezier(0.23,1,0.32,1)';
      card.style.transform  = '';
      card.style.boxShadow  = '';

      setTimeout(() => {
        card.style.transition = '';
        currentDx = 0;
        currentDy = 0;
      }, 550);
    });
  });
}


/* ─────────────────────────────────────────────────────────────
   NAV TOGGLE — hamburger animates into X on mobile
   ───────────────────────────────────────────────────────────── */
function initNavToggle() {
  const toggle = document.getElementById('navToggle');
  const links  = document.getElementById('navLinks');
  if (!toggle || !links) return;

  // Add smooth transition to spans
  toggle.querySelectorAll('span').forEach(span => {
    span.style.transition = 'transform 0.3s cubic-bezier(0.23,1,0.32,1), opacity 0.2s ease';
  });

  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open');
    const spans  = toggle.querySelectorAll('span');
    if (isOpen) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity   = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity   = '';
      spans[2].style.transform = '';
    }
  });

  // Close menu when tapping outside on mobile
  document.addEventListener('click', e => {
    if (links.classList.contains('open') &&
        !links.contains(e.target) &&
        !toggle.contains(e.target)) {
      links.classList.remove('open');
      const spans = toggle.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity   = '';
      spans[2].style.transform = '';
    }
  });
}


/* ─────────────────────────────────────────────────────────────
   DATA
   ───────────────────────────────────────────────────────────── */
const products = [
  {id:1, name:"Blush Rose Crochet Flower",  category:"Flowers",   filter:"flowers",   price:350, tag:"bestseller", img:"cover8.jpeg"},
  {id:2, name:"Sunshine Keychain",           category:"Keychains", filter:"keychains", price:180, tag:"new",        img:"cover9.jpeg"},
  {id:3, name:"Sage Green Market Tote",      category:"Tote Bags", filter:"bags",      price:850, tag:"bestseller", img:"cover10.jpeg"},
  {id:4, name:"Mini Mushroom Keychain",      category:"Keychains", filter:"keychains", price:150, tag:"new",        img:"cover11.jpeg"},
  {id:5, name:"Lavender Daisy Bunch",        category:"Flowers",   filter:"flowers",   price:420, tag:"bestseller", img:"cover12.jpeg"},
  {id:6, name:"Cream Bucket Tote",           category:"Tote Bags", filter:"bags",      price:750, tag:"",           img:"cover13.jpeg"},
  {id:7, name:"Strawberry Charm Keychain",   category:"Keychains", filter:"keychains", price:170, tag:"new",        img:"cover14.jpeg"},
  {id:8, name:"Baby Pink Rose Cluster",      category:"Flowers",   filter:"flowers",   price:380, tag:"",           img:"cover15.jpeg"},
  {id:9, name:"Boho Fringe Tote Bag",        category:"Tote Bags", filter:"bags",      price:920, tag:"bestseller", img:"cover16.jpeg"},
];

const blogPosts = [
  {id:1, title:"A Beginner's Guide to Crochet", date:"March 12, 2025", img:"cover20.jpeg", excerpt:"Thinking about picking up a crochet hook? Here's everything you need to start your journey into the world of yarn and loops.", tags:["crochet","beginner","tutorial"], body:`<div class="post-hero-img"><img src="cover20.jpeg"/></div><div class="post-body"><h1>A Beginner's Guide to Crochet</h1><p class="section-eyebrow">March 12, 2025 · Beginner Guides</p><h2>What is Crochet?</h2><p>Crochet is a method of creating fabric by interlocking loops of yarn using a single hook. Unlike knitting, which uses two needles, crochet uses just one — making it easier to pick up and put down without losing your work.</p><h2>What You'll Need</h2><p>A crochet hook (size 4.0mm–5.0mm for beginners), medium-weight yarn, and a pair of scissors. That's it.</p><h2>Tips for Beginners</h2><p>Don't rush. Watch your tension. Practice the same stitch repeatedly before moving on. Start with something small like a keychain — it builds confidence fast. 🧶</p><div class="post-keywords"><span class="blog-tag">crochet</span><span class="blog-tag">beginner</span><span class="blog-tag">tutorial</span></div></div>`},
  {id:2, title:"Why Handmade Products Are So Valuable", date:"April 2, 2025", img:"cover18.jpeg", excerpt:"In a world of fast fashion and mass production, handmade goods carry something irreplaceable — the human touch.", tags:["handmade","value","slow fashion"], body:`<div class="post-hero-img"><img src="cover18.jpeg"/></div><div class="post-body"><h1>Why Handmade Products Are So Valuable</h1><p class="section-eyebrow">April 2, 2025 · Slow Living</p><h2>The Time Behind Every Piece</h2><p>When you hold a handmade crochet item, you're holding hours of someone's time. A simple keychain might take 45 minutes. A tote bag could take an entire day. That time is built into the price — and it should be.</p><h2>No Two Are Exactly Alike</h2><p>Mass-produced items are designed to be identical. Handmade items, by nature, can never be. When you buy handmade, you own something nobody else in the world has. ✨</p><div class="post-keywords"><span class="blog-tag">handmade</span><span class="blog-tag">value</span><span class="blog-tag">slow fashion</span></div></div>`},
  {id:3, title:"Our Small Business Journey", date:"April 18, 2025", img:"cover19.jpeg", excerpt:"From a late-night YouTube tutorial to a real, running business — here's the honest story of how Handmade by Loops came to be.", tags:["small business","journey","Pakistan"], body:`<div class="post-hero-img"><img src="cover19.jpeg"/></div><div class="post-body"><h1>Our Small Business Journey</h1><p class="section-eyebrow">April 18, 2025 · Our Story</p><h2>The First Hook</h2><p>My first stitch was wonky. My first square was lopsided. But I was hooked — no pun intended. There's something deeply satisfying about watching yarn transform into something real using just your hands.</p><h2>Why I Keep Going</h2><p>Because of the messages. The photos customers send when their order arrives. The "my daughter loves it" moments. A small business isn't just a business — it's a relationship. 🧶💕</p><div class="post-keywords"><span class="blog-tag">small business</span><span class="blog-tag">journey</span><span class="blog-tag">Pakistan</span></div></div>`},
];


/* ─────────────────────────────────────────────────────────────
   CART
   ───────────────────────────────────────────────────────────── */
let cart = [];

function addToCart(id) {
  const p = products.find(x => x.id === id);
  if (!p) return;
  const ex = cart.find(x => x.id === id);
  ex ? ex.qty++ : cart.push({...p, qty: 1});
  updateCartUI();
  showToast(`${p.name} added 🧶`);
}

function removeFromCart(id) {
  cart = cart.filter(x => x.id !== id);
  updateCartUI();
}

function updateCartUI() {
  const cnt = cart.reduce((s, i) => s + i.qty, 0);
  document.querySelectorAll('.cart-count').forEach(el => el.textContent = cnt);
  const ci = document.getElementById('cartItems');
  const cf = document.getElementById('cartFooter');
  const ct = document.getElementById('cartTotal');
  if (!ci) return;
  if (!cart.length) {
    ci.innerHTML = `<div class="cart-empty"><span>🧶</span><p>Your cart is empty</p><a href="#shop" class="btn btn-primary" data-page="shop" onclick="toggleCart()">Start Shopping</a></div>`;
    cf.style.display = 'none';
  } else {
    ci.innerHTML = cart.map(i => `
      <div class="cart-item-row">
        <div class="cart-item-img"><img src="${i.img}" alt="${i.name}"/></div>
        <div class="cart-item-info">
          <div class="cart-item-name">${i.name}</div>
          <div class="cart-item-price">Rs. ${i.price} × ${i.qty}</div>
        </div>
        <button class="cart-item-remove" onclick="removeFromCart(${i.id})">✕</button>
      </div>
    `).join('');
    const tot = cart.reduce((s, i) => s + i.price * i.qty, 0);
    ct.textContent = `Rs. ${tot.toLocaleString()}`;
    cf.style.display = 'block';
  }
}

function toggleCart() {
  document.getElementById('cartModal').classList.toggle('hidden');
}

async function checkoutCart() {
  if (cart.length === 0) {
    showToast("Cart is empty 🧶");
    return;
  }

  const order = {
    name: "Guest",
    product: cart.map(i => i.name).join(", "),
    price: cart.reduce((s, i) => s + i.price * i.qty, 0),
    quantity: cart.reduce((s, i) => s + i.qty, 0),
    time: new Date().toISOString()
  };

  try {
    const res = await fetch("https://cart-api.handmadebyloopss.workers.dev", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order)
    });
    const data = await res.json();
    console.log("ORDER SENT:", data);
    showToast("Order placed successfully 🎉");
    cart = [];
    updateCartUI();
  } catch (err) {
    console.log(err);
    showToast("Checkout failed ❌");
  }
}


/* ─────────────────────────────────────────────────────────────
   TOAST — spring-physics entrance
   ───────────────────────────────────────────────────────────── */
let toastTimer = null;

function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;

  clearTimeout(toastTimer);

  t.textContent = msg;
  t.style.transition = 'none';
  t.style.transform  = 'translateX(-50%) translateY(80px)';
  t.style.opacity    = '0';

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      t.style.transition = 'transform 0.45s cubic-bezier(0.34,1.4,0.64,1), opacity 0.3s ease';
      t.style.transform  = 'translateX(-50%) translateY(0)';
      t.style.opacity    = '1';
    });
  });

  toastTimer = setTimeout(() => {
    t.style.transition = 'transform 0.4s cubic-bezier(0.23,1,0.32,1), opacity 0.3s ease';
    t.style.transform  = 'translateX(-50%) translateY(80px)';
    t.style.opacity    = '0';
  }, 3000);
}


/* ─────────────────────────────────────────────────────────────
   RENDER
   ───────────────────────────────────────────────────────────── */
function renderProduct(p) {
  const tag = p.tag
    ? `<span class="product-tag ${p.tag === 'new' ? 'new' : ''}">${p.tag === 'new' ? '✦ New' : '★ Bestseller'}</span>`
    : '';
  return `
    <div class="product-card" data-filter="${p.filter}">
      <div class="product-img">
        <img src="${p.img}" alt="${p.name}" loading="lazy"/>
        ${tag}
        <button class="product-wishlist" onclick="showToast('Added to wishlist 🌸')">🤍</button>
        <div class="product-overlay"></div>
      </div>
      <div class="product-info">
        <p class="product-cat">${p.category}</p>
        <h3 class="product-name">${p.name}</h3>
        <div class="product-footer">
          <span class="product-price">Rs. ${p.price}</span>
          <button class="add-cart-btn" onclick="addToCart(${p.id})">+ Add</button>
        </div>
      </div>
    </div>
  `;
}

function renderBlog(b) {
  return `
    <div class="blog-card" onclick="openBlogPost(${b.id})">
      <div class="blog-card-img"><img src="${b.img}" alt="${b.title}" loading="lazy"/></div>
      <div class="blog-card-info">
        <p class="blog-date">${b.date}</p>
        <h3 class="blog-title">${b.title}</h3>
        <p class="blog-excerpt">${b.excerpt}</p>
        <span class="blog-read-more">Read more →</span>
        <div class="blog-tags">${b.tags.map(t => `<span class="blog-tag">${t}</span>`).join('')}</div>
      </div>
    </div>
  `;
}


/* ─────────────────────────────────────────────────────────────
   BLOG
   ───────────────────────────────────────────────────────────── */
function openBlogPost(id) {
  const p = blogPosts.find(x => x.id === id);
  if (!p) return;
  document.getElementById('blogPostContent').innerHTML = p.body;
  document.getElementById('blogPost').classList.remove('hidden');
  document.querySelector('#blog .blog-grid')?.classList.add('hidden');
  document.querySelector('#blog .page-hero')?.classList.add('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function closeBlogPost() {
  document.getElementById('blogPost').classList.add('hidden');
  document.querySelector('#blog .blog-grid')?.classList.remove('hidden');
  document.querySelector('#blog .page-hero')?.classList.remove('hidden');
}


/* ─────────────────────────────────────────────────────────────
   NAV — smooth page transition with fade
   ───────────────────────────────────────────────────────────── */
function navigateTo(id) {
  const currentPage = document.querySelector('.page.active');
  const nextPage    = document.getElementById(id);
  if (!nextPage || nextPage === currentPage) return;

  if (currentPage) {
    currentPage.style.opacity   = '0';
    currentPage.style.transition = 'opacity 180ms ease';
  }

  setTimeout(() => {
    document.querySelectorAll('.page').forEach(p => {
      p.classList.remove('active');
      p.style.opacity    = '';
      p.style.transition = '';
    });
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));

    nextPage.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    document.querySelectorAll(`[data-page="${id}"]`).forEach(l => l.classList.add('active'));
    document.getElementById('navLinks')?.classList.remove('open');

    setTimeout(() => {
      setupTilt();
      initReveal();
    }, 120);
  }, currentPage ? 160 : 0);
}


/* ─────────────────────────────────────────────────────────────
   FILTER
   ───────────────────────────────────────────────────────────── */
function setupFilters() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      document.querySelectorAll('#shopProducts .product-card').forEach(card => {
        const show = f === 'all'
          || card.dataset.filter === f
          || (f === 'new'        && card.querySelector('.product-tag.new'))
          || (f === 'bestseller' && card.querySelector('.product-tag:not(.new)'));
        card.style.display = show ? 'block' : 'none';
      });
    });
  });
}


/* ─────────────────────────────────────────────────────────────
   FAQ
   ───────────────────────────────────────────────────────────── */
function toggleFaq(btn) {
  const a    = btn.nextElementSibling;
  const open = a.classList.contains('open');
  document.querySelectorAll('.faq-a').forEach(x => x.classList.remove('open'));
  document.querySelectorAll('.faq-q').forEach(x => x.classList.remove('open'));
  if (!open) {
    a.classList.add('open');
    btn.classList.add('open');
  }
}


/* ─────────────────────────────────────────────────────────────
   TRACK ORDER
   ───────────────────────────────────────────────────────────── */
function trackOrder(e) {
  e.preventDefault();
  const id = e.target.querySelector('input').value.trim();
  if (!id) return;
  const s = [
    { status: '📦 Order Confirmed',       detail: 'Your order has been received and is being prepared.' },
    { status: '🧶 Crafting in Progress',  detail: 'Your item is being handmade with love.' },
    { status: '🚚 Shipped',               detail: 'Your order is on its way! Expected delivery: 2–4 days.' },
    { status: '✅ Delivered',             detail: 'Your order has been delivered. Enjoy!' },
  ];
  const r  = s[Math.floor(Math.random() * s.length)];
  const el = document.getElementById('trackResult');
  el.innerHTML  = `<strong>${r.status}</strong><br/><small>${r.detail}</small>`;
  el.style.display = 'block';
}


/* ─────────────────────────────────────────────────────────────
   ACCOUNT TABS
   ───────────────────────────────────────────────────────────── */
function switchTab(id, btn) {
  document.querySelectorAll('.acc-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.acc-tab').forEach(t => t.classList.remove('active'));
  const p = document.getElementById(id);
  if (p) p.classList.add('active');
  if (btn) btn.classList.add('active');
}


/* ─────────────────────────────────────────────────────────────
   EMAILJS + INIT
   ───────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {

  emailjs.init('h8nVl3ROujuytx51D');

  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const captchaResponse = grecaptcha.getResponse();

if (!captchaResponse) {
  showToast("Please complete CAPTCHA 🛡️");
  return;
}
      emailjs.sendForm('service_xkt6xzb', 'template_m2s2fta', this)
        .then(() => {

          // Save data before reset
          const name    = form.querySelector('[name="name"]').value;
          const email   = form.querySelector('[name="email"]').value;
          const subject = form.querySelector('[name="subject"]').value;
          const message = form.querySelector('[name="message"]').value;

          document.getElementById('formSuccess').classList.remove('hidden');
          showToast("Message sent! We'll reply soon 💌");

          // Send to Make.com
          fetch("https://hook.us2.make.com/rfaflqgjig6h3ytvppqeswbtbjrdekn1", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, subject, message })
          })
          .then(() => console.log("Sent to Make"))
          .catch(err => console.log("Make error:", err));

          form.reset();
          grecaptcha.reset();
        });
    });
  }

  /* INIT — render products, blog, filters */
  const hp = document.getElementById('homeProducts');
  if (hp) hp.innerHTML = products.slice(0, 6).map(renderProduct).join('');

  const sp = document.getElementById('shopProducts');
  if (sp) sp.innerHTML = products.map(renderProduct).join('');

  const hb = document.getElementById('homeBlog');
  if (hb) hb.innerHTML = blogPosts.map(renderBlog).join('');

  const bp = document.getElementById('blogPage');
  if (bp) bp.innerHTML = blogPosts.map(renderBlog).join('');

  setupFilters();
  updateCartUI();
  setupTilt();

  /* Nav toggle (hamburger → X) */
  initNavToggle();

  /* Page links */
  document.querySelectorAll('[data-page]').forEach(l => {
    l.addEventListener('click', e => {
      e.preventDefault();
      const pg = l.dataset.page;
      if (pg) navigateTo(pg);
    });
  });

  /* Cart icon */
  document.querySelector('.nav-cart').addEventListener('click', e => {
    e.preventDefault();
    toggleCart();
  });

  /* Initial reveal after loader */
  setTimeout(initReveal, 3500);

  /* Deep link support (e.g. ?#shop) */
  const hash = window.location.hash.replace('#', '');
  if (hash && document.getElementById(hash)) navigateTo(hash);
});


/* ─────────────────────────────────────────────────────────────
   CHATBOT
   ───────────────────────────────────────────────────────────── */
const chatBtn  = document.getElementById("chatbot-btn");
const chatBox  = document.getElementById("chatbot");
const closeBtn = document.getElementById("chat-close");
const messages = document.getElementById("chat-messages");
const typing   = document.getElementById("typing");

chatBtn.onclick = () => { chatBox.style.display = "flex"; };
closeBtn.onclick = () => { chatBox.style.display = "none"; };

function sendMessage() {
  const input = document.getElementById("userInput");
  const text  = input.value.trim();
  if (!text) return;

  addMessage(text, "user");
  input.value = "";
  typing.style.display = "block";

  setTimeout(async () => {
    typing.style.display = "none";
    const reply = await generateResponse(text);
    addMessage(reply, "bot");
  }, 900);
}

document.getElementById("userInput").addEventListener("keydown", function(e) {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

function addMessage(text, type) {
  const div = document.createElement("div");
  div.className  = `msg ${type}`;
  div.textContent = text;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

async function generateResponse(input) {
  try {
    const response = await fetch("https://loops.handmadebyloopss.workers.dev/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input })
    });
    const data = await response.json();
    return data.reply || "No response from AI.";
  } catch (error) {
    console.log(error);
    return "Error connecting to AI.";
  }
}
