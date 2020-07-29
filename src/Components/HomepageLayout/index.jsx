import React, { useRef } from "react"
import { Parallax } from "react-spring/renderprops-addons"
import BannerWrapper from "../ParallaxWrapper/BannerWrapper.tsx"
import ServicesWrapper from "../ParallaxWrapper/ServicesWrapper.tsx"
import StartedWrapper from "../ParallaxWrapper/StartedWrapper.tsx"
import FooterWrapper from "../ParallaxWrapper/FooterWrapper.tsx"
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
      <Parallax pages={9.8} ref={parallax}>
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

        <FooterWrapper offset={0} factor={9.95}>
          <footer id="footer">
            <Footer />
          </footer>
        </FooterWrapper>
      </Parallax>
    </React.Fragment>
  )
}

export default HomepageLayout
