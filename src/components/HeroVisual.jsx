import React, { useRef, useEffect, useState } from "react";

const HeroVisual = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const setupCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      return { width: rect.width, height: rect.height };
    };

    let { width, height } = setupCanvas();

    const handleResize = () => {
      const dims = setupCanvas();
      width = dims.width;
      height = dims.height;
    };

    window.addEventListener("resize", handleResize);

    // Generate 3D sphere points (Fibonacci Sphere in Metallic Monochrome)
    const numPoints = 145;
    const points = [];
    const radius = Math.min(width, height) * 0.34;

    for (let i = 0; i < numPoints; i++) {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / numPoints);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      points.push({
        baseX: radius * Math.sin(phi) * Math.cos(theta),
        baseY: radius * Math.sin(phi) * Math.sin(theta),
        baseZ: radius * Math.cos(phi),
        size: Math.random() * 2 + 1.2,
        isHighlight: i % 4 === 0,
      });
    }

    let angleX = 0;
    let angleY = 0;
    let targetAngleX = 0;
    let targetAngleY = 0;
    let isDragging = false;
    let lastPointerPos = { x: 0, y: 0 };

    const render = (time) => {
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // Smooth physics lerp
      angleX += (targetAngleX - angleX) * 0.06 + 0.002;
      angleY += (targetAngleY - angleY) * 0.06 + 0.003;

      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);

      // Projected points
      const projected = [];

      for (let i = 0; i < points.length; i++) {
        const p = points[i];

        // Pulse effect
        const pulse = 1 + Math.sin(time * 0.0025 + i * 0.08) * 0.045;
        const px = p.baseX * pulse;
        const py = p.baseY * pulse;
        const pz = p.baseZ * pulse;

        // 3D Rotations (Y then X)
        const x1 = px * cosY - pz * sinY;
        const z1 = pz * cosY + px * sinY;

        const y1 = py * cosX - z1 * sinX;
        const z2 = z1 * cosX + py * sinX;

        // Perspective projection
        const fov = 420;
        const scale = fov / (fov + z2 + 160);
        const x2d = x1 * scale + cx;
        const y2d = y1 * scale + cy;

        projected.push({
          x: x2d,
          y: y2d,
          z: z2,
          scale,
          size: p.size * scale,
          isHighlight: p.isHighlight,
        });
      }

      // Draw connecting lines between nearby points in pure metallic white
      ctx.lineWidth = 0.8;
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const p1 = projected[i];
          const p2 = projected[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 68) {
            const alpha = (1 - dist / 68) * 0.28 * Math.min(p1.scale, p2.scale);
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Sort points by depth (back to front)
      projected.sort((a, b) => b.z - a.z);

      // Draw nodes
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        const depthAlpha = Math.max(0.18, (p.z + radius) / (2 * radius));

        // Soft outer specular glow
        const glowRadius = Math.max(1, p.size * 3.5);
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowRadius);
        grad.addColorStop(0, `rgba(255, 255, 255, ${depthAlpha * (p.isHighlight ? 0.9 : 0.6)})`);
        grad.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();

        // High-contrast central core
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(1, depthAlpha + 0.4)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(1, p.size * 0.95), 0, Math.PI * 2);
        ctx.fill();
      }

      // Outer glowing orbital dashed rings in crisp silver/white
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(time * 0.0006);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.22)";
      ctx.lineWidth = 1.2;
      ctx.setLineDash([8, 14]);
      ctx.beginPath();
      ctx.ellipse(0, 0, radius * 1.38, radius * 0.65, Math.PI / 5, 0, Math.PI * 2);
      ctx.stroke();

      ctx.rotate(-time * 0.001);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.14)";
      ctx.setLineDash([6, 16]);
      ctx.beginPath();
      ctx.ellipse(0, 0, radius * 1.25, radius * 0.55, -Math.PI / 4, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    const handlePointerMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      if (isDragging) {
        const deltaX = (e.clientX - lastPointerPos.x) * 0.01;
        const deltaY = (e.clientY - lastPointerPos.y) * 0.01;
        targetAngleY += deltaX;
        targetAngleX -= deltaY;
        lastPointerPos = { x: e.clientX, y: e.clientY };
      } else {
        targetAngleY = x * 1.6;
        targetAngleX = -y * 1.6;
      }
    };

    const handlePointerDown = (e) => {
      isDragging = true;
      lastPointerPos = { x: e.clientX, y: e.clientY };
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    const handlePointerLeave = () => {
      isDragging = false;
      targetAngleX = 0;
      targetAngleY = 0;
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("pointermove", handlePointerMove, { passive: true });
      container.addEventListener("pointerdown", handlePointerDown, { passive: true });
      window.addEventListener("pointerup", handlePointerUp, { passive: true });
      container.addEventListener("pointerleave", handlePointerLeave, { passive: true });
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      if (container) {
        container.removeEventListener("pointermove", handlePointerMove);
        container.removeEventListener("pointerdown", handlePointerDown);
        window.removeEventListener("pointerup", handlePointerUp);
        container.removeEventListener("pointerleave", handlePointerLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[400px] sm:h-[480px] lg:h-[540px] flex items-center justify-center select-none touch-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* High-DPI Crisp 60/120FPS Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      />

      {/* Floating Glass Chips - Clean & Minimalist Monochrome Design */}
      <div
        className="absolute top-4 sm:top-8 left-2 sm:left-6 px-3.5 sm:px-4 py-2.5 rounded-xl sm:rounded-2xl border border-white/10 bg-[#09090b]/85 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.6)] flex items-center gap-3 transition-transform duration-500 hover:scale-105 pointer-events-auto"
        style={{
          transform: isHovered ? "translateY(-4px)" : "translateY(0)",
        }}
      >
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
        </span>
        <div className="flex flex-col">
          <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-zinc-400 font-mono">Model Stack</span>
          <span className="text-xs sm:text-sm font-semibold text-white">PyTorch • YOLO • LLMs</span>
        </div>
      </div>

      <div
        className="absolute bottom-6 sm:bottom-10 right-2 sm:right-6 px-3.5 sm:px-4 py-2.5 rounded-xl sm:rounded-2xl border border-white/10 bg-[#09090b]/85 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.6)] flex items-center gap-3 transition-transform duration-500 hover:scale-105 pointer-events-auto"
        style={{
          transform: isHovered ? "translateY(4px)" : "translateY(0)",
        }}
      >
        <span className="text-white text-sm">✦</span>
        <div className="flex flex-col">
          <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-zinc-400 font-mono">Performance</span>
          <span className="text-xs sm:text-sm font-semibold text-white">60 FPS Hardware Rendered</span>
        </div>
      </div>
    </div>
  );
};

export default React.memo(HeroVisual);
