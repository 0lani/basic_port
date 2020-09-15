import React from "react"
import { Link } from "react-router-dom"
import selfieHeader from "../../../resources/images/File_001.png"
import "../../../resources/less/header.less"
import { Menu, Row, Col, Button, Badge, Modal, Form, Input, Popover, Icon} from "antd"
import {github as Git} from "../../../resources/icons"
//linkedin as Linked

class Header extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      menuVisible: false,
      isOpen: false,
      status: false
    }

    this.setModal = this.setModal.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.handleShowMenu = this.handleShowMenu.bind(this);
  }

  handleShowMenu = () => {
    this.setState({
      menuVisible: !this.state.menuVisible,
    })
  }

  setModal = (modal, nav) => {
    this.setState({
      isOpen: !modal, 
      menuVisible: !nav
    })
  }

  onSubmitForm = evee => {
    evee.preventDefault();
    const form = evee.target;
    const data = new FormData(form);
    const xhr = new XMLHttpRequest();
    xhr.open(form.method, form.action);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
      if (xhr.status === 200) {
        form.reset();
        this.setState({ status: "SUCCESS" });
      } else {
        this.setState({ status: "ERROR" });
      }
    };
    xhr.send(data);
    this.setModal(this.state.isOpen)
  }

  render() {
    const { currentWindowSize } = this.props;
    const isMobile = currentWindowSize.height <= 812;

    const menuMode = isMobile ? `inline` : `horizontal`
    
    const menu = [
      <Menu
        mode={menuMode}
        id="nav"
        key="nav"
        onClick={this.handleShowMenu}
      >
        <Menu.Item key="Home">
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="testominals">
          <Link to="/projects">Projects</Link>
        </Menu.Item>
        <Menu.Item key="contact">
          <Link to="/about">About Me</Link>
        </Menu.Item>
        <Menu.Item>
          <Button
            className="header-remote-button"
            ghost
            size="default"
            key="remote"
            onClick={() => this.setModal(this.state.isOpen, this.state.menuVisible)}
          >
            Contact{" "}<Badge dot />
          </Button>
        </Menu.Item>
      </Menu>,
    ];
 
    return (
      <header id="header"> 
        {menuMode === `inline` ? (
          <Popover
            overlayClassName="popover-menu"
            placement="bottomRight"
            content={menu}
            visible={this.state.menuVisible}
            arrowPointAtCenter
          >
            <Icon
              className="nav-phone-icon"
              type="menu"
              onClick={this.handleShowMenu}
            />
          </Popover>
        ) : null}
        <Row className="logo-text-wrapper">
          <Col lg={4} md={10} sm={22} xs={24}>
            <Link to="/" id="logo">
              <span className="logo-text">Olonnye Taylor</span>
            </Link>
          </Col>
          <Col lg={20} md={19} sm={0} xs={0}>
            {menuMode === `horizontal` ? menu : null}
          </Col>
        </Row>
        
        <Modal
          id="contact"
          title="Contact Form"
          centered
          visible={this.state.isOpen}
          onCancel={() => this.setModal(this.state.isOpen)}
          footer={[<em>~Response Times Are Usually Within 48hrs</em>]}
        > 
          <div class="container">

            <div class="center span4">
              <img alt="picture of developer" src={selfieHeader} style={{maxWidth: '140px', margin: '0 auto', borderRadius: '50%', border: '2px solid #68d391' }}/>
              <div id="social">
                <a href="https://github.com/boredasfawk" target="_blank" rel="noopener">
                  <span><Git style={{color: '#68d391'}}/></span>
                </a> 
                {/* <a href="https://www.linkedin.com/in/olonnye" target="_blank" rel="noopener">
                  <span><Linked style={{color: '#68d391'}}/></span>
                </a>  */}
              </div>
            </div>

            <Form {...{
                labelCol: {
                  span: 8,
                },
                wrapperCol: {
                  span: 16,
                }
              }} 
              name="nest-messages" 
              action="https://formspree.io/oloagency@gmail.com" method="POST" 
              onFinish={(evee) => this.onSubmitForm(evee)}
            >
              <Form.Item
                name="name"
                label="Name"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Name!',
                  },
                ]}
              >
                <Input
                  style={{
                    width: '87%',
                  }}
                />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    required: true,
                    message: 'Please input your email!',
                  },
                ]}
              >
                <Input
                  style={{
                    width: '87%',
                  }}
                />
              </Form.Item>

              <Form.Item name="message" label="Message">
                <Input.TextArea 
                  style={{
                    width: '87%',
                  }}
                />
              </Form.Item>

              <Form.Item wrapperCol={{ span: 16, offset: 8 }}>
              <Button key="back" style={{marginRight: '.5rem'}} onClick={() => this.setModal(this.state.isOpen)}>
                  Close
                </Button>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    {status === "SUCCESS" ? 'Thanks!' : 'Submit'}
                    {status === "ERROR" && 'Ooops! There was an error.'}
                  </Button>
                </Form.Item>
              </Form.Item>
            </Form>
          
          </div>
        </Modal>
      </header>
    )
  }
}
export default Header
