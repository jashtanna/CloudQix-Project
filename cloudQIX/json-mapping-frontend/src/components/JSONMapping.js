import React, { useState } from 'react';
import { mapJSONData } from './api';
import MappedOutput from './MappedOutput';
import JSONEditor from './JSONEditor';
import '../assets/styles.css';

// Main component for mapping json using mapping rules
function JSONMapping() {
  const [requestJSON, setRequestJSON] = useState('');
  const [requestMapping, setRequestMapping] = useState('');
  const [mappedOutput, setMappedOutput] = useState(null);
  const [error, setError] = useState('');

  // checks if user input is valid json or not
  const validateJSON = (jsonString) => {
    try {
      JSON.parse(jsonString.trim());
      return true;
    } catch {
      return false;
    }
  };

  // this runs when user clicks "Map JSON" button
  const handleSubmit = async () => {
    setError('');
    if (!requestJSON || !requestMapping) {
      setError('Both fields must be filled.'); // user missed some input
      return;
    }

    const isRequestJSONValid = validateJSON(requestJSON);
    const isRequestMappingValid = validateJSON(requestMapping);

    if (!isRequestJSONValid || !isRequestMappingValid) {
      setError('Invalid JSON input. Please check both fields.');
      return;
    }

    try {
      const parsedRequestJSON = JSON.parse(requestJSON.trim());
      const parsedRequestMapping = JSON.parse(requestMapping.trim());

      // calling api to map json
      const output = await mapJSONData(parsedRequestJSON, parsedRequestMapping);
      setMappedOutput(output);
    } catch (err) {
      console.error('Error:', err);
      setMappedOutput(null);
      setError(err.message || 'There was an error while mapping the JSON.'); 
    }
  };

  return (
    <div className="json-mapping-container">
      <h2 className="json-mapping-title">CloudQix JSON Mapping Tool</h2>
      <JSONEditor label="Request JSON" value={requestJSON} onChange={setRequestJSON} />
      <JSONEditor label="Request Mapping" value={requestMapping} onChange={setRequestMapping} />
      <button onClick={handleSubmit} className="json-mapping-button">
        Map JSON
      </button>
      {error && <div className="json-mapping-error">{error}</div>}
      {mappedOutput && <MappedOutput data={mappedOutput} />}
    </div>
  );
}

export default JSONMapping;
