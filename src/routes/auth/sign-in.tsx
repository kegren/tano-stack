import { createFileRoute, Link } from "@tanstack/react-router";
import { Logo } from "@/components/logo";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldDescription } from "@/components/ui/field";
import SignInForm from "@/features/auth/components/sign-in-form";

export const Route = createFileRoute("/auth/sign-in")({
  component: SignIn,
});

function SignIn() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex items-center gap-2 self-center font-medium">
          <Logo />
        </div>
        <div className="flex flex-col gap-6">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <CardTitle>Welcome back</CardTitle>
              <CardDescription>
                Sign in to your account to continue.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* <SocialAuthButtons /> */}
              <SignInForm />
            </CardContent>
            <CardFooter className="flex justify-center text-center text-gray-600">
              <Field>
                <FieldDescription className="text-center">
                  Don&apos;t have an account?&nbsp;
                  <Link className="underline" to="/auth/sign-up">
                    Sign Up
                  </Link>
                </FieldDescription>
              </Field>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
