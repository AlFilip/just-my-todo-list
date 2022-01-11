import { AsyncThunk } from '@reduxjs/toolkit'

// common types

export type statusType = 'idle' | 'loading'

// types for addMatcher helpers

export type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>
export type PendingAction = ReturnType<GenericAsyncThunk['pending']>
export type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>
export type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>

export type commonErrorType = { error: string }