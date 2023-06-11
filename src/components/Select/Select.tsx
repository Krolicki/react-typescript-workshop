import { useEffect, useRef, useState } from 'react'
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
    const [highlightedIndex, setHighlightedIndex] = useState(0)

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

    useEffect(()=>{
        setHighlightedIndex(0)
    },[isOpen])

    useEffect(()=>{
        const handler = (e: KeyboardEvent) => {
            if(e.target !== wrapperRef.current) return
            switch(e.code){
                case "Enter":
                case "Space":
                    setIsOpen(prev => !prev)
                    if(isOpen) setectOption(options[highlightedIndex])
                    break
                case "ArrowUp":
                case "ArrowDown":
                    if(!isOpen){
                        setIsOpen(true)
                        break
                    }
                    const newValue = highlightedIndex + (e.code === "ArrowDown" ? 1 : -1)
                    if(newValue >= 0 && newValue < options.length){
                        setHighlightedIndex(newValue)
                    }
                    break
                case "Escape":
                    setIsOpen(false)
                    break
            }
        }
        wrapperRef.current?.addEventListener("keydown", handler)

        return () => {
            wrapperRef.current?.removeEventListener("keydown", handler)
        }
    },[isOpen, highlightedIndex, options])

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
            <ul className={`${style["options-list"]} ${isOpen ? style.show : ""}`} data-testid="select-component">
                {options.map((option, index) => {
                    return (
                        <li
                            className={`
                                    ${style.option}
                                    ${index === highlightedIndex ? style.highlighted : ""} 
                                    ${(multiple ? value.includes(option) : option === value) ? style.selected : ""}
                                `}
                            key={option.value}
                            onClick={(e) => {
                                e.stopPropagation()
                                setectOption(option)
                                setIsOpen(false)
                            }}
                            onMouseEnter={() => setHighlightedIndex(index)}
                            role="option-list-item"
                        >
                            {option.label}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}