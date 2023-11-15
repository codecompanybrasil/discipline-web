import { useState, useEffect, CSSProperties, MouseEventHandler, ChangeEvent } from 'react'

import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'

import styles from './component.module.css'

dayjs.locale('pt-br')

interface InputDateProps {
    name: string,
    placeholder?: string,
    onChange: (year: string) => void
}

type InputStatusProps = {
    name: string,
    placeholder?: string,
    onChange: (status: boolean) => void
}

const InputStatus = ({name, placeholder, onChange}: InputStatusProps) => {
    const [status, setStatus] = useState<boolean>(false)

    useEffect(() => {
        onChange(status)
    }, [status])

    return (
        <>
            <select className={styles.input_status_options} onChange={(event => setStatus(event.target.value === "Feito" ? true : false))} >
                <option value="Feito">Feito</option>
                <option value="Não Feito">Não Feito</option>
            </select>
        </>
    )
}

const InputDate = ({ name, placeholder, onChange }: InputDateProps) => {
    const [date, setDate] = useState<string>("");

    useEffect(() => {
        
        onChange(date)
    }, [date])

    return (
        // <NativeDatepicker value={date} onChange={(newValue) => setDate(newValue)} />
        <input type="text"
            name={name}
            id={name}
            value={date}
            onChange={(event) => setDate(dayjs(event.target.value).format('YYYY'))}
            placeholder={placeholder} />
    );
}

interface InputSearchProps {
    id: string,
    placeholder?: string,
    onChange: (data: string) => void
}

const InputSearch = ({ id, placeholder, onChange }: InputSearchProps) => {
    const [searchData, setSearchData] = useState<string>("");

    useEffect(() => {
        console.log(searchData)
        onChange(searchData)
    }, [searchData])

    return (
        <input type="search"
            id={id}
            className={styles.input}
            value={searchData}
            onChange={(event) => setSearchData(event.target.value)}
            placeholder={placeholder}
            maxLength={150} />
    )
}

interface QueryFiltroProps {
    title: string,
    typeInput: "text" | "select" | "search" | "date" | "status",
    placeholder?: string,
    handleData: (data: any) => void
}

const QueryFilter = ({ title, typeInput, placeholder, handleData }: QueryFiltroProps) => {
    const [yearInputValue, setYearInputValue] = useState<string>("")
    const [statusInputValue, setStatusInputValue] = useState<string>("")
    const [searchInputValue, setSearchInputValue] = useState<string>("")
    const actualYear = new Date().getFullYear()

    useEffect(() => { //Aqui eu envio os dados do input Year
        handleData(yearInputValue)
    }, [yearInputValue])

    useEffect(() => { //Aqui eu envio os dados do Input de Status
        handleData(statusInputValue)
    }, [statusInputValue])

    useEffect(() => { //Aqui eu envio os dados do Input de Search
        handleData(searchInputValue)
    }, [searchInputValue])


    let yearsList: number[] = []

    for (let i = actualYear; i > actualYear - 30; i--) {
        yearsList.push(i)
    }

    // const onYearOptionsClick: MouseEventHandler<HTMLUListElement> = (e) => {
    //     const target = e.target as HTMLElement
    //     if (target && target.textContent) {
    //         if (target.textContent === "Vazio") {
    //             setYearInputValue("")
    //         } else {
    //             setYearInputValue(target.textContent)
    //         }
    //         setYearOptionsStyle({ display: "none" })
    //     }
    // }

    // const onStatusInputClick = () => {
    //     setStatusOptionsStyle({ display: "block" })
    // }

    // const onStatusOptionsClick: MouseEventHandler<HTMLUListElement> = (e) => {
    //     const target = e.target as HTMLElement
    //     if (target && target.textContent) {
    //         if (target.textContent === "Vazio") {
    //             setStatusInputValue("")
    //         } else {
    //             setStatusInputValue(target.textContent)
    //         }
    //         setStatusOptionsStyle({ display: "none" })
    //     }
    // }

    return (
        <div className={styles.query_filtro} >
            {typeInput === "search" && (
                <InputSearch id={title}
                    placeholder={placeholder}
                    onChange={(data: any) => setSearchInputValue(data)}
                />
            )}

            {typeInput === "select" && (
                <select name={title} id={title}>
                    {yearsList.map((year) => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>

                // <div className={styles.input_dropdown} >
                //     <input type="text" id={title} readOnly onClick={onYearInputClick} value={yearInputValue} placeholder={placeholder} />
                //     <ul className={styles.input_options} style={yearOptionsStyle} onClick={onYearOptionsClick}>
                //         <li>Vazio</li>
                //         {yearsList.map((year) => (
                //             <li key={year}>{year}</li>
                //         ))}
                //     </ul>
                // </div>
            )}

            {typeInput === "status" && (
                <InputStatus 
                    name={title}
                    placeholder="Status"
                    onChange={(status: boolean) => setStatusInputValue(String(status))}
                />
            )}

            {typeInput === "date" && (
                <InputDate
                    name={title}
                    placeholder="Ano"
                    onChange={(year: any) => setYearInputValue(year)}
                />
            )}
        </div>
    )
}

export default QueryFilter