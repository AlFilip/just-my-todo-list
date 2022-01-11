import axios from 'axios'


export const handleServerApiErrors = (error: string,
                                      rejectWithValue: Function,
) => {
    return rejectWithValue( { error } )
}


export const handleServerNetworkErrors = (error: unknown,
                                          rejectWithValue: Function,
) => {
    if (axios.isAxiosError( error )) {
        return rejectWithValue( { error: error.message } )
    }
    console.log(error)
}