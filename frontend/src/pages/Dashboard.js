import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiCalendar, FiUsers, FiTrendingUp, FiCompass } from 'react-icons/fi';
import { eventAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import EventCard from '../components/EventCard';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [userEvents, setUserEvents] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [statsRes, eventsRes] = await Promise.all([
        eventAPI.getEventStats(),
        eventAPI.getUserEvents(),
      ]);
      setStats(statsRes.data.stats);
      setUserEvents(eventsRes.data);
    } catch (error) {
      toast.error('Failed to load dashboard data');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-transparent py-10 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Bento Grid Stats Section */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          
          {/* Welcome & Banner (col-span-2) */}
          <div className="glass-card p-8 md:col-span-2 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all duration-500 pointer-events-none" />
            <div>
              <h1 className="text-3xl font-extrabold text-white mb-2 tracking-tight">Dashboard</h1>
              <p className="text-zinc-400 font-medium text-sm leading-relaxed max-w-md">
                Welcome back, {user?.firstName}! Here is an overview of your events, statistics, and scheduling activities.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 mt-6">
              <Link to="/create-event" className="btn-primary inline-flex items-center gap-2">
                <FiPlus size={16} />
                Create Event
              </Link>
              <Link to="/explore" className="btn-secondary inline-flex items-center gap-2">
                <FiCompass size={16} />
                Discover Events
              </Link>
            </div>
          </div>

          {/* Stat 1: Created Events */}
          <div className="glass-card p-6 flex flex-col justify-between group overflow-hidden relative">
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-550/5 rounded-full blur-2xl group-hover:bg-blue-550/10 transition-all duration-550 pointer-events-none" />
            <div className="flex justify-between items-start">
              <span className="p-3 bg-white/5 border border-white/10 rounded-xl text-white">
                <FiCalendar size={20} />
              </span>
              <span className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider">Created</span>
            </div>
            <div className="mt-8">
              <p className="text-4xl font-extrabold text-white mb-1 tracking-tight">{stats?.createdEvents || 0}</p>
              <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Events Organized</p>
            </div>
          </div>

          {/* Stat 2: Joined Events */}
          <div className="glass-card p-6 flex flex-col justify-between group overflow-hidden relative">
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-all duration-550 pointer-events-none" />
            <div className="flex justify-between items-start">
              <span className="p-3 bg-white/5 border border-white/10 rounded-xl text-white">
                <FiUsers size={20} />
              </span>
              <span className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider">Joined</span>
            </div>
            <div className="mt-8">
              <p className="text-4xl font-extrabold text-white mb-1 tracking-tight">{stats?.joinedEvents || 0}</p>
              <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Events Joined</p>
            </div>
          </div>

          {/* Stat 3: Upcoming Events (col-span-2) */}
          <div className="glass-card p-6 md:col-span-2 flex flex-col justify-between group overflow-hidden relative">
            <div className="absolute bottom-0 right-0 w-48 h-32 bg-purple-550/5 rounded-full blur-2xl group-hover:bg-purple-550/10 transition-all duration-550 pointer-events-none" />
            <div className="flex justify-between items-start">
              <span className="p-3 bg-white/5 border border-white/10 rounded-xl text-white">
                <FiTrendingUp size={20} />
              </span>
              <span className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider">Calendar</span>
            </div>
            <div className="flex items-end justify-between mt-6">
              <div>
                <p className="text-4xl font-extrabold text-white mb-1 tracking-tight">{stats?.upcomingJoined || 0}</p>
                <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Upcoming Registered</p>
              </div>
              <div className="text-right">
                <span className="text-[11px] font-mono text-zinc-500 font-semibold uppercase tracking-wider">Status: Real-time</span>
              </div>
            </div>
          </div>

        </div>

        {/* Created Events */}
        <div className="mb-12">
          <h2 className="text-xl font-bold uppercase tracking-wider text-white mb-6">Events You Created</h2>
          {userEvents?.createdEvents?.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userEvents.createdEvents.map((event) => (
                <EventCard
                  key={event._id}
                  event={event}
                  isOrganizerView={true}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={FiCalendar}
              title="No Events Created Yet"
              description="Start creating events and let people know about them"
              action={
                <Link to="/create-event" className="btn-primary inline-flex items-center gap-2">
                  <FiPlus size={18} />
                  Create Event
                </Link>
              }
            />
          )}
        </div>

        {/* Joined Events */}
        <div>
          <h2 className="text-xl font-bold uppercase tracking-wider text-white mb-6">Events You've Joined</h2>
          {userEvents?.joinedEvents?.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userEvents.joinedEvents.map((event) => (
                <EventCard key={event._id} event={event} isJoined={true} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={FiUsers}
              title="No Events Joined Yet"
              description="Explore events and join ones that interest you"
              action={
                <Link to="/explore" className="btn-primary">
                  Explore Events
                </Link>
              }
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

