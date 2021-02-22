import { useState } from "react";

/**
 * Custom hook
 */
export default function useVisualMode(initialMode) {
  const [mode, setMode] = useState(initialMode);

  /**
   * Transition function to update the existing state with a new value.
   * @param {*} newMode
   */
  const transition = (newMode) => {
    setMode(newMode);
  };

  return {mode, transition};
};