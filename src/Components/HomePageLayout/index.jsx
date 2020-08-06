import React, { useRef } from "react"
import { Parallax } from "react-spring/renderprops-addons"
import BannerWrapper from "../ParallaxWrapper/BannerWrapper.jsx"
import ServicesWrapper from "../ParallaxWrapper/ServicesWrapper.jsx"
import StartedWrapper from "../ParallaxWrapper/StartedWrapper.jsx"
import FooterWrapper from "../ParallaxWrapper/FooterWrapper.jsx"
import Header from "./Sections/Header.jsx"
import Banner from "./Sections/Banner.jsx"
import Services from "./Sections/Services.jsx"
import Started from "./Sections/Started.jsx"
import Footer from "./Sections/Footer.jsx"

const HomepageLayout = ({ location }) => {
  const parallax = useRef(null)
  return (
    <React.Fragment>
      <header>
        <Header location={location} />
      </header>
      <Parallax pages={6.2} ref={parallax}>
        <main>
          <section id="home">
            <BannerWrapper offset={0} factor={1}>
              <Banner />
            </BannerWrapper>
          </section>
          <section id="services">
            <ServicesWrapper offset={1} factor={1}>
              <Services />
            </ServicesWrapper>
          </section>
          <section id="started">
            <StartedWrapper offset={1.2} factor={2.6}>
              <Started />
            </StartedWrapper>
          </section>
        </main>
      </Parallax>
    </React.Fragment>
  )
}

export default HomepageLayout
