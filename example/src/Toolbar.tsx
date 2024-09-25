import React, { useEffect, useRef, useState } from "react";

import "./style/Toolbar.css";

interface ToolbarProps {
  setPdfScaleValue: (value: number) => void;
  currentPageNumber: number;
  setCurrentPageNumber: (pageNumber: number) => void;
  totalPages: number;
}

const Toolbar = ({
  setPdfScaleValue,
  currentPageNumber,
  setCurrentPageNumber,
  totalPages,
}: ToolbarProps) => {
  const currentPageNumberRef = useRef<HTMLInputElement>(null);
  const [zoom, setZoom] = useState<number | null>(null);

  const zoomIn = () => {
    if (zoom) {
      if (zoom < 4) {
        setPdfScaleValue(zoom + 0.1);
        setZoom(zoom + 0.1);
      }
    } else {
      setPdfScaleValue(1);
      setZoom(1);
    }
  };

  const zoomOut = () => {
    if (zoom) {
      if (zoom > 0.2) {
        setPdfScaleValue(zoom - 0.1);
        setZoom(zoom - 0.1);
      }
    } else {
      setPdfScaleValue(1);
      setZoom(1);
    }
  };

  useEffect(() => {
    if (currentPageNumberRef.current) {
      currentPageNumberRef.current.value = currentPageNumber.toString();
    }
  });

  return (
    <div className="Toolbar">
      <div className="ZoomControls">
        <button onClick={zoomIn}>+</button>
        <button onClick={zoomOut}>-</button>
        {zoom ? `${(zoom * 100).toFixed(0)}%` : "Auto"}
      </div>
      <div>
        Page{" "}
        <input
          ref={currentPageNumberRef}
          //TODO:make sure it's a number
          onChange={(e) => {
            debugger;
            setCurrentPageNumber(parseInt(e.target.value));
          }}
        />{" "}
        of {totalPages}
      </div>
    </div>
  );
};

export default Toolbar;
