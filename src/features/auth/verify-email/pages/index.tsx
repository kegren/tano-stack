import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export function VerifyEmail() {
	return (
		<div className="flex min-h-[60vh] items-center justify-center px-4">
			<Card className="w-full max-w-md text-center">
				<CardHeader>
					<CardTitle>Verify your email</CardTitle>
					<CardDescription>
						We sent a verification link to your inbox. Confirm your email before
						signing in.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-3 text-muted-foreground text-sm">
					<p>
						Open the email we just sent and click the verification button. If
						you don&apos;t see it, check your spam folder or wait a minute.
					</p>
				</CardContent>
				<CardFooter className="flex justify-center gap-2">
					<Button asChild variant="secondary">
						<Link to="/sign-in">Back to sign in</Link>
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
