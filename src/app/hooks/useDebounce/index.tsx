import { ChangeEvent, useState, useEffect, useRef } from "react";
export default function useDebounce(
  callback: (...args: any[]) => void,
  waitTime: number
) {
  //timer as ueref is not updated on every rerender
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  return (...args: any[]) => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      callback(...args);
    }, waitTime);
  };
}
