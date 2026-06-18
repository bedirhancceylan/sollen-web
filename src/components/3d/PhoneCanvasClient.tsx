"use client";

import dynamic from "next/dynamic";

const PhoneCanvas = dynamic(() => import("./PhoneCanvas"), {
  ssr: false,
  loading: () => null,
});

export default function PhoneCanvasClient() {
  return <PhoneCanvas />;
}
