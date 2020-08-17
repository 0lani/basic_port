import React from "react"
import VisibilitySensor from "react-visibility-sensor"
import { animated, Spring, Trail } from "react-spring/renderprops"
import { Row, Col} from "antd"
import context from "./data/startedData"
import "../../../resources/less/started.less"

const Started = () => {
  return (
    <React.Fragment>
      <article className="home-serve-wrapper">
        <Row type="flex" justify="center" className="home-layout">
          <Col span={24}>
            <VisibilitySensor partialVisibility={true} delayedCall={false}>
              {({ isVisible }) => (
                <Spring
                  delay={100}
                  to={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? `translateY(0)` : `translateY(50px)`,
                  }}
                >
                  {props => (
                    <React.Fragment>
                      <Row
                        type="flex"
                        justify="center"
                        style={{ ...props, marginBottom: `25vh` }}
                        className="home-serve"
                      >
                        <Col span={8}>
                          <h3 className="main-title">Project Timeline</h3>
                          <i className="line" />
                        </Col>
                      </Row>
                    </React.Fragment>
                  )}
                </Spring>
              )}
            </VisibilitySensor>
            <Row>
              <Col span={24}>{child(context)}</Col>
            </Row>
          </Col>
        </Row>
      </article>
    </React.Fragment>
  )
}

const child = context => {
  return context.map(node => {
    const { 
      content, slug, title, acf: {
        started_img: {
          src
        }
      }
    } = node;

    const imageStyle = {
      background: `url(${src}) no-repeat ${
        slug % 2 === 1 ? "right" : "left"
      } / 841px`,
      height: `511px`,
    }

    const innerContent = [
      <h2>{title}</h2>,
      <div class="started-content-wrapper">
        <p>{content}</p>
      </div>
    ]

    return (
      <React.Fragment key={slug}>
        <VisibilitySensor partialVisibility={true}>
          {({ isVisible }) => (
            <Row className="content-wrapper-started page">
              <Spring
                delay={200}
                to={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible
                    ? `translateX(0)`
                    : `translateX(-200px)`,
                }}
              >
                {props => (
                  <Col
                    span={16}
                    style={{ ...props, ...imageStyle }}
                    className="image-wrapper-started"
                  >
                    <div className="clip-started" style={{ ...props}}/>  
                  </Col>
                )}
              </Spring>
              <Spring
                delay={200}
                to={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible
                    ? `translateX(0)`
                    : `translateX(200px)`,
                }}
              >
                {props => (
                  <React.Fragment>
                    <Col
                      style={{ ...props }}
                      span={16}
                      className="text-wrapper"
                    >
                      <Trail
                        native
                        items={innerContent}
                        delay={450}
                        initial={null}
                        from={{ opacity: 0, x: -350 }}
                        to={{
                          opacity: isVisible ? 1 : 0.25,
                          x: isVisible ? 0 : 350,
                        }}
                      >
                        {content => ({ x, opacity }) => (
                          <animated.div
                            style={{
                              opacity,
                              transform: x.interpolate(
                                x => `translate3d(${x}%,0,0)`
                              ),
                            }}
                          >
                            {content}
                          </animated.div>
                        )}
                      </Trail>
                    </Col>
                  </React.Fragment>
                )}
              </Spring>
            </Row>
          )}
        </VisibilitySensor>
      </React.Fragment>
    )
  })
}

export default Started
