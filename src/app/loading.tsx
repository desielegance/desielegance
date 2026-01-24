import Image from "next/image";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-ivory">
      <div className="relative animate-pulse">
        <Image
          src="/logo.png"
          alt="Desi Elegance"
          width={80}
          height={80}
          className="object-contain"
          priority
        />
      </div>
      <div className="mt-8 flex gap-1">
        <div className="h-2 w-2 rounded-full bg-copper animate-[bounce_1s_infinite_0ms]" />
        <div className="h-2 w-2 rounded-full bg-copper animate-[bounce_1s_infinite_200ms]" />
        <div className="h-2 w-2 rounded-full bg-copper animate-[bounce_1s_infinite_400ms]" />
      </div>
      <span className="mt-4 font-serif text-obsidian/60 tracking-[0.2em] text-sm uppercase">
        Loading Experience
      </span>
    </div>
  );
}