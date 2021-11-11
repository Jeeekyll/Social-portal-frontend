import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { AppDispatch, AppState } from "./store"
import { MutableRefObject, useEffect, useRef, useState } from "react"

//redux typed dispatch
export const useTypedDispatch = () => useDispatch<AppDispatch>()

//redux typed selector
export const useTypedSelector: TypedUseSelectorHook<AppState> = useSelector

//observer to download feed
export const useObserver = (ref, canLoad, isLoading, callback) => {
  const observer = useRef(null)

  useEffect(() => {
    if (isLoading) return

    if (observer.current) observer.current.disconnect()

    const cb = function (entries) {
      if (entries[0].isIntersecting && canLoad) {
        callback()
      }
    }

    observer.current = new IntersectionObserver(cb)
    observer.current.observe(ref.current)
  }, [isLoading])
}

//observer to define element on screen
export const useElementOnScreen = (
  options
): [MutableRefObject<HTMLDivElement>, boolean] => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState<boolean>(false)

  const callback = (entries) => {
    const [entry] = entries
    setIsVisible(entry.isIntersecting)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(callback, options)
    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current)
      }
    }
  }, [containerRef, options])

  return [containerRef, isVisible]
}

export const usePrevious = <T>(value: T): T | undefined => {
  const ref = useRef<T>()

  useEffect(() => {
    ref.current = value
  })

  return ref.current
}
