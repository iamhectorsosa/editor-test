import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "The Editor",
    short_name: "The Editor",
    description: "The Editor",
    start_url: "/",
    display: "fullscreen",
    background_color: "#E0E0E0",
  };
}
