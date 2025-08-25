import type { User } from "../App";
import SideBar from "./SideBar";
import Profile from "./Profile";

interface DashboardProp {
  user: User;
}

export default function Dashboard({ user }: DashboardProp) {
  return (
    <div>
      <h1>Dashboard</h1>
      <Profile user={user} />
      <SideBar user={user} />
    </div>
  );
}
