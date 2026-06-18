import { useRef, useState, useEffect } from "react";

type Props = {
  onSave: (signatureDataUrl: string) => void;
  lang: "en" | "ne";
};

export default function SignaturePad({ onSave, lang }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [typedName, setTypedName] = useState("");
  const [drawMode, setDrawMode] = useState<"draw" | "type">("draw");

  // Keep track of paths for Undo functionality
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set high-res canvas scale
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;
    ctx.scale(2, 2);

    ctx.strokeStyle = "#0a2540";
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    // Clear canvas with white background (crucial for PDF export)
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const saveState = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setHistory((prev) => [...prev, canvas.toDataURL("image/png")]);
  };

  const getCoordinates = (e: any) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();

    let clientX = 0;
    let clientY = 0;

    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const startDrawing = (e: any) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Save previous state for undo before starting a new path
    saveState();

    const { x, y } = getCoordinates(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e: any) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.lineTo(x, y);
    ctx.stroke();

    // Trigger save callback in real-time
    onSave(canvas.toDataURL("image/png"));
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setHistory([]);
    onSave("");
  };

  const undo = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || history.length === 0) return;

    const previousStates = [...history];
    const prevStateDataUrl = previousStates.pop();
    setHistory(previousStates);

    if (prevStateDataUrl) {
      const img = new Image();
      img.onload = () => {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width / 2, canvas.height / 2);
        onSave(canvas.toDataURL("image/png"));
      };
      img.src = prevStateDataUrl;
    } else {
      clearCanvas();
    }
  };

  // Render cursive text onto the canvas for "Type" mode
  useEffect(() => {
    if (drawMode !== "type") return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (typedName) {
      ctx.fillStyle = "#0a2540";
      // Use standard cursive fonts in the browser
      ctx.font = "italic 32px 'Dancing Script', 'Brush Script MT', 'Cursive'";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(typedName, canvas.width / 4, canvas.height / 4);
    }
    
    // Trigger save callback
    onSave(canvas.toDataURL("image/png"));
  }, [typedName, drawMode]);

  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
      <div className="mb-3 flex items-center justify-between">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-600">
          {lang === "en" ? "Authorization Signature" : "अधिकृत दस्तखत"}
        </label>
        <div className="flex rounded-lg border border-slate-200 bg-white p-0.5 text-xs font-semibold text-slate-600">
          <button
            type="button"
            onClick={() => setDrawMode("draw")}
            className={`rounded-md px-2.5 py-1 transition-all ${
              drawMode === "draw"
                ? "bg-[#0a2540] text-white"
                : "hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            {lang === "en" ? "Draw" : "कोर्नुहोस्"}
          </button>
          <button
            type="button"
            onClick={() => setDrawMode("type")}
            className={`rounded-md px-2.5 py-1 transition-all ${
              drawMode === "type"
                ? "bg-[#0a2540] text-white"
                : "hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            {lang === "en" ? "Type" : "टाइप"}
          </button>
        </div>
      </div>

      <div className="relative">
        {drawMode === "draw" ? (
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
            className="h-36 w-full touch-none rounded-lg border border-dashed border-slate-300 bg-white cursor-crosshair"
            style={{ width: "100%", height: "144px" }}
          />
        ) : (
          <div className="space-y-3">
            <input
              type="text"
              placeholder={lang === "en" ? "Type your full name..." : "आफ्नो पूरा नाम टाइप गर्नुहोस्..."}
              value={typedName}
              onChange={(e) => setTypedName(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-[#0a2540] focus:ring-2 focus:ring-[#0a2540]/10"
            />
            <canvas
              ref={canvasRef}
              className="h-24 w-full rounded-lg border border-dashed border-slate-300 bg-white"
              style={{ width: "100%", height: "96px", pointerEvents: "none" }}
            />
          </div>
        )}

        {/* Floating controls for drawing */}
        {drawMode === "draw" && (
          <div className="absolute bottom-2 right-2 flex gap-1.5">
            <button
              type="button"
              onClick={undo}
              disabled={history.length === 0}
              className="rounded bg-white/95 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-600 shadow border border-slate-200 hover:bg-slate-100 disabled:opacity-50"
            >
              {lang === "en" ? "Undo" : "अघिल्लो"}
            </button>
            <button
              type="button"
              onClick={clearCanvas}
              className="rounded bg-white/95 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-red-600 shadow border border-slate-200 hover:bg-red-50"
            >
              {lang === "en" ? "Clear" : "मेट्नुहोस्"}
            </button>
          </div>
        )}
      </div>
      <p className="mt-2 text-[10px] text-slate-400 text-center">
        {lang === "en"
          ? "This digital signature will be embedded in your official service agreement PDF."
          : "यो डिजिटल हस्ताक्षर तपाईंको आधिकारिक सेवा सम्झौता PDF मा इम्बेड गरिनेछ।"}
      </p>
    </div>
  );
}
