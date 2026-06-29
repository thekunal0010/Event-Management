import React, { useState, useEffect } from 'react';
import { FiCalendar } from 'react-icons/fi';
import { eventAPI } from '../services/api';
import EventCard from '../components/EventCard';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';
import { toast } from 'react-toastify';

const MyEvents = () => {
  const [createdEvents, setCreatedEvents] = useState([]);
  const [joinedEvents, setJoinedEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('created');

  useEffect(() => {
    fetchUserEvents();
  }, []);

  const fetchUserEvents = async () => {
    try {
      setLoading(true);
      const response = await eventAPI.getUserEvents();
      setCreatedEvents(response.data.createdEvents);
      setJoinedEvents(response.data.joinedEvents);
    } catch (error) {
      toast.error('Failed to load events');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLeaveEvent = async (eventId) => {
    try {
      await eventAPI.leaveEvent(eventId);
      setJoinedEvents((prev) => prev.filter((e) => e._id !== eventId));
      toast.success('Left the event');
    } catch (error) {
      toast.error('Failed to leave event');
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-transparent py-10 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold text-white mb-8 tracking-tight">My Events</h1>

        {/* Premium Frosted Glass Segmented Control Tabs */}
        <div className="flex p-1 bg-white/5 border border-white/10 rounded-xl mb-8 max-w-md">
          <button
            onClick={() => setActiveTab('created')}
            className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all duration-200 text-center ${
              activeTab === 'created'
                ? 'bg-white text-black shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Created Events ({createdEvents.length})
          </button>
          <button
            onClick={() => setActiveTab('joined')}
            className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all duration-200 text-center ${
              activeTab === 'joined'
                ? 'bg-white text-black shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Joined Events ({joinedEvents.length})
          </button>
        </div>

        {/* Content */}
        {activeTab === 'created' ? (
          createdEvents.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {createdEvents.map((event) => (
                <EventCard key={event._id} event={event} isOrganizerView={true} />
              ))}
            </div>
          ) : (
            <div className="glass-card py-20 text-center">
              <EmptyState
                icon={FiCalendar}
                title="No Events Created"
                description="You haven't created any events yet"
              />
            </div>
          )
        ) : joinedEvents.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {joinedEvents.map((event) => (
              <EventCard
                key={event._id}
                event={event}
                isJoined={true}
                onLeave={() => handleLeaveEvent(event._id)}
              />
            ))}
          </div>
        ) : (
          <div className="glass-card py-20 text-center">
            <EmptyState
              icon={FiCalendar}
              title="No Events Joined"
              description="You haven't joined any events yet"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MyEvents;

