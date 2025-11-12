import { GalleryVerticalEnd } from "lucide-react";

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
        <GalleryVerticalEnd className="size-5" />
      </div>
      <span className="font-semibold text-xl">tano-stack</span>
    </div>
  );
}