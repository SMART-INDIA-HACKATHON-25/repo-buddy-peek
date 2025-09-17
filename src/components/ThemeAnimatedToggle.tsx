"use client";

import {
  ThemeTogglerButton,
  type ThemeTogglerButtonProps,
} from "@/components/animate-ui/components/buttons/theme-toggler";
import { cn } from "@/lib/utils";

interface ThemeAnimatedToggleProps {
  variant?: ThemeTogglerButtonProps["variant"];
  size?: ThemeTogglerButtonProps["size"];
  direction?: ThemeTogglerButtonProps["direction"];
  system?: boolean;
  className?: string;
}

export function ThemeAnimatedToggle({
  variant = "default",
  size = "md",
  direction = "horizontal",
  system = true,
  className,
}: ThemeAnimatedToggleProps) {
  return (
    <div className={cn(className)}>
      <ThemeTogglerButton
        variant={variant}
        size={size}
        direction={direction}
        modes={system ? ["light", "dark", "system"] : ["light", "dark"]}
      />
    </div>
  );
}
