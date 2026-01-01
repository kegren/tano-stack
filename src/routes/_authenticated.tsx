import { useQueryClient } from "@tanstack/react-query";
import {
  createFileRoute,
  Link,
  Outlet,
  useLocation,
  useNavigate,
} from "@tanstack/react-router";
import { LayoutDashboard, ListTodo, LogOut } from "lucide-react";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  authKeys,
  ensureAuthReturnUser,
} from "@/features/auth/api/auth-queries";
import { authClient } from "@/lib/client/auth-client";

export const Route = createFileRoute("/_authenticated")({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    const user = await ensureAuthReturnUser(context.queryClient);

    return { user };
  },
});

function RouteComponent() {
  const { user } = Route.useRouteContext();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: authKeys.session() });
          navigate({ to: "/" });
        },
      },
    });
  };

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2 p-2">
            <Logo />
          </div>
          <p className="px-2 text-muted-foreground text-xs">Demo Application</p>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === "/dashboard"}
                  >
                    <Link to="/dashboard">
                      <LayoutDashboard />
                      Dashboard
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === "/todos"}
                  >
                    <Link to="/todos">
                      <ListTodo />
                      Todos
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                className="cursor-pointer"
                onClick={handleSignOut}
              >
                <LogOut />
                Sign Out
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator className="mr-2 h-4" orientation="vertical" />
          <div className="flex flex-1 items-center justify-between">
            <span className="font-medium text-sm">Welcome, {user.email}</span>
          </div>
          <ThemeToggle absolute={false} />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
