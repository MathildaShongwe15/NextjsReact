"use client";
import { gsap } from "gsap";
import { Component, useEffect, useRef } from "react";
import ScrollTrigger from 'gsap/ScrollTrigger';
import text from "gsap/TextPlugin";

import { useRouter } from "next/router";


export default function Home() {
  const mainHeadingRef = useRef(null);
  const mainContainerRef = useRef(null);
  const infoContainerRef = useRef(null);

  gsap.registerPlugin(text, ScrollTrigger);

  useEffect(() => {

    let elements = document.querySelector(".scroll-section");
    const words = ["travel", "card", "expense", "smart", "easy"];
    var timelines = gsap.timeline();

    words.forEach((word) => {
      timelines.to(mainHeadingRef.current, {
        scale: 5,
        autoAlpha: 1,
        duration: 3,
        ease: "expo.in",
        text: {
          value: word,
          delimiter: " "
        },
      })
        .to(mainHeadingRef.current, {
          ease: "expo.out",
          scale: 5,
          delay: 0.5,
          text: {
            value: word,
            delimiter: " "
          },
        })
        .to(mainHeadingRef.current, {
          ease: "expo.out",
          scale: 7,
          autoAlpha: 0,
          text: {
            value: word,
            delimiter: " "
          },
        })
        
        .to(mainHeadingRef.current, {
          duration: 0,
          autoAlpha: 1,
          scale: 0,
          text: {
            value: " ",
            delimiter: " "
          },

        })
    });

    const mainPanel:any = document.querySelector(".main-container")
    timelines.to(mainPanel,{
      y: 200,
      x: 1100,
    
      ease: "power4.inOut",
      onComplete: () => {
      mainPanel.classList.toggle("adjustSize");
      }
    })
    // timelines.to(mainContainerRef.current, {
    //   width: "20vw",
    //   height: "70vh",
    //   duration: 1,
    //   y: 100,
    //   x: 1000,
    //   ease: "power4.inOut"
    // });

   

    let allPanels = gsap.utils.toArray('.panel');
    var timeline2 = gsap.timeline();

    timelines.to(mainContainerRef.current,{
      scrollTrigger:{
      trigger:mainContainerRef.current,
      start:'top top',
      markers:true,
      scrub:true
     },
     y:800
    });

    const tl =gsap.timeline({
      scrollTrigger:{ 
      preventOverlaps:true,
      trigger:'.panel',
      pin:true,
      pinSpacing:true,
      start:'top top',
      end:"+=900",
      markers:true,
      scrub:4,
      anticipatePin:1
     }
    });
  
    allPanels.forEach((panel:any, index, panels) =>{  
      tl.from(panel,{
        x:335,
      })
      tl.to(panel,{
        opacity:1,
        x: window.innerWidth,
        markers: true,
        ease:"none",
        duration:2.5,
        stagger:0.1,
      })
      }
 );
  
  // const panels = document.querySelectorAll(".panel");
  // panels.forEach((panel, index) =>{
  // let arr = gsap.utils.toArray('.panel');
  // let width_tl:any = gsap.timeline();
  // let move_tl:any = gsap.timeline();


  //   panel.addEventListener("mouseenter",function(){
  //     const  panelWidth = panel.clientWidth;
  //     const windowWidth = window.innerWidth;
  //     const totalWidth:any = Array.from(arr).reduce((x, y:any) => x + y.clientWidth, 0);
  //     const maxExpansion  = Math.min(panelWidth * 2, windowWidth - totalWidth + panelWidth);

  //     width_tl.fromTo(panel,{
  //       width:panel.clientWidth,
  //     },
  //     {
  //     width:panelWidth * 2,
  //     duration:0.5
  //     }, "start");
  //   })

  //   if(index > 0){
  //     move_tl.fromTo(arr.slice(0, index),{},
  //     {
  //       duration:0.5,
  //     },"start")
  //   }

  //   if(index < arr.length -1){
  //      move_tl.fromTo(arr.slice(index + 1), {
  //       xPercent:5,
  //      },
  //      {
  //       xPercent:10,
  //       duration:0.5
  //      }, "start"
  //     )};

  //     panel.addEventListener("mouseleave", function(){
  //       width_tl.reverse();
  //       move_tl.reverse();
  //     });   
  // })

},[]);

  return (
    <div className="w-screen h-auto overflow-x-hidden">
      <div  id="top-content" className="w-screen h-200 bg-white border-13 border-red-600 p-3 font-sans top-0 z-0">
        <div className="z-0 w-180 mt-80 mr-100">
          <p className="flex items-start text-black text-2xl">ITS makes it easier than ever for businesses to book travel, control savings, reconcile charges and automate the expense process - all within a single, unified expereince.</p>
        </div>
        <div ref={mainContainerRef} className="main-container justify-items-center align-items-center w-8xl h-170 -mt-100  border-1 bg-black rounded-3xl font-sans z-4 ">
          <h1 ref={mainHeadingRef} id="text-selected" className=" text-4xl m-70"></h1>
        </div>
      </div>
     
      <div  id="panel-content" className="w-screen h-auto bg-white flex space-x-2 p-10  border-1 border-red-600 font-sans z-0">
         <div id="" className="panel w-60 h-120 bg-black rounded-3xl sticky  z-0"></div>
         <div id="" className="panel w-60 h-120 bg-black rounded-3xl sticky z-0"></div>
         <div id="" className="panel w-60 h-120 bg-black rounded-3xl sticky z-0"></div>
         <div id="" className="panel w-60 h-120 bg-black rounded-3xl sticky z-0"></div>  
      </div>

    </div>
  );
}


