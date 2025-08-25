import type { User } from "../App";

interface ProfileProp {
  user: User;
}

export default function Profile({ user }: ProfileProp) {
  return (
    <div>
      <h2>Profile</h2>
      <p>Name: {user.name}</p>
      <p>Subscription Status: {user.isSubscribed ? "Active" : "Inactive"}</p>
    </div>
  );
}
