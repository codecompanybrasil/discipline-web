import PageTemplate from "@/Layouts/PageTemplate"
import { DcpButton, DcpSelect } from "@codecompanybrasil/discipline-core"
import { Taskboard, Gym } from "@codecompanybrasil/discipline-core/dist/esm/components/DcpIcon"
import { useState, useEffect } from "react"
import { DetalhesAvaliacao } from "@/Types/Api"
import { useParams } from "react-router-dom"
import styles from './page.module.css'

type OptionsBookProps = {
    text: string
}

function AvaliationIntermediate() {
    const [optionBookClicked, setOptionBookClicked] = useState<number | undefined>()
    const [data, setData] = useState<DetalhesAvaliacao>()
    const { hash } = useParams()

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/avaliations/${hash}`)
            .then(async(response) => {
                const text = await response.json()
                setData(text)
            })
    }, [])

    const optionsBook: OptionsBookProps[] = [
        {
            text: "Inglês"
        }
    ]

    // const handleOptionBookClick = (key: number) => {
    //     setOptionBookClicked(key)
    // }

    const timeBeautifier = (time: number) => {
        let timeString = String(time)
        if (timeString.length === 1) {
            return `0${timeString}`
        } else {
            return timeString
        }
    }

    const calculatingTimeToTest = (questoes: number) => {
        const timePerQuestao = 2 //2 Minutos
        
        if (timePerQuestao * questoes > 60) {
            const horas = Math.floor((timePerQuestao * questoes) / 60)
            const minutos = (timePerQuestao * questoes) - (horas * 60)

            return `${timeBeautifier(horas)}:${timeBeautifier(minutos)}:00`
        }
        
        return `00:${timeBeautifier(timePerQuestao * questoes)}:00`
    }

    return (
        <>
            <PageTemplate>
                <PageTemplate.Header />
                <PageTemplate.Panel>
                    <PageTemplate.Menu />
                    <PageTemplate.Content>
                        <div className={styles.avaliation_area}>
                            <div className={styles.books_area}>
                                <h1>{data ? data.title : ""}</h1>
                                {/* <div className={styles.books_group}>
                                    {optionsBook.map((result, index) => (
                                        <DcpButton text={result.text} key={index} color={optionBookClicked === index ? "accent" : "primary"} onClick={() => handleOptionBookClick(index)} fontSize="1em" />
                                    ))}
                                </div> */}
                                <div className={styles.description_area}>
                                    <img src={`${process.env.REACT_APP_API_URL}${data && data.icon}`} alt={`Logo da prova ${data && data.title}`} className={styles.logo_prova} />
                                    <p className={styles.description}>
                                        {data && data.description && data.description}
                                    </p>
                                </div>
                                <div className="w-100 mt-5 d-flex justify-content-center">
                                    <a href={`/avaliacoes/${hash}`}>
                                        <DcpButton color="success" text="Avançar" fontSize="1em" />
                                    </a>
                                </div>
                            </div>
                            <div className={styles.settings_area}>
                                <h1>{data ? data.title : ""}</h1>
                                {/* <div className={styles.menu}>
                                    <img src="https://api.discipline.app.br/uploads/institutions/9f262b25-2486-4507-87d2-fb7145a6ebb0.png" alt="Imagem prova" className={styles.image_avaliation} />
                                    <p>
                                        <h3 className={styles.informations_title}>Nome:</h3>
                                        <span>Enem 2018</span>
                                    </p>
                                    <p>
                                        <h3 className={styles.informations_title}>Descrição:</h3>
                                        <br />
                                        <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ullamcorper enim eget auctor varius. Vivamus arcu sapien, blandit varius faucibus id, varius eget sapien. Fusce dignissim nullam sodales.
                                        </span>
                                    </p>
                                </div> */}
                                <div className={styles.menu}>
                                    <DcpSelect slotstart={<Taskboard />} options={[
                                        {
                                            text: "Avaliações",
                                            slotStart: (<Taskboard />)
                                        }
                                    ]} color="accent" />
                                    <div className="mt-2">
                                        <DcpSelect options={optionsBook} color="accent" />
                                    </div>
                                    <p>
                                        <h3 className={styles.informations_title}>Tempo estimado:</h3>
                                        <span>{data && calculatingTimeToTest(data.questions_quantity)}</span>
                                    </p>
                                    <p>
                                        <h3 className={styles.informations_title}>Questões:</h3>
                                        <span>{data ? data.questions_quantity : ""}</span>
                                    </p>
                                    {/* <p>
                                        <h3 className={styles.informations_title}>Caderno:</h3>
                                        <span>{optionBookClicked !== undefined ? optionsBook[optionBookClicked].text : "Não selecionado"}</span>
                                    </p> */}
                                </div>
                            </div>
                        </div>
                    </PageTemplate.Content>
                </PageTemplate.Panel>
            </PageTemplate>
        </>
    )
}

export default AvaliationIntermediate