import React, {ChangeEventHandler, KeyboardEventHandler, useState} from "react";

type EditableSpanPropsType = {
    title: string
    callBack: (title: string) => void
    buttonTitle?: string
}
export const EditableSpan: React.FC<EditableSpanPropsType> = ({
                                                                  title,
                                                                  callBack,
                                                                  buttonTitle,
                                                              }) => {
    const [titleValue, setTitleValue] = useState(title)
    const [editMode, setEditMode] = useState(false)
    const toggleEditMode = () => setEditMode(!editMode)

    const saveChanges = () => {
        toggleEditMode()
        callBack(titleValue)
    }
    const discardChanges = () => {
        toggleEditMode()
        setTitleValue(title)
    }
    const onKeyDownHandler: KeyboardEventHandler<HTMLInputElement> = (e) => {
        switch (e.key) {
            case 'Escape':
                discardChanges()
                break
            case 'Enter':
                saveChanges()
                break
        }
    }
    const onTitleChangeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
        setTitleValue(e.currentTarget.value)
    }

    return (
        <span onDoubleClick={toggleEditMode}>
            {!editMode && titleValue}
            {editMode && <>
                <input autoFocus value={titleValue}
                       onKeyDown={onKeyDownHandler}
                       onChange={onTitleChangeHandler}
                       onBlur={saveChanges}/>
                {buttonTitle && <button onClick={saveChanges}>Rename</button>}
            </>
            }

        </span>
    )
}