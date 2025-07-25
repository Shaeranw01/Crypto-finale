import { useState } from "react";

export default function useLocalState(key, initialValue) {
  const storedValue =
    typeof window !== "undefined" ? localStorage.getItem(key) : null;

  const item = storedValue ? JSON.parse(storedValue) : initialValue;

  const [state, setState] = useState(item);

  const updateState = (value) => {
    window.localStorage.setItem(key, JSON.stringify(value));
    setState(value);
  };
  return [state, updateState];
}
