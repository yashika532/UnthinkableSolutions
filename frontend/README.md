# **Social Media Content Analyzer**

*A MERN Stack Project for Technical Assessment*

This project extracts text from **PDFs** and **image files** (OCR) and suggests improvements to increase **social media engagement**.
It follows a clean MERN architecture and satisfies all assignment requirements.

---

## ⚙️ **Features**

### 📤 **Document Upload**

* Upload **PDF** files
* Upload **Image** files (JPG, PNG, scanned docs)
* Supports **Drag & Drop** and **File Picker**

### 🧠 **Text Extraction**

* **PDF Parsing** via `pdf-parse`
* **OCR** for images using `Tesseract.js`

### 💡 **Engagement Suggestions**

Automatically suggests:

* Add hashtags
* Add emojis
* Add call-to-action
* Improve post length
* Add useful links
* Improve clarity and engagement

### 🎨 **UI Features**

* Clean and responsive React interface
* Loading states
* Error handling
* Nicely structured output cards

---

## 🏗️ **Tech Stack**

### **Frontend**

* React (Vite)
* Axios
* Modern CSS

### **Backend**

* Node.js + Express (CommonJS)
* Multer (file upload)
* pdf-parse (v1.1.1 stable)
* Tesseract.js (OCR)
* dotenv
* CORS

---

## 📁 **Project Structure**

```
social-media-content-analyzer/
│
├── backend/
│   ├── src/
│   │   └── index.js
│   ├── uploads/
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── .env
│
└── README.md
```

---

## 🛠️ **Setup Instructions**

### **1️⃣ Clone the Repository**

```sh
git clone <your-repo-url>
cd social-media-content-analyzer
```

---

## **2️⃣ Backend Setup**

```sh
cd backend
npm install
```

📌 **IMPORTANT:** Install stable pdf-parse version

```sh
npm uninstall pdf-parse
npm install pdf-parse@1.1.1
```

Run backend:

```sh
npm run dev
```

Backend runs at:
👉 **[http://localhost:5000](http://localhost:5000)**

### **Backend Environment Variables (`backend/.env`)**

```
PORT=5000
CLIENT_URL=http://localhost:5173
```

---

## **3️⃣ Frontend Setup**

```sh
cd frontend
npm install
npm run dev
```

Frontend runs at:
👉 **[http://localhost:5173](http://localhost:5173)**

### **Frontend Environment Variables (`frontend/.env`)**

```
VITE_API_BASE_URL=http://localhost:5000
```

---

## 👩‍💻 **Author**

**Yashika Jain**
GitHub: [https://github.com/yashika532](https://github.com/yashika532)

---
