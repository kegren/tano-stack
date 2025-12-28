import { createFileRoute } from "@tanstack/react-router";
import { ListTodo, User } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  const { user } = Route.useRouteContext();

  return (
    <div className="space-y-6">
      <div className="pt-4">
        <h1 className="font-bold text-3xl tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's your account overview.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center gap-4 space-y-0">
            <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
              <User className="size-6 text-primary" />
            </div>
            <div>
              <CardTitle>Profile</CardTitle>
              <CardDescription>Your account information</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">Email: {user.email}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-4 space-y-0">
            <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
              <ListTodo className="size-6 text-primary" />
            </div>
            <div>
              <CardTitle>Todos</CardTitle>
              <CardDescription>Manage your tasks</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              Access your todo list from the sidebar navigation.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
