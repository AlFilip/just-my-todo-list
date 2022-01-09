import { useDispatch, useSelector } from 'react-redux'
import { ActionCreatorsMapObject, bindActionCreators } from 'redux'
import { useMemo } from 'react'
import { allStateType, store } from '../App/store'


type appDispatchType = typeof store.dispatch

export const useAppDispatch = () => useDispatch<appDispatchType>()

export function useAppSelector<T>(selector: (state: allStateType) => T): T {
    return useSelector<allStateType, T>( selector )
}

export function useActions<T extends ActionCreatorsMapObject<any>>(actions:T) {
    const dispatch = useAppDispatch()

    return useMemo(() => bindActionCreators(actions, dispatch), [])
}