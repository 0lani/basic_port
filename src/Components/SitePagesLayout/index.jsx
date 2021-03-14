import React from "react"
import Banner from "./Sections/Banner"
import Projects from './Sections/Projects'
import Footer from "../HomePageLayout/Sections/Footer"

const SitePagesLayout = ({ currentWindowSize }) => {
  const {width} = currentWindowSize
  const isMobile = width <= 896;

  return (
    <React.Fragment>
      <main>
        <Banner />
        <Projects mobile={isMobile}/>
      </main>
      <footer>
        <Footer />
      </footer>
    </React.Fragment>
  )
}

export default SitePagesLayout
