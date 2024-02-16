import React, { useState, useEffect } from "react";
import axios from "axios";

const RobotData = () => {
  const [robotData, setRobotData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://cloud.uipath.com/bharath_alluri/DefaultTenant/orchestrator_/robots/configured?tid=1461413&fid=4547626&index=0&size=10&state=M4ewTgLgPgZglgUwDYBMoFdgLAOhupJAOQEMBbBKFOMBAYwjhADsoTg6A9bgEgAYoPAIxQATFADMUACwBdWUA%3D%3D%3D"
        );
        setRobotData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h2>Robot Data</h2>
      <ul>
        {robotData.map((robot) => (
          <li key={robot.id}>
            <strong>Name:</strong> {robot.name}, <strong>Type:</strong>{" "}
            {robot.type}, <strong>Status:</strong> {robot.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RobotData;
