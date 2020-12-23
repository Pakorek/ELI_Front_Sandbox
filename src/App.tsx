import "./App.css";
// import AppContext from "./context/AppContext";
// import { Success } from "./styles/form-elements";
// import {
//     CardRow,
//     Container,
//     Footer,
//     Header,
// } from "./styles/elements";
// import { ReactComponent as PlusCircle } from "./icons/add-circle.svg";
// import { ReactComponent as MinusCircle } from "./icons/minus-circle.svg";
// import { useQuery, gql } from '@apollo/client';
import React from "react";
import { AuthGate } from "./components/AuthGate";

function App(): JSX.Element {
  return <AuthGate />;
}

export default App;
