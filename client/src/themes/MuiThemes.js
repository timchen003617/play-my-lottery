import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  typography: {
    fontFamily: ['Noto Sans SC', 'sans-serif'].join(','),
    fontWeightRegular: 'lighter',
    fontWeightMedium: 'normal'
  },
  palette: {
    primary: {
      light: '#5badf1',
      main: '#39d',
      dark: '#236ba6',
      contrastText: '#fff'
    },
    secondary: {
      light: '#ff7961',
      main: '#ff0606',
      dark: '#ba000d',
      contrastText: '#fff'
    }
  }
})

export default theme
