import { useEffect, useRef, useCallback } from "react";
import { animate, remove } from "animejs";

/**
 * useAntigravity - High-performance hook for zero-gravity floating animations with
 * hardware acceleration, IntersectionObserver viewport gating, visibilitychange pausing,
 * and interactive magnetic 3D tilt.
 *
 * @param {Object} options
 * @param {number} [options.floatY=8] - Max vertical float distance (px)
 * @param {number} [options.floatX=4] - Max horizontal float distance (px)
 * @param {number} [options.rotZ=3] - Max Z rotation (degrees)
 * @param {number} [options.rotX=4] - Max X tilt (degrees)
 * @param {number} [options.rotY=4] - Max Y tilt (degrees)
 * @param {number} [options.duration=3200] - Base cycle duration (ms)
 * @param {number} [options.delay=0] - Stagger/delay offset (ms)
 * @param {boolean} [options.enableTilt=true] - Enable interactive mouse/touch 3D tilt
 * @param {number} [options.tiltStrength=12] - Max tilt on hover (degrees)
 * @param {number} [options.hoverLift=12] - Extra lift on hover (px)
 */
export const useAntigravity = ({
  floatY = 8,
  floatX = 4,
  rotZ = 3,
  rotX = 4,
  rotY = 4,
  duration = 3200,
  delay = 0,
  enableTilt = true,
  tiltStrength = 12,
  hoverLift = 10,
} = {}) => {
  const containerRef = useRef(null);
  const elementRef = useRef(null);
  const animInstanceRef = useRef(null);
  const isIntersectingRef = useRef(false);
  const isHoveredRef = useRef(false);
  const tiltRafRef = useRef(null);

  // Current interpolated tilt state for buttery smooth mouse interaction
  const tiltStateRef = useRef({
    currRotX: 0,
    currRotY: 0,
    targetRotX: 0,
    targetRotY: 0,
    currElev: 0,
    targetElev: 0,
  });

  // Setup core anime.js antigravity float loop
  const startFloatAnimation = useCallback(() => {
    if (!elementRef.current) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      return;
    }

    // Add unique randomized harmonic perturbation for organic feel
    const randomDuration = duration + (Math.random() * 800 - 400);
    const randomDelay = delay || Math.random() * 1000;
    const randomizedFloatY = floatY + (Math.random() * 4 - 2);
    const randomizedFloatX = floatX + (Math.random() * 2 - 1);
    const randomizedRotZ = rotZ + (Math.random() * 2 - 1);

    // Stop existing instance before starting new
    if (animInstanceRef.current) {
      try {
        animInstanceRef.current.pause();
      } catch {
        // ignore
      }
    }

    try {
      animInstanceRef.current = animate(elementRef.current, {
        translateY: [
          { to: -randomizedFloatY, duration: randomDuration * 0.5, ease: "inOutSine" },
          { to: randomizedFloatY * 0.8, duration: randomDuration * 0.5, ease: "inOutSine" },
          { to: 0, duration: randomDuration * 0.5, ease: "inOutSine" },
        ],
        translateX: [
          { to: randomizedFloatX, duration: randomDuration * 0.6, ease: "inOutQuad" },
          { to: -randomizedFloatX, duration: randomDuration * 0.6, ease: "inOutQuad" },
          { to: 0, duration: randomDuration * 0.6, ease: "inOutQuad" },
        ],
        rotateZ: [
          { to: randomizedRotZ, duration: randomDuration * 0.7, ease: "inOutSine" },
          { to: -randomizedRotZ, duration: randomDuration * 0.7, ease: "inOutSine" },
          { to: 0, duration: randomDuration * 0.7, ease: "inOutSine" },
        ],
        rotateX: [
          { to: rotX, duration: randomDuration * 0.8, ease: "inOutSine" },
          { to: -rotX, duration: randomDuration * 0.8, ease: "inOutSine" },
          { to: 0, duration: randomDuration * 0.8, ease: "inOutSine" },
        ],
        rotateY: [
          { to: -rotY, duration: randomDuration * 0.9, ease: "inOutSine" },
          { to: rotY, duration: randomDuration * 0.9, ease: "inOutSine" },
          { to: 0, duration: randomDuration * 0.9, ease: "inOutSine" },
        ],
        loop: true,
        delay: randomDelay,
      });
    } catch (err) {
      console.warn("Anime.js float initialization fallback:", err);
    }
  }, [floatY, floatX, rotZ, rotX, rotY, duration, delay]);

  const pauseAnimation = useCallback(() => {
    if (animInstanceRef.current) {
      try {
        animInstanceRef.current.pause();
      } catch {
        // ignore
      }
    }
  }, []);

  const resumeAnimation = useCallback(() => {
    if (
      animInstanceRef.current &&
      isIntersectingRef.current &&
      !document.hidden &&
      !isHoveredRef.current
    ) {
      try {
        animInstanceRef.current.play();
      } catch {
        // ignore
      }
    }
  }, []);

  // Smooth lerp loop for magnetic tilt & depth
  const updateTiltPhysics = useCallback(() => {
    const s = tiltStateRef.current;
    // Damping factor for spring feel
    const factor = isHoveredRef.current ? 0.12 : 0.08;

    s.currRotX += (s.targetRotX - s.currRotX) * factor;
    s.currRotY += (s.targetRotY - s.currRotY) * factor;
    s.currElev += (s.targetElev - s.currElev) * factor;

    if (containerRef.current) {
      containerRef.current.style.transform = `perspective(1000px) rotateX(${s.currRotX.toFixed(
        2
      )}deg) rotateY(${s.currRotY.toFixed(2)}deg) translate3d(0, ${-s.currElev.toFixed(
        2
      )}px, 0)`;
    }

    // Keep ticking while hovered or until settled
    const isMoving =
      Math.abs(s.targetRotX - s.currRotX) > 0.02 ||
      Math.abs(s.targetRotY - s.currRotY) > 0.02 ||
      Math.abs(s.targetElev - s.currElev) > 0.02;

    if (isHoveredRef.current || isMoving) {
      tiltRafRef.current = requestAnimationFrame(updateTiltPhysics);
    } else {
      tiltRafRef.current = null;
      if (containerRef.current) {
        containerRef.current.style.transform = "";
      }
      // Resume floating once tilt settles
      if (isIntersectingRef.current && !document.hidden) {
        resumeAnimation();
      }
    }
  }, [resumeAnimation]);

  const handlePointerMove = useCallback(
    (e) => {
      if (!enableTilt || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const normX = (x / rect.width - 0.5) * 2; // -1 to 1
      const normY = (y / rect.height - 0.5) * 2; // -1 to 1

      tiltStateRef.current.targetRotY = normX * tiltStrength;
      tiltStateRef.current.targetRotX = -normY * tiltStrength;
      tiltStateRef.current.targetElev = hoverLift;

      if (!tiltRafRef.current) {
        tiltRafRef.current = requestAnimationFrame(updateTiltPhysics);
      }
    },
    [enableTilt, tiltStrength, hoverLift, updateTiltPhysics]
  );

  const handlePointerEnter = useCallback(() => {
    isHoveredRef.current = true;
    tiltStateRef.current.targetElev = hoverLift;
    if (!tiltRafRef.current) {
      tiltRafRef.current = requestAnimationFrame(updateTiltPhysics);
    }
  }, [hoverLift, updateTiltPhysics]);

  const handlePointerLeave = useCallback(() => {
    isHoveredRef.current = false;
    tiltStateRef.current.targetRotX = 0;
    tiltStateRef.current.targetRotY = 0;
    tiltStateRef.current.targetElev = 0;
    if (!tiltRafRef.current) {
      tiltRafRef.current = requestAnimationFrame(updateTiltPhysics);
    }
  }, [updateTiltPhysics]);

  useEffect(() => {
    const target = containerRef.current || elementRef.current;
    if (!target) return;

    // Start animation once mounted
    startFloatAnimation();

    // 1. Intersection Observer for smart viewport gating
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isIntersectingRef.current = entry.isIntersecting;
          if (entry.isIntersecting) {
            resumeAnimation();
          } else {
            pauseAnimation();
          }
        });
      },
      {
        root: null,
        rootMargin: "80px 0px 80px 0px",
        threshold: 0.05,
      }
    );

    observer.observe(target);

    // 2. Visibility change for background tab optimization
    const handleVisibilityChange = () => {
      if (document.hidden) {
        pauseAnimation();
      } else if (isIntersectingRef.current) {
        resumeAnimation();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // 3. Pointer event listeners for tilt
    const container = containerRef.current;
    const element = elementRef.current;
    if (container && enableTilt) {
      container.addEventListener("pointermove", handlePointerMove, { passive: true });
      container.addEventListener("pointerenter", handlePointerEnter, { passive: true });
      container.addEventListener("pointerleave", handlePointerLeave, { passive: true });
    }

    // Cleanup on unmount to prevent memory leaks
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);

      if (container && enableTilt) {
        container.removeEventListener("pointermove", handlePointerMove);
        container.removeEventListener("pointerenter", handlePointerEnter);
        container.removeEventListener("pointerleave", handlePointerLeave);
      }

      if (tiltRafRef.current) {
        cancelAnimationFrame(tiltRafRef.current);
      }

      if (animInstanceRef.current) {
        try {
          animInstanceRef.current.pause();
        } catch {
          // ignore
        }
      }

      if (element) {
        try {
          remove(element);
        } catch {
          // ignore
        }
      }
    };
  }, [
    startFloatAnimation,
    pauseAnimation,
    resumeAnimation,
    enableTilt,
    handlePointerMove,
    handlePointerEnter,
    handlePointerLeave,
  ]);

  return {
    containerRef,
    elementRef,
    pauseAnimation,
    resumeAnimation,
  };
};

export default useAntigravity;
