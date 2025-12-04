import React, { useState, useEffect } from 'react';
import Illustration from '../assets/illustration.png';
import { generateInitials } from '../utils/helpers';

const NotesSection = ({ currentGroupId, groups }) => {
  const [notes, setNotes] = useState([]);
  const [newNoteText, setNewNoteText] = useState('');

  useEffect(() => {
    if (currentGroupId) {
      const savedNotes = localStorage.getItem(`notes_${currentGroupId}`);
      setNotes(savedNotes ? JSON.parse(savedNotes) : []);
    } else {
      setNotes([]);
    }
  }, [currentGroupId]);

  const handleAddNote = () => {
    if (!newNoteText.trim()) return;
    const newNote = {
      id: Date.now(),
      text: newNoteText.trim(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const updatedNotes = [...notes, newNote];
    localStorage.setItem(`notes_${currentGroupId}`, JSON.stringify(updatedNotes));
    setNotes(updatedNotes);
    setNewNoteText('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAddNote();
    }
  };

  const currentGroup = groups.find((g) => g.id === currentGroupId);

  if (!currentGroupId) {
    return (
      <main className="notes-section empty">
      <img 
            src={Illustration} 
            alt="Pocket Notes Illustration" 
           className="illustration" 
          />
        <h2>Pocket Notes</h2>
        <p>Send and receive messages without keeping your phone online.</p>
        <p>Use Pocket Notes on up to 4 linked devices and 1 mobile phone</p>
        <div className="encryption-badge">🔒 end-to-end encrypted</div>
      </main>
    );
  }

  
  return (
    <main className="notes-section">
      <header>
        <div id="back" onClick={()=>{window.location.reload()}} style={{float:"left",color:"white",height:"30px",fontWeight:"400",fontSize:"25px",cursor:"pointer",lineHeight:"14px",padding:"5px",marginRight:"10px"}}>&#8678;</div>
        <div className="group-header">
          <div className="group-avatar" style={{ backgroundColor: currentGroup.color }}>
            {generateInitials(currentGroup.name)}
          </div>
          <h1>{currentGroup.name}</h1>
        </div>
      </header>

      <div className="notes-container">
        {notes.length === 0 ? (
          <div className="empty-notes">No notes yet. Add one below!</div>
        ) : (
          notes.map((note) => (
            <div key={note.id} className="note-item">
              <p>{note.text}</p>
              <div className="note-meta">
                <span>
                  {' '}
                  {new Date(note.createdAt).toLocaleString('en-GB', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                  })}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="input-container">
        <textarea
          value={newNoteText}
          onChange={(e) => setNewNoteText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter your note here..."
          rows="3"
        />
        <button
          className={newNoteText.trim() ? 'send-button active' : 'send-button'}
          onClick={handleAddNote}
          disabled={!newNoteText.trim()}
        >
          ➤
        </button>
      </div>
    </main>
  );
};

export default NotesSection;
