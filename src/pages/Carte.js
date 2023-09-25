import React,{useEffect,useState} from "react";
import "../styles/Carte.css";
import ScrollButton from "../components/ScrollButton";
import "../styles/common/layout.css";
import Footer from "../components/Footer";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";
import { useContext } from "react";

function Carte() {
  const [linkCartographie, setLinkCartographie] = useState({});
  const [access, setAccess] = useState(false);
  const { authState } = useContext(AuthContext);
  // useEffect(() => {
  //   if (!authState.status) {
  //     window.location.href = "/login";
  //   }else{
  //     setAccess(true);
  //   }
  // }, []);
  
  useEffect(() => {
    axios.get("http://localhost:3001/infos/cartographie").then((response) => {
      setLinkCartographie(response.data);
    });
  }, []);
  return (
    // access &&
    <div className="body">
      <header>header</header>
      <div className="main">
        <aside className="left">left</aside>

        <main>
          <div id="iframe-container">
            <iframe src={linkCartographie}
            // https://app.thebrain.com/embed/9001bde1-5fbb-4be7-b6c8-10140b31e7b7
            ></iframe>
          </div>
        </main>
        <aside className="right">
          <ScrollButton />
        </aside>
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default Carte;
