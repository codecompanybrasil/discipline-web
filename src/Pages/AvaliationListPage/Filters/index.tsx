import { useEffect, useState } from "react"

import { DcpButton, DcpIconButton } from "@codecompanybrasil/discipline-core"
import { Filter, Lupa } from "@codecompanybrasil/discipline-core/dist/esm/components/DcpIcon"

import QueryFilter from "./QueryFilter"
import styles from './component.module.css'

type FilterProps = {
    handleUrlAPI: (url: URL) => void,
    urlAPI: URL
}

const Filters = ({ handleUrlAPI, urlAPI }: FilterProps) => {
    const [searchData, setSearchData] = useState<string>("")
    const [anoData, setAnoData] = useState<number>(0)
    const [statusData, setStatusData] = useState<string>("")
    const [badgeValue, setBadgeValue] = useState<string[]>([])
    const [isOpened, setIsOpened] = useState<boolean>(false)
    // const [statusData, setStatusData] = useState<boolean>()

    useEffect(() => {
        console.log(badgeValue)
    }, [badgeValue])

    useEffect(() => {
        if (searchData) {
            urlAPI.searchParams.set("title", searchData)
            if (!badgeValue.includes("title")) {
                setBadgeValue(badge => [...badge, "title"])
            }
        } else {
            urlAPI.searchParams.delete("title")
            setBadgeValue(badge => badge.filter(item => item !== "title"))
        }
        handleUrlAPI(urlAPI)
    }, [searchData]);

    useEffect(() => {
        if (anoData) {
            urlAPI.searchParams.set("year", String(anoData))
            if (!badgeValue.includes("year")) {
                setBadgeValue(badge => [...badge, "year"])
            }
        } else {
            urlAPI.searchParams.delete("year")
            setBadgeValue(badge => badge.filter(item => item !== "year"))
        }
        handleUrlAPI(urlAPI)
    }, [anoData]);

    useEffect(() => {
        if (statusData) {
            urlAPI.searchParams.set("status", statusData)
            if (!badgeValue.includes("status")) {
                setBadgeValue(badge => [...badge, "status"])
            }
        } else {
            urlAPI.searchParams.delete("status")
            setBadgeValue(badge => badge.filter(item => item !== "status"))
        }
    }, [statusData])


    const handleSearchData = (d: string) => {
        console.log("Alterou Input")
        setSearchData(d)
    }

    const handleAnoData = (d: number) => {
        setAnoData(d)
    }

    const handleStatusData = (d: string) => {
        setStatusData(d)
    }

    // const handleStatusData = (d: boolean) => {
    //     setStatusData(d)
    // }

    return (
        <div className={styles.filter}>
            <div className={styles.filter_area}>
                <div className={styles.row_filter}>
                    <div className={styles.search_input}>
                        <QueryFilter title="Pesquisar" typeInput="search" placeholder="Pesquisar..." handleData={handleSearchData} />
                    </div>
                    <DcpIconButton color="accent">
                        <Lupa color="black" />
                    </DcpIconButton>
                    <DcpIconButton href='/' onClick={() => setIsOpened((prev) => !prev)} style={{position: "relative"}}>
                        <Filter />
                        {badgeValue.length > 0 && (
                            <div className={styles.badge}>{badgeValue.length}</div>
                        )}
                    </DcpIconButton>
                    {/* <DcpButton 
                        text="Pesquisar"
                        color="accent"
                        slotstart={<Lupa color="black" />}
                    /> */}
                </div>
                <div className={styles.row_filter}
                    style={{ display: (isOpened) ? 'flex' : 'none' }}> {/*row row-cols-1 row-cols-md-2 row-cols-lg-3*/}
                    <QueryFilter title="Ano" typeInput="date" handleData={handleAnoData} />
                    <QueryFilter title="Status" typeInput="status" handleData={handleStatusData} />
                </div>
            </div>
        </div >
    )
}

export default Filters
