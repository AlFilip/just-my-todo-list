import React, { useState } from 'react'
import Input from '@mui/material/Input'
import Button from '@mui/material/Button'
import { useDispatch } from 'react-redux'
import { selectIsAuth, useAppSelector } from '../../helpers/selectors/selectors'


export const Login = () => {
    const [email, setEmail] = useState( '' )
    const [password, setPassword] = useState( '' )
    const IsAuth = useAppSelector( selectIsAuth )
    const dispatch = useDispatch()
    const buttonClickHandle = () => {
        dispatch( {} )

    }


    return (
        <>
            {/*<TextField type='email' />*/ }
            {/*<TextField type='password' placeholder='password'/>*/ }
            {/*<FormControl>*/ }
            <Input placeholder='email'
                   value={ email }
                   onChange={ e => setEmail( e.currentTarget.value ) }
            />

            <Input placeholder='password'
                   type='password'
                   value={ password }
                   onChange={ e => setPassword( e.currentTarget.value ) }
            />
            <Button> Send </Button>
            {/*</FormControl>*/ }
        </>
    )
}

