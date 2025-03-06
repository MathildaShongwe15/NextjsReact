"use client";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import ScrollTrigger from 'gsap/ScrollTrigger';
import text from "gsap/TextPlugin";

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

    gsap.utils.toArray('.panel').forEach((panel:any, index, panels) =>{
      let nextPanel:any = panels[index+1] || panels[0];
      const lastpanel = index === panels.length - 1; //9-1 8

     const timelines = gsap.timeline({
       
        scrollTrigger:{
        trigger:panel,
        pin:true,
        start:'top top',
        end:`+=${window.innerWidth}`,
        markers:true,
        scrub:1,
        toggleClass:{targets:panel, className:"relativeStyle"}
       }
      })

      timelines.to(panels,{
        x: (i:any) => i == index ? -120 * index : 0,
        ease: 'none',
        markers: true,
      })

      if(nextPanel){
        timelines.add(()=>{
          gsap.to(nextPanel,{
            x:-120 * (index + 1),
            ease:'none'
          });
        },`+=${window.innerWidth}`);
      }
     });
      
    


  }, []);

  return (
    <div className="w-screen h-auto overflow-x-hidden">
      <div  id="top-content" className="w-screen h-auto bg-white border-red-600 border-3 p-3 font-sans sticky top-0">
        <div className="z-0 w-180 mt-80 mr-100">
          <p className="flex items-start text-black text-2xl">ITS makes it easier than ever for businesses to book travel, control savings, reconcile charges and automate the expense process - all within a single, unified expereince.</p>
        </div>
        <div ref={mainContainerRef} className="justify-items-center align-items-center w-7xl h-170 -mt-100 border-1 bg-black rounded-3xl font-sans z-4 ">
          <h1 ref={mainHeadingRef} id="text-selected" className=" text-4xl m-70"></h1>
        </div>
      </div>
     
      <div  id="panel-content" className="w-screen h-auto bg-white border-red-600 border-3 p-3 grid grid-flow-col grid-rows-1 font-sans sticky top-0">
         <div id="" className="panel w-70 h-100 bg-black rounded-3xl col-span-1 "></div>
         <div id="" className="panel w-70 h-100 bg-black rounded-3xl col-span-1 "></div>
         <div id="" className="panel w-70 h-100 bg-black rounded-3xl col-span-1 "></div>
         <div id="" className="panel w-70 h-100 bg-black rounded-3xl col-span-1 "></div>  
      </div>

    </div>
  );
}


