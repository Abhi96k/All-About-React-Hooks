import type { User } from "../App";

interface SideBarProp {
  user: User;
}

export default function SideBar({ user }: SideBarProp) {
  return (
    <div>
      <h2>Sidebar</h2>
      <p>Name: {user.name}</p>
      <p>Subscription Status: {user.isSubscribed ? "Active" : "Inactive"}</p>
    </div>
  );
}
