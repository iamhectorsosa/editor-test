"use client";

import * as React from "react";
import { IBM_Plex_Mono as FontMono } from "next/font/google";
import MonacoEditor from "@monaco-editor/react";
import { get, set } from "idb-keyval";

const fontMono = FontMono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});


export const Editor: React.FC = () => {
  const [deferLoading, setDeferLoading] = React.useState(true);
  const [text, setText] = React.useState<string | undefined>();

  const debouncedSave = useDebounce((value: string) => {
    set("the-editor", value);
  });

  const handleChange = (value: string | undefined) => {
    setText(value);
    value && debouncedSave(value);
  };

  return (
    <>
      <MonacoEditor
        beforeMount={async (monaco) => {
          await get("the-editor").then((val) => setText(val));
          import("monaco-themes/themes/Night Owl.json")
            .then((data) => {
              monaco.editor.defineTheme(
                "theme",
                data as Parameters<typeof monaco.editor.defineTheme>["1"]
              );
            })
            .then((_) => monaco.editor.setTheme("theme"));
        }}
        onMount={(editor) => {
          setTimeout(() => setDeferLoading(false), 500);
          editor.focus();
        }}
        onChange={(v) => handleChange(v)}
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
          find: {
            addExtraSpaceOnTop: false,
          },
        }}
      />
      {deferLoading && (
        <div className="absolute w-full h-full bg-[#011627] text-white flex items-center justify-center">
          Loading...
        </div>
      )}
    </>
  );
};

function useDebounce(callback: (text: string) => void, delay: number = 1000) {
  const timerId = React.useRef(0);

  const debouncedFunction = React.useCallback(
    (text: string) => {
      if (timerId.current) {
        clearTimeout(timerId.current);
      }
      timerId.current = window.setTimeout(() => callback(text), delay);
    },
    [callback, delay]
  );

  React.useEffect(() => {
    return () => {
      if (timerId.current) {
        window.clearTimeout(timerId.current);
      }
    };
  }, []);

  return debouncedFunction;
}
