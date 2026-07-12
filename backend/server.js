const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Serve uploaded images
app.use("/uploads", express.static("uploads"));


// ✅ MULTER CONFIG
const storage = multer.diskStorage({
    destination: "./uploads/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });


// 🔹 MySQL Connection
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "shree@123",
    database: "certificate_db"
});

connection.connect((err) => {
    if (err) {
        console.log("❌ Database connection failed:", err);
    } else {
        console.log("✅ Connected to MySQL");
    }
});


// 🔹 VERIFY CERTIFICATE
app.post("/verify", (req, res) => {
    const { cert_id } = req.body;

    if (!cert_id) {
        return res.json({ status: "Certificate ID Missing" });
    }

    connection.query(
        "SELECT * FROM certificates WHERE cert_id = ?",
        [cert_id],
        (err, results) => {
            if (err) {
                return res.status(500).json({ status: "Database Error" });
            }

            if (results.length > 0) {
                res.json({
                    status: "Valid Certificate",
                    data: results[0]
                });
            } else {
                res.json({ status: "Invalid Certificate" });
            }
        }
    );
});


// 🔹 ADMIN LOGIN
app.post("/admin-login", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.json({ status: "Missing Fields" });
    }

    connection.query(
        "SELECT * FROM admin WHERE username = ? AND password = ?",
        [username, password],
        (err, results) => {
            if (err) {
                return res.status(500).json({ status: "Database Error" });
            }

            if (results.length > 0) {
                res.json({ status: "Login Success" });
            } else {
                res.json({ status: "Invalid Credentials" });
            }
        }
    );
});


// 🔹 ADD CERTIFICATE (WITH IMAGE)
app.post("/add-certificate", upload.single("image"), (req, res) => {
    const { cert_id, name, course, issue_date } = req.body;
    const image = req.file ? req.file.filename : null;

    if (!cert_id || !name || !course || !issue_date || !image) {
        return res.json({ status: "All fields including image required" });
    }

    connection.query(
        "INSERT INTO certificates (cert_id, name, course, issue_date, image) VALUES (?, ?, ?, ?, ?)",
        [cert_id, name, course, issue_date, image],
        (err) => {
            if (err) {
                return res.status(500).json({ status: "Error Adding Certificate" });
            }

            res.json({ status: "Certificate Added Successfully" });
        }
    );
});


// 🔹 GET ALL CERTIFICATES
app.get("/certificates", (req, res) => {
    connection.query("SELECT * FROM certificates", (err, results) => {
        if (err) {
            return res.status(500).json({ status: "Database Error" });
        }

        res.json(results);
    });
});


// 🔹 DELETE CERTIFICATE
app.delete("/delete-certificate/:id", (req, res) => {
    const certId = req.params.id;

    connection.query(
        "DELETE FROM certificates WHERE cert_id = ?",
        [certId],
        (err, result) => {
            if (err) {
                return res.status(500).json({ status: "Database Error" });
            }

            if (result.affectedRows > 0) {
                res.json({ status: "Certificate Deleted Successfully" });
            } else {
                res.json({ status: "Certificate Not Found" });
            }
        }
    );
});


// 🔹 START SERVER
app.listen(5000, () => {
    console.log("🚀 Server running on http://localhost:5000");
});