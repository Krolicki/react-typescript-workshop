import { useRef, useState } from 'react'
import style from './select.module.css'

export type SelectOption = {
    label: string
    value: number
}

type SingleSelectProps = {
    multiple?: false
    value?: SelectOption
    onChange: (value: SelectOption | undefined) => void
}

type MultipleSelectProps = {
    multiple: true
    value: SelectOption[]
    onChange: (value: SelectOption[]) => void
}

type SelectProps = {
    options: SelectOption[]
} & (SingleSelectProps | MultipleSelectProps)

export function Select({ multiple, value, onChange, options }: SelectProps) {
    const [isOpen, setIsOpen] = useState(false)

    const wrapperRef = useRef<HTMLDivElement>(null)

    function setectOption(option: SelectOption) {
        if (multiple) {
            if (value.includes(option)) {
                onChange(value.filter(o => o !== option))
            }
            else {
                onChange([...value, option])
            }
        }
        else {
            if (option !== value) onChange(option)
        }
    }

    return (
        <div
            className={style.wrapper}
            onClick={() => setIsOpen(prev => !prev)}
            onBlur={() => setIsOpen(false)}
            tabIndex={0}
            ref={wrapperRef}
        >
            <span className={style.value}>{multiple ? value.map(val => {
                return(
                    <button
                        key={val.value}
                        onClick={e => {
                            e.stopPropagation()
                            setectOption(val)
                        }}
                        className={style["option-button"]}
                    >
                        {val.label}
                        <span className={style["clear-button"]}>&times;</span>
                    </button>
                )
            }) 
            : value?.label}</span>
            <button
                className={style["clear-button"]}
                onClick={(e) => {
                    e.stopPropagation()
                    multiple ? onChange([]) : onChange(undefined)
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
                            className={`
                                    ${style.option} 
                                    ${(multiple ? value.includes(option) : option === value) ? style.selected : ""}
                                `}
                            key={option.value}
                            onClick={(e) => {
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