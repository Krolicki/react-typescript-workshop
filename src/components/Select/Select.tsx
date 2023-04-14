import { useState } from 'react'
import style from './select.module.css'

export type SelectOption = {
    label: string
    value: number
}

type SelectProps = {
    value?: SelectOption
    onChange: (value: SelectOption | undefined) => void
    options: SelectOption[]
}

export function Select({ value, onChange, options }: SelectProps) {
    const [isOpen, setIsOpen] = useState(false)

    function setectOption(option: SelectOption){
        if(option !== value) onChange(option)
    }

    return (
        <div
            className={style.wrapper}
            onClick={() => setIsOpen(prev => !prev)}
            onBlur={() => setIsOpen(false)}
            tabIndex={0}
        >
            <span className={style.value}>{value?.label}</span>
            <button
                className={style["clear-button"]}
                onClick={(e) => {
                    e.stopPropagation()
                    onChange(undefined)
                }}
            >
                &times;
            </button>
            <div className={style.line}></div>
            <div className={style.options}></div>
            <ul className={`${style["options-list"]} ${isOpen ? style.show : ""}`}>
                {options.map(option => {
                    return (
                        <li
                            className={`${style.option} ${option === value ? style.selected : ""}`}
                            key={option.value}
                            onClick={(e)=>{
                                e.stopPropagation()
                                setectOption(option)
                                setIsOpen(false)
                            }}
                        >
                            {option.label}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}