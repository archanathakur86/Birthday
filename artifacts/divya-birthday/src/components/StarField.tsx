import { useEffect, useRef } from 'react';

export function StarField({ speed = 1 }: { speed?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const stars = Array.from({ length: 400 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      z: Math.random() * width,
      o: Math.random(),
      size: Math.random() * 1.5 + 0.5
    }));

    let animationFrameId: number;

    const render = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      stars.forEach(star => {
        star.z -= speed * 2;
        if (star.z <= 0) {
          star.x = Math.random() * width;
          star.y = Math.random() * height;
          star.z = width;
        }

        const k = 128.0 / star.z;
        const px = (star.x - cx) * k + cx;
        const py = (star.y - cy) * k + cy;

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          const size = (1 - star.z / width) * 3;
          ctx.beginPath();
          ctx.arc(px, py, size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${star.o})`;
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };
    render();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [speed]);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />;
}
