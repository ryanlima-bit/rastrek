// rastrek/src/firebase-config.js

// 1. Importamos as funções do Firebase usando os links diretos (CDN) para funcionar nativamente no navegador
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// 2. A sua configuração real do Firebase (copiada exatamente como você enviou)
const firebaseConfig = {
  apiKey: "AIzaSyCf6LxQ5a9BPxew-QWoB4O6Z9c-BhodKXI",
  authDomain: "rastrek-5f2f9.firebaseapp.com",
  projectId: "rastrek-5f2f9",
  storageBucket: "rastrek-5f2f9.firebasestorage.app",
  messagingSenderId: "224601800025",
  appId: "1:224601800025:web:54fcfe55c3852b92c6a048"
};

// 3. Inicializamos o aplicativo do Firebase
const app = initializeApp(firebaseConfig);

// 4. Inicializamos o Banco de Dados (Firestore) e a Autenticação (Auth)
const db = getFirestore(app);
const auth = getAuth(app);

// 5. Exportamos essas variáveis para podermos usá-las nos arquivos index.html e admin/index.html
export { app, db, auth };