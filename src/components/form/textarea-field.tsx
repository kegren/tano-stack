import type { LucideIcon } from "lucide-react";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { InputGroup, InputGroupTextarea } from "@/components/ui/input-group";
import { useFieldContext } from "@/hooks/form";
import { AUTH_CONFIG } from "@/lib/constants";
import { FieldHelp } from "./field-help";

export default function TextareaField({
  label,
  description,
  rows = 4,
  fieldHelp,
}: {
  label: string;
  description?: string;
  rows?: number;
  fieldHelp?: {
    icon: LucideIcon;
    title: string;
    description: string;
    benefit: string;
  };
}) {
  const field = useFieldContext<string>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  const bioLength = field.state.value?.length || 0;
  const maxLength = AUTH_CONFIG.MAX_TEXTAREA_LENGTH;
  const remaining = maxLength - bioLength;
  return (
    <Field data-invalid={isInvalid}>
      <div className="flex items-center gap-2">
        <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
        {fieldHelp ? (
          <FieldHelp
            benefit={fieldHelp.benefit}
            description={fieldHelp.description}
            icon={fieldHelp.icon}
            title={fieldHelp.title}
          />
        ) : null}
      </div>
      <InputGroup>
        <InputGroupTextarea
          aria-invalid={isInvalid}
          className="min-h-[150px]"
          id={field.name}
          name={field.name}
          onBlur={field.handleBlur}
          onChange={(e) => field.handleChange(e.target.value)}
          rows={rows}
          value={field.state.value as string}
        />
      </InputGroup>
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground text-xs">
          {remaining} / {maxLength} characters remaining
        </span>
      </div>
      {isInvalid ? <FieldError errors={field.state.meta.errors} /> : null}
      {description ? <FieldDescription>{description}</FieldDescription> : null}
    </Field>
  );
}
