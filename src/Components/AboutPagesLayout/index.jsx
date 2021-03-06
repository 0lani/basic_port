import React from "react"
import Banner from "./Banner"
import Footer from "../HomePageLayout/Sections/Footer"

const SitePagesLayout = ({ currentWindowSize }) => {
  const {width} = currentWindowSize
  const isMobile = width <= 896;
  return (
    <>
      <main id="about-main" style={{background: '#fff'}}>
        <Banner mobile={isMobile}/>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  )
}

export default SitePagesLayout
