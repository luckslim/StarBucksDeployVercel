# 🚀 Checkout StarBucks

![status](https://img.shields.io/badge/status-Concluído-green?style=flat-square)
![licença](https://img.shields.io/badge/license-MIT-green?style=flat-square)
![pull-requests](https://img.shields.io/badge/PRs-bem%20vindos-brightgreen?style=flat-square)
![GitHub Stars](https://img.shields.io/github/stars/seuusuario/repositorio?style=social)

> 🧾 Um sistema moderno de checkout com comanda digital. Clientes selecionam os produtos, pagam com Stripe e retiram no balcão! Ideal para cafeterias e lanchonetes 🍩☕️

---

## 🖼️ Preview
<div align="center">
  <img src="screenHome.png" alt="Preview da Home" width="30%" />
   <img src="screenproducts.png" alt="Preview da Home" width="50%" />
</div>

[![Vercel Link](https://img.shields.io/badge/🔗%20LinkedIn%20Demo-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://star-bucks-deploy-vercel.vercel.app/)

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia     | Descrição |
|----------------|-----------|
| ⚡ **Next.js**      | Framework React para SSR, SSG e API routes |
| 🐍 **Node.js**      | Backend JavaScript leve e performático |
| 🍃 **MongoDB Atlas** | Banco de dados NoSQL gerenciado na nuvem |
| 💳 **Stripe**       | Pagamentos online com checkout integrado |
| 🔐 **NextAuth.js**  | Autenticação moderna com provedores como Google |

---

## ✨ Features

- 🔐 Login com conta Google
- 🛒 Adição de produtos ao carrinho
- 💳 Pagamento com Stripe
- 📄 Geração de comanda digital (ID)
- 🧾 Histórico de pedidos
- 📱 Interface friendly
- 🚀 Deploy em Vercel

---

## 🚀 Como rodar localmente

```bash
# Clone o repositório
git clone <link do repositório >

# Entre na pasta
cd seuprojeto

# Instale as dependências
npm install

# Configure ou crie o arquivo .env (Stripe, Auth, DB, etc.)

# Rode a aplicação
npm run dev
