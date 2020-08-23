import React from "react"
import Banner from "./Sections/Banner"
import Projects from './Sections/Projects'
import Footer from "../HomePageLayout/Sections/Footer"

const SitePagesLayout = () => (
  <React.Fragment>
    <main style={{background: '#fff'}}>
      <Banner />
      <Projects/>
    </main>
    <footer>
      <Footer />
    </footer>
  </React.Fragment>
)

export default SitePagesLayout
