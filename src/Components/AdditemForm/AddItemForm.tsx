import React, {ChangeEventHandler, KeyboardEventHandler, useState} from "react";
import {Button, TextField} from "@mui/material";

type EditableSpanPropsType = {
    title?: string
    callBack: (title: string) => void
    buttonTitle?: string
    isEditMode?: boolean
    autoFocus?: boolean
    discardOnBlur?: boolean
    placeHolder?: string
    disabled?: boolean
}
export const AddItemForm: React.FC<EditableSpanPropsType> = React.memo(({
                                                                            title,
                                                                            callBack,
                                                                            buttonTitle,
                                                                            disabled,
                                                                            ...props
                                                                        }) => {

    // console.log('EditableSpan')
    const [titleValue, setTitleValue] = useState(title || '')

    const saveChanges = () => {
        titleValue
        && callBack(titleValue)
        setTitleValue('')
    }
    const discardChanges = () => {
        setTitleValue(title || '')
        title
        && callBack(title)
    }
    const onKeyDownHandler: KeyboardEventHandler<HTMLInputElement> = e => {
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
    const onTitleChangeHandler: ChangeEventHandler<HTMLInputElement> = e => {
        setTitleValue(e.currentTarget.value)
    }

    const onBlurHandler = () => {
        props.discardOnBlur
        && discardChanges()
    }

    return (
        <>
            <TextField color="secondary"
                       size={'small'}
                       variant="outlined"
                       placeholder={props.placeHolder || 'Enter here'}
                       value={titleValue}
                       onKeyDown={onKeyDownHandler}
                       onChange={onTitleChangeHandler}
                       autoFocus={props.autoFocus}
                       onBlur={onBlurHandler}
                       disabled={disabled}
            />

            {buttonTitle
            && <Button variant="contained"
                       color="success"
                       size="small"
                       onClick={saveChanges}
                       disabled={disabled}
            >{buttonTitle}</Button>}
        </>


    )
})