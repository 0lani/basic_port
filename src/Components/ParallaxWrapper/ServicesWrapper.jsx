
import Divider from "./elements/divider"
import Content from "./elements/content"
import SVG from "../../resources/svg/svg"
import { UpDown, UpDownWide } from "../../resources/animations"
import React from "react"

const ServicesWrapper = ({
  offset,
  factor = 2,
  children,
}) => {
  return (
    <React.Fragment>
      <div>
        <Divider
          bg="linear-gradient(to right, SlateBlue 0%, rgb(172, 209, 234) 100%)"
          clipPath="polygon(0 15%, 100% 25%, 100% 85%, 0 75%)"
          speed={-0.2}
          offset={1.1}
          factor={factor}
        />
        <Content speed={-0.2} offset={1.1} factor={factor}>
          {children}
        </Content>

        <Divider speed={0.1} offset={1.3} factor={factor}>
          <UpDown>
            <SVG icon="box" width={6} color="icon_brightest" left="85%" top="75%" />
            <SVG icon="upDown" width={8} color="icon_teal" left="70%" top="20%" />
            <SVG
              icon="triangle"
              width={8}
              stroke
              color="icon_orange"
              left="25%"
              top="-44%%"
            />
            <SVG
              icon="circle"
              hiddenMobile
              width={24}
              color="icon_brightest"
              left="13%"
              top="0%"
            />
          </UpDown>
          <UpDownWide>
            <SVG
              icon="arrowUp"
              hiddenMobile
              width={16}
              color="icon_green"
              left="20%"
              top="190%"
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
          <SVG
            icon="hexa"
            width={8}
            stroke
            color="icon_yellow"
            left="80%"
            top="50%"
          />
        </Divider>
      </div>
    </React.Fragment>
  )
}
export default ServicesWrapper
