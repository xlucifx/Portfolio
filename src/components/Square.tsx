import type { ReactNode } from "react";

export default function SquareContent({ children }: { children?: ReactNode }) {
  return (
    <div className="content-wrapper">
      {children}
    </div>
  );
}
