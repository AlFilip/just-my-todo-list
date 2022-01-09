import React, { ChangeEventHandler, KeyboardEventHandler, useState } from "react"
import { Input } from "@mui/material"


type EditableSpanPropsType = {
    title: string
    callBack: (title: string) => void
    buttonTitle?: string
    isEditMode?: boolean
    disabled?: boolean
}
export const EditableSpan: React.FC<EditableSpanPropsType> = React.memo( ({
                                                                              title,
                                                                              callBack,
                                                                              buttonTitle,
                                                                              isEditMode,
                                                                              disabled,
                                                                              ...props
                                                                          }) => {

    // console.log('EditableSpan')
    const [titleValue, setTitleValue] = useState( title )
    const [editMode, setEditMode] = useState( isEditMode )
    const toggleEditMode = () => {
        if (!disabled) {
            setEditMode( !editMode )
        }
    }

    const saveChanges = () => {
        titleValue
        && callBack( titleValue )

        titleValue
        && toggleEditMode()
    }
    const discardChanges = () => {
        toggleEditMode()
        setTitleValue( title )
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
        setTitleValue( e.currentTarget.value )
    }
    return (
        <span onDoubleClick={ toggleEditMode }>
            { !editMode && ( props.children || titleValue ) }

            { editMode
            && <>
                <Input autoFocus
                       value={ titleValue }
                       onKeyDown={ onKeyDownHandler }
                       onChange={ onTitleChangeHandler }
                       onBlur={ saveChanges }
                       disabled={ disabled }
                />

                { buttonTitle
                && <button disabled={ disabled } onClick={ saveChanges }>{ buttonTitle }</button> }
            </>
            }

        </span>
    )
} )