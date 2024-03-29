import React, { useState } from 'react';
import { AnimationProps, motion } from 'framer-motion';
import { Box, BoxProps, Button, ButtonProps, Container, ContainerProps } from '@mui/material';
import laugh from '../laugh.svg'


const animationStyle = {
  scale: [1, 1.2, 1.2, 1.7, 1],
  rotate: [0, 0, 270, 270, 0],
  borderRadius: ["20%", "20%", "50%", "50%", "20%"],
}

const xTranslation = [0, 50, 100, 150, 200, 200];

const transitionStyle: AnimationProps["transition"] = {
  duration: 1,
  repeat: Infinity,
  ease: "linear",
  repeatType: "reverse",
  type: "keyframes",
}

const variants = {
  open: { x: xTranslation, ...animationStyle },
  closed: { x: xTranslation.map((x)=> x*-1), ...animationStyle },
}

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


export const Transitioner: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Container fixed sx={{...containerStyle}} maxWidth="xl" >
      <Box sx={{...boxStyle}} >
        <Button  {...buttonProps} onClick={() => setIsOpen(isOpen => !isOpen)}>Poop</Button>
        <Button  {...buttonProps} onClick={() => setIsOpen(isOpen => !isOpen)}>Poop</Button>
        <Button  {...buttonProps} onClick={() => setIsOpen(isOpen => !isOpen)}>Poop</Button>
        <Button  {...buttonProps} onClick={() => setIsOpen(isOpen => !isOpen)}>Poop</Button>
        <Button  {...buttonProps} onClick={() => setIsOpen(isOpen => !isOpen)}>Poop</Button>
      </Box>
      <Box sx={{...boxStyle}} >
        <motion.img
          animate={isOpen ? variants.open : variants.closed}
          transition={transitionStyle}
          src={laugh} 
          className="Basic-logo"
          alt="logo"
        />
        <motion.img
          animate={isOpen ? variants.open : variants.closed}
          transition={{...transitionStyle, type:"keyframes"}}
          src={laugh} 
          className="Basic-logo"
          alt="logo"
        />
      </Box>
      <Box sx={{...boxStyle}} >
        <Button  {...buttonProps} onClick={() => setIsOpen(isOpen => !isOpen)}>Start</Button>
      </Box>
    </Container>
  )
};
