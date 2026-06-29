import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FiArrowLeft, FiMapPin, FiCalendar, FiUsers, FiEdit, FiTrash2 } from 'react-icons/fi';
import { eventAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import { toast } from 'react-toastify';
import { format } from 'date-fns';

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isJoined, setIsJoined] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchEventDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (event && isAuthenticated && user) {
      setIsJoined(event.participants.some((p) => p._id === user._id));
    }
  }, [event, isAuthenticated, user]);

  const fetchEventDetail = async () => {
    try {
      setLoading(true);
      const response = await eventAPI.getEventById(id);
      setEvent(response.data.event);
    } catch (error) {
      toast.error('Failed to load event');
      navigate('/explore');
    } finally {
      setLoading(false);
    }
  };

  const handleJoinEvent = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      setActionLoading(true);
      await eventAPI.joinEvent(id);
      setIsJoined(true);
      toast.success('Successfully joined the event!');
      fetchEventDetail();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to join event');
    } finally {
      setActionLoading(false);
    }
  };

  const handleLeaveEvent = async () => {
    try {
      setActionLoading(true);
      await eventAPI.leaveEvent(id);
      setIsJoined(false);
      toast.success('Left the event');
      fetchEventDetail();
    } catch (error) {
      toast.error('Failed to leave event');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteEvent = async () => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;

    try {
      await eventAPI.deleteEvent(id);
      toast.success('Event deleted successfully');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Failed to delete event');
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!event) return null;

  const isOrganizer = user?._id === event.organizer._id;
  const capacityPercentage = (event.currentParticipants / event.maxParticipants) * 100;

  return (
    <div className="min-h-screen bg-transparent py-10 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-zinc-400 hover:text-white mb-6 font-bold transition-colors text-sm"
        >
          <FiArrowLeft size={16} />
          Back
        </button>

        {/* Event Image */}
        <div className="h-96 rounded-2xl bg-gradient-to-br from-zinc-850 to-zinc-950 overflow-hidden mb-8 border border-white/[0.08] shadow-2xl relative">
          {event.image ? (
            <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-zinc-650 font-mono text-xs uppercase tracking-wider font-semibold">
              No Image Provided
            </div>
          )}
        </div>

        {/* Event Header Card */}
        <div className="glass-card p-8 mb-8 border border-white/[0.08]">
          <div className="flex justify-between items-start gap-4 mb-6">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2.5 mb-3">
                <span className="px-3 py-1 bg-white/10 border border-white/10 text-[10px] uppercase tracking-wider font-extrabold text-zinc-200 rounded-full">
                  {event.category}
                </span>
                <span className={`px-3 py-1 text-[10px] uppercase tracking-wider font-extrabold rounded-full ${
                  event.status === 'Upcoming' ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400' :
                  event.status === 'Ongoing' ? 'bg-blue-500/10 border border-blue-500/20 text-blue-400' :
                  'bg-white/5 border border-white/10 text-zinc-400'
                }`}>
                  {event.status}
                </span>
              </div>
              <h1 className="text-3xl font-extrabold text-white mb-2 tracking-tight leading-tight">{event.title}</h1>
              <p className="text-zinc-500 text-xs font-semibold">
                Organized by <span className="text-zinc-450">{event.organizer.firstName} {event.organizer.lastName}</span>
              </p>
            </div>
            {isOrganizer && (
              <div className="flex gap-2">
                <Link
                  to={`/edit-event/${event._id}`}
                  className="p-3 bg-white/5 border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white rounded-xl transition duration-200"
                  title="Edit Event"
                >
                  <FiEdit size={16} />
                </Link>
                <button
                  onClick={handleDeleteEvent}
                  className="p-3 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-red-400 rounded-xl transition duration-200"
                  title="Delete Event"
                >
                  <FiTrash2 size={16} />
                </button>
              </div>
            )}
          </div>

          {/* Key Information Grid */}
          <div className="grid md:grid-cols-3 gap-6 py-6 border-t border-b border-white/[0.08] text-sm">
            <div>
              <div className="flex items-center gap-2 text-zinc-400 mb-2 font-bold uppercase tracking-wider text-[11px]">
                <FiCalendar size={14} className="text-zinc-300" />
                <span>When</span>
              </div>
              <p className="text-white font-bold">{format(new Date(event.startDate), 'MMMM dd, yyyy')}</p>
              <p className="text-xs font-semibold text-zinc-450 mt-0.5">{format(new Date(event.startDate), 'h:mm a')}</p>
            </div>
            <div>
              <div className="flex items-center gap-2 text-zinc-400 mb-2 font-bold uppercase tracking-wider text-[11px]">
                <FiMapPin size={14} className="text-zinc-300" />
                <span>Where</span>
              </div>
              <p className="text-white font-bold leading-tight">{event.location}</p>
            </div>
            <div>
              <div className="flex items-center gap-2 text-zinc-400 mb-2 font-bold uppercase tracking-wider text-[11px]">
                <FiUsers size={14} className="text-zinc-300" />
                <span>Attendees</span>
              </div>
              <p className="text-white font-bold">{event.currentParticipants} / {event.maxParticipants}</p>
            </div>
          </div>

          {/* Capacity Bar */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2 text-xs font-bold text-zinc-400 uppercase tracking-wider">
              <span>Event Capacity</span>
              <span className="font-mono text-white">{capacityPercentage.toFixed(0)}%</span>
            </div>
            <div className="w-full bg-white/5 border border-white/10 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-zinc-200 to-zinc-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, capacityPercentage)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Event Description Card */}
        <div className="glass-card p-8 mb-8 border border-white/[0.08]">
          <h2 className="text-lg font-bold text-white mb-4 uppercase tracking-wider">About This Event</h2>
          <p className="text-zinc-350 text-sm leading-relaxed whitespace-pre-wrap font-medium">{event.description}</p>
        </div>

        {/* Join Actions Card */}
        {!isOrganizer && (
          <div className="glass-card p-6 border border-white/[0.08]">
            <button
              onClick={isJoined ? handleLeaveEvent : handleJoinEvent}
              disabled={actionLoading || (event.currentParticipants >= event.maxParticipants && !isJoined)}
              className={`w-full py-3.5 rounded-xl font-bold transition-all duration-200 text-xs active:scale-98 ${
                isJoined
                  ? 'bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20'
                  : 'bg-white text-black hover:bg-zinc-200 hover:shadow-[0_0_16px_rgba(255,255,255,0.1)]'
              } disabled:opacity-30 disabled:cursor-not-allowed`}
            >
              {actionLoading ? 'Loading...' : isJoined ? 'Leave Event' : 'Join Event'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventDetail;

