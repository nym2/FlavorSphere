// src/pages/EditCategory.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const EditCategory = () => {
  const { id } = useParams(); // Get category ID from the URL
  const [name, setName] = useState('');
  const [priority, setPriority] = useState(0);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Initially loading to fetch data

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetch(`/categories/${id}`);
        if (!response.ok) {
          throw new Error('Category not found');
        }

        const category = await response.json();
        setName(category.name);
        setPriority(category.priority);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchCategory();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`/categories/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, priority }), // Send updated category data
      });

      if (!response.ok) {
        throw new Error('Failed to update category');
      }

      alert('Category updated successfully');
    } catch (err) {
      setError(err.message); // Display error message if update fails
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <div>
      <h2>Edit Category</h2>

      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

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

        <button type="submit" disabled={isLoading}>Update Category</button>
      </form>
    </div>
  );
};

export default EditCategory;
