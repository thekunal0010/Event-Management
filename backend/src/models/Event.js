const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide an event title'],
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    description: {
      type: String,
      required: [true, 'Please provide a description'],
      minlength: 10,
    },
    category: {
      type: String,
      enum: ['Technology', 'Business', 'Entertainment', 'Sports', 'Education', 'Health', 'Music', 'Art', 'Food', 'Travel', 'Other'],
      default: 'Other',
    },
    startDate: {
      type: Date,
      required: [true, 'Please provide a start date'],
    },
    endDate: {
      type: Date,
      required: [true, 'Please provide an end date'],
    },
    location: {
      type: String,
      required: [true, 'Please provide a location'],
    },
    image: {
      type: String,
      default: null,
    },
    maxParticipants: {
      type: Number,
      required: [true, 'Please provide max participants'],
      min: 1,
    },
    currentParticipants: {
      type: Number,
      default: 0,
    },
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    status: {
      type: String,
      enum: ['Upcoming', 'Ongoing', 'Completed'],
      default: 'Upcoming',
    },
  },
  { timestamps: true }
);

// Index for search and filtering
eventSchema.index({ title: 'text', description: 'text' });
eventSchema.index({ startDate: 1 });
eventSchema.index({ category: 1 });

module.exports = mongoose.model('Event', eventSchema);
