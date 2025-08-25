import { useCallback, useState } from "react";
import "./App.css";
import { user as allUsers } from "./user.constant";
import Search from "./Search";
import { shuffle } from "./utils";

function App() {
  const [users, setUsers] = useState(allUsers);

  const handleSearch = useCallback((text: string) => {
    console.log(users[0]);

    const filteredUsers = allUsers.filter((user) => user.includes(text));
    setUsers(filteredUsers);
  }, []);

  return (
    <div className="tutorial">
      <div className="align-center mb-2 flex">
        <button onClick={() => setUsers(shuffle(allUsers))}>Shuffle</button>

        <Search onChange={handleSearch} />
      </div>
      <ul>
        {users.map((user) => (
          <li key={user}>{user}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;

//without useCallback  problem:-
// every time the parent component re-renders, the handleSearch function is recreated.
// this causes the Search component to re-render as well, even if its props haven't changed.(memo is used to optimize functional components by preventing unnecessary re-renders.)

// To fix this, we can use the useCallback hook to memoize the handleSearch function.
// useCallback:-
// The useCallback hook returns a memoized version of the callback that only changes if one of the dependencies has changed.
