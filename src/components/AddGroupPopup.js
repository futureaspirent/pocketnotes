
import React, { useState, forwardRef } from 'react';

const COLORS = ['#B38BFA', '#FF79F2', '#43E6FC', '#F19576', '#0047FF', '#6691FF'];

const AddGroupPopup = forwardRef(({ onAddGroup }, ref) => {
  const [groupName, setGroupName] = useState('');
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);

function removeBorder(){
  let colors=document.getElementsByClassName("color-option")
  for(let c of colors){
    c.style.border="0px solid white";
  }
}

  const handleCreate = () => {
    if (groupName.length < 2) return;
    if (groupName.length > 20) return; 
    onAddGroup({ name: groupName, color: selectedColor });
    setGroupName('');
  };

  return (
    <div className="popup-overlay" onClick={(e) => e.target === e.currentTarget && setGroupName('')}>
      <div className="popup" ref={ref}>
        <h3>Create New Group</h3>
       <div style={{ display: "flex", alignItems: "center", gap: "30px" }}>
  <label>Group Name</label>
  <input
    type="text"
    value={groupName}
    onChange={(e) => setGroupName(e.target.value)}
    placeholder="Enter group name"
    maxLength="20"
  />
</div>
<div style={{ display: "flex", alignItems: "center", gap: "30px"} }>
        <label>Choose Colour</label>
        <div className="color-options">
          {COLORS.map((color) => (
            <div
              key={color}
              className="color-option"
              style={{ backgroundColor: color }}
              onClick={(e) => {removeBorder();setSelectedColor(color);e.target.style.border="2px solid black"} }
            />
          ))}
        </div>
        </div>
        <button onClick={handleCreate} disabled={groupName.length < 2}>
          Create
        </button>
      </div>
    </div>
  );
});

export default AddGroupPopup;