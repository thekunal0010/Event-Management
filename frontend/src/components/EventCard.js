import React from 'react';
import { Link } from 'react-router-dom';
import { FiMapPin, FiUsers, FiCalendar } from 'react-icons/fi';
import { format } from 'date-fns';

const EventCard = ({ event, onJoin, onLeave, isJoined, isOrganizerView }) => {
  return (
    <Link to={`/event/${event._id}`} className="glass-card overflow-hidden group block">
      {/* Event Image */}
      <div className="relative h-48 bg-gradient-to-br from-zinc-800 to-zinc-950 overflow-hidden">
        {event.image ? (
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-zinc-650 font-semibold font-mono text-xs uppercase tracking-wider">
            No Image Provided
          </div>
        )}
        <div className="absolute top-3 right-3 bg-white/10 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider text-zinc-200">
          {event.category}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5">
        {/* Title */}
        <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-zinc-300 transition-colors">
          {event.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-zinc-400 mb-4 line-clamp-2 font-medium leading-relaxed">{event.description}</p>

        {/* Meta Information */}
        <div className="space-y-2 mb-4 text-xs font-semibold text-zinc-400">
          <div className="flex items-center gap-2">
            <FiCalendar size={14} className="text-zinc-300" />
            <span>{format(new Date(event.startDate), 'MMMM dd, yyyy')}</span>
          </div>
          <div className="flex items-center gap-2">
            <FiMapPin size={14} className="text-zinc-300" />
            <span className="truncate">{event.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <FiUsers size={14} className="text-zinc-300" />
            <span>
              {event.currentParticipants} / {event.maxParticipants} attendees
            </span>
          </div>
        </div>

        {/* Status Bar */}
        <div className="w-full bg-white/5 border border-white/10 rounded-full h-2 mb-4 overflow-hidden">
          <div
            className="bg-gradient-to-r from-zinc-200 to-zinc-400 h-full rounded-full transition-all duration-500"
            style={{ width: `${Math.min(100, (event.currentParticipants / event.maxParticipants) * 100)}%` }}
          />
        </div>

        {/* Organizer */}
        <div className="text-[11px] font-semibold text-zinc-500 mb-4">
          Organized by <span className="text-zinc-400">{event.organizer?.firstName} {event.organizer?.lastName}</span>
        </div>

        {/* Action Button */}
        {!isOrganizerView && (
          <button
            onClick={(e) => {
              e.preventDefault();
              isJoined ? onLeave() : onJoin();
            }}
            className={`w-full py-2.5 rounded-xl font-bold active:scale-95 transition-all duration-200 text-xs ${
              isJoined
                ? 'bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20'
                : 'bg-white text-black hover:bg-zinc-200 hover:shadow-[0_0_16px_rgba(255,255,255,0.1)]'
            }`}
          >
            {isJoined ? 'Leave Event' : 'Join Event'}
          </button>
        )}
      </div>
    </Link>
  );
};

export default EventCard;

