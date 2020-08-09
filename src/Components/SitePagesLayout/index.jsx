import React from "react"
import Header from "../HomePageLayout/Sections/Header"
import Banner from "./Sections/Banner"
import Projects from './Sections/Projects'
import Footer from "../HomePageLayout/Sections/Footer"

const SitePagesLayout = ({ location }) => (
  <React.Fragment>
    <header>
      <Header location={location} />
    </header>
    <main>
      <section>
        <Banner />
      </section>
      <article>
        <Projects/>
      </article>
    </main>
    <footer>
      <Footer />
    </footer>
  </React.Fragment>
)

export default SitePagesLayout
