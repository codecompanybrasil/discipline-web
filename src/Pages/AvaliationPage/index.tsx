import { useState, useEffect, useRef } from "react";
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';

import { DcpButton, DcpIcon } from "@codecompanybrasil/discipline-core";

import { Cronometro, Exclamation, Settings } from "@codecompanybrasil/discipline-core/dist/esm/components/DcpIcon";
import { Bar } from "@codecompanybrasil/discipline-core/dist/esm/components/DcpBar";

import styles from './page.module.css'
import AvaliationHeader from "./Header";
import AvaliationForm from './Form';
import ResultPanel from './Result';
import Relogio from "@/Components/Relogio";

import PageTemplate from "@/Layouts/PageTemplate";
import dayjs from "dayjs";
import { Warning } from "@/Components/Warning";

function AvaliationPage() {
    const navigate = useNavigate();
    const { hash } = useParams();
    let data = useLoaderData();

    const [page, setPage] = useState<string>("avaliacao")
    const [correctionMode, setCorrectionMode] = useState<boolean>(false)
    const [avaliationData, setDisciplineData] = useState<any>()
    const [resultsQuestions, setResultsQuestions] = useState<any[]>([])
    const [timeDisplayMode, setTimeDisplayMode] = useState<boolean>(false)
    const [relogioPauseTime, setRelogioPauseTime] = useState<boolean>(true)
    const [warningDisplay, setWarningDisplay] = useState<boolean>(true)
    const [correctionPage, setCorrectionPage] = useState<boolean>(false)
    const [finalWarningDisplay, setFinalWarningDisplay] = useState<boolean>(false)
    const [provaStatus, setProvaStatus] = useState<boolean>(true)
    const [userName, setUserName] = useState<string>("")
    const [userEmail, setUserEmail] = useState<string>("")

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
                const correctQuestion = questions?.find((question: any) =>
                    question.hash === userAnswer.q_hash &&
                    question.correct_answer === userAnswer.answer)
                if (correctQuestion) numCertas++
            })

            numQuestoesCertas.current = numCertas
        }
    }, [resultsQuestions])

    const handleSetPage = (page: string) => {
        if (page === "correcao") {
            setPage("avaliacao");
            setCorrectionMode(true);
        } else {
            setPage(page);
            setCorrectionMode(false);
        }
    }

    const handleResult = (result: any) => {
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

    const submitAvaliation = () => {
        if (!userName || !userEmail) {
            alert('O Preenchimento dos campos nome e e-mail é obrigatório');
            return;
        }

        fetch(`${process.env.REACT_APP_API_URL}/user-avaliation`, {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            //make sure to serialize your JSON body
            body: JSON.stringify({
                user_name: userName,
                user_email: userEmail,
                avaliation_hash: hash,
                avaliation_date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                number_of_questions: avaliationData?.sections[0]?.items?.length,
                correct_answers: numQuestoesCertas.current,
                not_answered_questions: numQuestoesNaoRespondidas.current,
            })
        }).catch(err => console.log(err));

        handleSetPage("resultado")
    }

    const handleHideTimeClick = () => {
        setTimeDisplayMode(timeDisplay => !timeDisplay)
    }

    const handleStartAvaliacao = () => {
        setWarningDisplay(warning => !warning)
        setRelogioPauseTime(false)
    }

    const handleEndTimeClock = () => {
        setFinalWarningDisplay(true)
    }

    const descriptionWarning = `Essa prova é uma corrida contra o tempo! Ao iniciar, um cronômetro será acionado, e você terá um período determinado para demonstrar seu conhecimento. Fique atento(a) e use cada segundo sabiamente. 📚<br/><br/>Encare cada desafio com seriedade. Sua dedicação reflete diretamente no seu desempenho. ✨<br/></br>Estamos confiantes de que você pode brilhar! Boa sorte! 🍀`

    const descriptionFinalWarning = `Infelizmente, o tempo para a prova expirou! 😢<br/><br/> Não desanime, pois cada desafio é uma oportunidade de aprendizado e crescimento. Com certeza você fará melhor na próxima vez 🚀 <br/><br/> Não se esqueça de conferir seus resultados. Clique no botão abaixo e descubra onde você errou! 🔍`

    return (
        <PageTemplate backgroundColor="var(--dcp-primary-color)" >
            <PageTemplate.Header />
            <PageTemplate.Panel>
                <PageTemplate.Content>
                    <Warning description={descriptionWarning} displayMode={warningDisplay} isClose={false}>
                        <div className="w-100 d-flex justify-content-center mt-4">
                            <DcpButton text="Começar avaliação" color="accent" onClick={handleStartAvaliacao} />
                        </div>
                    </Warning>
                    <Warning description={descriptionFinalWarning} displayMode={finalWarningDisplay} isClose={false}>
                        <div className="w-100 d-flex justify-content-center mt-4">
                            <DcpButton text="Ver resultados" color="accent" onClick={() => {setFinalWarningDisplay(false);submitAvaliation()}} />
                        </div>
                    </Warning>
                    <div className={styles.content}>
                        <div className={styles.avaliation_area}>
                            {page !== "resultado" && (
                                <AvaliationHeader
                                    title={avaliationData?.title}
                                    correctionMode={correctionMode}
                                    userName={userName}
                                    userEmail={userEmail}
                                    onChangeUserName={(value) => setUserName(value)}
                                    onChangeUserEmail={(value) => setUserEmail(value)} />
                            )}

                            {avaliationData && (
                                <>
                                    <div style={{ display: (page === "resultado") ? "none" : "block" }}>
                                        <AvaliationForm
                                            handleResult={handleResult}
                                            correctionMode={correctionMode}
                                            disciplineFileData={avaliationData}
                                            userAnswers={resultsQuestions} />
                                    </div>

                                    <div style={{ display: (page !== "resultado") ? "none" : "block" }}>
                                        <ResultPanel
                                            numberCorrect={numQuestoesCertas.current}
                                            numberQuestions={avaliationData?.sections[0]?.items?.length}
                                            numberNonResponse={numQuestoesNaoRespondidas.current}
                                            setPage={handleSetPage}
                                            resultQuestion={resultsQuestions} />
                                    </div>
                                </>
                            )}
                        </div>
                        <div className={styles.menu}>
                            <div className={styles.menu_fixed}>
                                <div className={styles.config_button}>
                                    <Settings color="black" />
                                </div>
                                <div className="d-flex align-items-center mb-3">
                                    <button className={styles.hidetime_button} onClick={handleHideTimeClick}>
                                        {timeDisplayMode ? "Mostrar tempo" : "Esconder tempo"}
                                    </button>
                                </div>
                                <div className={styles.time_area}>
                                    <div className="d-flex align-items-start mb-2">
                                        <Cronometro color="black" width={40} height={40} />
                                        <Relogio seconds={5} pauseTime={relogioPauseTime} hideMode={timeDisplayMode} endTime={handleEndTimeClock} />
                                        {/* <span className={styles.time}>05:00:00</span> */}
                                    </div>
                                    <div className="d-flex justify-content-center">
                                        <Bar percent={90} colorProgress="var(--dcp-accent-color)" colorNoProgress="var(--dcp-black-color)" width="100px" spanPercent />
                                        <div className={styles.time_area_options} style={{display: "block"}}>
                                            <div className={styles.time_area_option} onClick={handleStartAvaliacao}>
                                                <Exclamation />
                                                <span>Ver avisos</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <PageTemplate.Footer>
                        {page === "avaliacao" && !correctionMode && (
                            <div className="row my-3">
                                <div className="col-12 col-sm-6 col-md-4 offset-md-2 col-lg-3 offset-lg-3 d-flex justify-content-center">
                                    <DcpButton
                                        className='border-lg full-width'
                                        color='accent'
                                        text="Voltar"
                                        slotstart={<DcpIcon.Back />}
                                        onClick={() => navigate(-1)}
                                    />
                                </div>

                                <div className="col-12 mt-2 mt-sm-0 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center">
                                    <DcpButton
                                        className='border-lg full-width'
                                        color='success'
                                        text="Finalizar Avaliação"
                                        onClick={submitAvaliation}
                                    />
                                </div>
                            </div>
                        )}

                        {page === "avaliacao" && correctionMode && (
                            <div className="row my-3">
                                <div className="col-12 col-sm-6 col-md-4 offset-md-2 col-lg-3 offset-lg-3 d-flex justify-content-center">
                                    <DcpButton
                                        className='border-lg full-width'
                                        color='danger'
                                        text="Menu principal"
                                        slotstart={<DcpIcon.Back />}
                                        onClick={() => navigate('/avaliacoes')}
                                    />
                                </div>

                                <div className="col-12 mt-2 mt-sm-0 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center">
                                    <DcpButton
                                        className='border-lg full-width'
                                        color='accent'
                                        text="Refazer avaliação"
                                        onClick={() => navigate(0)}
                                    />
                                </div>
                            </div>
                        )}
                    </PageTemplate.Footer>
                </PageTemplate.Content>
            </PageTemplate.Panel>
        </PageTemplate>
    )
}

export default AvaliationPage;