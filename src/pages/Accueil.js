import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom'

function Accueil() {
  const [forum, setForum] = useState([]);
  let history = useNavigate()
  useEffect(() => {
    axios.get("http://back.r3mob.fr/forum/").then((res) => {
      setForum(res.data);
    });
  }, []);

  return (
    <div>
      {forum.map((value, key) => {
        return (
          <div key={key} className="forum" onClick={() => {history(`/forum/${value.id}`)}}>
            <div className="title"> {value.title} </div>
            <div className="theme"> {value.theme} </div>
            <div className="userId"> {value.userId} </div>
          </div>
        );
      })}
    </div>
  );
}

export default Accueil;
