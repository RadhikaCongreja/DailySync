import React, { useState, useEffect } from "react";

const TodoModal = ({ show, onClose, onSave, initialData }) => {
  const [title, setTitle] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setIsCompleted(initialData.is_completed || false);
    } else {
      setTitle("");
      setIsCompleted(false);
    }
  }, [initialData, show]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSave(title.trim(), isCompleted);
  };

  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>{initialData?.id ? "Update Todo" : "Add Todo"}</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Todo title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <label style={{ display: "block", margin: "1rem 0" }}>
            <input
              type="checkbox"
              checked={isCompleted}
              onChange={() => setIsCompleted(!isCompleted)}
            />
            Completed
          </label>

          <div className="modal-actions">
            <button type="submit" className="yes-btn">
              Save
            </button>
            <button type="button" onClick={onClose} className="no-btn">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TodoModal;
