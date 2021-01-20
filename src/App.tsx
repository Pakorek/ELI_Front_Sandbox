import "./App.css";
import { AuthGate } from "./components/AuthGate";
import CreateUser from "./components/CreateUser";
import TeacherGenerator from "./components/Faker";
import CreateCourse from './components/CreateCourse';
import React from 'react';

function App(): JSX.Element {
  return (
      <>
        <AuthGate />
        <CreateUser />
        <TeacherGenerator />
      </>
  )

}

export default App;
