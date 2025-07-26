# Shortyfy – Advanced URL Shortener

Shortyfy is a **full-stack advanced URL shortener** application that goes beyond basic link shortening. It provides robust authentication, email verification, custom links, analytics, and modern UI for a seamless user experience.

---

## 🚀 Features

### ✅ Authentication & Security

- User registration, login, and logout.
- **Advanced session management** using **JWT** for secure user sessions.

### 📧 Email-Based Features

- **Email verification** to ensure valid accounts.
- **Forgot password** functionality with secure email links.

### 🔗 URL Management

- Add a **title** for each link.
- Provide the **original URL**.
- Option to create a **custom sub-URI name** for branding or easy recall.

### 📊 Analytics & Insights

- View **total clicks** for each shortened link.
- Track **last visited** date and time.
- **Modern interactive charts** for link performance visualization.
- **QR code generation and scanning** for instant sharing.

### 🗂️ Data Presentation

- Links displayed in a **modern tabular layout**.
- Built-in **search functionality**.
- **Pagination** for better data handling.

---

## 🛠️ Tech Stack

### Frontend

- **React 19** & **Next.js 15**
- **TypeScript**
- **Tailwind CSS** + **shadcn/ui**
- **React Query** (data fetching & caching)
- **Cloudinary** (image hosting)
- **Zod** & **react-hook-form** (form validation & management)
- **Resend** (email sending)
- **Recharts** (analytics charts)
- **qr-code-styling** (QR code generation)

### Backend

- **Next.js API Routes** (serverless functions)
- **MongoDB** & **Mongoose** (database & ORM)
- **JWT** (authentication)
- **bcrypt** (password hashing)
- **nodemailer** (email handling)
- **nanoid** (unique ID generation)

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Subhojit98/fullstack-url-shortner.git
```

cd fullstack-url-shortner

pnpm i # or npm install
pnpm dev # or npm run dev

```

```
