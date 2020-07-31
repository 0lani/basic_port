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
      <Parallax pages={5} ref={parallax}>
        <main>
          <section id="home">
            <BannerWrapper offset={0} factor={1}>
              <Banner />
            </BannerWrapper>
          </section>
          <section id="services">
            <ServicesWrapper offset={1} factor={2}>
              <Services />
            </ServicesWrapper>
          </section>
          <section id="started">
            <StartedWrapper offset={3.2} factor={3}>
              <Started />
            </StartedWrapper>
          </section>
        </main>

        <FooterWrapper offset={4} factor={5}>
          <footer id="footer">
            <Footer />
          </footer>
        </FooterWrapper>
      </Parallax>
    </React.Fragment>
  )
}

export default HomepageLayout
