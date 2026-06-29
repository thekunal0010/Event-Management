const Event = require('../models/Event');
const User = require('../models/User');

// Create Event
exports.createEvent = async (req, res) => {
  try {
    const { title, description, category, startDate, endDate, location, maxParticipants } = req.body;

    // Validation
    if (!title || !description || !startDate || !endDate || !location || !maxParticipants) {
      return res.status(400).json({ message: 'Please fill in all required fields' });
    }

    // Validate dates
    if (new Date(startDate) >= new Date(endDate)) {
      return res.status(400).json({ message: 'End date must be after start date' });
    }

    const eventData = {
      title,
      description,
      category,
      startDate,
      endDate,
      location,
      maxParticipants,
      organizer: req.user._id,
    };

    // Handle image upload
    if (req.file) {
      eventData.image = `/uploads/${req.file.filename}`;
    }

    const event = await Event.create(eventData);

    // Add event to user's created events
    await User.findByIdAndUpdate(req.user._id, {
      $push: { createdEvents: event._id },
    });

    res.status(201).json({
      success: true,
      message: 'Event created successfully',
      event: await event.populate('organizer', 'firstName lastName email'),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Events
exports.getAllEvents = async (req, res) => {
  try {
    const { category, search, page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    let filter = { isActive: true };

    if (category && category !== 'All') {
      filter.category = category;
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const events = await Event.find(filter)
      .populate('organizer', 'firstName lastName email')
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ startDate: 1 });

    const totalEvents = await Event.countDocuments(filter);

    res.json({
      success: true,
      events,
      totalEvents,
      totalPages: Math.ceil(totalEvents / limit),
      currentPage: parseInt(page),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Event by ID
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('organizer', 'firstName lastName email phone')
      .populate('participants', 'firstName lastName email');

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json({
      success: true,
      event,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Event
exports.updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, category, startDate, endDate, location, maxParticipants } = req.body;

    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if user is organizer
    if (event.organizer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized to update this event' });
    }

    const updateData = {};
    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (category) updateData.category = category;
    if (startDate) updateData.startDate = startDate;
    if (endDate) updateData.endDate = endDate;
    if (location) updateData.location = location;
    if (maxParticipants) updateData.maxParticipants = maxParticipants;

    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const updatedEvent = await Event.findByIdAndUpdate(id, updateData, { new: true }).populate('organizer', 'firstName lastName email');

    res.json({
      success: true,
      message: 'Event updated successfully',
      event: updatedEvent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Event
exports.deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if user is organizer
    if (event.organizer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized to delete this event' });
    }

    // Remove event from all users
    await User.updateMany(
      { createdEvents: id },
      { $pull: { createdEvents: id } }
    );

    await User.updateMany(
      { joinedEvents: id },
      { $pull: { joinedEvents: id } }
    );

    await Event.findByIdAndDelete(id);

    res.json({
      success: true,
      message: 'Event deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Join Event
exports.joinEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if already joined
    if (event.participants.includes(userId)) {
      return res.status(400).json({ message: 'You have already joined this event' });
    }

    // Check capacity
    if (event.currentParticipants >= event.maxParticipants) {
      return res.status(400).json({ message: 'Event is full' });
    }

    // Add user to event participants
    event.participants.push(userId);
    event.currentParticipants += 1;
    await event.save();

    // Add event to user's joined events
    await User.findByIdAndUpdate(userId, {
      $push: { joinedEvents: id },
    });

    res.json({
      success: true,
      message: 'Successfully joined the event',
      event,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Leave Event
exports.leaveEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if user is participant
    if (!event.participants.includes(userId)) {
      return res.status(400).json({ message: 'You are not a participant of this event' });
    }

    // Remove user from event participants
    event.participants = event.participants.filter((id) => id.toString() !== userId.toString());
    event.currentParticipants -= 1;
    await event.save();

    // Remove event from user's joined events
    await User.findByIdAndUpdate(userId, {
      $pull: { joinedEvents: id },
    });

    res.json({
      success: true,
      message: 'Successfully left the event',
      event,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get user's events (created and joined)
exports.getUserEvents = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId)
      .populate('createdEvents')
      .populate('joinedEvents')
      .populate('completedEvents');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      success: true,
      createdEvents: user.createdEvents,
      joinedEvents: user.joinedEvents,
      completedEvents: user.completedEvents,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get event statistics
exports.getEventStats = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId).populate('createdEvents').populate('joinedEvents');

    const upcomingJoined = user.joinedEvents.filter((event) => new Date(event.startDate) > new Date()).length;

    const createdEvents = user.createdEvents.length;
    const joinedEvents = user.joinedEvents.length;

    res.json({
      success: true,
      stats: {
        createdEvents,
        joinedEvents,
        upcomingJoined,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
