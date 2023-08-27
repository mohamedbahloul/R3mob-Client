import React, { useEffect } from "react";
import axios from "axios";

function UpdateBd() {
  useEffect(() => {
      axios.post(`http://localhost:3001/brain`).then((res) => {
        console.log("BD Updated!!!!");
      });
  }, []);
  return <div>UpdateBd</div>;
}

export default UpdateBd;
