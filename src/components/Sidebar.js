import React from 'react';
import { generateInitials } from '../utils/helpers';

const Sidebar = ({ groups, currentGroupId, setCurrentGroupId, setShowAddGroup, isMobile }) => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1>Pocket Notes</h1>
        
        {!isMobile && (
          <button onClick={() => setShowAddGroup(true)}>+</button>
        )}
      </div>

    
      <nav className="groups-list">
        {groups.map((group) => (
          <button
            key={group.id}
            className={currentGroupId === group.id ? 'group-item active' : 'group-item'}
            onClick={() => setCurrentGroupId(group.id)}
            style={{ borderColor: currentGroupId === group.id ? group.color : 'transparent' }}
          >
            <div className="group-avatar" style={{ backgroundColor: group.color }}>
              {generateInitials(group.name)}
            </div>
            <span>{group.name}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
