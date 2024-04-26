"use client";

import * as React from "react";
import { IBM_Plex_Mono as FontMono } from "next/font/google";
import MonacoEditor from "@monaco-editor/react";

const fontMono = FontMono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

export const Editor: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  return (
    <>
      <MonacoEditor
        beforeMount={(monaco) => {
          import("monaco-themes/themes/Night Owl.json")
            .then((data) => {
              monaco.editor.defineTheme(
                "theme",
                data as Parameters<typeof monaco.editor.defineTheme>["1"]
              );
            })
            .then((_) => monaco.editor.setTheme("theme"));
        }}
        onMount={() => setTimeout(() => setIsLoading(false), 500)}
        language="markdown"
        loading=""
        value=""
        options={{
          fontFamily: fontMono.style.fontFamily,
          wordWrap: "on",
          wrappingIndent: "indent",
          tabSize: 2,
          lineNumbers: "on",
          lineDecorationsWidth: 12,
          lineNumbersMinChars: 3,
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
      {isLoading && (
        <div className="absolute w-full h-full bg-[#011627] text-white flex items-center justify-center">
          Loading...
        </div>
      )}
    </>
  );
};
