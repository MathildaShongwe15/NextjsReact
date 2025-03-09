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

    timelines.to(mainContainerRef.current, {
      width: "20vw",
      height: "70vh",
      duration: 1,
      y: 100,
      x: 1000,
      ease: "power4.inOut"
    });

   const timeliness =  gsap.timeline({
              width: "20vw",
              height: "70vh",
              scrollTrigger:{
              trigger:mainContainerRef.current,
              pin:true,
              start:'top top',
              end:"+=1000 bottom",
              markers:true,
              scrub:1,
             }
            });

            timeliness.to('.panel',{
             opacity:1,
           });

    let allPanels = gsap.utils.toArray('.panel');


    const tl = gsap.timeline({
      scrollTrigger:{
      trigger:'.panel',
      pin:true,
      pinSpacing:true,
      start:'left left',
      end:"max",
      markers:true,
      scrub:1,
     }
    });


    allPanels.forEach((panel:any, index, panels) =>{

      tl.from(panel,{
            x: -180 * window.innerWidth,
            ease: "none",
            markers: true,
          });
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
  //     width:maxExpansion,
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
  //       xPercent:0,
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
      <div  id="top-content" className="w-screen h-auto bg-white  p-3 font-sans sticky top-0">
        <div className="z-0 w-180 mt-80 mr-100">
          <p className="flex items-start text-black text-2xl">ITS makes it easier than ever for businesses to book travel, control savings, reconcile charges and automate the expense process - all within a single, unified expereince.</p>
        </div>
        <div ref={mainContainerRef} className="justify-items-center align-items-center w-7xl h-170 -mt-100  mb-50 border-1 bg-black rounded-3xl font-sans z-4 ">
          <h1 ref={mainHeadingRef} id="text-selected" className=" text-4xl m-70"></h1>
        </div>
      </div>
     
      <div  id="panel-content" className="w-screen h-auto bg-white grid grid-flow-col grid-rows-1 gap-x-4 font-sans sticky top-0 ">
         <div id="" className="panel w-70 h-120 bg-black rounded-3xl col-span-2 sticky ml-3 mt-10"></div>
         <div id="" className="panel w-70 h-120 bg-black rounded-3xl col-span-2 sticky ml-3 mt-50"></div>
         <div id="" className="panel w-70 h-120 bg-black rounded-3xl col-span-1 sticky  ml-3 mt-50"></div>
         <div id="" className="panel w-70 h-120 bg-black rounded-3xl col-span-1 sticky  ml-3 mt-50"></div>  
      </div>

    </div>
  );
}


