import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Accueil from "./pages/Accueil";
import CreateForum from "./pages/CreateForum";
import Forum from "./pages/Forum";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Carte from "./pages/Carte";
import Register from "./pages/Register";
import Agenda from "./pages/Agenda";
import Page404 from "./pages/Page404";
import Projet from "./pages/Projet"
import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";
import UpdateBd from "./pages/UpdateBd";
import ClearBd from "./pages/ClearBd";
import UpdateEvent from "./pages/UpdateEvent";
import Chercheur from "./pages/Chercheur";
import EventDetails from "./pages/EventDetails"; 
import Footer from "./components/Footer";
import Acteurs from "./pages/Acteurs";
import VerifyUrl from "./pages/VerfiyUrl";
function App() {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });
  const [openLinks, setOpenLinks] = useState(false);
  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/verify", {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((res) => {
        if (res.data.error) {
          setAuthState({
            username: "",
            id: 0,
            status: false,
          });
        } else
          setAuthState({
            username: res.data.username,
            id: res.data.id,
            status: true,
          });
      });
  }, []);
  return (
    <div className="App">

      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          {/* <div className="navbar">
            <Link to="/createForum">Create Forum</Link>
            <Link to="/">Home Page</Link>
            {!authState && (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </>
            )}
            {authState && <Link to="/logout">Logout</Link>}
          </div> */}
          <Navbar authState={authState} />
          <Routes>
            <Route path="/" exact Component={Home} />
            <Route path="/accueil" exact Component={Accueil} />
            <Route path="/createForum" exact Component={CreateForum} />
            <Route path="/forum/:id" exact Component={Forum} />
            <Route path="/login" exact Component={Login} />
            <Route path="/register" exact Component={Register} />
            <Route path="/carte" exact Component={Carte} />
            <Route path="/agenda" exact Component={Agenda} />
            <Route path="/projet" exact Component={Projet} />
            <Route path="/updateBd" exact Component={UpdateBd}/>
            <Route path="/clearBd" exact Component={ClearBd}/>
            <Route path="/updateEvent" exact Component={UpdateEvent}/>
            <Route path="/chercheur" exact Component={Chercheur}/>
            <Route path="/event/:eventId" element={<EventDetails />} />  
            <Route path="/acteurs" exact Component={Acteurs}/>
            <Route path="/verifyUrl" exact Component={VerifyUrl}/>
            <Route path="*" exact Component={Page404} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
