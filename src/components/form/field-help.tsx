import { HelpCircle, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type FieldHelpProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  benefit?: string;
};

export function FieldHelp({
  icon: Icon,
  title,
  description,
  benefit,
}: FieldHelpProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          aria-label="Help"
          className="size-5 h-auto p-0"
          size="icon"
          type="button"
          variant="ghost"
        >
          <HelpCircle className="size-3.5 text-muted-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-80">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Icon className="size-4 text-primary" />
            <h4 className="font-semibold text-sm">{title}</h4>
          </div>
          <p className="text-muted-foreground text-sm">{description}</p>
          {benefit && (
            <div className="border-t pt-2">
              <p className="font-medium text-primary text-xs">{benefit}</p>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
