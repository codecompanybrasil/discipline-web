import { DcpButton } from "@codecompanybrasil/discipline-core";
// import { DcpQuestionAndQuestionGroup, DcpQAnswer } from "@/_types/Questions/Questions";

import Header from "@/Layouts/Header";

import AvaliationHeader from "../Header";
import Question, { listAlternativeInterface } from "../Question";

import styles from './component.module.css'

// FORCE ANY
// questions: DcpQuestionAndQuestionGroup[],
// userAnswers: DcpQAnswer[]
type CorrecaoProps = {
    setPage: (page: string) => void,
    questions: any[],
    userAnswers: any[]
}

type QuestionRendererOptions = {
    listAlternatives?: listAlternativeInterface[]
}

function CorrectionModule({ setPage, questions, userAnswers }: CorrecaoProps) {
    const handleQuestionRendererOptions = (value: any) => {
        if (value.type === "group") {
            let list: listAlternativeInterface = {
                markedAlternative: value.markAlternative
            }

            return list
        }
    }

    return (
        <div className="default_page" >
            <Header title="Correção" />
            <div className={styles.modal_centralizer}>
                <div className={styles.modal}>
                    <AvaliationHeader title={"Titulo avaliacao"} correctionMode />
                    {
                        questions.map((value, index) => {
                            let markedAlternative = undefined

                            if (userAnswers.length > 0 && value.type === "question") {
                                const userAnswer = userAnswers.find(answer => answer.q_hash === value.hash);

                                if (userAnswer) {
                                    if (value.question_type === "radio") {
                                        markedAlternative = userAnswer.answer
                                    }
                                }
                            }

                            return (
                                <Question
                                    key={index}
                                    corretionMode
                                    indexQuestion={index}
                                    question={questions[index]}
                                    markedAlternative={markedAlternative} />
                            )
                        })
                    }
                </div>
                <div className="mt-5" >
                    <div className={"d-flex justify-content-around"} style={{ gap: "30px", paddingBottom: "60px" }}>
                        <DcpButton text="Voltar" color='accent' onClick={() => setPage("resultado")} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CorrectionModule;