import { createTheme } from "@mui/material";

declare module "@mui/material/styles" {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}

const theme = createTheme({
  palette: {
    primary: {
      light: "#338b98",
      main: "#006E7F",
      dark: "#004d58",
      contrastText: "#FFFFFF",
    },
    secondary: {
      light: "#f9d557",
      main: "#F8CB2E",
      dark: "#ad8e20",
      contrastText: "#FFFFFF",
    },
    warning: {
      light: "#f08934",
      main: "#006E7F",
      dark: "#a54b01",
      contrastText: "#FFFFFF",
    },

  },
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 1440,
      xl: 1536,
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          fontWeight: 400,
          lineheight: "12px",
          letterSpacing: "0.15px",
          color: "rgba(0, 0, 0, 0.6)",
        },
      },
      variants: [
        {
            props: { variant: "h3" },
            style: {
                fontWeight: 500,
                fontSize: "20px",
                lineHeight:"160%",
                
            },
          },
          {
            props: { variant: "h4" },
            style: {
                fontWeight: 500,
                fontSize: "14px",
                lineHeight:"143%",
                letterSpacing: "0.17px",
                color: "rgba(0, 0, 0, 0.87)",

                
            },
          },
          {
            props: { variant: "h5" },
            style: {
              fontSize: "12px",
              color: "#616161",
                
            },
          },
      ],
    },
    MuiTextField: {
      styleOverrides: {
        root: {
            marginRight: '16px',
            borderBottom: '1px solid #000000',
        },
      },
      variants:[
        {
          props:{variant:"standard"},
          style:{
            borderBottom: 'none',
            width:'100%',
          }
        }
      ]
    },
    MuiButton: {
      styleOverrides: {
        root: {
          cursor: "pointer",
          boxSizing: "border-box",
          border: "none",
          borderRadius: "4px",
          margin: "20px 16px 0 0",
          fontWeight: 500,
          fontSize: "15px",
          lineHeight: "26px",
          alignSelf: "stretch",
          transition: "all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)",
          "&:focus": {
            boxShadow: "0px 1px 5px rgba(25, 118, 210, 0.3)",
          },
          outline: "none",
        },
      },
      variants: [
        {
          props: { variant: "contained" },
          style: {
            background: "#ED6C02",
            color: "#FFFFFF",
            "&:hover": {
              backgroundColor: "#ed9f5f",
            },
          },
        },
        {
            props: { variant: "contained", color:"secondary" },
            style: {
              background: "#F8CB2E",
              color: "#FFFFFF",
              "&:hover": {
                backgroundColor: "#fcdd6f",
              },
            },
          },
        {
          props: { variant: "outlined" },
          style: {
            background: "#FFF",
            border: "1px solid #ED6C02",
            color: "#ED6C02",
            "&:hover": {
              border: "1px solid #ED6C02",
            },
          },
        },
        {
          props: { variant: "outlined", color: "secondary" },
          style: {
            background: "#006E7F",
            border: "1px solid #F8CB2E",
            color: "#F8CB2E",
          },
        },
      ],
    },
    MuiDrawer : {
        styleOverrides:{
            paper:{
                background: "#FDFCE5",
            },
        },
    },
    MuiContainer : {
      styleOverrides:{
        root:{
          margin:"10px 20px",
        }
      }
    },
    MuiTableCell : {
      styleOverrides:{
        stickyHeader:{
          fontWeight: 500,
        },
        root:{
          whiteSpace:"pre",
          boxShadow:"inset 0px -1px 0px rgba(0, 0, 0, 0.12)",
        }
      }
    },
    MuiTableRow:{
      styleOverrides:{
        root:{
          whiteSpace:"pre",
        }
      }
    },
  },
});

export default theme;
