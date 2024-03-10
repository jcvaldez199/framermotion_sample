import React from 'react';
import { motion } from 'framer-motion';
import { Box, BoxProps, Container, ContainerProps } from '@mui/material';
import logo from '../logo.svg';

const containerStyle: ContainerProps["sx"] = {
  flexDirection: "row",
  display: "flex",
  flex: "1 1 auto",
  alignItems: "center",
  justifyContent: "space-around",
}

const boxStyle: BoxProps["sx"] = {
  backgroundColor: "blue",
  flexDirection: "column",
  display: "flex",
  alignContent: "center",
  width: "100%",
  height: "100vh",
}


export const Spinner: React.FC = () => {
  return (
    <Container fixed sx={{...containerStyle}} maxWidth="xl" >
      <Box sx={{...boxStyle}} >
        <motion.div
          style={{
            width: "200px",
            height: "200px",
            background: "black",
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            times: [0, 0.2, 0.5, 0.8, 1],
            repeat: Infinity,
            repeatDelay: 1
          }}

          animate={{
            scale: [1, 2, 2, 1, 1],
            rotate: [0, 0, 270, 270, 0],
            borderRadius: ["20%", "20%", "50%", "50%", "20%"],
          }}
        >
          Poop
        </motion.div>
        <p>Poop</p>
        <p>Poop</p>
        <p>Poop</p>
        <p>Poop</p>
        <p>Poop</p>
      </Box>
    </Container>
  )
};
