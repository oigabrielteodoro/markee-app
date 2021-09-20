import React, { useEffect, useState, useRef } from 'react'
import marked from 'marked'

import { useArchive } from 'context'

import('highlight.js').then((hljs) => {
  const h = hljs.default

  marked.setOptions({
    highlight: (code, language) => {
      if (language && h.getLanguage(language)) {
        return h.highlight(code, { language }).value
      }

      return h.highlightAuto(code).value
    },
    breaks: true,
    gfm: true,
    xhtml: true,
  })
})

export function useContent() {
  const typeAreaRef = useRef<HTMLDivElement>(null)

  const inputRef = useRef<HTMLInputElement>(null)
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  const [isDragging, setIsDragging] = useState(true)
  const [typeAreaWidth, setTypeAreaWidth] = useState<number>()
  const [separatorPosition, setSeparatorPosition] = useState<number>()

  const { archive, updateArchive } = useArchive()

  useEffect(() => {
    if (archive && inputRef.current && textAreaRef.current) {
      inputRef.current.value = archive.title
      textAreaRef.current.value = archive.content
    }
  }, [archive])

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

  function onUpdateTitle(value: string) {
    if (!archive) return

    updateArchive({
      id: archive?.id,
      title: value,
    })
  }

  function onUpdateContent(value: string) {
    if (!archive) return

    updateArchive({
      id: archive.id,
      content: value,
    })
  }

  return {
    archive,
    inputRef,
    typeAreaWidth,
    typeAreaRef,
    textAreaRef,
    onMouseDown,
    onUpdateTitle,
    onUpdateContent,
  }
}
