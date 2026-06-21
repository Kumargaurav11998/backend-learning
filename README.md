# 📘 PulseSync: Backend Learning Reference Book (Hinglish)

Hello Gaurav! 👋 
Yeh aapka **Personal Backend Reference Book** branch hai. Aapke full-stack developer banne ke safar ko aasan banane ke liye, is branch mein humne poora basic-to-advanced backend content, structures aur architecture ko simple **Hinglish** language mein explain kiya hai.

---

## 🔀 Branches Ke Beech Switch Kaise Karein? (How to Navigate)

Kyunki is branch (`tutorial`) ko humne ek **clean study reference** banaya hai, isme humne application files (code base) ko clean kar diya hai taaki aap sirf topics read karne pe focus kar sakein.

* **Padhne aur Seekhne ke liye (`tutorial` branch):**
  ```bash
  git checkout tutorial
  ```
* **Apna actual Code/API likhne aur run karne ke liye (`main` branch):**
  ```bash
  git checkout main
  ```

---

## 📚 Table of Contents (Syllabus)

Niche diye gaye order ke mutabik files ko open karke study karein:

### 🟢 1. Node.js Core Architecture
* Node.js runtime kya hai, V8 engine kaise kaam karta hai, single-threaded aur asynchronous behavior kya hota hai, aur Event Loop ka logic flow diagram ke sath.
* 👉 **[01_node_js_basics.md](file:///c:/Gaurav/backend/backend-learning/01_node_js_basics.md)**

### 🔵 2. Express.js Routing & HTTP
* Express.js router setup, Client-Server HTTP protocols, HTTP verbs (GET, POST, etc.), and request details (`req.body`, `req.params`, `req.query`).
* 👉 **[02_express_js_basics.md](file:///c:/Gaurav/backend/backend-learning/02_express_js_basics.md)**

### 🛠️ 3. Express Middleware & Error Handling
* Middleware pattern ("checkpost" metaphor), `next()` function, global vs route vs endpoint level middlewares, custom wrappers, and global error handling.
* 👉 **[03_express_middleware.md](file:///c:/Gaurav/backend/backend-learning/03_express_middleware.md)**

### 💾 4. MongoDB & Mongoose Database
* SQL vs NoSQL databases, Mongoose ODM schemas, schemas vs models definition, common Mongoose CRUD queries (`find`, `findOne`, `create`, `findOneAndUpdate`, `updateOne`, `deleteOne`, `deleteMany`), and Mongoose relationships with `.populate()`.
* 👉 **[04_mongodb_mongoose.md](file:///c:/Gaurav/backend/backend-learning/04_mongodb_mongoose.md)**

### 🛡️ 5. Request Validation with Zod
* Zod validation library, common validators (min, max, regex, email), schema merging, and request validation middleware integration in Express routes.
* 👉 **[05_zod_validation.md](file:///c:/Gaurav/backend/backend-learning/05_zod_validation.md)**

### 🔑 6. User Authentication & Password Security
* Hashing vs Encryption, Bcrypt password matching, JWT structure (Header, Payload, Signature) and secure private keys configuration.
* 👉 **[06_user_authentication.md](file:///c:/Gaurav/backend/backend-learning/06_user_authentication.md)**

### 🔄 7. Advanced JWT Session Management (Access & Refresh Tokens)
* Access Tokens (short-lived) vs Refresh Tokens (long-lived) sessions workflow, token storage guidelines, database updates, and React Native client Axios Interceptors setup.
* 👉 **[08_jwt_refresh_tokens.md](file:///c:/Gaurav/backend/backend-learning/08_jwt_refresh_tokens.md)**

### 🏗️ 8. Project Architecture & MVC Flow
* PulseSync directory layout details, Model-View-Controller pattern, and visual request cycle from router to middleware, controller, model database, and response.
* 👉 **[07_project_architecture.md](file:///c:/Gaurav/backend/backend-learning/07_project_architecture.md)**

### 🔄 9. Request-Response Lifecycle Workflow
* Complete step-by-step master sequence diagram tracing an incoming request, parser operations, authorization check, inputs validation, controller execution, Mongoose database query, and custom global error handling response.
* 👉 **[09_request_flow_lifecycle.md](file:///c:/Gaurav/backend/backend-learning/09_request_flow_lifecycle.md)**

---

## 💡 Quick Tips
* Har topic ke end mein **Best Practices** aur **Code Snippets** diye gaye hain.
* In files ko print karne ke liye editor window ke right-click dropdown option se print/save as PDF run kar sakte hain.

Happy Learning Gaurav! Agar kisi bhi topic mein doubt ho, toh bejhijhak puchiye! 🚀
