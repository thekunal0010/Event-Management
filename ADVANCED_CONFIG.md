# EventHub - Advanced Configuration & Customization Guide

## 🎨 Customization Guide

### Color Scheme Customization

Edit `frontend/tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: '#2563eb',    // Change primary color
      secondary: '#6b7280',  // Change secondary color
      accent: '#dc2626',     // Add custom colors
    },
  },
}
```

Then update components to use these colors instead of hardcoded Tailwind colors.

### Logo & Branding

1. Replace app name "EventHub":
   - Update in `frontend/src/components/Navbar.js`
   - Update in `frontend/public/index.html`
   - Update in `README.md`

2. Add custom logo:
   - Replace icon in Navbar component
   - Update favicon in `public/index.html`

### Event Categories

Edit `backend/src/models/Event.js`:

```javascript
category: {
  type: String,
  enum: [
    'Technology',
    'Business',
    'Your Custom Category',  // Add here
    'Another Category'
  ],
  default: 'Other',
}
```

Then update frontend `frontend/src/pages/CreateEvent.js`:

```javascript
const CATEGORIES = [
  'Technology',
  'Your Custom Category',
  'Another Category'
];
```

## 🔧 Backend Configuration

### Changing Port

Edit `backend/.env`:
```
PORT=5001  // Change from 5000 to 5001
```

### Database Configuration

#### Local MongoDB
```
MONGODB_URI=mongodb://localhost:27017/event-management
```

#### MongoDB Atlas (Cloud)
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/event-management?retryWrites=true&w=majority
```

#### Database Options
```javascript
// In backend/src/server.js, modify connection options:
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  maxPoolSize: 10,        // Connection pool size
  socketTimeoutMS: 45000, // Socket timeout
})
```

### JWT Configuration

Edit `backend/.env`:
```
JWT_SECRET=your-super-secret-key-minimum-32-characters
```

Edit `backend/src/utils/jwt.js` for expiry:
```javascript
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '7d',  // Change token expiry
  });
};
```

### File Upload Configuration

Edit `backend/src/middleware/upload.js`:

```javascript
// Change upload directory
destination: (req, file, cb) => {
  cb(null, 'uploads/events/');  // Custom path
},

// Change file size limit
limits: { fileSize: 10 * 1024 * 1024 },  // 10MB

// Allow more file types
const allowedMimes = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'application/pdf',  // Add new type
];
```

### CORS Configuration

Edit `backend/src/server.js`:

```javascript
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://yourdomain.com'  // Add production domain
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
```

## 🎯 Frontend Configuration

### API Base URL

Edit `frontend/src/services/api.js`:

```javascript
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  timeout: 10000,  // Request timeout
});
```

Or set in `.env.local`:
```
REACT_APP_API_URL=https://api.yourdomain.com
```

### Toast Notification Configuration

Edit `frontend/src/App.js`:

```javascript
<ToastContainer
  position="bottom-right"     // Change position
  autoClose={3000}            // Duration in ms
  hideProgressBar={false}     // Show progress bar
  newestOnTop={true}          // Newest on top
  closeOnClick               // Click to close
  rtl={false}                // Right to left
  pauseOnFocusLoss
  draggable
  pauseOnHover
/>
```

### Authentication Settings

Edit `frontend/src/context/AuthContext.js`:

```javascript
// Change token storage method
const token = sessionStorage.getItem('token');  // Use session storage
```

## 🚀 Advanced Features

### Adding Email Notifications

1. Install nodemailer:
```bash
npm install nodemailer
```

2. Create email service:
```javascript
// backend/src/services/emailService.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

exports.sendEventCreatedEmail = (userEmail, eventTitle) => {
  // Send email logic
};
```

3. Add to .env:
```
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

### Adding Search Indexing

Update `backend/src/models/Event.js`:

```javascript
// Add full-text search
eventSchema.index({ title: 'text', description: 'text' });

// Add compound indexes for performance
eventSchema.index({ category: 1, startDate: 1 });
eventSchema.index({ organizer: 1, createdAt: -1 });
```

### Implementing Pagination Utility

Create `backend/src/utils/pagination.js`:

```javascript
exports.getPaginationParams = (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  return { skip, limit: parseInt(limit) };
};

exports.getPaginationResponse = (data, totalCount, page, limit) => {
  return {
    data,
    pagination: {
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalCount / limit),
      totalCount,
      limit
    }
  };
};
```

### Adding Admin Dashboard

1. Create admin role in User model:
```javascript
role: {
  type: String,
  enum: ['user', 'admin'],
  default: 'user'
}
```

2. Create admin middleware:
```javascript
// backend/src/middleware/admin.js
const isAdmin = async (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};
```

3. Add admin routes:
```javascript
router.get('/admin/stats', authenticate, isAdmin, getAdminStats);
router.delete('/admin/events/:id', authenticate, isAdmin, deleteEventAsAdmin);
```

## 🔐 Security Enhancements

### Rate Limiting

Install express-rate-limit:
```bash
npm install express-rate-limit
```

Add to `backend/src/server.js`:
```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use(limiter);
```

### Input Validation

Use express-validator for better validation:
```bash
npm install express-validator
```

In controller:
```javascript
const { body, validationResult } = require('express-validator');

const validateEvent = [
  body('title').trim().isLength({ min: 3, max: 100 }),
  body('description').trim().isLength({ min: 10 }),
  body('maxParticipants').isInt({ min: 1 })
];

router.post('/create', authenticate, validateEvent, createEvent);
```

### Helmet for Security Headers

Install helmet:
```bash
npm install helmet
```

In `backend/src/server.js`:
```javascript
const helmet = require('helmet');
app.use(helmet());
```

## 📊 Analytics & Monitoring

### Add Winston Logging

Install winston:
```bash
npm install winston
```

Create logger:
```javascript
// backend/src/utils/logger.js
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

module.exports = logger;
```

### Add Request Logging

Use Morgan:
```bash
npm install morgan
```

In `backend/src/server.js`:
```javascript
const morgan = require('morgan');
app.use(morgan('combined'));
```

## 🧪 Testing Setup

### Backend Testing

Install Jest and Supertest:
```bash
npm install --save-dev jest supertest
```

Create test file `backend/src/routes/__tests__/auth.test.js`:
```javascript
const request = require('supertest');
const app = require('../../server');

describe('Auth Routes', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        firstName: 'Test',
        lastName: 'User',
        email: 'test@test.com',
        password: 'password123',
        confirmPassword: 'password123'
      });
    
    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
  });
});
```

### Frontend Testing

Testing already setup with React Scripts. Create test file `frontend/src/components/__tests__/EventCard.test.js`:

```javascript
import { render, screen } from '@testing-library/react';
import EventCard from '../EventCard';

describe('EventCard Component', () => {
  it('renders event title', () => {
    const mockEvent = {
      _id: '1',
      title: 'Test Event',
      description: 'Test',
      category: 'Technology',
      startDate: new Date(),
      location: 'Test Location',
      currentParticipants: 0,
      maxParticipants: 50,
      organizer: { firstName: 'John', lastName: 'Doe' }
    };

    render(<EventCard event={mockEvent} />);
    expect(screen.getByText('Test Event')).toBeInTheDocument();
  });
});
```

Run tests:
```bash
npm test
```

## 🌐 Environment-Specific Configuration

### Development (.env)
```
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/event-management
JWT_SECRET=dev-secret-key-only
LOG_LEVEL=debug
```

### Staging (.env.staging)
```
NODE_ENV=staging
MONGODB_URI=mongodb+srv://staging.mongodb.net/event-management
JWT_SECRET=staging-secret-key
LOG_LEVEL=info
```

### Production (.env.production)
```
NODE_ENV=production
MONGODB_URI=mongodb+srv://production.mongodb.net/event-management
JWT_SECRET=strong-production-secret-key-minimum-32-characters
LOG_LEVEL=error
```

Load appropriate env file:
```bash
# Development
npm run dev

# Staging
NODE_ENV=staging npm run build && npm start

# Production
NODE_ENV=production npm start
```

## 📦 Building for Production

### Frontend Build

```bash
cd frontend
npm run build
```

This creates optimized build in `build/` folder.

### Backend Production

```bash
cd backend
npm install --production
npm start
```

## 🚀 Docker Configuration (Optional)

### Backend Dockerfile

Create `backend/Dockerfile`:
```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .

EXPOSE 5000
CMD ["npm", "start"]
```

### Frontend Dockerfile

Create `frontend/Dockerfile`:
```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Docker Compose

Create `docker-compose.yml` in root:
```yaml
version: '3.8'
services:
  mongodb:
    image: mongo:5.0
    ports:
      - "27017:27017"
    environment:
      MONGO_INITDB_DATABASE: event-management
    volumes:
      - mongo_data:/data/db

  backend:
    build: ./backend
    ports:
      - "5000:5000"
    depends_on:
      - mongodb
    environment:
      MONGODB_URI: mongodb://mongodb:27017/event-management
      JWT_SECRET: dev-secret-key

  frontend:
    build: ./frontend
    ports:
      - "3000:80"
    depends_on:
      - backend

volumes:
  mongo_data:
```

Run with:
```bash
docker-compose up
```

---

**Last Updated**: 2024
**Advanced Configuration Guide v1.0**
