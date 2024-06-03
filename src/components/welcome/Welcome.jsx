import React from "react";
import { Link, useParams } from "react-router-dom";

const Welcome = () => {
  const { username } = useParams();
  return (
    <div>
      <h1>Welcome {username} to Todo management system</h1>
      <div>
        Manage your todos - <Link to="/todos">Go here</Link>
      </div>
    </div>
  );
};

export default Welcome;
