# FlavorSphere

FlavorSphere is a full-stack web application designed to help users explore, create, and review recipes. Users can browse a collection of recipes, add new ones, submit reviews, and categorize recipes for better organization.

## 🚀 Live Demo
- **Frontend:** [Vercel Deployment Link](https://flavor-sphere-d0zyyfmvr-nympha-pambas-projects.vercel.app)
- **Backend:** [Render Deployment Link](https://dashboard.render.com/web/srv-cug1me2n91rc73clo0k0/deploys/dep-cug4il5svqrc7385u7h0)

## 🛠 Tech Stack
### **Frontend:**
- React (Vite)
- React Router DOM v6
- Formik for form handling
- Fetch API for backend communication
- Deployed with Vercel

### **Backend:**
- Flask (Python)
- SQLAlchemy for database management
- Flask-Migrate with Alembic for migrations
- Flask-CORS for cross-origin support
- Deployed with Render
- `pipenv` for dependency management

## 📂 Project Structure

### **Frontend (`flavorsphere_frontend/`):**
```
frontend/
│
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── RecipeCard.jsx    # Card component for displaying recipes
│   │   ├── RecipeForm.jsx    # Form component for creating/editing recipes
│   │   ├── Header.jsx        # Navigation header
│   ├── pages/                # Pages for routing
│   │   ├── CreateCategory.jsx # Create a new category
│   │   ├── CreateRecipe.jsx  # Create a new recipe
│   │   ├── EditCategory.jsx  # Edit an existing category
│   │   ├── EditRecipe.jsx    # Edit a recipe
│   │   ├── Home.jsx          # Landing page
│   │   ├── RecipeDetailsPage.jsx # View recipe details and reviews
│   │   ├── RecipeList.jsx    # View list of recipes
│   ├── App.jsx               # Main app component with routing
│   ├── index.jsx             # Entry point
│   ├── api/                  # API helper functions
│   │   ├── index.js          # API entry point
│   │   ├── recipes.js        # API functions for recipes
│   ├── styles/               # Global styles
│       └── main.css
└── package.json 
```

### **Backend (`backend/`):**
```
backend/
├── .venv                    # Virtual environment
├── app/                     # Application folder
│   ├── routes.py            # Flask routes
│   ├── models.py            # SQLAlchemy models
│   └── __init__.py          # Package initializer
│
├── manage.py                # Flask application entry point
│
├── .env                     # Environment variables
├── .gitignore               # Git ignore file
├── migrations/              # Alembic migrations
│
├── Pipfile                  # Dependency management with pipenv
├── Pipfile.lock             # Locked dependencies
```

## 🔥 Features
- **View Recipes**: Browse a list of all available recipes.
- **View Recipe Details**: See detailed information about a recipe.
- **Create Recipes**: Submit new recipes with title, description, and category.
- **Edit Recipes**: Modify existing recipes.
- **Delete Recipes**: Remove unwanted recipes.
- **Submit Reviews**: Add reviews to a recipe.
- **Edit/Delete Reviews**: Update or remove existing reviews.
- **Categorization**: Assign categories to recipes.
- **Update Category Priority**: Adjust category priority for better organization.

## 🖥️ Setup and Installation
### **Backend**
1. Clone the repository:
   ```sh
   git clone <repo-url>
   cd backend
   ```
2. Install dependencies:
   ```sh
   pipenv install
   ```
3. Activate virtual environment:
   ```sh
   pipenv shell
   ```
4. Run database migrations:
   ```sh
   flask db upgrade
   ```
5. Start the Flask server:
   ```sh
   flask run
   ```

### **Frontend**
1. Navigate to the frontend folder:
   ```sh
   cd flavorsphere_frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```

## 🌍 API Endpoints
### **Recipes**
- `GET /recipes` - Retrieve all recipes.
- `POST /recipes` - Create a new recipe.
- `GET /recipes/:id` - Retrieve a single recipe.
- `PUT /recipes/:id` - Update a recipe.
- `DELETE /recipes/:id` - Delete a recipe.

### **Reviews**
- `POST /reviews` - Submit a review.
- `PUT /reviews/:id` - Edit a review.
- `DELETE /reviews/:id` - Remove a review.

### **Categories**
- `GET /categories` - Get all categories.
- `POST /categories` - Create a new category.
- `PATCH /categories/:id` - Update category priority.

## ✨ Deployment
- **Backend** deployed on **Render**.
- **Frontend** deployed on **Vercel**.

## 🤝 Contributing
Contributions are welcome! Feel free to submit a pull request or report issues.

## 📜 License
This project is licensed under the MIT License.

---

Enjoy FlavorSphere! 🍽️🎉

