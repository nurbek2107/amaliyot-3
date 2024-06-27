import React from "react";
import "./App.css";
import { useSelector } from "react-redux";

function App() {
  const { user, isAuthReady } = useSelector((state) => state.user);
  const { todos } = useSelector((state) => state.todo); // `todo` olarak düzeltilmiş

  return (
    <>
      <h1>Redux Example</h1>
      {isAuthReady ? (
        <div>
          <h2>Welcome, {user ? user.name : "Guest"}</h2>
          <ul>
            {todos.map((todo, index) => (
              <li key={index}>{todo}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default App;
