"use client";

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { ClickAwayListener, Grow, Paper, Popper, MenuItem, MenuList, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export default function MenuListComposition() {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const router = useRouter();

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }
    setOpen(false);
  };

  const handleNavigate = (path: string) => {
    router.push(path); 
    setOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('@LogiTrack:user');
    localStorage.removeItem('@LogiTrack:token');
    router.push('/');
  };

  return (
    <div>
      <IconButton
        ref={anchorRef}
        id="composition-button"
        aria-controls={open ? 'composition-menu' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        color="inherit"
        sx={{ borderRadius: 0, mr: 2 }}
      >
        <MenuIcon />
      </IconButton>

      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
        style={{ zIndex: 1300 }}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom-start' ? 'left top' : 'left bottom',
            }}
          >
            <Paper sx={{ borderRadius: 0, boxShadow: '0px 4px 10px rgba(0,0,0,0.1)' }}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                >
                  <MenuItem onClick={() => handleNavigate('/dashboardAdmin/dashCarriers')}>
                    Transportadoras
                  </MenuItem>
                  
                  <MenuItem onClick={() => handleNavigate('/dashboardAdmin/dashUsers')}>
                    Criar usuário
                  </MenuItem>

                  <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
                    Sair
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}