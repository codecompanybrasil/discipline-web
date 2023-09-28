import { useState } from "react";
import DOMPurify from 'dompurify'

// import {
//     DcpQuestionAndQuestionGroup,
//     DcpQImage,
//     DcpQText,
//     DcpQStatement,
//     DcpQAnswer
// } from "@/_types/Questions/Questions";

import styles from './component.module.css'

export interface listAlternativeInterface {
    markedAlternative: string
}

// FORCE ANY
// question: DcpQuestionAndQuestionGroup,
// handleResult?: (result: DcpQAnswer) => void
type QuestionProps = {
    indexQuestion: number,
    question: any,
    corretionMode?: boolean,
    markedAlternative?: string,
    listAlternatives?: listAlternativeInterface[],
    handleResult?: (result: any) => void
}

// FORCE ANY
// content: (DcpQImage | DcpQText | DcpQStatement)
type QuestionHeaderItemProps = {
    content: any
}

function QuestionHeaderItem({ content }: QuestionHeaderItemProps) {
    const title = ('title' in content && content.title) ? (
        <h3 className={styles.title}>{content.title}</h3>
    ) : undefined

    const image = ('image_source' in content && content.image_source) ? (
        <img className={styles.image} src={content.image_source} alt={content.caption ?? ""}
            width="0"
            height="0"
            sizes="100vw" />
    ) : undefined

    const text = ('snippet' in content && content.snippet) ? (
        <p className={styles.text} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content.snippet) }}></p>
    ) : undefined

    const caption = ('caption' in content && content.caption) ? (
        <p className={styles.caption} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content.caption) }}></p>
    ) : undefined

    const statement = ('statement' in content && content.statement) ? (
        <p className={styles.statement} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content.statement) }} ></p>
    ) : undefined

    return (
        <>
            {title}
            {(image || text) && (
                <div className={styles.header_content}>
                    {image}
                    {text}
                    {caption}
                </div>)
            }
            {statement}
        </>
    )
}

function getCorrectionColor(correctAnswer: string, userAnswer: string | undefined) {
    if (userAnswer === undefined) return ''

    return (correctAnswer === userAnswer)
        ? styles.order_success
        : styles.order_danger

}

function Question({
    indexQuestion = 0,
    question,
    corretionMode = false,
    markedAlternative,
    listAlternatives = [],
    handleResult }: QuestionProps) {
    const alfabeto = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

    let defaultValueAlternative: any = []
    if (question.question_type === "radio" && question.options) {
        defaultValueAlternative = Array(question.options.length).fill(styles.radio_alternative)
    }

    const [alternativesState, setAlternativesState] = useState(defaultValueAlternative)

    const OnClickAlternative = (index: number, optionHash: string) => {
        let copyAlternativeState = [...alternativesState]

        if (alternativesState[index] === styles.radio_alternative) {
            copyAlternativeState = copyAlternativeState.map(() => styles.radio_alternative)
            copyAlternativeState[index] = `${styles.radio_alternative} ${styles.check_alternative}`
            if (handleResult !== undefined) {
                handleResult({
                    q_hash: question.hash,
                    answer: optionHash
                })
            }
        }

        console.log(`Copy: ${copyAlternativeState[index]}`)
        setAlternativesState(copyAlternativeState)
    }

    return (
        <>
            <div className={styles.divisor}></div>
            <div className="row mt-3">
                <div className={"col-12 d-flex justify-content-center justify-content-md-start col-md-auto"}>
                    <div className={[
                        styles.order,
                        getCorrectionColor(question.correct_answer, markedAlternative)].join(' ')}>{indexQuestion + 1}</div>
                </div>

                <div className={"col-12 mt-2 mt-md-0 col-md"} >
                    <div className={styles.header_area}>
                        {/* FORCE ANY */}
                        {(question.header && question.header.length > 0) &&
                            question.header.map((item: any, index: number) => (
                                <QuestionHeaderItem key={index} content={item} />
                            ))}
                    </div>

                    <div className={styles.alternative_area}>
                        {question.question_type === "radio" && question.options ? (
                            <>
                                {/* FORCE ANY */}
                                {question.options.map((option: any, index: number) => (
                                    <div key={index}>
                                        <div className={styles.alternative}>
                                            {corretionMode ? (
                                                <div className={[styles.radio_alternative, ((markedAlternative) ? ((option.hash === question.correct_answer) ? styles.radio_alternative_success : styles.radio_alternative_danger) : '')].join(" ")}
                                                    style={{ cursor: "default" }} >{alfabeto[index]}</div>
                                            ) : (
                                                <div className={alternativesState[index]} onClick={() => OnClickAlternative(index, option.hash)}>{alfabeto[index]}</div>
                                            )}
                                            <span className={styles.response} >{option.option_text}</span>
                                        </div>
                                    </div>
                                ))}
                            </>
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Question;