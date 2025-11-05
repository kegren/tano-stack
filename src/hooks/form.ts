import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import RadioGroupField from "@/components/form/radio-group-field";
import SelectField from "@/components/form/select-field";
import SubscribeButton from "@/components/form/subscribe-button";
import TextField from "@/components/form/text-field";
import TextareaField from "@/components/form/textarea-field";

export const { fieldContext, useFieldContext, formContext, useFormContext } =
  createFormHookContexts();

export const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    TextField,
    SelectField,
    TextareaField,
    RadioGroupField,
  },
  formComponents: {
    SubscribeButton,
  },
});
