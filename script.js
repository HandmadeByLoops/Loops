  /* CURSOR */
  const cDot=document.getElementById('cursor-dot'),cRing=document.getElementById('cursor-ring'),cGlow=document.getElementById('cursor-glow');
  let mx=0,my=0,rx=0,ry=0;
  document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cDot.style.left=mx+'px';cDot.style.top=my+'px';cGlow.style.left=mx+'px';cGlow.style.top=my+'px'});
  (function animCursor(){rx+=(mx-rx)*.12;ry+=(my-ry)*.12;cRing.style.left=rx+'px';cRing.style.top=ry+'px';requestAnimationFrame(animCursor)})();

  /* LOADER */
  window.addEventListener('load',()=>{setTimeout(()=>{const l=document.getElementById('loader');l.classList.add('out');setTimeout(()=>l.style.display='none',950)},3300)});

  /* SCROLL */
  window.addEventListener('scroll',()=>{
    if(window.scrollY>40)document.getElementById('navbar').classList.add('scrolled');
    else document.getElementById('navbar').classList.remove('scrolled');
    const hp=document.querySelector('.hero-parallax');
    if(hp)hp.style.transform=`translateY(${window.scrollY*.28}px)`;
    document.querySelectorAll('.reveal').forEach(el=>{if(el.getBoundingClientRect().top<window.innerHeight-80)el.classList.add('visible')});
  });

  /* TILT */
  function setupTilt(){
    document.querySelectorAll('.product-card,.feature-card,.blog-card,.portfolio-item').forEach(card=>{
      card.addEventListener('mousemove',e=>{
        const r=card.getBoundingClientRect(),dx=(e.clientX-r.left-r.width/2)/(r.width/2),dy=(e.clientY-r.top-r.height/2)/(r.height/2);
        card.style.transform=`perspective(900px) rotateY(${dx*7}deg) rotateX(${-dy*7}deg) translateZ(8px)`;
        card.style.boxShadow=`${-dx*18}px ${dy*18}px 70px rgba(0,0,0,.4),0 0 70px rgba(196,113,138,.1)`;
      });
      card.addEventListener('mouseleave',()=>{card.style.transform='';card.style.boxShadow='';});
    });
  }

  /* DATA */
  const products=[
    {id:1,name:"Blush Rose Crochet Flower",category:"Flowers",filter:"flowers",price:350,tag:"bestseller",img:"cover8.jpeg"},
    {id:2,name:"Sunshine Keychain",category:"Keychains",filter:"keychains",price:180,tag:"new",img:"cover9.jpeg"},
    {id:3,name:"Sage Green Market Tote",category:"Tote Bags",filter:"bags",price:850,tag:"bestseller",img:"cover10.jpeg"},
    {id:4,name:"Mini Mushroom Keychain",category:"Keychains",filter:"keychains",price:150,tag:"new",img:"cover11.jpeg"},
    {id:5,name:"Lavender Daisy Bunch",category:"Flowers",filter:"flowers",price:420,tag:"bestseller",img:"cover12.jpeg"},
    {id:6,name:"Cream Bucket Tote",category:"Tote Bags",filter:"bags",price:750,tag:"",img:"cover13.jpeg"},
    {id:7,name:"Strawberry Charm Keychain",category:"Keychains",filter:"keychains",price:170,tag:"new",img:"cover14.jpeg"},
    {id:8,name:"Baby Pink Rose Cluster",category:"Flowers",filter:"flowers",price:380,tag:"",img:"cover15.jpeg"},
    {id:9,name:"Boho Fringe Tote Bag",category:"Tote Bags",filter:"bags",price:920,tag:"bestseller",img:"cover16.jpeg"},
  ];
  const blogPosts=[
    {id:1,title:"A Beginner's Guide to Crochet",date:"March 12, 2025",img:"cover20.jpeg",excerpt:"Thinking about picking up a crochet hook? Here's everything you need to start your journey into the world of yarn and loops.",tags:["crochet","beginner","tutorial"],body:`<div class="post-hero-img"><img src="cover20.jpeg"/></div><div class="post-body"><h1>A Beginner's Guide to Crochet</h1><p class="section-eyebrow">March 12, 2025 · Beginner Guides</p><h2>What is Crochet?</h2><p>Crochet is a method of creating fabric by interlocking loops of yarn using a single hook. Unlike knitting, which uses two needles, crochet uses just one — making it easier to pick up and put down without losing your work.</p><h2>What You'll Need</h2><p>A crochet hook (size 4.0mm–5.0mm for beginners), medium-weight yarn, and a pair of scissors. That's it.</p><h2>Tips for Beginners</h2><p>Don't rush. Watch your tension. Practice the same stitch repeatedly before moving on. Start with something small like a keychain — it builds confidence fast. 🧶</p><div class="post-keywords"><span class="blog-tag">crochet</span><span class="blog-tag">beginner</span><span class="blog-tag">tutorial</span></div></div>`},
    {id:2,title:"Why Handmade Products Are So Valuable",date:"April 2, 2025",img:"cover18.jpeg",excerpt:"In a world of fast fashion and mass production, handmade goods carry something irreplaceable — the human touch.",tags:["handmade","value","slow fashion"],body:`<div class="post-hero-img"><img src="cover18.jpeg"/></div><div class="post-body"><h1>Why Handmade Products Are So Valuable</h1><p class="section-eyebrow">April 2, 2025 · Slow Living</p><h2>The Time Behind Every Piece</h2><p>When you hold a handmade crochet item, you're holding hours of someone's time. A simple keychain might take 45 minutes. A tote bag could take an entire day. That time is built into the price — and it should be.</p><h2>No Two Are Exactly Alike</h2><p>Mass-produced items are designed to be identical. Handmade items, by nature, can never be. When you buy handmade, you own something nobody else in the world has. ✨</p><div class="post-keywords"><span class="blog-tag">handmade</span><span class="blog-tag">value</span><span class="blog-tag">slow fashion</span></div></div>`},
    {id:3,title:"Our Small Business Journey",date:"April 18, 2025",img:"cover19.jpeg",excerpt:"From a late-night YouTube tutorial to a real, running business — here's the honest story of how Handmade by Loops came to be.",tags:["small business","journey","Pakistan"],body:`<div class="post-hero-img"><img src="cover19.jpeg"/></div><div class="post-body"><h1>Our Small Business Journey</h1><p class="section-eyebrow">April 18, 2025 · Our Story</p><h2>The First Hook</h2><p>My first stitch was wonky. My first square was lopsided. But I was hooked — no pun intended. There's something deeply satisfying about watching yarn transform into something real using just your hands.</p><h2>Why I Keep Going</h2><p>Because of the messages. The photos customers send when their order arrives. The "my daughter loves it" moments. A small business isn't just a business — it's a relationship. 🧶💕</p><div class="post-keywords"><span class="blog-tag">small business</span><span class="blog-tag">journey</span><span class="blog-tag">Pakistan</span></div></div>`},
  ];

  /* CART */
  let cart=[];
  function addToCart(id){const p=products.find(x=>x.id===id);if(!p)return;const ex=cart.find(x=>x.id===id);ex?ex.qty++:cart.push({...p,qty:1});updateCartUI();showToast(`${p.name} added 🧶`)}
  function removeFromCart(id){cart=cart.filter(x=>x.id!==id);updateCartUI()}
  function updateCartUI(){
    const cnt=cart.reduce((s,i)=>s+i.qty,0);
    document.querySelectorAll('.cart-count').forEach(el=>el.textContent=cnt);
    const ci=document.getElementById('cartItems'),cf=document.getElementById('cartFooter'),ct=document.getElementById('cartTotal');
    if(!ci)return;
    if(!cart.length){ci.innerHTML=`<div class="cart-empty"><span>🧶</span><p>Your cart is empty</p><a href="#shop" class="btn btn-primary" data-page="shop" onclick="toggleCart()">Start Shopping</a></div>`;cf.style.display='none';}
    else{ci.innerHTML=cart.map(i=>`<div class="cart-item-row"><div class="cart-item-img"><img src="${i.img}" alt="${i.name}"/></div><div class="cart-item-info"><div class="cart-item-name">${i.name}</div><div class="cart-item-price">Rs. ${i.price} × ${i.qty}</div></div><button class="cart-item-remove" onclick="removeFromCart(${i.id})">✕</button></div>`).join('');const tot=cart.reduce((s,i)=>s+i.price*i.qty,0);ct.textContent=`Rs. ${tot.toLocaleString()}`;cf.style.display='block';}
  }
  function toggleCart(){document.getElementById('cartModal').classList.toggle('hidden')}

  /* TOAST */
  function showToast(msg){const t=document.getElementById('toast');t.textContent=msg;t.style.transform='translateX(-50%) translateY(0)';setTimeout(()=>t.style.transform='translateX(-50%) translateY(80px)',3000)}

  /* RENDER */
  function renderProduct(p){const tag=p.tag?`<span class="product-tag ${p.tag==='new'?'new':''}">${p.tag==='new'?'✦ New':'★ Bestseller'}</span>`:'';return`<div class="product-card" data-filter="${p.filter}"><div class="product-img"><img src="${p.img}" alt="${p.name}" loading="lazy"/>${tag}<button class="product-wishlist" onclick="showToast('Added to wishlist 🌸')">🤍</button><div class="product-overlay"></div></div><div class="product-info"><p class="product-cat">${p.category}</p><h3 class="product-name">${p.name}</h3><div class="product-footer"><span class="product-price">Rs. ${p.price}</span><button class="add-cart-btn" onclick="addToCart(${p.id})">+ Add</button></div></div></div>`}
  function renderBlog(b){return`<div class="blog-card" onclick="openBlogPost(${b.id})"><div class="blog-card-img"><img src="${b.img}" alt="${b.title}" loading="lazy"/></div><div class="blog-card-info"><p class="blog-date">${b.date}</p><h3 class="blog-title">${b.title}</h3><p class="blog-excerpt">${b.excerpt}</p><span class="blog-read-more">Read more →</span><div class="blog-tags">${b.tags.map(t=>`<span class="blog-tag">${t}</span>`).join('')}</div></div></div>`}

  /* BLOG */
  function openBlogPost(id){const p=blogPosts.find(x=>x.id===id);if(!p)return;document.getElementById('blogPostContent').innerHTML=p.body;document.getElementById('blogPost').classList.remove('hidden');document.querySelector('#blog .blog-grid')?.classList.add('hidden');document.querySelector('#blog .page-hero')?.classList.add('hidden');window.scrollTo({top:0,behavior:'smooth'})}
  function closeBlogPost(){document.getElementById('blogPost').classList.add('hidden');document.querySelector('#blog .blog-grid')?.classList.remove('hidden');document.querySelector('#blog .page-hero')?.classList.remove('hidden')}

  /* NAV */
  function navigateTo(id){
    document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
    document.querySelectorAll('.nav-link').forEach(l=>l.classList.remove('active'));
    const page=document.getElementById(id);
    if(page){page.classList.add('active');window.scrollTo({top:0,behavior:'smooth'})}
    document.querySelectorAll(`[data-page="${id}"]`).forEach(l=>l.classList.add('active'));
    document.getElementById('navLinks').classList.remove('open');
    setTimeout(()=>{setupTilt();document.querySelectorAll('.reveal').forEach(el=>{if(el.getBoundingClientRect().top<window.innerHeight-80)el.classList.add('visible')})},120);
  }

  /* FILTER */
  function setupFilters(){
    document.querySelectorAll('.filter-btn').forEach(btn=>{
      btn.addEventListener('click',()=>{
        document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));btn.classList.add('active');
        const f=btn.dataset.filter;
        document.querySelectorAll('#shopProducts .product-card').forEach(card=>{
          const show=f==='all'||card.dataset.filter===f||(f==='new'&&card.querySelector('.product-tag.new'))||(f==='bestseller'&&card.querySelector('.product-tag:not(.new)'));
          card.style.display=show?'block':'none';
        });
      });
    });
  }

  /* FAQ */
  function toggleFaq(btn){const a=btn.nextElementSibling,open=a.classList.contains('open');document.querySelectorAll('.faq-a').forEach(x=>x.classList.remove('open'));document.querySelectorAll('.faq-q').forEach(x=>x.classList.remove('open'));if(!open){a.classList.add('open');btn.classList.add('open')}}

  /* TRACK */
  function trackOrder(e){e.preventDefault();const id=e.target.querySelector('input').value.trim();if(!id)return;const s=[{status:'📦 Order Confirmed',detail:'Your order has been received and is being prepared.'},{status:'🧶 Crafting in Progress',detail:'Your item is being handmade with love.'},{status:'🚚 Shipped',detail:'Your order is on its way! Expected delivery: 2–4 days.'},{status:'✅ Delivered',detail:'Your order has been delivered. Enjoy!'}];const r=s[Math.floor(Math.random()*s.length)];const el=document.getElementById('trackResult');el.innerHTML=`<strong>${r.status}</strong><br/><small>${r.detail}</small>`;el.style.display='block'}

  /* ACCOUNT */
  function switchTab(id,btn){document.querySelectorAll('.acc-panel').forEach(p=>p.classList.remove('active'));document.querySelectorAll('.acc-tab').forEach(t=>t.classList.remove('active'));const p=document.getElementById(id);if(p)p.classList.add('active');if(btn)btn.classList.add('active')}

  /* EMAILJS & INIT */
  document.addEventListener('DOMContentLoaded',()=>{
    emailjs.init('h8nVl3ROujuytx51D');
    const form=document.getElementById('contactForm');
    if(form){
      form.addEventListener('submit',function(e){
        e.preventDefault();
        emailjs.sendForm('service_xkt6xzb','template_m2s2fta',this)
          .then(()=>{document.getElementById('formSuccess').classList.remove('hidden');form.reset();showToast("Message sent! We'll reply soon 💌")})
          .catch(err=>{console.log(err);showToast('Failed to send ❌')});
      });
    }
    /* INIT */
    const hp=document.getElementById('homeProducts');if(hp)hp.innerHTML=products.slice(0,6).map(renderProduct).join('');
    const sp=document.getElementById('shopProducts');if(sp)sp.innerHTML=products.map(renderProduct).join('');
    const hb=document.getElementById('homeBlog');if(hb)hb.innerHTML=blogPosts.map(renderBlog).join('');
    const bp=document.getElementById('blogPage');if(bp)bp.innerHTML=blogPosts.map(renderBlog).join('');
    setupFilters();updateCartUI();setupTilt();
    const toggle=document.getElementById('navToggle');
    toggle.addEventListener('click',()=>document.getElementById('navLinks').classList.toggle('open'));
    document.querySelectorAll('[data-page]').forEach(l=>l.addEventListener('click',e=>{e.preventDefault();const pg=l.dataset.page;if(pg)navigateTo(pg)}));
    document.querySelector('.nav-cart').addEventListener('click',e=>{e.preventDefault();toggleCart()});
    setTimeout(()=>document.querySelectorAll('.reveal').forEach(el=>{if(el.getBoundingClientRect().top<window.innerHeight-80)el.classList.add('visible')}),3500);
    const hash=window.location.hash.replace('#','');if(hash&&document.getElementById(hash))navigateTo(hash);
  });
  const chatBtn = document.getElementById("chatbot-btn");
  const chatBox = document.getElementById("chatbot");
  const closeBtn = document.getElementById("chat-close");
  const messages = document.getElementById("chat-messages");
  const typing = document.getElementById("typing");

  chatBtn.onclick = () => {
    chatBox.style.display = "flex";
  };

  closeBtn.onclick = () => {
    chatBox.style.display = "none";
  };

  /* SEND MESSAGE */
  function sendMessage() {
    const input = document.getElementById("userInput");
    const text = input.value.trim();
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

  /* ⌨️ ENTER KEY SUPPORT */
  document.getElementById("userInput").addEventListener("keydown", function (e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });
  /* MESSAGE UI */
  function addMessage(text, type){
    const div = document.createElement("div");
    div.className = `msg ${type}`;
    div.textContent = text;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  /* SIMPLE AI (replace later with API) */
  async function generateResponse(input){

    try {

      const response = await fetch("https://loops.handmadebyloopss.workers.dev/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: input
        })
      });

      const data = await response.json();

      return data.reply || "No response from AI.";

    } catch (error) {
      console.log(error);
      return "Error connecting to AI.";
    }
  }
