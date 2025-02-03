import { useState } from "react";
import axios from "axios";

function CreateCategory() {
  const [categoryName, setCategoryName] = useState("");
  const [priority, setPriority] = useState(0); // New state for category priority

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://flavorsphere.onrender.com/categories", {
        name: categoryName,
        priority: priority, // Send the priority value to the backend
      });

      if (response.status === 201) {
        alert("Category created successfully!");
        setCategoryName(""); // Clear the input fields after successful submission
        setPriority(0); // Reset priority
      }
    } catch (error) {
      console.error("Error creating category:", error);
      alert("Failed to create category");
    }
  };

  return (
    <div className="create-category-container">
      <div className="create-category-box">
        <h2>Create Category</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Category Name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
          />
          
          {/* New input for category priority */}
          <input
            type="number"
            placeholder="Priority (Optional)"
            value={priority}
            onChange={(e) => setPriority(Number(e.target.value))} // Ensure priority is a number
          />

          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  );
}

export default CreateCategory;
