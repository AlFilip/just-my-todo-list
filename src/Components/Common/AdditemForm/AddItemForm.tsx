import React, {ChangeEventHandler, KeyboardEventHandler, useState} from "react";
import {Button, TextField} from "@mui/material";

type EditableSpanPropsType = {
    title?: string
    callBack: (title: string) => void
    buttonTitle?: string
    isEditMode?: boolean
}
export const AddItemForm: React.FC<EditableSpanPropsType> = React.memo(({
                                                                            title,
                                                                            callBack,
                                                                            buttonTitle,
                                                                            ...props
                                                                        }) => {

    // console.log('EditableSpan')
    const [titleValue, setTitleValue] = useState<string>(title || '')

    const saveChanges = () => {
        titleValue
        && callBack(titleValue)
        setTitleValue('')
    }
    const discardChanges = () => {
        setTitleValue(title || '')
    }
    const onKeyDownHandler: KeyboardEventHandler<HTMLInputElement> = (e) => {
        switch (e.key) {
            case 'Escape':
                discardChanges()
                break
            case 'Enter':
                titleValue
                && saveChanges()
                break
        }
    }
    const onTitleChangeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
        setTitleValue(e.currentTarget.value)
    }
    return (
        <>
            <TextField color="secondary"
                       size={'small'}
                       variant="outlined"
                       placeholder={'Enter here'}
                       value={titleValue}
                       onKeyDown={onKeyDownHandler}
                       onChange={onTitleChangeHandler}
            />

            {buttonTitle
            && <Button variant="contained"
                       color="success"
                       size="small"
                       onClick={saveChanges}
            >{buttonTitle}</Button>}
        </>


    )
})