'use client';

import React, { useState } from "react";
import ReactSimplyCarousel from "react-simply-carousel";
import { useBreakpoint } from "../hooks/useBreakPoint";

interface CarouselProps {
  children: React.ReactNode | React.ReactNode[]
}

 export const Carousel = ({ children }: CarouselProps) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const breakpoint = useBreakpoint();

  return (
    <div>
      <ReactSimplyCarousel
        activeSlideIndex={activeSlideIndex}
        onRequestChange={setActiveSlideIndex}
        itemsToShow={5}
        itemsToScroll={5}
        containerProps={{
           style: {
            width: "100%",
            display: 'flex',
            justifyContent: ['xs', 'sm'].includes(breakpoint) ? "center" : "start",
            userSelect: "none"
          }
        }}
        forwardBtnProps={{
          //here you can also pass className, or any other button element attributes
          style: {
            alignSelf: 'center',
            background: 'black',
            border: 'none',
            borderRadius: '50%',
            color: 'white',
            cursor: 'pointer',
            fontSize: '20px',
            height: 30,
            lineHeight: 1,
            textAlign: 'center',
            width: 30,
          },
          children: <span>{`>`}</span>,
        }}
        backwardBtnProps={{
          //here you can also pass className, or any other button element attributes
          style: {
            alignSelf: 'center',
            background: 'black',
            border: 'none',
            borderRadius: '50%',
            color: 'white',
            cursor: 'pointer',
            fontSize: '20px',
            height: 30,
            lineHeight: 1,
            textAlign: 'center',
            width: 30,
          },
          children: <span>{`<`}</span>,
        }}
        responsiveProps={[
          {
            itemsToShow: 3,
            itemsToScroll: 3,
            maxWidth: 1100,
          },
        ]}
        speed={400}
        easing="linear"
      >
        {
          children
        }
      </ReactSimplyCarousel>
    </div>
  );
}
