import { Box, Paper, Typography, Grid, Avatar } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled';
import { UserResponse } from '@/src/types/user';

interface TeamStatsProps {
  users: UserResponse[];
}

export default function TeamStats({ users }: TeamStatsProps) {
  const total = users.length;
  const ativos = users.filter(u => u.logicalStatus === 'ATIVO').length;
  const inativos = users.filter(u => u.logicalStatus === 'INATIVO').length;

  const stats = [
    {
      label: 'Total de Colaboradores',
      value: total,
      icon: <PeopleIcon />,
      color: '#1a237e',
      bgColor: 'rgba(26, 35, 126, 0.08)',
    },
    {
      label: 'Operadores Ativos',
      value: ativos,
      icon: <CheckCircleIcon />,
      color: '#2e7d32',
      bgColor: 'rgba(46, 125, 50, 0.08)',
    },
    {
      label: 'Operadores Inativos',
      value: inativos,
      icon: <PauseCircleFilledIcon />,
      color: '#ed6c02',
      bgColor: 'rgba(237, 108, 2, 0.08)',
    }
  ];

  return (
    <Grid container spacing={3} sx={{ mb: 4 }} alignItems="stretch">
      {stats.map((stat, index) => (
        <Grid size={{ xs: 12, sm: 4 }} key={index} sx={{ display: 'flex' }}>
          <Paper
            elevation={0}
            sx={{
              p: 2.5,
              borderRadius: 3,
              border: '1px solid',
              borderColor: 'divider',
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              height: '100%',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 10px 20px rgba(0,0,0,0.05)',
                borderColor: stat.color,
              },
            }}
          >
            <Avatar
              sx={{
                bgcolor: stat.bgColor,
                color: stat.color,
                width: 54,
                height: 54,
                mr: 2,
                borderRadius: 2.5,
              }}
            >
              {stat.icon}
            </Avatar>

            <Box>
              <Typography 
                variant="subtitle2" 
                sx={{ 
                  color: 'text.secondary', 
                  fontWeight: 600,
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  mb: 0.5
                }}
              >
                {stat.label}
              </Typography>
              <Typography 
                variant="h4" 
                sx={{ 
                  fontWeight: 800, 
                  color: 'text.primary',
                  lineHeight: 1
                }}
              >
                {stat.value}
              </Typography>
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}