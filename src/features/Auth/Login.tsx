import React, { useState } from 'react'
import Input from '@mui/material/Input'
import Button from '@mui/material/Button'
import { useDispatch } from 'react-redux'
import { authActions } from './'
import Checkbox from '@mui/material/Checkbox/Checkbox'


export const Login = () => {
    const [email, setEmail] = useState( '' )
    const [password, setPassword] = useState( '' )
    const [rememberMe, setRememberMe] = useState( false )
    const dispatch = useDispatch()
    const buttonClickHandle = () => {
        dispatch( authActions.login( { email, password, rememberMe } ) )

    }


    return (
        <>
            <Input placeholder='email'
                   value={ email }
                   onChange={ e => setEmail( e.currentTarget.value ) }
            />

            <Input placeholder='password'
                   type='password'
                   value={ password }
                   onChange={ e => setPassword( e.currentTarget.value ) }
            />

            <Checkbox checked={ rememberMe }
                      onChange={ () => setRememberMe( !rememberMe ) }


            />
            <Button onClick={buttonClickHandle}> Send </Button>
        </>
    )
}

