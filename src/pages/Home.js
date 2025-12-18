import React, { useState, useEffect, useRef } from 'react';
import Sidebar from '../components/Sidebar';
import NotesSection from '../components/NotesSection';
import AddGroupPopup from '../components/AddGroupPopup';
import img from "../assets/illustration.png"
const Home = () => {
  const [groups, setGroups] = useState([]);
  const [currentGroupId, setCurrentGroupId] = useState(null);
  const [showAddGroup, setShowAddGroup] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const popupRef = useRef(null);

  
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  
  useEffect(() => {
    const savedGroups = localStorage.getItem('groups');
    if (savedGroups) setGroups(JSON.parse(savedGroups));
  }, []);

  
  const handleAddGroup = (newGroupData) => {
    const { name, color } = newGroupData;
    if (name.length < 2 || groups.some(g => g.name.toLowerCase() === name.toLowerCase())) return;
    const newGroup = { id: Date.now(), name, color, createdAt: new Date().toISOString() };
    const updatedGroups = [newGroup, ...groups];
    setGroups(updatedGroups);
    setCurrentGroupId(newGroup.id);
    localStorage.setItem('groups', JSON.stringify(updatedGroups));
    setShowAddGroup(false);
  };

  
  const goBackToSidebar = () => setCurrentGroupId(null);

  

  return (
    
    <div className="home-container">
      
      {(!isMobile || !currentGroupId) && (
        <Sidebar
          groups={groups}
          currentGroupId={currentGroupId}
          setCurrentGroupId={setCurrentGroupId}
          setShowAddGroup={setShowAddGroup}
        />
      )}

      
      {(!isMobile || currentGroupId) && (
        <NotesSection
          currentGroupId={currentGroupId}
          groups={groups}
          goBack={isMobile ? goBackToSidebar : null}
        />
      )}

      
      {isMobile && !currentGroupId && (
        <button
          className="sidebar-header-button"
          onClick={() => setShowAddGroup(true)}
        >
          +
        </button>
      )}

      
      {showAddGroup && <AddGroupPopup onAddGroup={handleAddGroup} ref={popupRef} />}
    </div>
  );
};

export default Home;
