import { useEffect, useState } from "react";

export function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  // Monitorando o tamanho da janela
  useEffect(() => {
    function handleResizeWindow() {
      setWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResizeWindow)

    return () => {
      window.removeEventListener('resize', handleResizeWindow)
    }
  }, [])

  return width;
}
