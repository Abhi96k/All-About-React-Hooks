import { useState } from "react";
import "./App.css";
import DashBoard from "./componets/DashBoard";
import DashboardContext from "./Context";

export interface User {
  isSubscribed: boolean;
  name: string;
  email: string;
  avatar: string;
}

function App() {
  const [user, setUser] = useState<User>({
    isSubscribed: false,
    name: "Abhishek",
    email: "abhishek@example.com",
    avatar: "👨‍💻",
  });

  const toggleSubscription = () => {
    setUser((prev) => ({
      ...prev,
      isSubscribed: !prev.isSubscribed,
    }));
  };

  const updateName = (newName: string) => {
    setUser((prev) => ({
      ...prev,
      name: newName,
    }));
  };

  return (
    <DashboardContext.Provider value={{ user, toggleSubscription, updateName }}>
      <div className="app">
        <header className="app-header">
          <h1>useContext Learning Example</h1>
          <p>React Context API with TypeScript</p>
        </header>
        <DashBoard />
      </div>
    </DashboardContext.Provider>
  );
}

export default App;
