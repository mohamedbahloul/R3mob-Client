import React from "react";
import "../styles/common/layout.css";
import ScrollButton from "../components/ScrollButton";
import CarteButton from "../components/CarteButton";

function Home() {
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
      <footer>footer</footer>
    </div>
  );
}

export default Home;
