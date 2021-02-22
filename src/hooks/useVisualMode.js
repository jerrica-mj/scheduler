import { useState } from "react";

/**
 * Custom hook
 */
export default function useVisualMode(initialMode) {
  const [mode, setMode] = useState(initialMode);

  return {mode};
};