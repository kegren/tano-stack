import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useFieldContext } from "@/hooks/form";

export default function TextField({
  label,
  description,
  type,
  icon,
}: {
  label: string;
  description?: string;
  type?: string;
  icon?: React.ReactNode;
}) {
  const field = useFieldContext<string>();

  // Collect errors from both the standard errors array and errorMap
  const standardErrors = field.state.meta.errors;
  const errorMapErrors = Object.values(field.state.meta.errorMap).filter(
    (error): error is string => typeof error === "string"
  );
  const allErrors = [
    ...standardErrors,
    ...errorMapErrors.map((msg) => ({ message: msg })),
  ];

  const isInvalid = allErrors.length > 0;

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      <InputGroup>
        {icon && <InputGroupAddon>{icon}</InputGroupAddon>}
        <InputGroupInput
          aria-invalid={isInvalid}
          id={field.name}
          name={field.name}
          onBlur={field.handleBlur}
          onChange={(e) => field.handleChange(e.target.value)}
          type={type || "text"}
          value={field.state.value as string}
        />
      </InputGroup>
      {isInvalid && <FieldError errors={allErrors} />}
      {description && <FieldDescription>{description}</FieldDescription>}
    </Field>
  );
}
