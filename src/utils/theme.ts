import createTheme from "@mui/material/styles/createTheme"


export const MyTheme = createTheme( {
    components: {
        // Name of the component
        MuiListItem: {
            styleOverrides: {
                // Name of the slot
                root: {
                    // Some CSS
                    maxWidth: 200
                },
            },
        },
        MuiListItemSecondaryAction: {
            styleOverrides: {
                root: {
                    alignSelf: 'flex-start',
                    top: '1.3rem',
                },
            },
        },
        MuiButtonBase: {
            styleOverrides: {
                root: {
                    justifySelf: 'flex-end',
                    alignSelf: 'flex-start',
                },
            },
        },
        MuiListItemIcon: {
            styleOverrides: {
                root: { minWidth: '36px' },
            },
        },
        MuiCheckbox: {
            styleOverrides: {
                root: {
                    padding: 0,
                },
            },
        },
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    paddingLeft: 0,
                    paddingRight: 0,
                },
            },
        },
        MuiTypography: {
            styleOverrides: {
                root: {
                    wordWrap: 'break-word',
                    hyphens: 'auto',
                    // maxWidth: 200,
                },
            },
        },
    },
} )