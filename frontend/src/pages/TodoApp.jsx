import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import TodoModal from "./TodoModal";

const TodoApp = () => {
  const { token, logout } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);

  //  Initialize activeFilter from URL params or default to "All"
  const [activeFilter, setActiveFilter] = useState(
    searchParams.get("filter") || "All"
  );

  const [showModal, setShowModal] = useState(false);
  const [editTodo, setEditTodo] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) fetchTodos();
  }, [token]);

  // Apply filter whenever todos or activeFilter changes
  useEffect(() => {
    applyFilter();
  }, [todos, activeFilter]);

  useEffect(() => {
    const params = new URLSearchParams();

    // Only add filter to URL if it's not the default "All"
    if (activeFilter !== "All") {
      params.set("filter", activeFilter);
    }

    setSearchParams(params);
    console.log(`URL updated with filter: ${activeFilter}`);
  }, [activeFilter, setSearchParams]);

  const fetchTodos = async () => {
    try {
      const response = await axios.get("http://localhost:8001/todos", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTodos(response.data);
      console.log("Default list (all todos) ", response.data);
    } catch (error) {
      console.error("Error loading todos:", error);
      alert("Failed to load todos");
    }
  };

  // Apply filter whenever todos or activeFilter changes
  const applyFilter = () => {
    let filtered = [];

    switch (activeFilter) {
      case "All":
        filtered = todos;
        break;
      case "Completed":
        filtered = todos.filter((todo) => todo.is_completed === true);
        break;
      case "Incomplete":
        filtered = todos.filter((todo) => todo.is_completed === false);
        break;
      default:
        filtered = todos;
    }

    setFilteredTodos(filtered);
    console.log(`Filtered list (${activeFilter}) - Task #16:`, filtered);
  };

  // Handle filter changes and URL updates
  const handleFilterChange = (filter) => {
    console.log(` Filter changed from "${activeFilter}" to "${filter}"`);
    setActiveFilter(filter);
    // URL will be updated automatically by useEffect above
  };

  // Handle add button click
  const handleAddClick = () => {
    setEditTodo(null);
    setShowModal(true);
  };

  // Handle edit button click
  const handleEditClick = (todo) => {
    setEditTodo(todo);
    setShowModal(true);
  };

  // Handle save (create/update) with API integration
  const handleSave = async (title, isCompleted) => {
    setLoading(true);
    const headers = { Authorization: `Bearer ${token}` };

    try {
      if (editTodo && editTodo.id) {
        // Update existing todo - PATCH API call
        console.log("Updating todo...", {
          id: editTodo.id,
          title,
          is_completed: isCompleted,
        });

        const response = await axios.patch(
          `http://localhost:8001/todos/${editTodo.id}`,
          { title, is_completed: isCompleted },
          { headers }
        );

        console.log("API Response - ", response.data);

        // Verify the response data
        if (response.data.is_completed !== isCompleted) {
          console.error(
            "MISMATCH: Sent is_completed:",
            isCompleted,
            "Received:",
            response.data.is_completed
          );
        }

        const updatedTodos = todos.map((t) =>
          t.id === response.data.id ? response.data : t
        );
        setTodos(updatedTodos);
        console.log("Todo updated successfully ", response.data);
      } else {
        // Create new todo - POST API call
        console.log("Creating new todo... ", {
          title,
          is_completed: isCompleted,
        });

        const response = await axios.post(
          "http://localhost:8001/todos",
          { title, is_completed: isCompleted },
          { headers }
        );

        setTodos([...todos, response.data]);
        console.log("Todo created successfully. ", response.data);
      }

      setShowModal(false);
      setEditTodo(null);
    } catch (error) {
      console.error("API call failed. ", error);
      alert(editTodo ? "Failed to update todo" : "Failed to create todo");
    } finally {
      setLoading(false);
    }
  };

  // Handle modal close
  const handleCloseModal = () => {
    setShowModal(false);
    setEditTodo(null);
  };

  return (
    <div className="todo-container">
      <header className="todo-header">
        <h1>Todos List</h1>
        <div className="header-actions">
          {/* Show current filter status and refresh button for testing */}
          <div className="filter-status">
            {/* <small>
              Current Filter: <strong>{activeFilter}</strong>
              {searchParams.get("filter") && (
                <span> (from URL: ?filter={searchParams.get("filter")})</span>
              )}
            </small> */}
            <button
              onClick={() => window.location.reload()}
              className="refresh-btn"
              title="Refresh page to test filter persistence"
            >
              🔄 Refresh
            </button>
          </div>
          <br />
          <button onClick={logout} className="logout-btn">
            Logout
          </button>
        </div>
      </header>

      {/* Filter Navigation with URL persistence */}
      <div className="filter-nav">
        <button
          className={`filter-btn ${activeFilter === "All" ? "active" : ""}`}
          onClick={() => handleFilterChange("All")}
        >
          All
        </button>
        <button
          className={`filter-btn ${
            activeFilter === "Completed" ? "active" : ""
          }`}
          onClick={() => handleFilterChange("Completed")}
        >
          Completed
        </button>
        <button
          className={`filter-btn ${
            activeFilter === "Incomplete" ? "active" : ""
          }`}
          onClick={() => handleFilterChange("Incomplete")}
        >
          Incomplete
        </button>
      </div>

      {/* Add Todo Button */}
      <button onClick={handleAddClick} className="add-btn">
        + Add Todo
      </button>

      <main>
        {/* Display filtered todos */}
        {filteredTodos.map((todo) => (
          <div key={todo.id} className="todo-item">
            <span className={todo.is_completed ? "completed-todo" : ""}>
              {todo.title}
            </span>
            <div className="todo-actions">
              {/* Checkbox to edit completion status */}
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={todo.is_completed}
                  onChange={() => handleEditClick(todo)}
                />
                <span className="checkbox-text">Completed</span>
              </label>
              {/* Edit button */}
              <button
                onClick={() => handleEditClick(todo)}
                className="edit-btn"
              >
                Edit ✏️
              </button>
            </div>
          </div>
        ))}

        {/* Empty state for filtered todos */}
        {filteredTodos.length === 0 && (
          <div className="no-todos">
            {activeFilter === "All"
              ? "No todos yet. Add your first todo!"
              : `No ${activeFilter.toLowerCase()} todos found.`}
          </div>
        )}
      </main>

      {/* Todo Modal */}
      <TodoModal
        show={showModal}
        onClose={handleCloseModal}
        onSave={handleSave}
        initialData={editTodo}
      />

      {/* Loading indicator */}
      {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner">Saving...</div>
        </div>
      )}
    </div>
  );
};

export default TodoApp;
