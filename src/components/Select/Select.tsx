import style from './select.module.css'

type SelectOption = {
    label: string
    value: any
}

type SelectProps = {
    value?: SelectOption
    onChange: (value: SelectOption | undefined) => void
    options: SelectOption[]
}

export function Select({ value, onChange, options} : SelectProps){
    return(
        <div className={style.wrapper}>
            <span className={style.value}>value</span>
            <button className={style["clear-button"]}>&times;</button>
            <div className={style.line}></div>
            <div className={style.options}></div>
            <ul className={`${style["options-list"]} ${style.show}`}>
                {options.map(option => {
                    return (
                        <li className={style.option} key={option.value}>
                            {option.label}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}