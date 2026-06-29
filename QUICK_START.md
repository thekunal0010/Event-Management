# EventHub - Quick Setup Guide

## ⚡ Quick Start (5 minutes)

### Step 1: Clone and Install Backend

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env with your MongoDB connection string
# MONGODB_URI=mongodb://localhost:27017/event-management
# JWT_SECRET=your_super_secret_key_change_this_in_production
```

### Step 2: Start MongoDB

```bash
# Option 1: Local MongoDB
mongod

# Option 2: MongoDB Atlas (Cloud)
# Update MONGODB_URI in .env to your MongoDB Atlas connection string
```

### Step 3: Run Backend

```bash
# From backend directory
npm run dev

# Server will start at http://localhost:5000
```

### Step 4: Install Frontend (New Terminal)

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Create .env file (optional)
cp .env.example .env
```

### Step 5: Run Frontend (From frontend directory)

```bash
npm start

# App will open at http://localhost:3000
```

## 🔐 Test Credentials

You can use these credentials to test the application:

- **Email**: `test@example.com`
- **Password**: `password123`

(Create your own account using the signup page)

## 📚 Default Test Account Setup

1. Go to `http://localhost:3000`
2. Click "Sign up"
3. Enter your details:
   - First Name: John
   - Last Name: Doe
   - Email: john@example.com
   - Password: password123
4. Click "Sign Up"
5. You'll be redirected to dashboard

## ✨ Features to Try

### Create an Event
1. From Dashboard, click "Create Event"
2. Fill in event details
3. Click "Create Event"
4. View it in your created events

### Explore Events
1. Go to "Explore Events" from navbar
2. Search or filter by category
3. Click on an event to see details
4. Click "Join Event" to participate

### Manage Events
1. Go to "My Events" to see all your events
2. View events you created and joined
3. Click an event to edit or delete

### View Profile
1. Go to "Profile" from navbar
2. Click "Edit" to update your information
3. Upload a profile picture
4. Save changes

### Event History
1. Go to "History" to see events you've attended
2. View past events you participated in

## 🐛 Common Issues & Solutions

### Issue: "Cannot connect to MongoDB"
**Solution**: 
- Ensure MongoDB is running (`mongod`)
- Check MONGODB_URI in .env
- If using MongoDB Atlas, ensure connection string is correct

### Issue: "CORS error"
**Solution**:
- Check FRONTEND_URL in backend .env (should be `http://localhost:3000`)
- Ensure backend is running on port 5000

### Issue: "Port already in use"
**Solution**:
```bash
# Kill process on port 5000 (backend)
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

### Issue: "Images not uploading"
**Solution**:
- Ensure `uploads/` folder exists in backend
- Check file size (max 5MB)
- Verify file is an image (jpg, png, gif, webp)

## 📦 Building for Production

### Backend
```bash
cd backend
npm install --production
# Set NODE_ENV=production in .env
npm start
```

### Frontend
```bash
cd frontend
npm run build
# Deploy the 'build' folder to your hosting
```

## 🚀 Deployment Options

### Backend
- **Heroku**: `git push heroku main`
- **Render**: Connect GitHub repo
- **Railway**: Connect GitHub repo
- **AWS EC2**: Deploy Node.js application

### Frontend
- **Vercel**: Connect GitHub repo (recommended for React)
- **Netlify**: Connect GitHub repo
- **GitHub Pages**: Run `npm run build` and deploy

## 📞 Support

For issues or questions:
1. Check the [Main README](./README.md)
2. Review error messages in browser console
3. Check backend logs in terminal
4. Verify all environment variables are set correctly

## 🎉 You're Ready!

Your Event Management System is now running. Start exploring and creating events!

Happy coding! 🚀
