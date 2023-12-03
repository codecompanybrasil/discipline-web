import { useEffect } from 'react'
import { DcpButton, DcpIcon } from '@codecompanybrasil/discipline-core'

import styles from './component.module.css'
import teacherIcon from '@codecompanybrasil/discipline-core/dist/assets/icons/white/icons8-teacher-100.png'

type ResultProps = {
    numberQuestions: number,
    numberCorrect: number,
    numberNonResponse?: number,
    resultQuestion: any[],
    setPage: (page: string) => void,
    setResultadosDisplay?: () => void
}

function ResultPanel({ numberCorrect, numberQuestions, setPage, setResultadosDisplay, numberNonResponse = 0 }: ResultProps) {

    const onVerCorrecaoClick = () => {
        setPage('correcao')
        if (setResultadosDisplay) {
            setResultadosDisplay()
        }
    }

    return (
        <>
            <div className="row">
                <div className="col">
                    <div className="description_area">
                        {numberNonResponse === numberQuestions ? (
                            <h2 className="description_title">Nenhuma questão foi respondida</h2>
                        ) : numberNonResponse ? (
                            <>
                                <h2>{`Acertou ${numberCorrect} de ${numberQuestions} ${numberQuestions > 1 ? "questões" : "questão"}`}</h2>
                                <h3>{`${numberNonResponse} ${numberNonResponse > 1 ? "questões não foram respondidas" : "questão não foi respondida"}`}</h3>
                            </>
                        ) : (
                            <h2>{`Acertou ${numberCorrect} de ${numberQuestions} ${numberQuestions > 1 ? "questões" : "questão"}`}</h2>
                        )}
                    </div>
                </div>
            </div>

            <div className="row my-3">
                <a href="/" className="col-12 col-sm-6 col-md-4 offset-md-2 d-flex justify-content-center">
                    <DcpButton
                        className='border-lg'
                        color='accent'
                        text="Inicio"
                        slotstart={<DcpIcon.Home color="white" />} />
                    {/*onClick={() => setPage("avaliacao")} /> */}
                </a>

                <div className="col-12 mt-2 mt-sm-0 col-sm-6 col-md-4 d-flex justify-content-center">
                    <DcpButton
                        className='border-lg'
                        color='accent'
                        text="Ver Correção"
                        onClick={onVerCorrecaoClick}
                        slotstart={<img src={teacherIcon}
                            alt="Icon do professor"
                            width={30}
                            height={30} />
                        } />
                </div>
            </div>
        </>
    )
}

export default ResultPanel;