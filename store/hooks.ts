import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "./store";
import { useEffect, useRef } from "react";

export const useTypedDispatch = () => useDispatch<AppDispatch>();

export const useTypedSelector: TypedUseSelectorHook<AppState> = useSelector;

export const useObserver = (ref, canLoad, isLoading, callback) => {
  const observer = useRef(null);

  useEffect(() => {
    if (isLoading) return;

    if (observer.current) observer.current.disconnect();

    const cb = function (entries) {
      if (entries[0].isIntersecting && canLoad) {
        callback();
      }
    };

    observer.current = new IntersectionObserver(cb);
    observer.current.observe(ref.current);
  }, [isLoading]);
};
