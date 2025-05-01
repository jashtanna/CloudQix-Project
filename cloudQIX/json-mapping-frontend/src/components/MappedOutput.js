import React from 'react';
import '../assets/styles.css';

// shows the final mapped json result
function MappedOutput({ data }) {
  return (
    <div className="mapped-output-container">
      <h3 className="mapped-output-title">Mapped Output</h3>
      <pre className="mapped-output-json">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}

export default MappedOutput;
