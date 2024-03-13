import React, { useEffect, useState } from 'react';
import { motion, AnimationProps, useMotionValue } from 'framer-motion';
import { Box, BoxProps, Button, ButtonProps, Container, ContainerProps, Slider, Typography } from '@mui/material';
import laugh from '../laugh.svg'
import { defaultAnimationList } from './datatypes';
import { bouncy } from './presets';


const buttonProps: ButtonProps = {
  variant: "contained",
}

const containerStyle: ContainerProps["sx"] = {
  flexDirection: "row",
  display: "flex",
  flex: "1 1 auto",
  alignItems: "center",
  justifyContent: "space-between",
  // backgroundColor: "blue",
  width: "100%",
  height: "65vh",
}

const boxStyle: BoxProps["sx"] = {
  flexDirection: "column",
  display: "flex",
  alignItems: "center",
  // backgroundColor: "black",
  flex: "1 1 auto",
}

const defaultElemState = {
  x: 0,
  y: 0,
  rotate: 0,
  scale: 0.35,
  rotateY: 0,
  rotateX: 0,
}

const emptyAnimationList: defaultAnimationList = {
  x: [],
  y: [],
  rotate: [],
  scale: [],
  rotateY: [],
  rotateX: [],
}

const defaultTransitionStyle : AnimationProps["transition"] = {
  duration: 0,
  repeat: Infinity,
  repeatType: "loop",
  delay: 0,
  // ease: "linear",
  // type: "spring",
};

const stringifyAnimationList = (vals: defaultAnimationList) => {
  const prntString = `
  x : [${vals.x.toString()}],
  y: [${vals.y.toString()}],
  rotate: [${vals.rotate.toString()}],
  scale: [${vals.scale.toString()}],
  rotateY: [${vals.rotateY.toString()}],
  rotateX: [${vals.rotateX.toString()}],
`
  return prntString;
};


export const Animator: React.FC = () => {
  const [animationState, setAnimationState] = useState(defaultElemState);
  const [transitionStyle, setTransitionStyle] = useState(defaultTransitionStyle);
  const [showList, setShowList] = useState(false);
  const [presetAnimation, setPresetAnimation] = useState(false);
  const [animationList, setAnimationList] = useState<defaultAnimationList>(emptyAnimationList);
  const [transitionState, setTransitionState] = useState<AnimationProps["transition"]>(
    undefined
  );

  useEffect(
    () => console.log(""),
    [animationList, transitionState]
  );
  const sliderDefaults = {
    x: {min:-250,max:250},
    y: {min:-150,max:150},
    rotate: {min:-360,max:360},
    scale: {min:-1.65,max:1.65},
    rotateY: {min:0,max:180},
    rotateX: {min:0,max:180},
  }

  return (
    <>
    <Container fixed sx={{...containerStyle}} maxWidth="xl" >
      <Box sx={{...boxStyle, width: "40%"}} >
        {Object.keys(animationState).map((key) => {
          return (
            <>
              <Typography>{key}</Typography>
              <Slider 
                step={0.1}
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
        <Box sx={{ display: "flex", justifyContent:"space-around", flexDirection: "row", height:"100%", width:"100%"}}>
          <Button disabled={presetAnimation} {...buttonProps} onClick={() => {
              setTransitionStyle((prev) => {return {...prev, duration: prev.duration+0.1}});
              setAnimationList(
                (prev) => { 
                  return Object.keys(prev).map((key) => (
                  {
                    // [key as keyof typeof defaultElemState]:[defaultElemState[key as keyof typeof defaultElemState]]
                    [key as keyof defaultAnimationList]:
                      [...prev[key as keyof defaultAnimationList], 
                        animationState[key as keyof typeof defaultElemState]
                      ]
                  }
                  ))
                  .reduce(
                    (accumulator, currentval ) => ({...accumulator, ...currentval}),
                    {},
                  ) as defaultAnimationList; 
                }
              );
            }
          }>Add To Transition</Button>
          <Button disabled={presetAnimation} {...buttonProps} onClick={() => setTransitionState((prev) => prev ? undefined : transitionStyle)} >
              Start Animation
          </Button>
          <Button {...buttonProps} onClick={() => setShowList((prev) => !prev)} >Toggle Property List</Button>
          <Button {...buttonProps} onClick={() => {
              if (!presetAnimation) {
                setAnimationList(bouncy);
                setTransitionState({...defaultTransitionStyle, duration: 2.5});
                setTransitionStyle({...defaultTransitionStyle, duration: 2.5});
              } else {
                setAnimationList(emptyAnimationList);
                setTransitionState(undefined);
                setTransitionStyle(defaultTransitionStyle);
              }
              setPresetAnimation(!presetAnimation);
            }} >Toggle Preset Animation</Button>
        </Box>
      </Box>
      <Box sx={{flex: "0 0 20px"}}/>
      <Box sx={{...boxStyle, backgroundColor:"black"}} >
        {transitionState && <motion.img
          animate={{...animationList, y:animationList.y.map((val:number)=>val*-1)}}
          transition={transitionState}
          src={laugh}
          className="Basic-logo"
          alt="logo"
        />}
        {!transitionState && <motion.img
          animate={{...animationState, y:animationState.y*-1}}
          src={laugh}
          className="Basic-logo"
          alt="logo"
        />}
      </Box>
    </Container>
    {showList && (<p>{stringifyAnimationList(animationList)}</p>)}
    </>
  )
};
