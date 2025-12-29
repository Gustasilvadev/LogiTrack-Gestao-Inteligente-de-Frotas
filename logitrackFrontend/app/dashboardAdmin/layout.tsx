import ProtectedRoute from "@/src/components/auth/ProtectedRoute";
import { AppBar, Box, CssBaseline, IconButton, Toolbar, Typography } from "@mui/material";

import MenuListComposition from "@/src/components/menuList/MenuList";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute allowedRoles={['ADMIN']}>
      <CssBaseline />
      <Box sx={{ 
        width: '100vw', 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column',
        overflowX: 'hidden'
      }}>
        
        <AppBar 
          position="static"
          sx={{ 
            borderRadius: 0, 
            boxShadow: 'none', 
            width: '100%' 
          }}
        >
          <Toolbar>
            <MenuListComposition/>

            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              LogiTrack
            </Typography>

            <Typography 
              variant="h4" 
              component="h1" 
              sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}
            >
              Bem-vindo, Administrador
            </Typography>
          </Toolbar>
        </AppBar>

        <Box component="main" sx={{ flexGrow: 1, p: 3, borderRadius: 0 }}>
          {children}
        </Box>
      </Box>
    </ProtectedRoute>
  );
}