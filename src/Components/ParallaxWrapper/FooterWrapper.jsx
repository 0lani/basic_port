/** @jsx jsx */
import { jsx } from "theme-ui"
import Divider from "./elements/divider"
import Content from "./elements/content"
import SVG from "../../resources/svg/svg"
import { UpDown, UpDownWide } from "../../resources/animations"
import React from "react"


const FooterWrapper = ({
  offset,
  factor,
  children,
}) => {
  return (
    <React.Fragment>
      <div>
        <Divider
          sx={{ clipPath: `polygon(0 10%,100% 7%,100% 78%,0 77%)` }}
          speed={-0.2}
          offset={3.4}
          factor={factor}
        />
        <Content speed={-0.2} offset={3.2} factor={factor}>
          {children}
        </Content>

        <Divider speed={0.1} offset={3.2} factor={factor}>
          <UpDown>
            <SVG icon="box" width={6} color="icon_brightest" left="85%" top="75%" />
            <SVG icon="upDown" width={8} color="icon_teal" left="70%" top="20%" />
            <SVG
              icon="triangle"
              width={8}
              stroke
              color="icon_orange"
              left="25%"
              top="5%"
            />
            <SVG
              icon="circle"
              hiddenMobile
              width={24}
              color="icon_brightest"
              left="17%"
              top="60%"
            />
          </UpDown>
          <UpDownWide>
            <SVG
              icon="arrowUp"
              hiddenMobile
              width={16}
              color="icon_green"
              left="20%"
              top="90%"
            />
            <SVG
              icon="triangle"
              width={12}
              stroke
              color="icon_brightest"
              left="90%"
              top="30%"
            />
            <SVG
              icon="circle"
              width={16}
              color="icon_yellow"
              left="70%"
              top="90%"
            />
            <SVG
              icon="triangle"
              hiddenMobile
              width={16}
              stroke
              color="icon_teal"
              left="18%"
              top="75%"
            />
            <SVG
              icon="circle"
              width={6}
              color="icon_brightest"
              left="75%"
              top="10%"
            />
            <SVG
              icon="upDown"
              hiddenMobile
              width={8}
              color="icon_green"
              left="45%"
              top="10%"
            />
          </UpDownWide>
          <SVG
            icon="circle"
            hiddenMobile
            width={6}
            color="icon_brightest"
            left="4%"
            top="20%"
          />
          <SVG icon="circle" width={12} color="icon_pink" left="80%" top="60%" />
          <SVG icon="box" width={6} color="icon_orange" left="10%" top="10%" />
          <SVG icon="box" width={12} color="icon_yellow" left="29%" top="26%" />
          <SVG
            icon="hexa"
            width={16}
            stroke
            color="icon_red"
            left="75%"
            top="30%"
          />
          <SVG
            icon="hexa"
            width={8}
            stroke
            color="icon_yellow"
            left="80%"
            top="70%"
          />
        </Divider>
      </div>
    </React.Fragment>
  )
}
export default FooterWrapper
