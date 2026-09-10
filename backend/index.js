import 'dotenv/config';

import { cloudinaryConnect } from "./config/cloudinary.js";
import { connect } from "./config/database.js";
import contactUsRoute from "./routes/Contact.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import courseRoutes from "./routes/Course.js";
import express from "express";
import fileUpload from "express-fileupload";
import { pathToFileURL } from "url";
import paymentRoutes from "./routes/Payment.js";
import profileRoutes from "./routes/Profile.js";
import serverless from "serverless-http";
import tutorRoutes from "./routes/tutorRoutes.js";
import userRoutes from "./routes/User.js";

// ---------------- Config ----------------
const app = express();
const PORT = process.env.PORT || 4000;
const frontendOrigin = process.env.FRONTEND_URL || "http://localhost:3000";

// ---------------- Database ----------------
connect();

// ---------------- ✅ FIXED GLOBAL CORS ----------------
// ⚠️ REMOVE ALL MANUAL res.header CORS CODE
const allowedOrigins = [
  frontendOrigin,
  // "http://localhost:3000/",
  "https://edvora-beryl.vercel.app", // deployed frontend (Vercel)
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("❌ Blocked CORS origin:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// ---------------- Middlewares ----------------
app.use(express.json());
app.use(cookieParser());  // For parsing cookies in requests 
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

// ---------------- Cloudinary ----------------
cloudinaryConnect();

// ---------------- Routes ----------------
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactUsRoute);
app.use("/api/v1/tutor", tutorRoutes);

// ---------------- Default Route ----------------
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "✅ Server is up and CORS-enabled",
  });
});

// ---------------- Server Setup ----------------
const isDirectExecution =
  process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;

if (isDirectExecution) {
  app.listen(PORT, () => console.log(`✅ Running locally on port ${PORT}`));
}

// ---------------- Export for Serverless ----------------
export const handler = serverless(app);



// const session = require('express-session');
// const bodyParser = require('body-parser');
// const bcrypt = require('bcrypt');

// const app = express();
// const PORT = process.env.PORT || 3000;

// const users = {};

// // Middleware
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// app.use(session({
//   secret: 'replace_this_with_a_strong_secret',
//   resave: false,
//   saveUninitialized: false,
//   cookie: {
//     maxAge: 1000 * 60 * 60 * 24 
//   }
// }));

// app.use((req, res, next) => {
//   res.locals.user = req.session.user ? users[req.session.user] : null;
//   next();
// });

// function requireLogin(req, res, next) {
//   if (!req.session.user || !users[req.session.user]) {
//     return res.redirect('/login');
//   }
//   next();
// }

// // Home
// app.get('/', (req, res) => {
//   const user = res.locals.user;
//   res.send(`
//     <h1>Mini Social (Node single-file demo)</h1>
//     ${user ? `<p>Welcome back, <strong>${escapeHtml(user.name)}</strong>! <a href="/profile">Profile</a> | <a href="/logout">Logout</a></p>` : `
//       <p><a href="/register">Register</a> | <a href="/login">Login</a></p>`}
//     <p>Public feed placeholder...</p>
//   `);
// });

// // Registration form
// app.get('/register', (req, res) => {
//   res.send(`
//     <h2>Register</h2>
//     <form method="POST" action="/register">
//       <label>Username (unique): <input name="username" required /></label><br/>
//       <label>Full name: <input name="name" required /></label><br/>
//       <label>Email: <input name="email" type="email" required /></label><br/>
//       <label>Bio: <input name="bio" /></label><br/>
//       <label>Password: <input name="password" type="password" required /></label><br/>
//       <button>Register</button>
//     </form>
//     <p>Already have an account? <a href="/login">Login</a></p>
//   `);
// });

// // Registration handler
// app.post('/register', async (req, res) => {
//   const { username, name, email, bio, password } = req.body;
//   if (!username || !name || !email || !password) {
//     return res.status(400).send('Please provide username, name, email and password.');
//   }
//   if (users[username]) return res.status(400).send('Username already taken. <a href="/register">Try another</a>');

//   const passwordHash = await bcrypt.hash(password, 10);
//   users[username] = { username, name, email, bio: bio || '', passwordHash, createdAt: new Date() };

//   req.session.user = username;
//   res.redirect('/profile');
// });

// // Login form
// app.get('/login', (req, res) => {
//   res.send(`
//     <h2>Login</h2>
//     <form method="POST" action="/login">
//       <label>Username: <input name="username" required /></label><br/>
//       <label>Password: <input name="password" type="password" required /></label><br/>
//       <label><input type="checkbox" name="remember" /> Remember me (session cookie)</label><br/>
//       <button>Login</button>
//     </form>
//     <p>No account? <a href="/register">Register</a></p>
//   `);
// });

// app.post('/login', async (req, res) => {
//   const { username, password, remember } = req.body;
//   const user = users[username];
//   if (!user) return res.status(400).send('Invalid credentials. <a href="/login">Try again</a>');

//   const ok = await bcrypt.compare(password, user.passwordHash);
//   if (!ok) return res.status(400).send('Invalid credentials. <a href="/login">Try again</a>');

//   req.session.user = username;

//   if (remember) {
//     req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 30; 
//   } else {
//     req.session.cookie.maxAge = 1000 * 60 * 60 * 24; 
//   }

//   res.redirect('/profile');
// });

// // Logout
// app.get('/logout', (req, res) => {
//   req.session.destroy(err => {
//     res.redirect('/');
//   });
// });

// // Profile page (shows user details) — requires login
// app.get('/profile', requireLogin, (req, res) => {
//   const user = users[req.session.user];
//   res.send(`
//     <h2>Profile</h2>
//     <p><strong>Username:</strong> ${escapeHtml(user.username)}</p>
//     <p><strong>Name:</strong> ${escapeHtml(user.name)}</p>
//     <p><strong>Email:</strong> ${escapeHtml(user.email)}</p>
//     <p><strong>Bio:</strong> ${escapeHtml(user.bio)}</p>
//     <p><strong>Member since:</strong> ${user.createdAt.toLocaleString()}</p>

//     <p><a href="/">Home</a> | <a href="/edit-profile">Edit Profile</a> | <a href="/delete-account">Delete Account</a></p>
//   `);
// });


// // Delete account confirmation page
// app.get('/delete-account', requireLogin, (req, res) => {
//   res.send(`
//     <h2>Delete account</h2>
//     <p>Are you sure you want to delete your account? This action is irreversible.</p>
//     <form method="POST" action="/delete-account">
//       <label>Type your username to confirm: <input name="confirm" required /></label><br/>
//       <button>Delete my account</button>
//     </form>
//     <p><a href="/profile">Cancel</a></p>
//   `);
// });

// // Delete account action
// app.post('/delete-account', requireLogin, (req, res) => {
//   const username = req.session.user;
//   const { confirm } = req.body;
//   if (confirm !== username) return res.status(400).send('Confirmation did not match your username. <a href="/delete-account">Try again</a>');
  
//   // Delete user from store
//   delete users[username];

//   // Destroy session
//   req.session.destroy(err => {
//     res.send(`<p>Your account (${escapeHtml(username)}) was deleted. <a href="/">Home</a></p>`);
//   });
// });

// // Basic util: escape HTML to avoid XSS in this demo
// function escapeHtml(str) {
//   if (!str) return '';
//   return String(str)
//     .replace(/&/g, '&amp;')
//     .replace(/</g, '&lt;')
//     .replace(/>/g, '&gt;')
//     .replace(/"/g, '&quot;')
//     .replace(/'/g, '&#39;');
// }

// app.listen(PORT, () => {
//   console.log(`Server listening on http://localhost:${PORT}`);
// });
