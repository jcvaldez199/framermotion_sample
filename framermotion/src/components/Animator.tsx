import React, { useState } from 'react';
import { motion, AnimationProps, useMotionValue } from 'framer-motion';
import { Box, BoxProps, Button, ButtonProps, Container, ContainerProps, Slider, Typography } from '@mui/material';
import laugh from '../laugh.svg'


const buttonProps: ButtonProps = {
  variant: "contained",
}

const containerStyle: ContainerProps["sx"] = {
  flexDirection: "row",
  display: "flex",
  flex: "1 1 auto",
  alignItems: "center",
  justifyContent: "space-around",
  backgroundColor: "blue",
  width: "100%",
  height: "100vh",
}

const boxStyle: BoxProps["sx"] = {
  flexDirection: "column",
  display: "flex",
  alignItems: "center",
  backgroundColor: "black",
  flex: "1 1 auto",
}


export const Animator: React.FC = () => {
  const [animationState, setAnimationState] = useState(
  {
    x: 0,
    y: 0,
    rotate: 0,
    scale: 1,
    rotateY: 0,
    rotateX: 0,
  });
  const sliderDefaults = {
    x: {min:-200,max:200},
    y: {min:-200,max:200},
    rotate: {min:-180,max:180},
    scale: {min:-1.65,max:1.65},
    rotateY: {min:0,max:180},
    rotateX: {min:0,max:180},
  }
        // <Button  {...buttonProps} onClick={() => setIsOpen(isOpen => !isOpen)}>Poop</Button>
        // <Slider onChange={(_,val,ind) => animationState.x.set(val typeof number ? val : val[ind])}>x</Slider>
  //
  // const handleChange = (event: Event, newValue: number | number[]) => {
  //   setValue(newValue as number);
  // };

  return (
    <Container fixed sx={{...containerStyle}} maxWidth="xl" >
      <Box sx={{...boxStyle}} >
        {Object.keys(animationState).map((key) => {
          return (
            <>
              <Typography>{key}</Typography>
              <Slider 
                {...sliderDefaults[key as keyof typeof sliderDefaults]}
                value={animationState[key as keyof typeof animationState]}
                onChange={
                  (_,val) => setAnimationState((prev) => {
                    return {...prev, [key]: val as number}
                  })
                }
              >
                {key}
              </Slider>
            </>
          )
        })}
      </Box>
      <Box sx={{...boxStyle}} >
        <motion.img
          animate={animationState}
          src={laugh}
          className="Basic-logo"
          alt="logo"
        />
      </Box>
    </Container>
  )
};
