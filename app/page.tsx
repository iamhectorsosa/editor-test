import { Editor } from "./editor";

export default function Home() {
  return (
    <main className="h-dvh p-6 flex gap-6">
      <div className="relative flex h-full w-full flex-1 flex-col items-center">
        <Editor />
      </div>
    </main>
  );
}
