# 🎓 Certificate Authentication Checker

A web-based **Certificate Authentication Checker** developed using **Node.js, Express.js, MySQL, HTML, CSS, and JavaScript**. The system enables educational institutions and organizations to verify certificates using a unique Certificate ID, helping reduce the risk of certificate forgery and simplifying the verification process.

---

# 📌 Features

## 👤 Admin Module
- Secure Admin Login
- Add New Certificates
- Delete Certificates
- View All Certificates
- Upload Certificate Images

## ✅ Certificate Verification
- Verify Certificate using Certificate ID
- Display Certificate Details
- Show Certificate Status (Valid / Invalid)

## 🔒 Security Features
- Database-backed Certificate Verification
- Unique Certificate ID Validation
- Secure Admin Authentication

---

# 🛠️ Technologies Used

## Frontend
- HTML5
- CSS3
- JavaScript

## Backend
- Node.js
- Express.js

## Database
- MySQL

## Libraries & Packages
- Express
- MySQL2
- Multer (File Upload)
- Body-Parser
- CORS

---

# 📂 Project Structure

```text
Certificate-Authentication-Checker/
│
├── uploads/
│
├── public/
│   ├── index.html
│   ├── admin.html
│   ├── dashboard.html
│   ├── certificate.html
│   ├── style.css
│   └── script.js
│
├── server.js
├── package.json
├── package-lock.json
├── README.md
```

---

# 🚀 Installation

## Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/Certificate-Authentication-Checker.git
```

---

## Install Dependencies

```bash
npm install
```

---

## Configure MySQL

Create a database named:

```text
certificate_db
```

Create the required certificate table according to your project schema.

Update your MySQL credentials in `server.js`.

---

## Run the Server

```bash
node server.js
```

or

```bash
npm start
```

The application will run on:

```text
http://localhost:5000
```

---

# 📋 Workflow

1. Admin logs in.
2. Admin adds certificate details.
3. Certificate information is stored in the MySQL database.
4. Users enter a Certificate ID.
5. The system verifies the certificate.
6. If the certificate is valid, its details are displayed.

---

# 🌟 Future Enhancements

- OCR-based Certificate Verification
- Blockchain-based Certificate Storage
- Digital Signature Verification
- AI-based Fake Certificate Detection
- Email Notifications
- Multi-admin Support
- Audit Logs

---

# 👩‍💻 Author

**SHEERABDHI SHREE K.V.**

Computer Science and Engineering (Cyber Security)

Velammal College of Engineering and Technology

---

# 📄 License

This project is developed for educational purposes.
