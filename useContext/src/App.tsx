import { useState } from "react";
import "./App.css";
import DashBoard from "./componets/Dashboard";
export interface User {
  isSubscribed: boolean;
  name: string;
}

function App() {
  const [user] = useState<User>({
    isSubscribed: false,
    name: "Abhishek",
  });

  return (
    <div>
      <DashBoard user={user} />
    </div>
  );
}

export default App;
