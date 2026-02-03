// --- IMPORT FIREBASE (Jika nanti mau pakai database) ---
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAktDrPlV480mUvQEqjOmJ7EdXDpt8zc1o",
    authDomain: "aqubisa-rejoso.firebaseapp.com",
    projectId: "aqubisa-rejoso",
    storageBucket: "aqubisa-rejoso.firebasestorage.app",
    messagingSenderId: "427028729815",
    appId: "1:427028729815:web:741d8563ff434468ac0592",
    measurementId: "G-SD80Q9M20R"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// --- 1. LOGIKA RAHASIA KLIK LOGO 5X ---
let secretCounter = 0;
let lastClickTime = 0;

window.handleSecretClick = function() {
    const currentTime = new Date().getTime();
    
    // Jika jeda klik lebih dr 2 detik, hitungan balik ke 1
    if (currentTime - lastClickTime > 2000) {
        secretCounter = 1;
    } else {
        secretCounter++;
    }

    lastClickTime = currentTime;
    console.log("Klik ke: " + secretCounter); // Cek di console log

    if (secretCounter === 5) {
        secretCounter = 0;
        window.openModal('modal-admin'); // Munculkan Modal Login
    }
};

// --- 2. LOGIKA LOGIN ADMIN ---
window.loginAdmin = function() {
    const user = document.getElementById('adminUser').value;
    const pass = document.getElementById('adminPass').value;

    if (user === "admin" && pass === "admin456") {
        alert("Akses Diterima! Membuka Panel Admin...");
        localStorage.setItem('isLoggedInAdmin', 'true'); // Penanda sudah login
        window.location.href = "admin.html"; // Ke file admin kamu
    } else {
        alert("User ID atau Password Salah!");
    }
};

// --- 3. SISTEM MODAL (Buka/Tutup) ---
window.openModal = function(id) {
    const modal = document.getElementById(id);
    if(modal) modal.style.display = "block";
};

window.closeModal = function(id) {
    const modal = document.getElementById(id);
    if(modal) modal.style.display = "none";
};

window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = "none";
    }
};

// --- 4. HAMBURGER MENU ---
window.toggleMenu = function() {
    const nav = document.getElementById('nav-menu');
    if(nav) nav.classList.toggle('active');
};
