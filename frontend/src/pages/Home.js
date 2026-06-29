import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiCalendar, FiUsers, FiCompass } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-transparent relative z-10">
      {/* Hero Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl sm:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tight">
              Discover & Manage <span className="bg-gradient-to-r from-zinc-100 via-zinc-200 to-zinc-400 bg-clip-text text-transparent">Events Effortlessly</span>
            </h1>
            <p className="text-lg text-zinc-400 mb-8 leading-relaxed font-medium">
              Join thousands of users exploring amazing events. Create, manage, and participate in events that matter to you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              {isAuthenticated ? (
                <>
                  <Link to="/explore" className="btn-primary inline-flex items-center justify-center gap-2">
                    Explore Events
                    <FiArrowRight size={18} />
                  </Link>
                  <Link to="/dashboard" className="btn-secondary inline-flex items-center justify-center gap-2">
                    Go to Dashboard
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/signup" className="btn-primary inline-flex items-center justify-center gap-2">
                    Get Started
                    <FiArrowRight size={18} />
                  </Link>
                  <Link to="/explore" className="btn-secondary inline-flex items-center justify-center gap-2">
                    Browse Events
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className="glass-card h-96 flex flex-col justify-between p-6 shadow-2xl relative overflow-hidden group">
            <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-4">
              <div className="flex gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              </div>
              <span className="text-[11px] font-semibold text-zinc-500 font-mono">live_dashboard_v1.0</span>
            </div>
            <div className="flex-1 flex flex-col justify-center items-center">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-xl animate-pulse" />
                <FiCalendar size={56} className="text-white relative filter drop-shadow-md" />
              </div>
              <p className="text-xl font-extrabold text-white mb-2">Event Dashboard</p>
              <p className="text-sm text-zinc-400 text-center max-w-xs leading-relaxed">
                Real-time tracking of RSVPs, calendar invites, and attendee dynamics.
              </p>
            </div>
            <div className="border-t border-white/5 pt-4 flex justify-between items-center text-xs text-zinc-500 font-mono">
              <span>Status: Active</span>
              <span>Uptime: 99.9%</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 bg-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-white mb-4 tracking-tight">Built for Seamless Coordination</h2>
            <p className="text-lg text-zinc-400 font-medium">A modular layout of features engineered for event organizers.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 auto-rows-[250px]">
            {/* Bento Box 1: Easy Event Creation */}
            <div className="glass-card p-8 md:col-span-2 flex flex-col justify-between group overflow-hidden relative">
              <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-all" />
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="p-2.5 bg-white/5 border border-white/10 rounded-xl text-white">
                    <FiCalendar size={20} />
                  </span>
                  <h3 className="text-xl font-bold text-white">Intuitive Event Builder</h3>
                </div>
                <p className="text-zinc-400 max-w-xl text-sm leading-relaxed">
                  Design beautiful event landing pages with descriptions, tags, capacity limits, and custom locations in less than a minute.
                </p>
              </div>
              <div className="flex gap-2 text-[10px] font-mono text-zinc-500 pt-4">
                <span>[Title]</span>
                <span>[Category]</span>
                <span>[Date]</span>
                <span>[Limit]</span>
              </div>
            </div>

            {/* Bento Box 2: Discover & Join */}
            <div className="glass-card p-8 md:row-span-2 flex flex-col justify-between group overflow-hidden relative">
              <div className="absolute bottom-0 right-0 w-36 h-36 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-all" />
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="p-2.5 bg-white/5 border border-white/10 rounded-xl text-white">
                    <FiCompass size={20} />
                  </span>
                  <h3 className="text-xl font-bold text-white">Smart Discovery</h3>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                  Browse, filter, and discover upcoming meetups, conferences, workshops, and concerts by tags, keywords, or date ranges.
                </p>
              </div>
              <div className="space-y-2.5">
                <div className="bg-white/5 border border-white/10 rounded-lg p-2.5 flex items-center justify-between text-xs">
                  <span className="text-zinc-300 font-medium">React Workshop 2026</span>
                  <span className="px-2 py-0.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-full font-bold">Tech</span>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg p-2.5 flex items-center justify-between text-xs">
                  <span className="text-zinc-300 font-medium">Summer Jazz Fest</span>
                  <span className="px-2 py-0.5 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-full font-bold">Music</span>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg p-2.5 flex items-center justify-between text-xs">
                  <span className="text-zinc-300 font-medium">Business Pitch 2026</span>
                  <span className="px-2 py-0.5 bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 rounded-full font-bold">Biz</span>
                </div>
              </div>
            </div>

            {/* Bento Box 3: Participant Management */}
            <div className="glass-card p-8 flex flex-col justify-between group overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl group-hover:bg-purple-500/10 transition-all" />
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="p-2 bg-white/5 border border-white/10 rounded-lg text-white">
                    <FiUsers size={18} />
                  </span>
                  <h3 className="text-lg font-bold text-white">Attendee Monitor</h3>
                </div>
                <p className="text-zinc-400 text-xs leading-relaxed">
                  Real-time RSVP rosters. Track capacity caps and automatically handle incoming waitlists instantly.
                </p>
              </div>
              <div className="flex items-center gap-1.5 pt-4">
                <div className="flex -space-x-2">
                  <div className="w-6 h-6 rounded-full bg-zinc-700 border border-zinc-950 flex items-center justify-center text-[10px] font-bold text-white">A</div>
                  <div className="w-6 h-6 rounded-full bg-indigo-600 border border-zinc-950 flex items-center justify-center text-[10px] font-bold text-white">B</div>
                  <div className="w-6 h-6 rounded-full bg-zinc-650 border border-zinc-950 flex items-center justify-center text-[10px] font-bold text-white">C</div>
                </div>
                <span className="text-[11px] text-zinc-500 font-semibold font-mono">+142 Attended</span>
              </div>
            </div>

            {/* Bento Box 4: Interactive Insights / Tracker */}
            <div className="glass-card p-8 md:col-span-2 flex flex-col justify-between group overflow-hidden relative">
              <div className="absolute bottom-0 left-12 w-48 h-24 bg-teal-500/5 rounded-full blur-2xl group-hover:bg-teal-500/10 transition-all" />
              <div className="grid sm:grid-cols-2 gap-6 h-full items-center">
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Live Progress Metrics</h3>
                  <p className="text-zinc-400 text-xs leading-relaxed">
                    Watch the ticket capacity status bars update dynamically as guests join or leave your schedule.
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-medium text-zinc-400">
                      <span>Tech Meetup RSVP</span>
                      <span>85%</span>
                    </div>
                    <div className="w-full bg-white/5 border border-white/10 rounded-full h-2 overflow-hidden">
                      <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full" style={{ width: '85%' }} />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-medium text-zinc-400">
                      <span>Art Exhibition Capacity</span>
                      <span>42%</span>
                    </div>
                    <div className="w-full bg-white/5 border border-white/10 rounded-full h-2 overflow-hidden">
                      <div className="bg-gradient-to-r from-teal-500 to-cyan-500 h-full rounded-full" style={{ width: '42%' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto glass-card p-12 text-center relative overflow-hidden shadow-2xl border border-white/[0.08]">
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
          
          <h2 className="text-4xl font-extrabold mb-4 text-white tracking-tight">Ready to Get Started?</h2>
          <p className="text-lg mb-8 text-zinc-400 font-medium max-w-xl mx-auto leading-relaxed">
            Join the collective of developers, organizers, and creators launching events today.
          </p>
          {!isAuthenticated && (
            <Link to="/signup" className="inline-block btn-primary">
              Create Your Account
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
