import React,{useEffect} from "react";
import "../styles/common/layout.css";
import ScrollButton from "../components/ScrollButton";
import CarteButton from "../components/CarteButton";
import Footer from "../components/Footer";



function Home() {
  useEffect(() => {
    console.log("useEffect triggered"); // Ajouter ce log pour suivre le déclenchement de l'effet
  }
  , []);
  return (
    <div className="body">
      <header>header</header>
      <div className="main">
        <aside className="left">left</aside>
        <main>
        <p>{Array.from({ length: 10000 }, () => "aa").join("")}</p>
        </main>
        <aside className="right">
          <ScrollButton />
          <CarteButton />
        </aside>
      </div>
      <footer><Footer></Footer></footer>
    </div>
  );
}

export default Home;
