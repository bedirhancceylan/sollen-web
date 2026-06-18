import Image from "next/image";

interface PhoneFrameProps {
  src: string;
  alt: string;
  priority?: boolean;
  width?: number;
}

export default function PhoneFrame({ src, alt, priority, width = 340 }: PhoneFrameProps) {
  return (
    <div className="relative mx-auto" style={{ width: "100%", maxWidth: width }}>
      <div className="relative w-full" style={{ aspectRatio: "393 / 852" }}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 80vw, 340px"
          priority={priority}
          className="object-contain"
        />
      </div>
    </div>
  );
}
