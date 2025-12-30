import ResponsiveDrawer from "@/src/components/layout/ResponsiveDrawer";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ResponsiveDrawer>
      {children}
    </ResponsiveDrawer>
  );
}