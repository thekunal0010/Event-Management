import React from 'react';
import { FiInbox } from 'react-icons/fi';

const EmptyState = ({ icon: Icon = FiInbox, title, description, action }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <Icon className="text-zinc-500 mb-4" size={48} />
      <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
      <p className="text-sm text-zinc-400 font-medium text-center mb-6">{description}</p>
      {action && <div>{action}</div>}
    </div>
  );
};

export default EmptyState;

