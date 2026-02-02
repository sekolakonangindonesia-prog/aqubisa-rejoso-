// --- IMPORT FIREBASE SDK ---
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// --- KONFIGURASI FIREBASE ---
const firebaseConfig = {
    apiKey: "AIzaSyAktDrPlV480mUvQEqjOmJ7EdXDpt8zc1o",
    authDomain: "aqubisa-rejoso.firebaseapp.com",
    projectId: "aqubisa-rejoso",
    storageBucket: "aqubisa-rejoso.firebasestorage.app",
    messagingSenderId: "427028729815",
    appId: "1:427028729815:web:741d8563ff434468ac0592",
    measurementId: "G-SD80Q9M20R"
};

// Inisialisasi
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// --- 1. LOGIKA HAMBURGER MENU (HP) ---
window.toggleMenu = function() {
    const nav = document.getElementById('nav-menu');
    if(nav) nav.classList.toggle('active');
}

// Tutup menu otomatis saat link diklik di HP
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const nav = document.getElementById('nav-menu');
            if(nav) nav.classList.remove('active');
        });
    });
});

// --- 2. LOGIKA LOGIN ADMIN ---
window.loginAdmin = function() {
    const user = document.getElementById('adminUser').value;
    const pass = document.getElementById('adminPass').value;

    if (user === "admin" && pass === "admin456") {
        alert("Login Berhasil! Mengalihkan ke Dashboard Admin...");
        localStorage.setItem('isAdmin', 'true');
        window.location.href = "admin-dashboard.html";
    } else {
        alert("User ID atau Password Salah!");
    }
}

// --- 3. FUNGSI MODAL (Buka & Tutup) ---
window.openModal = function(id) {
    const modal = document.getElementById(id);
    if(modal) modal.style.display = "block";
}

window.closeModal = function(id) {
    const modal = document.getElementById(id);
    if(modal) modal.style.display = "none";
}

// Tutup modal jika klik di luar kotak modal
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = "none";
    }
}

console.log("Sistem Aqubisa (JS Eksternal) Berhasil Dimuat!");
