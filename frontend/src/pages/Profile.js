import React, { useState, useRef } from 'react';
import { FiEdit, FiUser, FiMail, FiPhone } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../services/api';
import { toast } from 'react-toastify';

const Profile = () => {
  const { user, setUser } = useAuth();
  const fileInputRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || null);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phone: user?.phone || '',
    bio: user?.bio || '',
  });
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const data = new FormData();
      data.append('firstName', formData.firstName);
      data.append('lastName', formData.lastName);
      data.append('phone', formData.phone);
      data.append('bio', formData.bio);
      if (file) {
        data.append('avatar', file);
      }

      const response = await authAPI.updateProfile(data);
      setUser(response.data.user);
      setIsEditing(false);
      setFile(null);
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-transparent py-10 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-2xl mx-auto">
        <div className="glass-card p-8 border border-white/[0.08]">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-extrabold text-white tracking-tight">Profile</h1>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 hover:border-white/15 text-zinc-300 hover:text-white rounded-xl text-xs font-bold transition-all duration-200 active:scale-95"
            >
              <FiEdit size={14} />
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>

          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Avatar Upload */}
              <div>
                <label className="form-label">Profile Picture</label>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleAvatarChange}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-4 p-4 border-2 border-dashed border-white/10 rounded-xl bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all w-full text-left group"
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900 border border-white/10 flex items-center justify-center text-white overflow-hidden flex-shrink-0">
                    {avatarPreview ? (
                      <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <FiUser size={24} className="text-zinc-405" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white group-hover:text-zinc-200">Upload Photo</p>
                    <p className="text-xs text-zinc-500">Click to change profile image</p>
                  </div>
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="form-label">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>
              </div>

              <div>
                <label className="form-label">Phone</label>
                <div className="relative">
                  <FiPhone className="absolute left-4 top-4 text-zinc-450" size={16} />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    className="input-field pl-12"
                  />
                </div>
              </div>

              <div>
                <label className="form-label">Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Tell people about yourself, your interests and background..."
                  rows={4}
                  maxLength={500}
                  className="input-field resize-none"
                />
                <p className="text-[10px] font-mono text-zinc-500 mt-1.5 text-right">{formData.bio.length} / 500 characters</p>
              </div>

              <div className="flex gap-4 pt-6 border-t border-white/[0.08]">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setFormData({
                      firstName: user?.firstName || '',
                      lastName: user?.lastName || '',
                      phone: user?.phone || '',
                      bio: user?.bio || '',
                    });
                    setAvatarPreview(user?.avatar || null);
                    setFile(null);
                  }}
                  className="btn-secondary flex-1"
                >
                  Discard
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              {/* Avatar Display */}
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900 border-2 border-white/10 flex items-center justify-center text-white overflow-hidden shadow-xl">
                  {user?.avatar ? (
                    <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <FiUser size={40} className="text-zinc-400" />
                  )}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white tracking-tight">
                    {user?.firstName} {user?.lastName}
                  </h2>
                  <p className="text-sm font-semibold text-zinc-500">{user?.email}</p>
                </div>
              </div>

              {/* Information Grid */}
              <div className="grid md:grid-cols-2 gap-6 py-6 border-t border-b border-white/[0.08]">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">Email Address</p>
                  <div className="flex items-center gap-2.5 text-white font-medium text-sm">
                    <FiMail size={16} className="text-zinc-400" />
                    {user?.email}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">Phone Number</p>
                  <div className="flex items-center gap-2.5 text-white font-medium text-sm">
                    <FiPhone size={16} className="text-zinc-400" />
                    {user?.phone || 'Not provided'}
                  </div>
                </div>
              </div>

              {/* Bio */}
              {user?.bio && (
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">Biography</p>
                  <p className="text-zinc-300 text-sm leading-relaxed whitespace-pre-wrap font-medium">{user.bio}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

