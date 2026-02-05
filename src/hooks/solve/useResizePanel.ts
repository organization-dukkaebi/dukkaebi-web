import { useState, useEffect, useRef, type RefObject } from "react";

interface UseResizePanelProps {
  isSidebarOpen?: boolean;
  sidebarWidth?: number;
}

interface UseResizePanelReturn {
  containerRef: RefObject<HTMLDivElement | null>;
  rightPanelWidth: number;
  isResizing: boolean;
  terminalHeight: number;
  startResizing: () => void;
}

export function useResizePanel({
  isSidebarOpen = false,
  sidebarWidth = 250,
}: UseResizePanelProps = {}): UseResizePanelReturn {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [rightPanelWidth, setRightPanelWidth] = useState(65);
  const [isResizing, setIsResizing] = useState(false);
  const [terminalHeight, setTerminalHeight] = useState(200);

  useEffect(() => {
    if (!isResizing) return;

    const handleMouseMove = (event: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();

      const currentSidebarWidth = isSidebarOpen ? sidebarWidth : 0;
      const availableWidth = rect.width - currentSidebarWidth;

      const relativeX = event.clientX - rect.left;
      const rightWidthPercent =
        ((availableWidth - relativeX) / availableWidth) * 100;

      const clampedWidth = Math.min(80, Math.max(20, rightWidthPercent));
      setRightPanelWidth(clampedWidth);
    };

    const stopResizing = () => setIsResizing(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", stopResizing);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [isResizing, isSidebarOpen, sidebarWidth]);

  useEffect(() => {
    const updateTerminalHeight = () => {
      if (!containerRef.current) return;
      const { height } = containerRef.current.getBoundingClientRect();
      const desiredHeight = Math.max(180, Math.min(height * 0.3, height - 160));
      setTerminalHeight(desiredHeight);
    };

    updateTerminalHeight();
    window.addEventListener("resize", updateTerminalHeight);
    return () => window.removeEventListener("resize", updateTerminalHeight);
  }, []);

  const startResizing = () => setIsResizing(true);

  return {
    containerRef,
    rightPanelWidth,
    isResizing,
    terminalHeight,
    startResizing,
  };
}
