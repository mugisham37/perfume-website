"use client";
import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type FadeInProps = {
  children: React.ReactNode;
  vars?: gsap.TweenVars;
  start?: string;
  end?: string;
  className?: string;
  stagger?: number;
  delay?: number;
  duration?: number;
  ease?: string;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
};

export const FadeIn = ({
  children,
  start = "top 80%",
  end = "bottom 20%",
  vars = {},
  className,
  stagger = 0,
  delay = 0,
  duration = 1,
  ease = "power3.out",
  direction = "up",
  distance = 50,
}: FadeInProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Get initial transform values based on direction
      const getInitialTransform = () => {
        switch (direction) {
          case "up":
            return { y: distance };
          case "down":
            return { y: -distance };
          case "left":
            return { x: distance };
          case "right":
            return { x: -distance };
          case "none":
          default:
            return {};
        }
      };

      const getFinalTransform = () => {
        switch (direction) {
          case "up":
          case "down":
            return { y: 0 };
          case "left":
          case "right":
            return { x: 0 };
          case "none":
          default:
            return {};
        }
      };

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Set initial state
        gsap.set(containerRef.current, {
          opacity: 0,
          ...getInitialTransform(),
        });

        // Animate to final state
        gsap.to(containerRef.current, {
          duration,
          opacity: 1,
          ease,
          delay,
          stagger,
          ...getFinalTransform(),
          ...vars,
          scrollTrigger: {
            trigger: containerRef.current,
            start,
            end,
            toggleActions: "play none none reverse",
          },
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(containerRef.current, {
          opacity: 0,
        });

        gsap.to(containerRef.current, {
          duration: 0.1,
          opacity: 1,
          ease: "none",
          delay: 0,
          scrollTrigger: {
            trigger: containerRef.current,
            start,
            toggleActions: "play none none reverse",
          },
        });
      });

      return () => {
        mm.revert();
      };
    },
    { scope: containerRef },
  );

  return (
    <div 
      ref={containerRef} 
      className={clsx("will-change-transform", className)}
    >
      {children}
    </div>
  );
};
