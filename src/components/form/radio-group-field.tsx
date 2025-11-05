import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useFieldContext } from "@/hooks/form";

export default function RadioGroupField({
  label,
  description,
  options,
  tip,
  orientation = "horizontal",
}: {
  label: string;
  description?: string;
  options: Array<{
    value: string;
    title: string;
    description: string;
  }>;
  tip?: string;
  orientation?: "horizontal" | "vertical";
}) {
  const field = useFieldContext<string>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
  const fieldId = `radio-${field.name}`;

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel className="text-lg" htmlFor={fieldId}>
        {label}
      </FieldLabel>
      {description && (
        <FieldDescription className="text-muted-foreground text-sm">
          {description}
        </FieldDescription>
      )}
      <RadioGroup
        // className="flex flex-row gap-2"
        onValueChange={(value) => {
          field.handleChange(value);
          field.handleBlur();
        }}
        value={field.state.value}
      >
        {options.map((option, index) => {
          const optionId = `${fieldId}-${option.value}-${index}`;
          return (
            <FieldLabel htmlFor={optionId} key={option.value}>
              <Field orientation={orientation}>
                <FieldContent>
                  <FieldTitle>{option.title}</FieldTitle>
                  <FieldDescription>{option.description}</FieldDescription>
                </FieldContent>
                <RadioGroupItem id={optionId} value={option.value} />
              </Field>
            </FieldLabel>
          );
        })}
      </RadioGroup>
      {tip && (
        <FieldDescription className="text-muted-foreground text-sm">
          {tip}
        </FieldDescription>
      )}
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
}
