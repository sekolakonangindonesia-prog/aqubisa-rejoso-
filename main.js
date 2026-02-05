// 1. SEMUA IMPORT DI ATAS
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// 2. CONFIG
const firebaseConfig = {
    apiKey: "AIzaSyAktDrPlV480mUvQEqjOmJ7EdXDpt8zc1o",
    authDomain: "aqubisa-rejoso.firebaseapp.com",
    projectId: "aqubisa-rejoso",
    storageBucket: "aqubisa-rejoso.firebasestorage.app",
    messagingSenderId: "427028729815",
    appId: "1:427028729815:web:741d8563ff434468ac0592",
    measurementId: "G-SD80Q9M20R"
};

// 3. INITIALIZE (Hanya sekali saja)
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// --- LOGIKA RAHASIA KLIK LOGO 5X ---
let secretCounter = 0;
let lastClickTime = 0;
window.handleSecretClick = function() {
    const currentTime = new Date().getTime();
    if (currentTime - lastClickTime > 2000) secretCounter = 1;
    else secretCounter++;
    lastClickTime = currentTime;
    if (secretCounter === 5) {
        secretCounter = 0;
        window.openModal('modal-admin');
    }
};

// --- SISTEM MODAL ---
window.openModal = function(id) {
    const modal = document.getElementById(id);
    if(modal) modal.style.display = "block";
};
window.closeModal = function(id) {
    const modal = document.getElementById(id);
    if(modal) modal.style.display = "none";
};
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) event.target.style.display = "none";
};
window.toggleMenu = function() {
    const nav = document.getElementById('nav-menu');
    if(nav) nav.classList.toggle('active');
};

// --- LOGIKA UTAMA: CEK LOGIN DI LANDING PAGE (DIPERBARUI) ---
onAuthStateChanged(auth, async (user) => {
    const btnDesktop = document.getElementById('btn-gabung-desktop');
    const btnMobile = document.getElementById('btn-gabung-mobile');

    if (user) {
        console.log("Sesi ditemukan: ", user.uid);
        try {
            const docSnap = await getDoc(doc(db, "users", user.uid));
            if (docSnap.exists()) {
                const fullName = docSnap.data().fullName;
                const firstName = fullName.split(' ')[0];

                // FIX UNTUK DESKTOP (Warna & Bentuk tetap sesuai CSS asli)
                if (btnDesktop) {
                    btnDesktop.removeAttribute('onclick'); 
                    btnDesktop.href = "dashboard.html";    
                    // Kita HAPUS baris .style.background agar kembali ke warna asli di CSS
                    btnDesktop.innerHTML = `<i class="fas fa-user"></i> ${firstName}`;
                }

                // FIX UNTUK MOBILE (Tetap menggunakan style yang serasi)
                if (btnMobile) {
                    btnMobile.innerHTML = `
                        <a href="dashboard.html" style="color: var(--ss-green); font-weight: bold; border: 1px solid var(--ss-green); border-radius: 5px; margin-top: 10px; display: block; text-align: center; padding: 10px;">
                            <i class="fas fa-user"></i> ${firstName}
                        </a>`;
                }
            }
        } catch (error) {
            console.error("Gagal memuat data user:", error);
        }
    }
});
