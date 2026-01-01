import { Link, type NotFoundRouteComponent } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type DefaultNotFoundProps = {
  isNotFound: boolean;
  routeId: string;
};

export const DefaultNotFound: NotFoundRouteComponent = ({
  isNotFound,
  routeId,
}: DefaultNotFoundProps) => (
  <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
    <Card className="w-full max-w-md text-center">
      <CardHeader>
        <CardTitle className="text-4xl">
          {isNotFound ? "404" : routeId}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">Page not found</p>
        <Button asChild>
          <Link to="/">Go Home</Link>
        </Button>
      </CardContent>
    </Card>
  </div>
);
