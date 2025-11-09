import { useRef } from 'react'

export function useAbortController() {
  const abortControllerRef = useRef<AbortController | null>(null)

  const newAbortController = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    abortControllerRef.current = new AbortController()
    return abortControllerRef.current
  }

  const cleanup = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
      abortControllerRef.current = null
    }
  }

  return { newAbortController, cleanup }
}