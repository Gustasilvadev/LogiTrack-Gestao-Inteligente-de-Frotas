'use client';
import * as React from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import ReactQueryProvider from '@/src/providers/ReactQueryProvider';

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  return (
    // O AppRouterCacheProvider é essencial para evitar que o CSS "pisque" (FOUC)
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      <ReactQueryProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </ReactQueryProvider>
    </AppRouterCacheProvider>
  );
}