// GuideSelectionModal.js
import React from 'react';

const GuideSelectionModal = ({ guides, onSelect, onClose }) => {
  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h3>Select a Guide</h3>
        <button onClick={onClose} style={{ float: 'right' }}>Close</button>
        {guides.length === 0 ? (
          <p>No guides available for this location.</p>
        ) : (
          <ul>
            {guides.map(guide => (
              <li key={guide.id} style={{ margin: '10px 0' }}>
                <strong>{guide.name}</strong> - {guide.experience} experience
                <br />
                Languages: {guide.languages.join(', ')}<br />
                <button onClick={() => onSelect(guide)}>Select</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default GuideSelectionModal;
