import { useCallback, useRef, useState } from "react";
import axios from "axios";

function App() {
  const [isDrawing, setIsDrawing] = useState(false);
  const [prediction, setPrediction] = useState<number>();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const onMouseDown: React.MouseEventHandler<HTMLCanvasElement> = useCallback(
    (ev) => {
      setIsDrawing(true);
      const context = ev.currentTarget.getContext("2d");

      if (!context) return;
      context.lineWidth = 12;
      context.lineCap = "round";
      context.strokeStyle = "#ffffff";

      context.moveTo(
        ev.clientX - ev.currentTarget.offsetLeft,
        ev.clientY - ev.currentTarget.offsetTop
      );
    },
    []
  );

  const onMouseMove: React.MouseEventHandler<HTMLCanvasElement> = useCallback(
    (ev) => {
      if (!isDrawing) return;

      const context = ev.currentTarget.getContext("2d");
      context?.lineTo(
        ev.clientX - ev.currentTarget.offsetLeft,
        ev.clientY - ev.currentTarget.offsetTop
      );
      context?.stroke();
    },
    [isDrawing]
  );

  const onMouseUp: React.MouseEventHandler<HTMLCanvasElement> = useCallback(
    (ev) => {
      setIsDrawing(false);
      const context = ev.currentTarget.getContext("2d");
      if (!context) return;

      context.stroke();
      context.beginPath();
    },
    []
  );

  const onPredict = useCallback(() => {
    const context = canvasRef.current?.getContext("2d");
    if (!context) return;

    const img = new Image();
    img.onload = async function () {
      const osCanvasContext = new OffscreenCanvas(28, 28).getContext("2d");
      if (!osCanvasContext) return;

      osCanvasContext.drawImage(img, 0, 0, 28, 28);
      const data = osCanvasContext.getImageData(0, 0, 28, 28).data;
      const input = [];
      for (let i = 0; i < data.length; i += 4) {
        input.push(data[i + 3] / 255);
      }
      const newPrediction = await axios.post<number>(
        "http://localhost:3000/",
        input
      );
      setPrediction(newPrediction.data);
    };
    img.src = context.canvas.toDataURL("image/png");
  }, []);

  const onClear = useCallback(() => {
    if (!canvasRef.current) return;
    const c = canvasRef.current;
    c.getContext("2d")?.clearRect(0, 0, c.width, c.height);
  }, []);

  return (
    <>
      <h1>Digit Recognition App</h1>

      <div style={{ display: "flex", gap: "16px" }}>
        <canvas
          ref={canvasRef}
          width={"112px"}
          height={"112px"}
          style={{ background: "black" }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseUp}
          onMouseUp={onMouseUp}
        />
        <h1>Prediction: {prediction !== undefined ? prediction : "NA"}</h1>
      </div>

      <div>
        <button onClick={onClear}>Clear</button>
        <button onClick={onPredict}>Predict</button>
      </div>
    </>
  );
}

export default App;
