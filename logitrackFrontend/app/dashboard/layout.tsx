import Sidebar from "@/src/components/layout/Sidebar";
import { Box } from "@mui/material";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box>
      <Sidebar />
      <Box component="main" sx={{ p: 3 }}>
        {children}
      </Box>
    </Box>
  );
}