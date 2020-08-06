import React from "react"
import { Row, Col } from "antd"
import "../../../resources/less/footer.less"

const Footer = () => (
  <React.Fragment>
    <Row className="bottom-bar dark">
      <Col lg={4} sm={24} />
      <Col lg={20} sm={24}>
        <span
          style={{
            lineHeight: `16px`,
            paddingRight: 12,
            marginRight: 11,
          }}
        ></span>
        <span style={{ marginRight: 24 }}></span>
        <span
          style={{
            marginRight: 12,
            lineHeight: `16px`,
            paddingRight: 12,
            borderRight: `1px solid rgba(255, 255, 255, 0.55)`,
          }}
        >
          Copyright ©{new Date().getFullYear()}
        </span>
        <span style={{ marginRight: 12 }}>
          <a href="https://olonnye.com"> {`  `}Powered by Olonnye Taylor</a>
        </span>
      </Col>
    </Row>
  </React.Fragment>
)

export default Footer
