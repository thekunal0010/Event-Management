import React, { useState, useEffect } from 'react';
import { FiSearch, FiCalendar } from 'react-icons/fi';
import { eventAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import EventCard from '../components/EventCard';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';
import { toast } from 'react-toastify';

const CATEGORIES = ['All', 'Technology', 'Business', 'Entertainment', 'Sports', 'Education', 'Health', 'Music', 'Art', 'Food', 'Travel'];

const Explore = () => {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { isAuthenticated } = useAuth();
  const [joinedEventsIds, setJoinedEventsIds] = useState(new Set());

  useEffect(() => {
    fetchEvents(1);
    if (isAuthenticated) {
      fetchUserEvents();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, isAuthenticated]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchEvents(1);
    }, 300);
    return () => clearTimeout(debounceTimer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const fetchEvents = async (page) => {
    try {
      setLoading(true);
      const params = {
        page,
        limit: 12,
        category: selectedCategory !== 'All' ? selectedCategory : undefined,
        search: search || undefined,
      };
      const response = await eventAPI.getAllEvents(params);
      setEvents(response.data.events);
      setCurrentPage(response.data.currentPage);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      toast.error('Failed to load events');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserEvents = async () => {
    try {
      const response = await eventAPI.getUserEvents();
      const joinedIds = new Set(response.data.joinedEvents.map((e) => e._id));
      setJoinedEventsIds(joinedIds);
    } catch (error) {
      console.error(error);
    }
  };

  const handleJoinEvent = async (eventId) => {
    if (!isAuthenticated) {
      toast.error('Please login to join events');
      return;
    }

    try {
      await eventAPI.joinEvent(eventId);
      setJoinedEventsIds((prev) => new Set([...prev, eventId]));
      toast.success('Successfully joined the event!');
      fetchEvents(currentPage);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to join event');
    }
  };

  const handleLeaveEvent = async (eventId) => {
    try {
      await eventAPI.leaveEvent(eventId);
      setJoinedEventsIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(eventId);
        return newSet;
      });
      toast.success('Left the event');
      fetchEvents(currentPage);
    } catch (error) {
      toast.error('Failed to leave event');
    }
  };

  return (
    <div className="min-h-screen bg-transparent py-10 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold text-white mb-2 tracking-tight">Explore Events</h1>
          <p className="text-zinc-400 font-medium text-sm leading-relaxed">Discover and join events matching your interests</p>
        </div>

        {/* Search and Filter */}
        <div className="mb-10 space-y-5">
          {/* Search Bar */}
          <div className="relative">
            <FiSearch className="absolute left-4 top-4 text-zinc-450" size={18} />
            <input
              type="text"
              placeholder="Search events by title, description or tag..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field pl-12 w-full"
            />
          </div>

          {/* Category Filter */}
          <div className="overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="flex gap-2 min-w-min sm:min-w-0 sm:flex-wrap">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-xl font-bold whitespace-nowrap text-xs transition-all duration-200 active:scale-95 ${
                    selectedCategory === category
                      ? 'bg-white text-black hover:bg-zinc-200 hover:shadow-[0_0_16px_rgba(255,255,255,0.1)]'
                      : 'bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 hover:border-white/15'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Events Grid */}
        {loading ? (
          <LoadingSpinner />
        ) : events.length > 0 ? (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-10">
              {events.map((event) => (
                <EventCard
                  key={event._id}
                  event={event}
                  isJoined={joinedEventsIds.has(event._id)}
                  onJoin={() => handleJoinEvent(event._id)}
                  onLeave={() => handleLeaveEvent(event._id)}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-3 mt-12">
                <button
                  onClick={() => fetchEvents(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-zinc-300 hover:bg-white/10 hover:border-white/15 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-bold transition-all"
                >
                  Previous
                </button>
                <div className="text-xs font-mono text-zinc-500 font-semibold px-2">
                  Page {currentPage} of {totalPages}
                </div>
                <button
                  onClick={() => fetchEvents(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-zinc-300 hover:bg-white/10 hover:border-white/15 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-bold transition-all"
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="glass-card py-20 text-center">
            <EmptyState
              icon={FiCalendar}
              title="No Events Found"
              description={search ? `No events match "${search}"` : 'No events available'}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore;

