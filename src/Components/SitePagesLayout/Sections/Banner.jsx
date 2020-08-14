import React from "react"
import {Icon} from "antd"
import QueueAnim from "rc-queue-anim"
//import BannerImage from "./BannerImage"
import BoxScene from "./bannerContent/Scene"
import "../../../resources/less/siteBanner.less"

class Banner extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <section className="home-page banner">
          <div className={`home-layout-wrapper home-banner`}>
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
          </div>
          <Icon type="down" className="down banner" />
        </section>
      </React.Fragment>
    )
  }
}

export default Banner
