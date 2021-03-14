import React from 'react'
import { Canvas } from "react-three-fiber";
import Cubes from './Models';
import Lights from './Lights';
import Environment from './Environment';

const Scene = () => {

  return (
    <React.Fragment>
      <Canvas> 
        <Cubes />
        <Lights />
        <Environment />
      </Canvas> 
    </React.Fragment>
  )
}

export default Scene;
