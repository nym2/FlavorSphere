import { useState } from "react";
import axios from "axios";

function CreateCategory() {
  const [categoryName, setCategoryName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/categories", {
        name: categoryName,
      });

      if (response.status === 201) {
        alert("Category created successfully!");
        setCategoryName(""); // Clear input field after submission
      }
    } catch (error) {
      console.error("Error creating category:", error);
      alert("Failed to create category");
    }
  };

  return (
    <div className="form-container">
      <div className="form-box">
        <h2>Create Category</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Category Name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
          />
          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  );
}

export default CreateCategory;
