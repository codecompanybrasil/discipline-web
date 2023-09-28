import { useEffect, useState } from "react"

import { DcpIconButton } from "@codecompanybrasil/discipline-core"
import filterImage from '@codecompanybrasil/discipline-core/dist/assets/icons/black/icons8-options-100.png'

import QueryFilter from "./QueryFilter"
import styles from './component.module.css'

type FilterProps = {
    onMenuClick: () => void,
    handleUrlAPI: (url: URL) => void,
    urlAPI: URL
}

const Filters = ({ onMenuClick, handleUrlAPI, urlAPI }: FilterProps) => {
    const [searchData, setSearchData] = useState<string>("")
    const [anoData, setAnoData] = useState<number>(0)
    // const [statusData, setStatusData] = useState<boolean>()

    useEffect(() => {
        // Função para renovar a URL dos filtros
        if (searchData) {
            urlAPI.searchParams.set("title", searchData)
        } else {
            urlAPI.searchParams.delete("title")
        }
        handleUrlAPI(urlAPI)
    }, [searchData]);

    useEffect(() => {
        // Função para renovar a URL dos filtros
        if (anoData) {
            urlAPI.searchParams.set("year", String(anoData))
        } else {
            urlAPI.searchParams.delete("year")
        }
        handleUrlAPI(urlAPI)
    }, [anoData]);


    const handleSearchData = (d: string) => {
        console.log("Alterou Input")
        setSearchData(d)
    }

    const handleAnoData = (d: number) => {
        setAnoData(d)
    }

    // const handleStatusData = (d: boolean) => {
    //     setStatusData(d)
    // }


    return (
        <div className="container">
            <div className="row gx-1">
                <div className="col">
                    <div className="d-flex align-items-center">
                        <DcpIconButton className={styles.filter_btn} onClick={onMenuClick}>
                            <img className="dcp-icon" src={filterImage} alt="Filtro" />
                        </DcpIconButton>
                        <h2 className={styles.title_filtro} >Filtros</h2>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <QueryFilter title="Pesquisar" typeInput="search" handleData={handleSearchData} />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <QueryFilter title="Ano" typeInput="data" handleData={handleAnoData} />
                </div>
            </div>
        </div>
    )
}

export default Filters