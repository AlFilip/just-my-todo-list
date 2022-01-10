import React, { useEffect } from 'react'
import './App.css'
import { CircularProgress, Container } from "@mui/material"
import { ErrorSnackbar } from '../Components/ErrorSnackBar/ErrorSnackBar'
import { appActions, appSelectors } from '../features/Application'
import { authSelectors, Login } from '../features/Auth'
import { Header } from '../features/Header/Header'
import { TodoListsList } from '../features/TodoListsList'
import { useActions, useAppSelector } from '../utils/redux-utils'


function App() {
    const isAuth = useAppSelector( authSelectors.selectIsAuth )
    const isInitialized = useAppSelector( appSelectors.selectIsInit )

    const { initApp } = useActions( appActions )

    useEffect( () => {
        initApp()
    }, [initApp] )


    if (!isInitialized) {
        return <div
            style={ { position: 'fixed', top: '30%', textAlign: 'center', width: '100%' } }>
            <CircularProgress/>
        </div>
    }

    return (
        <div className="App">
                <Header/>
                <Container>
                    {
                        isAuth
                            ?
                            <TodoListsList/>
                            : <Login/>
                    }
                    <ErrorSnackbar/>
                </Container>
        </div>
    )
}

export default App
