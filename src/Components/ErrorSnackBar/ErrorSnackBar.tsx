import React from 'react'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import { appActions } from '../../features/Application'
import { useActions, useAppSelector } from '../../utils/redux-utils'
import { selectAppError } from '../../features/Application/selectors'


const Alert = React.forwardRef<HTMLDivElement, AlertProps>( function Alert(
    props, ref) {
    return <MuiAlert elevation={ 6 } ref={ ref } variant="filled" { ...props } />
} )

export function ErrorSnackbar() {
    const error = useAppSelector( selectAppError )
    const { setError } = useActions( appActions )

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
        setError( { error: null } )
    }

    return (
        <Snackbar open={ !!error } autoHideDuration={ 6000 } onClose={ handleClose }>
            <Alert onClose={ handleClose } severity="error" sx={ { width: '100%' } }>
                { error }
            </Alert>
        </Snackbar>
    )
}
