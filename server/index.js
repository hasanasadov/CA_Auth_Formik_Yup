const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const users = require("./users");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(express.json());
app.use(cors());

const SECRET_KEY = "secret123"; // JWT için secret key (gerçek projede .env dosyasına eklenmeli)

// Kullanıcı kaydı (Register)
app.post("/register", async (req, res) => {
  const { email, password, firstName, lastName, role } = req.body;

  if (!email || !password || !firstName || !lastName) {
    return res.status(400).json({
      message: "First name, last name, email and password fields are required!",
    });
  }

  // Kullanıcı adının benzersiz olup olmadığını kontrol edin
  const userExists = users.find((user) => user.email === email);
  if (userExists) {
    return res.status(400).json({ message: "User already exists!" });
  }

  // Şifreyi hashle
  const hashedPassword = await bcrypt.hash(password, 10);

  // Yeni kullanıcıyı ekleyin
  const newUser = {
    id: uuidv4(),
    email,
    firstName,
    lastName,
    password: hashedPassword,
    role: role || "User", // Varsayılan rol User
  };
  users.push(newUser);

  res.status(201).json({ message: "User registered successfully!" });
});

// Giriş (Login)
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Kullanıcıyı bulun
  const user = users.find((user) => user.email === email);
  if (!user) {
    return res.status(400).json({ message: "Invalid credentials!" });
  }

  // Şifreyi kontrol edin
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid credentials!" });
  }

  // JWT token oluştur
  const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, {
    expiresIn: "1h",
  });

  res.json({ message: "Login successful!", token });
});

// Token doğrulama middleware
function authenticateToken(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ message: "Token required!" });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token!" });
    req.user = user;
    next();
  });
}

// Yetkilendirme middleware
function authorizeRole(role) {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({ message: "Unauthorized!" });
    }
    next();
  };
}

// getCurrentUser rotası
app.get("/current-user", authenticateToken, (req, res) => {
  const currentUser = users.find((user) => user.id === req.user.id);
  if (!currentUser) {
    return res.status(404).json({ message: "User not found!" });
  }

  // Şifreyi göndermiyoruz
  const { id, firstName, lastName, email, role } = currentUser;

  res.json({ id, firstName, lastName, email, role });
});

// Sadece Admin erişimi olan bir rota
app.get("/admin", authenticateToken, authorizeRole("Admin"), (req, res) => {
  res.json({ message: "Welcome Admin!" });
});

// Sadece User erişimi olan bir rota
app.get("/user", authenticateToken, authorizeRole("User"), (req, res) => {
  res.json({ message: "Welcome User!" });
});

// Sunucu başlat
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
