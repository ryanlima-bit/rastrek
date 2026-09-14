# 🛰️ Rastrek — Landing Page + Admin Panel

Sistema completo: Landing Page de vendas + Painel Admin com Firebase.

---

## 📁 Estrutura do projeto

```
rastrek/
├── index.html          ← Landing page principal
├── admin/
│   └── index.html      ← Painel administrativo
├── src/
│   └── firebase-config.js  ← Referência de configuração
├── netlify.toml        ← Config deploy Netlify
└── README.md
```

---

## 🔥 Passo 1 — Configurar Firebase

1. Acesse [console.firebase.google.com](https://console.firebase.google.com)
2. Crie um novo projeto (ex: `rastrek-site`)
3. Ative **Firestore Database** (modo de teste inicialmente)
4. Ative **Authentication** → Método: **E-mail/Senha**
5. Clique em **"Adicionar app"** → Web → Copie o `firebaseConfig`

### Substituir config nos arquivos:

Abra **`index.html`** e **`admin/index.html`** e substitua:

```javascript
const firebaseConfig = {
  apiKey: "SUA_API_KEY",             // ← cole aqui
  authDomain: "seu-projeto.firebaseapp.com",
  projectId: "seu-projeto-id",
  storageBucket: "seu-projeto.appspot.com",
  messagingSenderId: "000000000",
  appId: "1:000000:web:000000"
};
```

---

## 👤 Passo 2 — Criar usuário admin

No Firebase Console:
1. Authentication → Users → **Add User**
2. E-mail: `admin@rastrek.com.br` (ou o que quiser)
3. Senha: (defina uma senha forte)

Esse será seu login no painel em `/admin`

---

## 📋 Passo 3 — Regras do Firestore

No Firebase Console → Firestore → **Rules**:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Apenas usuários autenticados podem escrever
    match /site_config/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

---

## 🌐 Passo 4 — Deploy na Netlify

### Via Git (recomendado):
1. Suba este projeto para um repositório GitHub/GitLab
2. Acesse [app.netlify.com](https://app.netlify.com)
3. New site → Import from Git → Selecione o repositório
4. Build settings:
   - **Build command:** (deixe vazio)
   - **Publish directory:** `.`
5. Deploy!

### Via Netlify CLI:
```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

---

## 🎛️ Como usar o Painel Admin

Acesse: `https://seu-dominio.com/admin`

| Seção | O que faz |
|-------|-----------|
| **Preço & CTA** | Altera preço, preço original, texto dos botões, urgência |
| **Textos da Página** | Edita título e subtítulo do hero |
| **Depoimentos** | Adiciona/remove/edita depoimentos com nome, cidade e nota |
| **FAQ** | Gerencia perguntas e respostas |
| **WhatsApp & Links** | Define o número que recebe os cliques de compra |

Todas as mudanças são refletidas **instantaneamente** na landing page.

---

## 🖼️ Adicionar a imagem do produto

Substitua no `index.html` a URL da imagem do produto:

```html
<img src="SUA_URL_DA_IMAGEM_AQUI" alt="Rastrek Mini GPS" id="product-img" />
```

Recomendamos hospedar a imagem no **Firebase Storage** ou **Cloudinary**.

---

## 📱 Estrutura Firebase (Firestore)

```
Collection: site_config
  Document: main
    ├── price: "97"
    ├── originalPrice: "197"
    ├── heroTitle: "..."
    ├── heroSubtitle: "..."
    ├── ctaText: "QUERO MEU RASTREK AGORA →"
    ├── urgencyText: "Restam apenas 47 unidades!"
    ├── whatsappNumber: "5511999999999"
    ├── testimonials: [{ name, city, text, stars }]
    ├── faqItems: [{ q, a }]
    └── updatedAt: timestamp
```

---

## 🎨 Customizações rápidas

### Cores (em `index.html` e `admin/index.html`):
```css
--orange: #F97316;    /* laranja principal */
--black: #080808;     /* fundo */
--surface: #111111;   /* cards */
```

### Trocar fontes:
Altere o link do Google Fonts e a variável `--font`.

---

Feito com ❤️ para Rastrek
```
