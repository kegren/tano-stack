import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useFormContext } from "@/hooks/form";
import { cn } from "@/lib/utils";

export default function SubscribeButton({
  label,
  loadingLabel,
  isLoading,
  className,
}: {
  label: string;
  loadingLabel?: string;
  isLoading?: boolean;
  className?: string;
}) {
  const form = useFormContext();
  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <Button
          className={cn("mt-4", className)}
          disabled={isSubmitting || form.state.isSubmitting || isLoading}
          type="submit"
        >
          {isSubmitting || isLoading ? (
            <>
              <Spinner />
              <span>{loadingLabel || "Submitting..."}</span>
            </>
          ) : (
            <span>{label}</span>
          )}
        </Button>
      )}
    </form.Subscribe>
  );
}
