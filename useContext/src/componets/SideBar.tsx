import { useDashboardContext } from "../Context";

export default function SideBar() {
  const { user } = useDashboardContext();

  return (
    <div className="sidebar">
      <h2>Sidebar</h2>
      <div className="sidebar-content">
        <div className="user-summary">
          <div className="user-avatar">{user.avatar}</div>
          <div className="user-details">
            <h3>{user.name}</h3>
            <p className="user-email">{user.email}</p>
            <div className="subscription-badge">
              <span
                className={`badge ${
                  user.isSubscribed ? "badge-success" : "badge-warning"
                }`}
              >
                {user.isSubscribed ? "Premium" : "Free"}
              </span>
            </div>
          </div>
        </div>

        <div className="sidebar-menu">
          <h4>Quick Actions</h4>
          <ul>
            <li>📊 Dashboard</li>
            <li>⚙️ Settings</li>
            <li>📧 Messages</li>
            <li>📈 Analytics</li>
          </ul>
        </div>

        <div className="subscription-info">
          <h4>Subscription Details</h4>
          <p>
            Status:{" "}
            <span
              className={`status ${user.isSubscribed ? "active" : "inactive"}`}
            >
              {user.isSubscribed ? "Active" : "Inactive"}
            </span>
          </p>
          {user.isSubscribed && (
            <p className="premium-features">✨ Premium features enabled</p>
          )}
        </div>
      </div>
    </div>
  );
}
