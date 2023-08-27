import React from 'react'
import '../styles/Carte.css'
import ScrollButton from '../components/ScrollButton'
import "../styles/common/layout.css"
import Footer from '../components/Footer'

function Carte() {
  return (
<div className="body">
      <header>header</header>
      <div className="main">
        <aside className="left">left</aside>

        <main>
        <div id="iframe-container">
  <iframe src="https://app.thebrain.com/embed/aa31c573-c768-4113-8013-aaad37b45d5c"></iframe>
</div>
          
        </main>
        <aside className="right">
          <ScrollButton />
        </aside>
      </div>
      <footer><Footer/></footer>
    </div>


  )
}

export default Carte