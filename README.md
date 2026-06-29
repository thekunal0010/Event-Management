# EventHub - Event Management System

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) web application for managing events in a B2C (Business-to-Consumer) model. The platform allows users to create, manage, explore, and join events with ease.

## 🎯 Features

### Authentication System
- User registration and login with JWT authentication
- Secure password hashing with bcryptjs
- Persistent login sessions using localStorage

### Dashboard
- Personalized user dashboard with statistics
- View upcoming, created, and joined events
- Quick event statistics (created, joined, upcoming)
- Responsive card-based layout

### Event Management
- Create events with detailed information:
  - Event title, description, date & time
  - Venue/location, category, max participants
  - Event banner/image upload
- Edit and delete events (organizers only)
- Event capacity management
- Event status tracking (Upcoming, Ongoing, Completed)

### Event Discovery
- Browse all available events
- Search events by title or description
- Filter by category and date
- Responsive event cards with details
- Detailed event information pages

### Join Events
- Users can join available events
- View participant count and capacity
- Prevent duplicate joining
- Leave event option with capacity management

### Event History
- Track previously attended events
- View completed events
- Event status indicators

### Navigation
- Responsive navbar with hamburger menu
- Mobile-friendly drawer navigation
- Smooth page transitions
- Navigation tabs for all sections

### UI/UX
- Professional, minimal, and clean design
- Soft shadows and subtle cards
- Rounded corners throughout
- Fully responsive (mobile, tablet, desktop)
- Smooth hover effects
- Toast notifications for user actions

## 📁 Project Structure

```
event-management-system/
├── frontend/                 # React.js frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   │   ├── Navbar.js
│   │   │   ├── EventCard.js
│   │   │   ├── ProtectedRoute.js
│   │   │   ├── LoadingSpinner.js
│   │   │   ├── EmptyState.js
│   │   │   └── ErrorBoundary.js
│   │   ├── pages/           # Page components
│   │   │   ├── Home.js
│   │   │   ├── Login.js
│   │   │   ├── Signup.js
│   │   │   ├── Dashboard.js
│   │   │   ├── Explore.js
│   │   │   ├── EventDetail.js
│   │   │   ├── CreateEvent.js
│   │   │   ├── EditEvent.js
│   │   │   ├── MyEvents.js
│   │   │   ├── History.js
│   │   │   └── Profile.js
│   │   ├── services/        # API services
│   │   │   └── api.js
│   │   ├── context/         # State management
│   │   │   └── AuthContext.js
│   │   ├── assets/          # Images and icons
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── .gitignore
│
├── backend/                 # Node.js/Express backend
│   ├── src/
│   │   ├── models/          # MongoDB schemas
│   │   │   ├── User.js
│   │   │   └── Event.js
│   │   ├── controllers/     # Business logic
│   │   │   ├── authController.js
│   │   │   └── eventController.js
│   │   ├── routes/          # API routes
│   │   │   ├── authRoutes.js
│   │   │   └── eventRoutes.js
│   │   ├── middleware/      # Custom middleware
│   │   │   ├── auth.js
│   │   │   └── upload.js
│   │   ├── utils/           # Utility functions
│   │   │   └── jwt.js
│   │   └── server.js        # Express server setup
│   ├── uploads/             # Uploaded images
│   ├── package.json
│   ├── .env.example
│   └── .gitignore
│
└── README.md
```

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI library
- **React Router** - Client-side routing
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **React Icons** - Icon library
- **React Toastify** - Toast notifications
- **Date-fns** - Date formatting

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT (jsonwebtoken)** - Authentication
- **bcryptjs** - Password hashing
- **Multer** - File upload handling
- **CORS** - Cross-origin resource sharing

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (locally or MongoDB Atlas)
- npm or yarn package manager

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create .env file**
   ```bash
   cp .env.example .env
   ```

4. **Configure .env**
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/event-management
   JWT_SECRET=your_secret_key_here
   NODE_ENV=development
   FRONTEND_URL=http://localhost:3000
   ```

5. **Start MongoDB**
   ```bash
   # For local MongoDB
   mongod
   ```

6. **Run the server**
   ```bash
   # Development mode with auto-reload
   npm run dev

   # Production mode
   npm start
   ```

   The server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create .env file (optional)**
   ```bash
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

   The app will open at `http://localhost:3000`

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)
- `PUT /api/auth/profile` - Update user profile (protected)
- `GET /api/auth/user/:id` - Get user by ID

### Events
- `GET /api/events` - Get all events (with pagination & filtering)
- `POST /api/events/create` - Create event (protected)
- `GET /api/events/:id` - Get event details
- `PUT /api/events/:id` - Update event (protected)
- `DELETE /api/events/:id` - Delete event (protected)
- `POST /api/events/:id/join` - Join event (protected)
- `POST /api/events/:id/leave` - Leave event (protected)
- `GET /api/events/user-events` - Get user's events (protected)
- `GET /api/events/stats` - Get user stats (protected)

## 🎨 UI/UX Design Highlights

- **Professional Theme**: Clean, modern, corporate-style dashboard
- **Minimal Design**: Subtle colors, soft shadows, and rounded corners
- **Responsive Layout**: Works perfectly on mobile, tablet, and desktop
- **Smooth Interactions**: Subtle hover effects and transitions
- **Consistent Typography**: Professional font hierarchy
- **Intuitive Navigation**: Clear menu structure with mobile support
- **Loading States**: Spinners and progress indicators
- **Empty States**: Friendly messages when no data available
- **Toast Notifications**: User feedback for all actions

## 📊 Sample Data

The application includes:
- Authentication system with dummy credentials
- Pre-built event categories
- Responsive image uploads
- Real-time participant tracking
- Event capacity management

## 🔐 Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- Protected API routes with middleware
- File upload validation
- CORS configuration
- Input validation on both frontend and backend

## 📱 Responsive Design

- **Mobile**: Hamburger menu, single-column layout, touch-friendly buttons
- **Tablet**: Two-column layout, optimized spacing
- **Desktop**: Full three-column layout, enhanced interactions

## 🚀 Deployment

### Backend (Heroku/Render)
1. Add `Procfile` in backend root: `web: npm start`
2. Set environment variables on hosting platform
3. Deploy to your chosen platform

### Frontend (Vercel/Netlify)
1. Update API URL in environment variables
2. Run `npm run build`
3. Deploy the `build/` folder to your hosting platform

## 📝 Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/event-management
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env.local)
```
REACT_APP_API_URL=http://localhost:5000/api
```

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check MONGODB_URI in .env file
- Verify MongoDB is listening on correct port

### CORS Errors
- Check FRONTEND_URL in backend .env
- Ensure frontend and backend URLs match

### Image Upload Issues
- Verify uploads/ directory exists in backend
- Check file size limits in multer configuration
- Ensure proper permissions on uploads folder

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [MongoDB Docs](https://docs.mongodb.com)
- [Tailwind CSS](https://tailwindcss.com)
- [JWT Handbook](https://auth0.com/resources/ebooks/jwt-handbook)

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 👨‍💻 Author

Created as a comprehensive MERN stack application for event management.

---

**Happy Coding! 🚀**
