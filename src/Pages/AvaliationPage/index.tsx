import { useState, useEffect, useRef } from "react";
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';

import { DcpButton } from "@codecompanybrasil/discipline-core";
// import { DcpQuestion, DcpQAnswer, DisciplineFileData } from "@/_types/Questions/Questions";

import CorrectionModule from './Correction';
import AvaliationForm from './Form';
import ResultPanel from './Result';
import PageTemplate from "@/Layouts/PageTemplate";

function AvaliationPage() {
    const navigate = useNavigate();
    const { hash } = useParams();
    let data = useLoaderData();

    const [avaliationData, setDisciplineData] = useState<any>()
    // const [avaliationData, setDisciplineData] = useState<DisciplineFileData>()
    const [page, setPage] = useState<string>("avaliacao")
    // const [resultsQuestions, setResultsQuestions] = useState<DcpQAnswer[]>([])
    const [resultsQuestions, setResultsQuestions] = useState<any[]>([])

    let numQuestoesNaoRespondidas = useRef<number>(0)
    let numQuestoesCertas = useRef<number>(0)

    useEffect(() => {
        setDisciplineData(data)
    }, [data])

    useEffect(() => {
        const questions = avaliationData?.sections[0]?.items

        if (typeof window !== "undefined" && questions) {
            let numCertas = 0

            const questionsCount = questions?.length
            if (questionsCount && questionsCount > 0) {
                numQuestoesNaoRespondidas.current = questionsCount - resultsQuestions.length
            }

            resultsQuestions.forEach(userAnswer => {
                // FORCE ANY
                const correctQuestion = questions?.find((question: any) =>
                    question.hash === userAnswer.q_hash &&
                    question.correct_answer === userAnswer.answer)
                if (correctQuestion) numCertas++
            })

            numQuestoesCertas.current = numCertas
        }
    }, [resultsQuestions])

    const handleSetPage = (page: string) => {
        setPage(page)
    }
    
    // FORCE ANY
    const handleResultsQuestions = (result: any) => {
        setResultsQuestions(previousState => {
            let newState = [...previousState]

            let answerIndex = newState.findIndex(answer => answer.q_hash === result.q_hash)

            if (answerIndex !== -1) {
                const questionAnswered = newState[answerIndex]

                if (questionAnswered.answer === result.answer) {
                    newState.splice(answerIndex, 1)
                } else {
                    questionAnswered.answer = result.answer
                }
            } else {
                newState.push(result)
            }

            return newState
        })
    }
    
    let pageElem

    if (avaliationData) {
        switch (page) {
            case 'avaliacao':
                pageElem = <AvaliationForm
                    handleBack={() => navigate(-1)}
                    handleResultsQuestions={handleResultsQuestions}
                    handleSetPage={handleSetPage}
                    disciplineFileData={avaliationData} />
                break;
            case 'correcao':
                pageElem = <CorrectionModule
                    setPage={handleSetPage}
                    questions={avaliationData?.sections[0]?.items}
                    userAnswers={resultsQuestions} />
                break;
            case 'resultado':
                pageElem = <ResultPanel
                    numberCorrect={numQuestoesCertas.current}
                    numberQuestions={avaliationData?.sections[0]?.items?.length}
                    numberNonResponse={numQuestoesNaoRespondidas.current}
                    setPage={handleSetPage}
                    resultQuestion={resultsQuestions} />
                break;
        }
    }

    return (
        <PageTemplate>
            <PageTemplate.Header title="Avaliação" />
            <PageTemplate.Panel>
                {pageElem}
            </PageTemplate.Panel>
        </PageTemplate>
    )
}

export default AvaliationPage;