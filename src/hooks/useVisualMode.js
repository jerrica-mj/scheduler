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
   * @param {*} newMode The new value to be set as the state.
   * @param {Boolean} replace Boolean to determine whether to replace the previous state in the history with the new value.
   */
  const transition = (newMode, replace = false) => {
    setMode(newMode);
    if(replace) {
      setHistory((prev) => {
        prev.pop();
        prev.push(newMode);
        return prev;
      });
    } else {
      setHistory(prev => [...prev, newMode]);
    }
  };

  /**
   * Update the current mode state to the previous state value, per the mode state history array. Remove the last history array element as the mode is transitioned backwards.
   */
  const back = () => {
    // do not go back beyond the initialMode
    if(history.length > 1) {
      setHistory(prev => {
        const prevMode = prev[prev.length - 2];
        setMode(prevMode);
        return [...prev.slice(0, prev.length - 1)]
      });
      // const prevMode = history[history.length - 2];
      // setHistory([...history.slice(0, history.length-1)]);
      // setMode(prevMode);
    }
  };

  return {mode, transition, back};
};