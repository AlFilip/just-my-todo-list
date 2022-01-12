import { AsyncThunk } from '@reduxjs/toolkit'

// common types

export type StatusType = 'idle' | 'loading'

// types for addMatcher helpers

export type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>
export type PendingAction = ReturnType<GenericAsyncThunk['pending']>
export type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>
export type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>

export type CommonErrorType = { error: string }