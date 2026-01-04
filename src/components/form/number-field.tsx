import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useFieldContext } from "@/hooks/form";

export default function NumberField({
  label,
  description,
  min,
  max,
  step = 1,
}: {
  label: string;
  description?: string;
  min?: number;
  max?: number;
  step?: number;
}) {
  const field = useFieldContext<number>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      <Input
        aria-invalid={isInvalid}
        id={field.name}
        max={max}
        min={min}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(Number(e.target.value))}
        step={step}
        type="number"
        value={field.state.value}
      />
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
      {description && <FieldDescription>{description}</FieldDescription>}
    </Field>
  );
}
