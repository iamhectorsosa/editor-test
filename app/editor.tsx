"use client"

import * as React from "react"
import { IBM_Plex_Mono as FontMono } from "next/font/google"
import MonacoEditor from "@monaco-editor/react"
import { useMutation } from "@tanstack/react-query"
import { get, set } from "idb-keyval"
import { LoaderIcon, RotateCcwIcon, SaveIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

const fontMono = FontMono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
})

export const Editor: React.FC = () => {
  const [deferLoading, setDeferLoading] = React.useState(true)
  const [text, setText] = React.useState<string | undefined>()

  const mutation = useMutation({
    mutationFn: async function (value: string) {
      await set("the-editor", value)
      await new Promise((resolve) => setTimeout(resolve, 500))
    },
  })

  const debouncedSave = useDebounce((value: string) => {
    mutation.mutate(value)
  })

  const handleChange = (value: string | undefined) => {
    setText(value)
    !mutation.isPending && value && debouncedSave(value)
  }

  return (
    <>
      <nav className="flex w-full justify-end gap-x-2">
        <Button onClick={() => setText("")} variant="ghost">
          <RotateCcwIcon className="stroke-1.5 mr-2 size-4" />
          Reset
        </Button>
        <Button
          disabled={mutation.isPending}
          onClick={() => text && mutation.mutate(text)}
          variant="secondary"
        >
          {mutation.isPending ? (
            <LoaderIcon className="stroke-1.5 mr-2 size-4 animate-spin-slow" />
          ) : (
            <SaveIcon className="stroke-1.5 mr-2 size-4" />
          )}
          Save
        </Button>
      </nav>
      <div className="relative flex size-full flex-1 flex-col items-center gap-y-4">
        <MonacoEditor
          beforeMount={async (monaco) => {
            await get("the-editor").then((v: string | undefined) => setText(v))
            await import("monaco-themes/themes/Night Owl.json")
              .then((data) => {
                monaco.editor.defineTheme(
                  "theme",
                  data as Parameters<typeof monaco.editor.defineTheme>["1"]
                )
              })
              .then(() => monaco.editor.setTheme("theme"))
              .catch((er) => console.error(er))
          }}
          onMount={(editor) => {
            setTimeout(() => setDeferLoading(false), 500)
            editor.focus()
          }}
          onChange={(v: string | undefined) => handleChange(v)}
          language="markdown"
          loading=""
          value={text}
          options={{
            fontFamily: fontMono.style.fontFamily,
            wordWrap: "on",
            tabSize: 2,
            lineNumbers: "on",
            lineDecorationsWidth: 12,
            lineNumbersMinChars: 2,
            renderLineHighlight: "none",
            fontSize: 16,
            cursorBlinking: "smooth",
            scrollbar: {
              useShadows: false,
            },
            minimap: {
              enabled: false,
            },
            find: {
              addExtraSpaceOnTop: false,
            },
          }}
        />
        {deferLoading && (
          <div className="absolute flex size-full items-center justify-center bg-background text-foreground">
            <LoaderIcon className="animate-spin-slow" />
          </div>
        )}
      </div>
    </>
  )
}

function useDebounce(callback: (text: string) => void, delay: number = 2000) {
  const timerId = React.useRef(0)

  const debouncedFunction = React.useCallback(
    (text: string) => {
      if (timerId.current) {
        clearTimeout(timerId.current)
      }
      timerId.current = window.setTimeout(() => callback(text), delay)
    },
    [callback, delay]
  )

  React.useEffect(() => {
    return () => {
      if (timerId.current) {
        window.clearTimeout(timerId.current)
      }
    }
  }, [])

  return debouncedFunction
}
