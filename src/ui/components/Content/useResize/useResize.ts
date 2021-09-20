import React, { useEffect, useState, useRef } from 'react'

export function useResize() {
  const typeAreaRef = useRef<HTMLDivElement>(null)

  const [isDragging, setIsDragging] = useState(true)
  const [typeAreaWidth, setTypeAreaWidth] = useState<number>()
  const [separatorPosition, setSeparatorPosition] = useState<number>()

  useEffect(() => {
    if (typeAreaRef.current) {
      if (!typeAreaWidth) {
        return setTypeAreaWidth(typeAreaRef.current.clientWidth)
      }
    }
  }, [typeAreaWidth])

  useEffect(() => {
    const onMouseMove = (event: MouseEvent) => {
      if (isDragging && typeAreaWidth && separatorPosition) {
        const newTypeAreaWidth =
          typeAreaWidth + event.clientX - separatorPosition

        setSeparatorPosition(event.clientX)
        setTypeAreaWidth(newTypeAreaWidth)
      }
    }

    const onMouseUp = () => {
      setIsDragging(false)
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
    }
  }, [isDragging, typeAreaWidth, separatorPosition])

  function onMouseDown(event: React.MouseEvent) {
    setIsDragging(true)
    setSeparatorPosition(event.clientX)
  }

  return {
    typeAreaWidth,
    typeAreaRef,
    onMouseDown,
  }
}
