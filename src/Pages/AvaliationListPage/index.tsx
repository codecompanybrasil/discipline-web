// Libraries
import { useState, useEffect } from "react";

// General Components
import ListItem from "@/Components/ListItem"
import Pagination from "@/Components/Pagination"

// Local Components
import Filters from "./Filters";

// Styles and Images
import PageTemplate from "@/Layouts/PageTemplate";
import styles from './page.module.css'

// Types and Interfaces
export interface Avaliation {
    hash: string,
    title: string,
    year: number,
    icon?: string
}

function AvaliationListPage() {
    const [activeMenuIndex, setActiveMenuIndex] = useState<number | null>(null) //Váriavel que diz qual Query tem o menu aberto
    const [resData, setResData] = useState<{ data: Avaliation[], total: number }>()
    const [itemsPerPage, setItemsPerPage] = useState<number>(10)
    const [loading, setLoading] = useState<boolean>(true)
    const [urlAPI, setUrlAPI] = useState<URL>(new URL(`${process.env.REACT_APP_API_URL}/avaliations?offset=0&limit=${itemsPerPage}`))

    const fetchingAPI = () => {
        fetch(urlAPI)
            .then(async (response) => {
                if (response.ok) {
                    const resData = await response.json()
                    setResData(resData)
                }
            })
            .catch((error) => {
                console.error(error)
                setResData({ data: [], total: 0 })
            })
    }

    useEffect(() => fetchingAPI(), [])

    useEffect(() => {
        console.log("Data changed", resData)
    }, [resData])

    const handleSetActiveMenuIndex = (menu: number | null) => {
        setActiveMenuIndex(menu)
    }

    const handleUrlAPI = (url: URL) => {
        setUrlAPI(url)
        fetchingAPI()
        console.log(`Fetching: ${urlAPI.href}`)
    }

    const updateList = (page: number) => {
        const offset = (page === 1) ? 0 : (itemsPerPage * (page - 1))
        urlAPI.searchParams.set("offset", String(offset))
        fetchingAPI()
    }

    return (
        <>
            <PageTemplate>
                <PageTemplate.Header title="Avaliações" />
                <PageTemplate.Panel>
                    <PageTemplate.Menu selected={3} />
                    <PageTemplate.Content>
                        <div className={styles.avaliacao}>
                            {/* <Filters handleUrlAPI={handleUrlAPI} urlAPI={urlAPI} /> */}
                            <div className={styles.querys_avaliacao}>
                                {resData?.total === 0 ? (
                                    <p className={styles.sem_resultados}>Sem resultados</p>
                                ) : (resData?.data.map((item, index) => (
                                    <ListItem
                                        key={index}
                                        index={index}
                                        hash={item.hash}
                                        link={`/avaliacoes/${item.hash}`}
                                        title={item.title}
                                        iconPath={item.icon}
                                        iconAlt={`Logo da Prova - ${item.title}`}
                                        setActiveMenuIndex={handleSetActiveMenuIndex}
                                        activeMenuIndex={activeMenuIndex}
                                    />
                                )))}
                            </div>
                            {resData?.total && (resData.total > itemsPerPage) &&
                                <Pagination
                                    totalItems={resData?.total ?? 1}
                                    itemsPerPage={itemsPerPage}
                                    onPaginate={updateList} />
                            }
                        </div>
                    </PageTemplate.Content>
                </PageTemplate.Panel>
            </PageTemplate>
        </>
    );
}

export default AvaliationListPage;