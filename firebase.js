import { initializeApp } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.13.0/firebase-auth.js";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyCq_HF06jvKEX-4fkpcR-CsF2iju4llRrg",
  authDomain: "handmadeloops-6dae6.firebaseapp.com",
  projectId: "handmadeloops-6dae6",
  storageBucket: "handmadeloops-6dae6.firebasestorage.app",
  messagingSenderId: "890964670267",
  appId: "1:890964670267:web:dc3d6be2054b84f9b3e91e",
  measurementId: "G-26HC2YZHXG"
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

console.log("🔥 Firebase JS Loaded");

/* =========================
   SIGNUP / REGISTER
========================= */
function signup() {
  const btn = document.querySelector("#register button");
  const name = document.querySelector("#register input[type='text']")?.value;
  const email = document.querySelector("#register input[type='email']")?.value;
  const password = document.querySelector("#register input[type='password']")?.value;

  if (!email || !password) {
    alert("Please fill all fields");
    return;
  }

  // prevent spam clicking
  btn.disabled = true;
  btn.innerText = "Creating account...";

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("User created:", userCredential.user);

      alert("Account created successfully 🎉");

      // clear inputs
      document.querySelector("#register").querySelectorAll("input").forEach(i => i.value = "");

      // optional: switch to login tab
      switchTab("login");

    })
    .catch((error) => {
      console.error(error);
      alert(error.message);
    })
    .finally(() => {
      // restore button
      btn.disabled = false;
      btn.innerText = "Create Account";
    });
}

/* =========================
   LOGIN
========================= */
function login() {
  const btn = document.querySelector("#login button");
  const email = document.querySelector("#login input[type='email']")?.value;
  const password = document.querySelector("#login input[type='password']")?.value;

  if (!email || !password) {
    alert("Please fill all fields");
    return;
  }

  btn.disabled = true;
  btn.innerText = "Logging in...";

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("Logged in:", userCredential.user);

      alert("Login successful 🎉");

      // clear inputs
      document.querySelector("#login").querySelectorAll("input").forEach(i => i.value = "");

      // optional: go home page
      navigateTo("home");
    })
    .catch((error) => {
      console.error(error);
      alert(error.message);
    })
    .finally(() => {
      btn.disabled = false;
      btn.innerText = "Login";
    });
}

/* =========================
   FIX FOR YOUR ERROR
   (registerUser not defined)
========================= */
function registerUser() {
  signup();
}

/* =========================
   MAKE FUNCTIONS GLOBAL
========================= */
window.signup = signup;
window.login = login;
window.registerUser = registerUser;

/* =========================
   AUTH STATE (optional)
========================= */
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("👤 User logged in:", user.email);
  } else {
    console.log("No user logged in");
  }
});