import { createTheme } from '@mui/material/styles'

export const muiTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#2563EB' },
    secondary: { main: '#0F172A' },
    info: { main: '#3B82F6' },
  },
  typography: {
    fontFamily: '"Inter", ui-sans-serif, system-ui, sans-serif',
  },
  shape: { borderRadius: 14 },
  components: {
    MuiAlert: {
      styleOverrides: {
        root: { borderRadius: 16, fontFamily: '"Inter", sans-serif' },
      },
    },
  },
})
