import PageTemplate from "@/Layouts/PageTemplate"
import { DcpButton } from "@codecompanybrasil/discipline-core"
import { Taskboard } from "@codecompanybrasil/discipline-core/dist/esm/components/DcpIcon"
import { useState } from "react"
import { useParams } from "react-router-dom"
import styles from './page.module.css'

type OptionsBookProps = {
    title: string
}

function AvaliationIntermediate() {
    const [optionBookClicked, setOptionBookClicked] = useState<number | undefined>()
    const { hash } = useParams()

    const optionsBook: OptionsBookProps[] = [
        {
            title: "Caderno de prova A"
        },
        {
            title: "Caderno de prova B"
        },
        {
            title: "Caderno de prova C"
        },
        {
            title: "Caderno de prova D"
        },
        {
            title: "Caderno de prova E"
        }
    ]

    const handleOptionBookClick = (key: number) => {
        setOptionBookClicked(key)
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
                                <h1>Escolha seu caderno:</h1>
                                <div className={styles.books_group}>
                                    {optionsBook.map((result, index) => (
                                        <DcpButton text={result.title} key={index} color={optionBookClicked === index ? "accent" : "primary"} onClick={() => handleOptionBookClick(index)} fontSize="1em" />
                                    ))}
                                </div>
                                <div className="w-100 mt-5 d-flex justify-content-center">
                                    <DcpButton color="success" text="Começar avaliacao" fontSize="1em" />
                                </div>
                            </div>
                            <div className={styles.settings_area}>
                                <div className={styles.menu}>
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
                                </div>
                                <div className={styles.menu}>
                                    <DcpButton text="Avaliações" slotstart={<Taskboard />} color="accent" />
                                    <p>
                                        <h3 className={styles.informations_title}>Tempo:</h3>
                                        <span>5 horas</span>
                                    </p>
                                    <p>
                                        <h3 className={styles.informations_title}>Caderno:</h3>
                                    <span>{optionBookClicked !== undefined ? optionsBook[optionBookClicked].title : "Não selecionado"}</span>
                                    </p>
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