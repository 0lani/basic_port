import React from "react"
import Header from "../HomePageLayout/Sections/Header"
import Banner from "./Banner"
import Footer from "../HomePageLayout/Sections/Footer"

const SitePagesLayout = ({ location }) => (
  <React.Fragment>
    <header>
      <Header location={location} />
    </header>
    <main style={{background: '#fff'}}>
      <Banner />
    </main>
    <footer>
      <Footer />
    </footer>
  </React.Fragment>
)

export default SitePagesLayout
