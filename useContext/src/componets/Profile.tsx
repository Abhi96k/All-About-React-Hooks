import DashboardContext from "../Context";
import { useContext, useState } from "react";

export default function Profile() {
  const { user, toggleSubscription, updateName } = useContext(DashboardContext);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(user.name);

  const handleNameUpdate = () => {
    if (newName.trim()) {
      updateName(newName.trim());
      setIsEditing(false);
    }
  };

  return (
    <div className="profile-card">
      <div className="profile-header">
        <div className="avatar">{user.avatar}</div>
        <div className="profile-info">
          <h2>Profile</h2>
          {isEditing ? (
            <div className="name-edit">
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="name-input"
              />
              <button onClick={handleNameUpdate} className="btn btn-primary">
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="btn btn-secondary"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="name-display">
              <p className="name">Name: {user.name}</p>
              <button
                onClick={() => setIsEditing(true)}
                className="btn btn-edit"
              >
                Edit Name
              </button>
            </div>
          )}
          <p className="email">Email: {user.email}</p>
          <div className="subscription-status">
            <p>
              Subscription:
              <span
                className={`status ${
                  user.isSubscribed ? "active" : "inactive"
                }`}
              >
                {user.isSubscribed ? "Active" : "Inactive"}
              </span>
            </p>
            <button
              onClick={toggleSubscription}
              className={`btn ${
                user.isSubscribed ? "btn-danger" : "btn-success"
              }`}
            >
              {user.isSubscribed ? "Cancel Subscription" : "Subscribe"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
