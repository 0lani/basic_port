import React from "react"
import { Link } from "react-router-dom"
// import cyberworksLogo from "../../../resources/images/cyberworks-logo.png"
import "../../../resources/less/header.less"
import classNames from "classnames"
import PropTypes from "prop-types"
import { Menu, Row, Col, Icon, Button, Popover, Badge } from "antd"

class Header extends React.Component {
  static propTypes = {
    isFirstScreen: PropTypes.bool,
    isMoblie: PropTypes.bool,
  }
  state = {
    menuVisible: false,
  }
  onMenuVisibleChange = visible => {
    this.setState({
      menuVisible: visible,
    })
  }
  handleShowMenu = () => {
    this.setState({
      menuVisible: true,
    })
  }

  handleHideMenu = () => {
    this.setState({
      menuVisible: false,
    })
  }

  render() {
    const { isFirstScreen, isMoblie} = this.props
    const currentLocation = 'Home'

    const { menuVisible } = this.state
    const menuMode = isMoblie ? `inline` : `horizontal`
    const headerClassName = classNames({
      clearfix: true,
      "home-nav-white": !isFirstScreen,
    })

    const menu = [
      <Button
        className="header-remote-button"
        ghost
        size="default"
        key="remote"
      >
        contact{" "}<Badge dot />
      </Button>,
      <Menu
        mode={menuMode}
        defaultSelectedKeys={[`Home`]}
        id="nav"
        key="nav"
      >
        <Menu.Item key="Home">
          <Link to="/Home">Home</Link>
        </Menu.Item>
        <Menu.Item key="testominals">
          <Link style={{color: "#fff"}} to="/projects">Projects</Link>
        </Menu.Item>
      </Menu>,
    ]

    return (
      <header id="header" className={headerClassName}>
        {menuMode === `inline` ? (
          <Popover
            overlayClassName="popover-menu"
            placement="bottomRight"
            content={menu}
            trigger="click"
            visible={menuVisible}
            arrowPointAtCenter
            onVisibleChange={this.onMenuVisibleChange}
          >
            <Icon
              className="nav-phone-icon"
              type="menu"
              onClick={this.handleShowMenu}
            />
          </Popover>
        ) : null}
        <Row>
          <Col lg={4} md={5} sm={24} xs={24}>
            <Link to="#" id="logo">
              <span className="logo-text">Olonnye Taylor</span>
            </Link>
          </Col>
          <Col lg={20} md={19} sm={0} xs={0}>
            {menuMode === `horizontal` ? menu : null}
          </Col>
        </Row>
      </header>
    )
  }
}
export default Header
