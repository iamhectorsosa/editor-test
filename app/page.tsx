import { Editor } from "./editor";

export default function Home() {
  return (
    <main className="h-dvh lg:px-6 px-4 py-6">
      <div className="relative flex h-full w-full flex-1 flex-col items-center">
        <Editor />
      </div>
    </main>
  );
}
