# 🎯 Nangka MIS - PWD Management Information System

## Welcome! 👋

This is a complete **Login System** for a PWD Management Information System with:
- ✅ Full-stack authentication (Frontend + Backend)
- ✅ Database with two user types (Admins & PWD Users)
- ✅ Beautiful, responsive UI
- ✅ Secure JWT-based authentication
- ✅ Ready-to-test with auto-generated test data

---

## 📚 Documentation Quick Links

### 🚀 Getting Started (Start Here!)
- **[QUICK_START.md](QUICK_START.md)** - 5-minute setup & test guide
  - Fastest way to get up and running
  - Step-by-step launch sequence
  - Troubleshooting quick fixes

### 📖 Complete Guides
- **[SETUP_GUIDE.md](SETUP_GUIDE.md)** - Comprehensive setup & testing
  - Detailed architecture overview
  - Database queries reference
  - Environment configuration
  - API endpoint reference

- **[ARCHITECTURE.md](ARCHITECTURE.md)** - System architecture diagrams
  - Visual system overview
  - Authentication flow
  - Component hierarchy
  - Database schema

- **[REFACTORING_SUMMARY.md](REFACTORING_SUMMARY.md)** - Changes made
  - What was refactored
  - Improvements made
  - Test scenarios

### 📂 Backend Documentation
- **[DB/API_DOCUMENTATION.md](DB/API_DOCUMENTATION.md)** - API endpoint reference
  - All available endpoints
  - Request/response examples
  - Authentication details

- **[DB/nangka_mis.sql](DB/nangka_mis.sql)** - Database schema
  - Table definitions
  - Relationships
  - Indexes

### 🎨 Frontend Documentation
- **[MIS/FRONTEND_SETUP.md](MIS/FRONTEND_SETUP.md)** - Frontend setup guide
  - Component structure
  - State management
  - Installation instructions

---

## ⚡ Quick Start (2 Steps)

### Step 1: Setup Database & Start Backend
```bash
# Navigate to backend
cd DB

# Import database (first time only)
mysql -u root -p < nangka_mis.sql

# Start backend server
npm install  # First time only
npm run dev

# Output should show:
# ✓ Database initialization complete
# ✓ Backend ready for testing
```

### Step 2: Start Frontend
```bash
# In another terminal, navigate to frontend
cd MIS

# Start development server
npm install  # First time only
npm run dev

# Open browser to: http://localhost:5173
```

---

## 🔓 Test Login Credentials

### Admin Login
```
Tab: Admin Login
Username: testadmin
Password: Admin@123
```

### PWD User Login
```
Tab: PWD Login
PWD ID: 1
Password: Dela Cruz (user's surname)
```

---

## 📂 Project Structure

```
SYSARCH/
│
├── DB/                              (Backend - Express.js)
│   ├── config/
│   │   └── db.js                   # Database connection
│   ├── controllers/
│   │   ├── authController.js       # Login logic
│   │   ├── adminController.js      # Admin management
│   │   └── pwdUserController.js    # PWD user management
│   ├── middleware/
│   │   └── authMiddleware.js       # JWT verification
│   ├── models/
│   │   ├── PersonInCharge.js       # Admin model
│   │   └── NangkaPWDUser.js        # PWD user model
│   ├── routes/
│   │   ├── authRoutes.js           # Auth endpoints
│   │   ├── adminRoutes.js          # Admin endpoints
│   │   └── pwdUserRoutes.js        # PWD user endpoints
│   ├── utils/
│   │   └── dbInit.js               # Database initialization
│   ├── index.js                    # Main server file
│   ├── nangka_mis.sql              # Database schema
│   ├── .env                        # Environment variables
│   ├── package.json                # Node dependencies
│   └── API_DOCUMENTATION.md        # API reference
│
├── MIS/                             (Frontend - React)
│   ├── src/
│   │   ├── components/
│   │   │   ├── AdminLogin.jsx      # Admin login form
│   │   │   ├── PWDLogin.jsx        # PWD login form
│   │   │   ├── LoginPage.jsx       # Login page container
│   │   │   ├── Dashboard.jsx       # Post-login dashboard
│   │   │   └── *.css               # Component styles
│   │   ├── context/
│   │   │   └── AuthContext.jsx     # Global auth state
│   │   ├── services/
│   │   │   └── authService.js      # API communication
│   │   ├── App.jsx                 # Main app component
│   │   └── main.jsx                # Entry point
│   ├── package.json                # Node dependencies
│   ├── FRONTEND_SETUP.md           # Frontend setup guide
│   └── vite.config.js              # Vite configuration
│
└── Documentation/                  (This Level)
    ├── README.md                   # You are here!
    ├── QUICK_START.md              # Fast start guide
    ├── SETUP_GUIDE.md              # Complete setup
    ├── ARCHITECTURE.md             # System diagrams
    └── REFACTORING_SUMMARY.md      # Change log
```

---

## 🔧 Technology Stack

### Frontend
- **React 19.2** - UI framework
- **Vite 7.2** - Build tool & dev server
- **Context API** - State management
- **Fetch API** - HTTP requests

### Backend
- **Express 5.2** - Web framework
- **Node.js 18+** - Runtime
- **MySQL 8.0** - Database
- **bcrypt** - Password hashing
- **JWT** - Token-based auth
- **Helmet** - Security headers
- **CORS** - Cross-origin requests

### Database
- **MySQL 8.0+** - Relational database
- **Two tables**: person_in_charge, nangka_pwd_user
- **Foreign key relationships**
- **Indexes for performance**

---

## 📊 System Features

### Authentication ✅
- [x] Admin login (username/password)
- [x] PWD user login (PWD ID/surname)
- [x] JWT token generation
- [x] Token storage in localStorage
- [x] Automatic logout on token expiry

### Security ✅
- [x] Password hashing (bcrypt)
- [x] JWT tokens (24-hour expiry)
- [x] SQL injection protection
- [x] CORS enabled
- [x] Rate limiting
- [x] Helmet security headers

### User Management ✅
- [x] Admin CRUD operations
- [x] PWD user CRUD operations
- [x] Search functionality
- [x] Barangay filtering
- [x] Password change

### UI/UX ✅
- [x] Responsive design
- [x] Beautiful gradients
- [x] Loading animations
- [x] Error messages
- [x] Test credentials displayed

---

## 🎯 Workflow

### 1. User Login
```
User visits http://localhost:5173
         ↓
      LoginPage
    /            \
AdminLogin      PWDLogin
   ↓              ↓
Enter credentials
   ↓
authService.js sends to backend
   ↓
Backend validates & returns token
   ↓
Token stored in localStorage
   ↓
Dashboard displays user info
```

### 2. Protected Routes
```
All authenticated requests include:
Authorization: Bearer <token>
        ↓
Middleware verifies token
        ↓
✅ Valid: Process request
❌ Invalid: Return 401 error
```

---

## 🚀 Deployment Checklist

Before going to production:

- [ ] Change JWT_SECRET in `.env`
- [ ] Restrict CORS to your domain
- [ ] Use HTTPS (not HTTP)
- [ ] Set `NODE_ENV=production`
- [ ] Use environment variables for all secrets
- [ ] Enable database backups
- [ ] Set up monitoring/logging
- [ ] Test all endpoints with load testing
- [ ] Implement password reset flow
- [ ] Add refresh token rotation
- [ ] Enable database SSL connection

---

## 📞 Quick Troubleshooting

| Issue | Solution |
|-------|----------|
| Port 5000 in use | Change PORT in .env |
| Port 5173 in use | Vite will use next available port |
| Cannot connect to DB | Check MySQL is running, verify credentials |
| Login fails | Check test data exists in DB |
| CORS error | Backend CORS is enabled, check console |
| Blank page | Check browser console (F12) for errors |

For detailed troubleshooting, see [QUICK_START.md](QUICK_START.md#-troubleshooting-quick-fixes)

---

## 📈 Next Steps

### Phase 1: Testing (Current)
- [x] Backend setup
- [x] Frontend setup
- [x] Database initialization
- [ ] Test login flows
- [ ] Verify database connections

### Phase 2: Features
- [ ] PWD user profile page
- [ ] Admin dashboard
- [ ] User management interface
- [ ] Search and filtering
- [ ] Reports generation

### Phase 3: Enhancement
- [ ] Mobile app support
- [ ] Email notifications
- [ ] Two-factor authentication (2FA)
- [ ] File uploads
- [ ] API pagination

### Phase 4: Production
- [ ] Security audit
- [ ] Performance optimization
- [ ] Docker containerization
- [ ] CI/CD pipeline
- [ ] Monitoring setup

---

## 📚 Documentation Map

```
├── START HERE
│   └── QUICK_START.md           (5 min setup)
│
├── UNDERSTAND SYSTEM
│   ├── ARCHITECTURE.md          (Diagrams & flow)
│   └── REFACTORING_SUMMARY.md   (What changed)
│
├── IMPLEMENT & TEST
│   ├── SETUP_GUIDE.md           (Detailed setup)
│   ├── DB/API_DOCUMENTATION.md  (API reference)
│   └── MIS/FRONTEND_SETUP.md    (Frontend details)
│
└── DEPLOY & SCALE
    └── (Future: Production guide)
```

---

## 🎓 Key Concepts

### JWT Tokens
- Generated on login
- Contains user info (encrypted)
- Expires in 24 hours
- Sent in Authorization header

### Password Storage
- Never stored as plain text
- Hashed with bcrypt (10 salt rounds)
- Compared during login
- Only hash stored in database

### CORS (Cross-Origin)
- Allows frontend (5173) to call backend (5000)
- Enabled in production for your domain only
- Development: all origins allowed

### Database Queries
- All parameterized (prevents SQL injection)
- Connection pooling for performance
- Indexes on frequently searched columns

---

## 💡 Pro Tips

1. **Check the browser console (F12)** for helpful debug messages
   - 🔐 = Login attempt
   - ✅ = Success
   - ❌ = Error
   - 🚪 = Logout

2. **Use the Network tab (F12)** to see API requests and responses

3. **Check localStorage (F12 > Application)** to verify token storage

4. **Test endpoints with curl** if frontend has issues:
   ```bash
   curl http://localhost:5000/api/health
   ```

5. **Read error messages carefully** - they tell you what's wrong

---

## 📞 Support Resources

### If Something Doesn't Work
1. Read [QUICK_START.md](QUICK_START.md) troubleshooting section
2. Check browser console for error messages
3. Check backend console for server errors
4. Verify database is running and populated
5. Verify both servers are running (ports 5000 & 5173)

### Documentation by Issue Type
- **Setup issues** → [SETUP_GUIDE.md](SETUP_GUIDE.md)
- **API issues** → [DB/API_DOCUMENTATION.md](DB/API_DOCUMENTATION.md)
- **Frontend issues** → [MIS/FRONTEND_SETUP.md](MIS/FRONTEND_SETUP.md)
- **Architecture questions** → [ARCHITECTURE.md](ARCHITECTURE.md)

---

## ✅ Checklist Before Testing

- [ ] Node.js and npm installed
- [ ] MySQL installed and running
- [ ] Backend folder (DB) ready
- [ ] Frontend folder (MIS) ready
- [ ] Database will auto-initialize on first run
- [ ] Both servers can run on localhost
- [ ] Browser supports ES6+ (any modern browser)

---

## 🎉 Ready to Go?

1. **Start with [QUICK_START.md](QUICK_START.md)** for immediate testing
2. **Read [ARCHITECTURE.md](ARCHITECTURE.md)** to understand the system
3. **Refer to [SETUP_GUIDE.md](SETUP_GUIDE.md)** for detailed information
4. **Check [API_DOCUMENTATION.md](DB/API_DOCUMENTATION.md)** for endpoint details

---

## 📝 Version Info

- **Project:** Nangka MIS (PWD Management Information System)
- **Version:** 1.1 (Refactored & Enhanced)
- **Created:** January 6, 2026
- **Status:** ✅ Ready for Testing
- **License:** Proprietary

---

<div align="center">

**Happy coding! 🚀**

For questions or issues, refer to the appropriate documentation file above.

</div>
