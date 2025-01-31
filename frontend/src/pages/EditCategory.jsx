import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function EditCategory() {
  const { id } = useParams(); // Get category ID from URL
  const [categoryName, setCategoryName] = useState("");

  // Fetch category details
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:5000`)
      .then((response) => setCategoryName(response.data.name))
      .catch((error) => console.error("Error fetching category:", error));
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://127.0.0.1:5000`, {
        name: categoryName,
      });

      if (response.status === 200) {
        alert("Category updated successfully!");
      }
    } catch (error) {
      console.error("Error updating category:", error);
      alert("Failed to update category");
    }
  };

  return (
    <div className="form-container">
      <div className="form-box">
        <h2>Edit Category</h2>
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
          />
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
}

export default EditCategory;
