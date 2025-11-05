import type { LucideIcon } from "lucide-react";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { useFieldContext } from "@/hooks/form";
import { FieldHelp } from "./field-help";

export default function SelectField({
  label,
  description,
  options,
  placeholder = "Select an option",
  disabled,
  loading,
  emptyMessage = "No options",
  onValueChange,
  fieldHelp,
}: {
  label: string;
  description?: string;
  options: { label: string; value: string }[];
  placeholder?: string;
  disabled?: boolean;
  loading?: boolean;
  emptyMessage?: string;
  onValueChange?: (value: string | undefined) => void;
  fieldHelp?: {
    icon: LucideIcon;
    title: string;
    description: string;
    benefit: string;
  };
}) {
  const field = useFieldContext<string | undefined>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
  return (
    <Field data-invalid={isInvalid}>
      <div className="flex items-center gap-2">
        <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
        {fieldHelp && (
          <FieldHelp
            benefit={fieldHelp.benefit}
            description={fieldHelp.description}
            icon={fieldHelp.icon}
            title={fieldHelp.title}
          />
        )}
      </div>
      {/* <InputGroup> */}
      <Select
        disabled={disabled || loading}
        onValueChange={(value) => {
          field.handleChange(value);
          field.handleBlur();
          onValueChange?.(value);
        }}
        value={field.state.value}
      >
        <SelectTrigger aria-invalid={isInvalid} id={field.name}>
          <SelectValue
            placeholder={
              loading ? (
                <Spinner className="size-4 animate-spin" />
              ) : (
                placeholder
              )
            }
          />
        </SelectTrigger>
        <SelectContent>
          {options.length === 0 ? (
            <SelectItem disabled value="__empty__">
              {emptyMessage}
            </SelectItem>
          ) : (
            options.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))
          )}
        </SelectContent>
      </Select>
      {/* </InputGroup> */}
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
      {description && <FieldDescription>{description}</FieldDescription>}
    </Field>
  );
}
