import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const Route = createFileRoute("/auth/email-verified")({
  component: EmailVerified,
});

function EmailVerified() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle>Email verified</CardTitle>
          <CardDescription>
            Your account is ready. You can now sign in and start using the app.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">
            If the browser did not redirect you automatically, use the button
            below to continue to the sign in page.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button asChild>
            <Link to="/auth/sign-in">Continue to sign in</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
