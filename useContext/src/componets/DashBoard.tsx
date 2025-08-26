import SideBar from "./SideBar";
import Profile from "./Profile";

export default function Dashboard() {
  return (
    <div className="dashboard">
      <div className="dashboard-container">
        <div className="main-content">
          <Profile />
        </div>
        <div className="sidebar-container">
          <SideBar />
        </div>
      </div>
    </div>
  );
}
