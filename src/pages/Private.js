import React from "react";
import { useLogout } from "../config/auth";

const Private = ({ user }) => {
  const logout = useLogout();

  return (
    <div style={{ margin: "auto", padding: "100px" }}>
      <h4>Congratulations, you are authentified !</h4>
      <pre style={{ backgroundColor: "#eee" }}>
        {user.user}
        <br />
        {user.authToken}
      </pre>
      <div>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
};

export default Private;
