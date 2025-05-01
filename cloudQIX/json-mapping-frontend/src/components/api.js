import axios from 'axios'; 

// sends json + mapping to backend
export const mapJSONData = async (requestJSON, requestMapping) => {
  try {
    const response = await axios.post('http://localhost:8080/api/v1/map-json', {
      request_json: requestJSON,
      request_mapping: requestMapping,
    });
    return response.data; // get back mapped data
  } catch (error) {
    console.error('API error:', error); 
    throw new Error('Failed to map JSON data. Try again lator.');
  }
};
