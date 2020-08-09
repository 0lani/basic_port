import React from "react"
import QueueAnim from "rc-queue-anim"
//import BannerImage from "./BannerImage"
import BoxScene from "./bannerContent/Scene"
import "../../../resources/less/siteBanner.less"

class Banner extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <div className="home-page">
          <section className={`home-layout-wrapper home-banner`}>
            <div className="home-layout">
              <div className={`home-banner-image-wrapper`}>
                <QueueAnim
                  className={`home-banner-content-wrapper`}
                  delay={300}
                  ease="easeOutQuart"
                >
                  <p key="p"><em>PROJECTS</em></p>
                </QueueAnim>
                <BoxScene/>
              </div>
            </div>
          </section>
        </div>
      </React.Fragment>
    )
  }
}

export default Banner
