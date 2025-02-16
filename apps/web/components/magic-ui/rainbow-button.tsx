import React from "react";

import { Button } from "../ui/button";

interface RainbowButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children?: React.ReactNode;
}

export const RainbowButton = React.forwardRef<
  HTMLButtonElement,
  RainbowButtonProps
>(({ children, className, ...props }, ref) => {
  return (
    <Button ref={ref} variant="ghost" className={className} {...props}>
      {children}
    </Button>
  );
});

RainbowButton.displayName = "RainbowButton";
