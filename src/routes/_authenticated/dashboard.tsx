import { useQueryClient } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { LogOut, User, ListTodo } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { authClient } from "@/features/auth/auth-client";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  const { user } = Route.useRouteContext();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleSignOut = async () => {
  await authClient.signOut({
    fetchOptions: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["auth", "session"] });
        navigate({ to: "/" });
      },
    },
  });
  };

  const getInitials = (email: string) => email.substring(0, 2).toUpperCase();

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="font-bold text-3xl tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back {user.email}! Here's your account overview.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* User Profile Card */}
          <Card>
            <CardHeader className="flex flex-row items-center space-y-0 pb-4">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {getInitials(user.email)}
                </AvatarFallback>
              </Avatar>
              <div className="ml-4">
                <CardTitle className="text-xl">Profile</CardTitle>
                <CardDescription>Your account information</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium text-sm">Email:</span>
                <span className="text-muted-foreground text-sm">
                  {user.email}
                </span>
              </div>

              <div className="pt-4">
                <Button
                  className="w-full"
                  onClick={handleSignOut}
                  variant="outline"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Todos Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <ListTodo className="h-5 w-5" />
                Todos
              </CardTitle>
              <CardDescription>
                Manage your tasks and stay organized
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground text-sm">
                Create, edit, and track your todos with our simple and efficient todo
                manager.
              </p>

              <div className="pt-4 text-center">
                <Button
                  className="w-full"
                  onClick={() => navigate({ to: "/todos" })}
                >
                  Go to Todos
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
