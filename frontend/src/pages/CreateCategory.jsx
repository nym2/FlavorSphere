// src/pages/CreateCategory.js
import React, { useState } from 'react';

const CreateCategory = () => {
  const [name, setName] = useState(''); // Category name state
  const [priority, setPriority] = useState(0); // Category priority state
  const [error, setError] = useState(null); // Error message state
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Show loading spinner

    try {
      const response = await fetch('/categories', { // Make sure to use the correct endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, priority }), // Sending name and priority
      });

      if (!response.ok) {
        throw new Error('Failed to create category');
      }

      alert('Category created successfully');
      setName(''); // Reset form fields
      setPriority(0);
    } catch (err) {
      setError(err.message); // Display error message if any
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <div>
      <h2>Create New Category</h2>

      {isLoading && <p>Loading...</p>} {/* Show loading message */}
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Show error message */}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Category Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="priority">Priority</label>
          <input
            type="number"
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            min="0"
            required
          />
        </div>

        <button type="submit" disabled={isLoading}>Create Category</button>
      </form>
    </div>
  );
};

export default CreateCategory;
