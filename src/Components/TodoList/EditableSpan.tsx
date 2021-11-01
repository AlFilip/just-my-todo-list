import React, {ChangeEventHandler, KeyboardEventHandler, useState} from "react";

type EditableSpanPropsType = {
    title: string
    callBack: (title: string) => void
    buttonTitle?: string
    isEditMode?: boolean
}
export const EditableSpan: React.FC<EditableSpanPropsType> = React.memo(({
                                                                  title,
                                                                  callBack,
                                                                  buttonTitle,
                                                                  isEditMode,
                                                                  ...props
                                                              }) => {
    const [titleValue, setTitleValue] = useState(title)
    const [editMode, setEditMode] = useState(isEditMode)
    const toggleEditMode = () => setEditMode(!editMode)

    const saveChanges = () => {
        debugger
        titleValue
        &&callBack(titleValue)

        titleValue
        && toggleEditMode()
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
                titleValue
                && saveChanges()
                break
        }
    }
    const onTitleChangeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
        setTitleValue(e.currentTarget.value)
    }
    return (
        <span onDoubleClick={toggleEditMode}>
            {!editMode && (props.children || titleValue)}

            {editMode
            && <>
                <input autoFocus
                       value={titleValue}
                       onKeyDown={onKeyDownHandler}
                       onChange={onTitleChangeHandler}
                       onBlur={saveChanges}/>

                {buttonTitle
                && <button onClick={saveChanges}>{buttonTitle}</button>}
            </>
            }

        </span>
    )
})