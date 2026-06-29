import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiArrowLeft, FiImage } from 'react-icons/fi';
import { eventAPI } from '../services/api';
import { toast } from 'react-toastify';
import LoadingSpinner from '../components/LoadingSpinner';

const CATEGORIES = ['Technology', 'Business', 'Entertainment', 'Sports', 'Education', 'Health', 'Music', 'Art', 'Food', 'Travel', 'Other'];

const EditEvent = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Technology',
    startDate: '',
    endDate: '',
    location: '',
    maxParticipants: '',
  });

  useEffect(() => {
    fetchEvent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchEvent = async () => {
    try {
      const response = await eventAPI.getEventById(id);
      const event = response.data.event;
      setFormData({
        title: event.title,
        description: event.description,
        category: event.category,
        startDate: new Date(event.startDate).toISOString().slice(0, 16),
        endDate: new Date(event.endDate).toISOString().slice(0, 16),
        location: event.location,
        maxParticipants: event.maxParticipants,
      });
      if (event.image) {
        setImagePreview(event.image);
      }
      setLoading(false);
    } catch (error) {
      toast.error('Failed to load event');
      navigate('/dashboard');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.startDate || !formData.endDate || !formData.location || !formData.maxParticipants) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      setSubmitting(true);
      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description);
      data.append('category', formData.category);
      data.append('startDate', formData.startDate);
      data.append('endDate', formData.endDate);
      data.append('location', formData.location);
      data.append('maxParticipants', formData.maxParticipants);
      if (file) {
        data.append('image', file);
      }

      await eventAPI.updateEvent(id, data);
      toast.success('Event updated successfully!');
      navigate(`/event/${id}`);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update event');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-transparent py-10 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-2xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-zinc-400 hover:text-white mb-8 font-bold transition-colors text-sm"
        >
          <FiArrowLeft size={16} />
          Back
        </button>

        <div className="glass-card p-8 border border-white/[0.08]">
          <h1 className="text-2xl font-extrabold text-white mb-8 tracking-tight">Edit Event</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image Upload */}
            <div>
              <label className="form-label">Event Image</label>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full border-2 border-dashed border-white/10 rounded-xl p-8 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all text-center group"
              >
                {imagePreview ? (
                  <div className="space-y-2">
                    <img src={imagePreview} alt="Preview" className="max-h-40 mx-auto rounded-lg object-cover" />
                    <p className="text-xs font-semibold text-zinc-405 group-hover:text-zinc-200">Click to change image</p>
                  </div>
                ) : (
                  <div className="space-y-2 py-4">
                    <FiImage className="mx-auto text-zinc-500 group-hover:text-zinc-300 transition-colors" size={36} />
                    <p className="text-xs font-bold text-zinc-400">Click to upload banner image</p>
                    <p className="text-[10px] font-semibold text-zinc-500 font-mono">JPG, PNG, GIF up to 5MB</p>
                  </div>
                )}
              </button>
            </div>

            {/* Title */}
            <div>
              <label className="form-label">Event Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter event title"
                className="input-field"
              />
            </div>

            {/* Description */}
            <div>
              <label className="form-label">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your event details, schedule and requirements..."
                rows={5}
                className="input-field resize-none"
              />
            </div>

            {/* Category */}
            <div>
              <label className="form-label">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="input-field appearance-none cursor-pointer"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat} className="bg-[#0b0c10] text-white">
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Date and Time Grid */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Start Date & Time</label>
                <input
                  type="datetime-local"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>
              <div>
                <label className="form-label">End Date & Time</label>
                <input
                  type="datetime-local"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="form-label">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Enter venue or remote link"
                className="input-field"
              />
            </div>

            {/* Max Participants */}
            <div>
              <label className="form-label">Maximum Participants</label>
              <input
                type="number"
                name="maxParticipants"
                value={formData.maxParticipants}
                onChange={handleChange}
                placeholder="Enter max number of attendees"
                min={1}
                className="input-field"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-6 border-t border-white/[0.08]">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="btn-secondary flex-1"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Updating...' : 'Update Event'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditEvent;

