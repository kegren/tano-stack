import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import * as React from "react";
import { Toggle } from "@/components/ui/toggle";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="absolute top-6 right-6">
        <Toggle disabled size="sm" variant="outline">
          <Sun className="size-4" />
        </Toggle>
      </div>
    );
  }

  return (
    <div className="absolute top-6 right-6">
      <Toggle
        onPressedChange={() => setTheme(theme === "light" ? "dark" : "light")}
        pressed={theme === "dark"}
        size="sm"
        variant="outline"
      >
        <Sun className="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </Toggle>
    </div>
  );
}
