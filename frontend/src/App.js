import React, { useEffect, useState } from 'react';
import { getServiceRequests, createServiceRequest, updateServiceRequest, deleteServiceRequest } from './ApiService';

function App() {
  const [serviceRequests, setServiceRequests] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  // Fetch all service requests on mount
  useEffect(() => {
    getServiceRequests()
      .then((response) => setServiceRequests(response.data))
      .catch((error) => console.error(error));
  }, []);

  // Handle adding a new service request
  const handleAddRequest = (e) => {
    e.preventDefault();
    const newRequest = { name, description };
    createServiceRequest(newRequest)
      .then(() => {
        setName('');
        setDescription('');
        return getServiceRequests();
      })
      .then((response) => setServiceRequests(response.data))
      .catch((error) => console.error(error));
  };

  // Handle updating an existing service request
  const handleUpdateRequest = (id) => {
    const updatedRequest = { name, description };
    updateServiceRequest(id, updatedRequest)
      .then(() => getServiceRequests())
      .then((response) => setServiceRequests(response.data))
      .catch((error) => console.error(error));
  };

  // Handle deleting a service request
  const handleDeleteRequest = (id) => {
    deleteServiceRequest(id)
      .then(() => getServiceRequests())
      .then((response) => setServiceRequests(response.data))
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <h1>Service Requests</h1>
      <form onSubmit={handleAddRequest}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Add Request</button>
      </form>

      <ul>
        {serviceRequests.map((request) => (
          <li key={request._id}>
            {request.name} - {request.description}
            <button onClick={() => handleUpdateRequest(request._id)}>Edit</button>
            <button onClick={() => handleDeleteRequest(request._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
