import React from "react"
import Banner from "./Banner"
import Footer from "../HomePageLayout/Sections/Footer"

const SitePagesLayout = () => (
  <React.Fragment>
    <main style={{background: '#fff'}}>
      <Banner />
    </main>
    <footer>
      <Footer />
    </footer>
  </React.Fragment>
)

export default SitePagesLayout
