import React, { ChangeEventHandler, useState } from 'react'
import Button from '@mui/material/Button'
import { authActions } from './'
import Checkbox from '@mui/material/Checkbox/Checkbox'
import TextField from '@mui/material/TextField/TextField'
import { useActions } from '../../utils/redux-utils'
import { appActions } from '../Application'
import s from './Login.module.css'
import FormControlLabel from '@mui/material/FormControlLabel/FormControlLabel'


const checkEmailValidity = (value: string) => {
    const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return reg.test( value )
}

export const Login = () => {
    const [email, setEmail] = useState( '' )
    const [password, setPassword] = useState( '' )
    const [rememberMe, setRememberMe] = useState( false )
    const [emailError, setEmailError] = useState( '' )
    const { login } = useActions( authActions )
    const { setError } = useActions( appActions )

    const emailChangeHandle: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = e => {
        if (emailError) {
            setEmailError( '' )
        }
        setEmail( e.currentTarget.value )
    }

    const buttonClickHandle = () => {
        if (!checkEmailValidity( email )) {
            setEmailError( 'not valid email' )
            setError( { error: 'not valid email' } )
            return
        }
        login( { email, password, rememberMe } )
    }
    return (
        <div className={ s.wrapper }>
            <div className={ s.loginForm }>
                <h2 className={ s.header }>Sing in to Todolist </h2>
                <TextField inputProps={ {
                    className: s.email,
                } }
                    value={ email }
                    onChange={ emailChangeHandle }
                    required
                    margin='normal'
                    label={ emailError || 'Email' }
                    error={ !!emailError }
                />

                <TextField inputProps={ {
                    className: s.password,
                } }
                           type='Password'
                           required
                           value={ password }
                           onChange={ e => setPassword( e.currentTarget.value ) }
                           margin='normal'
                           label='Password'
                />

                <FormControlLabel label="Remember me"
                                  sx={ { width: 'fit-content' } }
                                  control={
                                      <Checkbox className={ s.checkbox }
                                                checked={ rememberMe }
                                                onChange={ () => setRememberMe( !rememberMe ) }
                                      />
                                  }
                />
                <Button variant={ 'contained' } onClick={ buttonClickHandle } className={ s.btn }> Send </Button>
            </div>
        </div>
    )
}

