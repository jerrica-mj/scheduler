import { useState } from "react";

/**
 * Custom hook
 */
export default function useVisualMode(initialMode) {
  const [mode, setMode] = useState(initialMode);
  // use a stateful array to keep track of the history of mode values.
  const [history, setHistory] = useState([initialMode]);

  /**
   * Transition function to update the existing state with a new value, and add this new value to the state history array.
   * @param {*} newMode
   */
  const transition = (newMode) => {
    setMode(newMode);
    setHistory([...history, newMode]);
  };

  /**
   * Update the current mode state to the previous state value, per the mode state history array. Remove the last history array element as the mode is transitioned backwards.
   */
  const back = () => {
    setHistory([...history.slice(0, history.length-1)]);
    const prevMode = history[history.length - 2];
    setMode(prevMode);
  };

  return {mode, transition, back};
};