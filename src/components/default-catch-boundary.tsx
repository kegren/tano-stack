import type { ErrorRouteComponent } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const DefaultCatchBoundary: ErrorRouteComponent = ({ error }) => (
  <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-destructive">
          Something went wrong!
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">
          {error instanceof Error
            ? error.message
            : "An unexpected error occurred"}
        </p>
        <Button onClick={() => window.location.reload()}>Reload Page</Button>
      </CardContent>
    </Card>
  </div>
);
