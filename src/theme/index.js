import _ from "lodash";
import { colors, createMuiTheme, responsiveFontSizes } from "@material-ui/core";
import typography from "./typography";

const baseOptions = {
  typography,
  overrides: {
    MuiFormHelperText: {
      root: {
        // color: #;
        margin: "0",
        fontSize: "0.75rem",
        marginTop: "-10px",
        textAlign: "left",
        fontFamily: "'Poppins', sans-serif",
        fontWeight: "400",
        lineHeight: "1.66",
        Mui: {
          error: {
            color: "#4ea6f5",
          },
        },
      },
      contained: {
        marginLeft: "0px",
      },
    },
    // MuiBox: {
    //   root: {
    //     marginBottom:"0px",
    //     borderColor: "transparent",
    //   },

    // },
    //   .MuiButton-textPrimary {
    //     color: #757575;
    // }
    MuiAccordionDetails: {
      root: {
        padding: "20px",
      },
    },
    MuiTableCell: {
      head: {
        color: "#fff",
      },
      root: {
        display: "table-cell",
        padding: "8px",
        fontSize: "14px",
        textAlign: "left",
        fontFamily: "'Poppins', sans-serif",
        fontWeight: "400",
        lineHeight: "1.43",
        borderBottom: "1px solid rgb(143 144 146)",
        verticalAlign: "inherit",
      },
    },
    MuiInput: {
      underline: {
        "&::after": {
          borderBottom: "2px solid #35A5F5 !important",
        },
      },

      // "MuiInput-underline::before": {
      //   left: "0",
      //       right: "0",
      //       bottom: "0",
      //       content: " ",
      //       position: "absolute",
      //       transition: "border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
      //       borderBottom: "1px solid red",
      //       pointerEvents: "none",
      // },
    },
    MuiMenuItem: {
      root: {
        width: "auto",
        overflow: "hidden",
        fontSize: "14px",
        boxSizing: "border-box",
        minHeight: "48px",
        fontFamily: "'Poppins', sans-serif",
        fontWeight: "400",
        lineHeight: "1.5",
        paddingTop: "6px",
        whiteSpace: "nowrap",
        paddingBottom: "6px",
      },
    },
    MuiList: {
      padding: {
        paddingLeft: "8px",
        paddingRight: "8px",
      },
    },

    MuiFormLabel: {
      root: { color: "#222" },
      colorSecondary: {
        "&.Mui-focused": {
          color: "#222",
        },
      },
    },
    MuiListSubheader: {
      root: {
        color: "#fff",
        fontSize: "22px !important",
        fontWeight: "600 !important",
        lineHeight: "33px !important",
      },
    },
    MuiTableContainer: {
      root: {
        borderRadius: "10px",
      },
    },
    MuiOutlinedInput: {
      root: {
        "&:hover": {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#22A7F0",
          },
        },
      },

      input: {
        padding: " 10.5px 14px",
      },
      colorSecondary: {
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          color: "#222",
          borderColor: "#222",
        },
        "&.Mui-focused": {
          color: "#222",
        },
      },
    },
    MuiPaper: {
      outlined: {
        padding: "20px",
        width: "100%",
      },
    },
    MuiPopover: {
      root: {
        zIndex: 99999,
      },
    },
    MuiListItem: {
      root: {
        alignItems: "self-start",
      },
      gutters: {
        paddingLeft: 0,
      },
    },
    MuiCheckbox: {
      colorPrimary: {
        MuiChecked: {},
      },
      root: {
        padding: "4px",
        fontSize: "12px",
        color: "#35a5f5",
      },
      colorSecondary: {
        "&.Mui-checked": { color: "#000" },
      },
    },
    MuiFormControlLabel: {
      root: {
        paddingBottom: "0",
      },
    },
    MuiListItemSecondaryAction: {
      root: {
        right: 0,
      },
    },
    MuiDialog: {
      paperScrollPaper: {
        Width: 450,
        maxWidth: "100%",
      },
      paper: {
        overflowY: "unset",
      },
      paperWidthSm: {
        maxWidth: "900px !important",
      },
    },
    MuiInputBase: {
      input: {
        font: "inherit",
        color: "currentColor",
        width: "100%",
        border: "0",
        margin: "0",
        display: "block",
        padding: "12px 0px",
        fontSize: "12px",
        minWidth: "0",
        background: "none",
        boxSizing: "content-box",
        animationName: "mui-auto-fill-cancel",
        letterSpacing: "inherit",
        animationDuration: "10ms",
      },
    },

    MuiBackdrop: {
      root: { backgroundColor: "rgba(0, 0, 0, 0.75)" },
    },
    MuiButton: {
      root: {
        "&:hover": {
          textDecoration: "none",
          backgroundColor: "rgb(255 255 255)",
        },
      },
      // label: {
      //   whiteSpace: "nowrap",
      // },
      containedSecondary: {
        background: "#F7722F !important",
        boxSizing: "border-box",
        // boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        borderRadius: "10px",
        color: "#fff",
        fontWeight: "500 !important",
        fontSize: "15px",
        padding: "5px 19px",
        marginRight: "10px",
        "&:hover": {
          background:
            "linear-gradient(261.87deg, #62D3F0 13.12%, #35A5F5 83.57%)",
          color: "#fff !important",
        },
      },

      containedPrimary: {
        background:
          "#F7722F !important",
    
        borderRadius: "10px",
        padding: "5px 19px",
        color: "#fff !important",
        fontSize: "14px !important",
        fontWeight: "500 !important",
        "&:hover": {
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        
          color: "#fff !important",
        },
      },
      contained: {
        borderRadius: "50px",
        color: "#f30065",
        fontWeight: 600,
        padding: "5px 19px",
        boxShadow: "none",
        "&:hover": {
          backgroundColor: "#f30065",

          color: "#fff",
        },
      },
      outlinedPrimary: {
        borderRadius: "50px",
        color: "#300760",
        fontWeight: 600,
        padding: "5px 19px",
        border: "2px solid #300760",
        "&:hover": {
          backgroundColor: "#f30065",
          border: "2px solid #f30065",
          color: "#fff",
        },
      },
      outlinedSizeSmall: {
        padding: "6px 23px",
        fontSize: "16px",
        lineHeight: " 24px",
      },
      textPrimary: {
        color: "#757575",
      },
    },
    MuiDrawer: {
      paperAnchorDockedLeft: {
        borderRight: "0",
      },
    },
    MuiMenu: {
      paper: { top: "47px" },
    },

    MuiTypography: {
      subtitle1: {
        color: "#000",
        fontSize: "14px",
        fontWeight: 500,
        lineHeight: " 16px",
        colorSecondary: {
          color: "#8d8989",
        },
      },
    },
    MuiInputBase: {
      input: {
        height: "25px",
      },
    },
    MuiFormHelperText: {
      root: {
        Mui: {
          error: {
            marginTop: "1px",
          },
        },
      },
    },
    MuiFormHelperText: {
      contained: {
        marginLeft: "0px !important",
      },
    },
  },
};

const themesOptions = {
  typography: {
    fontWeight: 400,
    fontFamily: "'Poppins', sans-serif",
  },
  palette: {
    type: "light",
    action: {
      primary: "#20509e",
    },
    background: {
      default: "#FBFBFD",
      dark: "#f3f7f9",
      paper: colors.common.white,
    },
    primary: {
      main: "#fff",
      dark: "#de0d0d",
      light: "#de0d0d",
    },
    secondary: {
      main: "#fff",
    },
    warning: {
      main: "#ffae33",
      dark: "#ffae33",
      light: "#fff1dc",
    },
    success: {
      main: "#54e18c",
      dark: "#54e18c",
      light: "#e2faec",
    },
    error: {
      main: "#ff7d68",
      dark: "#ff7d68",
      light: "#ffe9e6",
    },
    text: {
      primary: "#52565c",
      secondary: "#999999",
    },
    common: {
      black: "#222222",
    },
  },
};

export const createTheme = (config = {}) => {
  let theme = createMuiTheme(_.merge({}, baseOptions, themesOptions));

  if (config.responsiveFontSizes) {
    theme = responsiveFontSizes(theme);
  }

  return theme;
};
