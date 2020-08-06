import React from "react"
import { Button } from "antd"
import QueueAnim from "rc-queue-anim"
import BannerImage from "./Content/BannerImage"
import "../../../resources/less/siteBanner.less"

class Banner extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <div className="home-page">
          <article className={`home-layout-wrapper home-banner`}>
            <div className="home-layout">
              <QueueAnim
                className={`home-banner-content-wrapper`}
                delay={300}
                ease="easeOutQuart"
              >
                <h1 key="h2">Projects</h1>
                <p key="p"><em>Due to an influx of work these are a little dated</em></p>
                <span key="button">
                  <Button type="primary">Need Help?</Button>
                </span>
              </QueueAnim>
              <div className={`home-banner-image-wrapper`}>
                <BannerImage />
              </div>
            </div>
          </article>
          <div style={{ background: `#564078`, height: `100vh` }}></div>
        </div>
      </React.Fragment>
    )
  }
}

export default Banner
