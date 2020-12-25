import "./App.css";
import { AuthGate } from "./components/AuthGate";
import CreateUser from "./components/CreateUser";
import React from 'react';

function App(): JSX.Element {
  return (
      <>
        <AuthGate />
        <CreateUser />
      </>
  )

}

export default App;
