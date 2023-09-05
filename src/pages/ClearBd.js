import React, { useEffect } from "react";
import axios from "axios";

function ClearBd() {
  useEffect(() => {
    axios.post(`http://localhost:3001/brain/clear`).then((res) => {
      console.log("BD cleared!!!!");
    });
  }, []);
  return <div>ClearBd</div>;
}

export default ClearBd;
