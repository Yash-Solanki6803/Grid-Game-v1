// src/Grid.js
import { useRef, useEffect, useState } from "react";

const Grid = () => {
  const canvasRef = useRef(null);
  const [lines, setLines] = useState([]);

  const drawGrid = (ctx) => {
    const dotRadius = 5;
    const spacing = 40;

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const x = spacing * (i + 1);
        const y = spacing * (j + 1);
        ctx.beginPath();
        ctx.arc(x, y, dotRadius, 0, 2 * Math.PI);
        ctx.fill();
      }
    }
  };

  const drawLines = (ctx) => {
    ctx.strokeStyle = "black";
    lines.forEach(([start, end]) => {
      ctx.beginPath();
      ctx.moveTo(start.x, start.y);
      ctx.lineTo(end.x, end.y);
      ctx.stroke();
    });
  };

  const handleCanvasClick = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const spacing = 40;

    // Find nearest dot
    const nearestDot = {
      x: Math.round(x / spacing) * spacing,
      y: Math.round(y / spacing) * spacing,
    };

    if (lines.length > 0) {
      const lastLine = lines[lines.length - 1];
      if (
        (Math.abs(nearestDot.x - lastLine[0].x) === spacing &&
          nearestDot.y === lastLine[0].y) ||
        (Math.abs(nearestDot.y - lastLine[0].y) === spacing &&
          nearestDot.x === lastLine[0].x)
      ) {
        setLines([...lines, [lastLine[1], nearestDot]]);
      } else {
        setLines([...lines, [nearestDot, nearestDot]]);
      }
    } else {
      setLines([...lines, [nearestDot, nearestDot]]);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid(ctx);
    drawLines(ctx);
  }, [lines]);

  return (
    <canvas
      ref={canvasRef}
      width={500}
      height={500}
      onClick={handleCanvasClick}
    />
  );
};

export default Grid;
