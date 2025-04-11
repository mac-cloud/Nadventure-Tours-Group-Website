// MapViewModal.js
import React from 'react';

const MapViewModal = ({ locationName, onClose }) => {
  const encodedLocation = encodeURIComponent(locationName);

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <button onClick={onClose} style={{ float: 'right', width: '90px' }}>Close</button>
        <iframe
          title="Google Map"
          width="100%"
          height="450"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          src={`https://www.google.com/maps?q=${encodedLocation}&output=embed`}
        ></iframe>
      </div>
    </div>
  );
};

export default MapViewModal;
