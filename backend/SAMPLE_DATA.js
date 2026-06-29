// Sample seed data for MongoDB
// Run this in MongoDB shell or use a tool like MongoDB Compass

db.users.insertMany([
  {
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    password: "$2a$10$...", // bcrypted password: password123
    phone: "+1-555-123-4567",
    bio: "Tech enthusiast and event organizer",
    avatar: null,
    createdEvents: [],
    joinedEvents: [],
    completedEvents: [],
    isVerified: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    email: "jane@example.com",
    password: "$2a$10$...", // bcrypted password: password123
    phone: "+1-555-234-5678",
    bio: "Event enthusiast",
    avatar: null,
    createdEvents: [],
    joinedEvents: [],
    completedEvents: [],
    isVerified: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

db.events.insertMany([
  {
    title: "React Workshop 2024",
    description: "Learn advanced React concepts including hooks, context API, and performance optimization. This workshop is perfect for intermediate React developers who want to level up their skills.",
    category: "Technology",
    startDate: new Date("2024-06-15T10:00:00Z"),
    endDate: new Date("2024-06-15T14:00:00Z"),
    location: "Tech Hub, San Francisco, CA",
    image: null,
    maxParticipants: 50,
    currentParticipants: 0,
    participants: [],
    organizer: ObjectId("..."), // Replace with actual user ID
    isActive: true,
    status: "Upcoming",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Business Networking Event",
    description: "Connect with entrepreneurs and business leaders in our quarterly networking event. Perfect opportunity to find partners and investors for your startup.",
    category: "Business",
    startDate: new Date("2024-06-20T18:00:00Z"),
    endDate: new Date("2024-06-20T21:00:00Z"),
    location: "Grand Hotel Ballroom, New York, NY",
    image: null,
    maxParticipants: 100,
    currentParticipants: 0,
    participants: [],
    organizer: ObjectId("..."), // Replace with actual user ID
    isActive: true,
    status: "Upcoming",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Summer Music Festival",
    description: "Experience three days of live music featuring local and international artists. Food, drinks, and good vibes guaranteed!",
    category: "Music",
    startDate: new Date("2024-07-05T16:00:00Z"),
    endDate: new Date("2024-07-07T23:00:00Z"),
    location: "Central Park, New York, NY",
    image: null,
    maxParticipants: 500,
    currentParticipants: 0,
    participants: [],
    organizer: ObjectId("..."), // Replace with actual user ID
    isActive: true,
    status: "Upcoming",
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);
