import React, { useState, useEffect } from 'react';
import { FiClock } from 'react-icons/fi';
import { eventAPI } from '../services/api';
import EventCard from '../components/EventCard';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';
import { toast } from 'react-toastify';

const History = () => {
  const [completedEvents, setCompletedEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const response = await eventAPI.getUserEvents();
      const completed = response.data.joinedEvents.filter(
        (event) => new Date(event.endDate) < new Date()
      );
      setCompletedEvents(completed);
    } catch (error) {
      toast.error('Failed to load event history');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-transparent py-10 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold text-white mb-2 tracking-tight">Event History</h1>
        <p className="text-zinc-400 font-medium text-sm leading-relaxed mb-8">View all events you've attended in the past</p>

        {completedEvents.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {completedEvents.map((event) => (
              <EventCard key={event._id} event={event} isJoined={true} />
            ))}
          </div>
        ) : (
          <div className="glass-card py-20 text-center">
            <EmptyState
              icon={FiClock}
              title="No Event History"
              description="You haven't attended any events yet"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default History;

