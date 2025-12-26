import ProtectedRoute from "@/src/components/auth/ProtectedRoute";
import { Box } from "@mui/material";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute allowedRoles={['ADMIN']}>
      <Box sx={{ display: 'flex' }}>
        
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          {children}
        </Box>
      </Box>
    </ProtectedRoute>
  );
}