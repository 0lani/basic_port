import React, { useRef } from "react"
import { Parallax } from "react-spring/renderprops-addons"
import BannerWrapper from "../ParallaxWrapper/BannerWrapper.jsx"
import ServicesWrapper from "../ParallaxWrapper/ServicesWrapper.jsx"
import StartedWrapper from "../ParallaxWrapper/StartedWrapper.jsx"
import Banner from "./Sections/Banner.jsx"
import Services from "./Sections/Services.jsx"
import Started from "./Sections/Started.jsx"

const HomepageLayout = ({ currentWindowSize }) => {
  const parallax = useRef(null)
  const {width} = currentWindowSize
  const isMobile = width <= 896;
  const mobilePages = isMobile ? 7.2 : 6.2
  return (
    <React.Fragment>
      <Parallax pages={mobilePages} ref={parallax}>
        <main>
          <section id="home">
            <BannerWrapper offset={0} factor={1}>
              <Banner windowSize={currentWindowSize}/>
            </BannerWrapper>
          </section>
          <section id="services">
            <ServicesWrapper offset={1} factor={1}>
              <Services windowSize={currentWindowSize}/>
            </ServicesWrapper>
          </section>
          <section id="started">
            <StartedWrapper offset={1.2} factor={2.6}>
              <Started windowSize={currentWindowSize}/>
            </StartedWrapper>
          </section>
        </main>
      </Parallax>
    </React.Fragment>
  )
}

export default HomepageLayout
