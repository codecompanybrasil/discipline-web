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
import QuestionOption from "../QuestionOption";

export interface listAlternativeInterface {
    markedAlternative: string
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
            height="0" />
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

function getCorrectionColor(correctAnswer: string, userAnswer: string) {
    if (userAnswer === undefined) return ''

    return (correctAnswer === userAnswer)
        ? styles.order_success
        : styles.order_danger
}

// FORCE ANY
// question: DcpQuestionAndQuestionGroup,
// handleResult?: (result: DcpQAnswer) => void
type QuestionProps = {
    indexQuestion: number,
    question: any,
    correctionMode?: boolean,
    markedAlternative?: string,
    listAlternatives?: listAlternativeInterface[],
    handleResult?: (result: any) => void
}

function Question({
    indexQuestion = 0,
    question,
    correctionMode = false,
    markedAlternative,
    handleResult }: QuestionProps) {

    const sendAnswerUpdate = (optionHash: string) => {
        if (handleResult !== undefined) {
            handleResult({
                q_hash: question.hash,
                answer: optionHash
            })
        }
    }

    return (
        <div className={[styles.question, "row mt-3 pt-3"].join(" ")}>
            <div className="col-12 d-flex justify-content-center justify-content-md-start col-md-auto">
                <div className={[
                    styles.order,
                    (correctionMode && markedAlternative) ? getCorrectionColor(question.correct_answer, markedAlternative) : undefined
                ].join(' ')}>{indexQuestion + 1}</div>
            </div>

            <div className={"col-12 mt-2 mt-md-0 col-md"} >
                <div className={styles.header_area}>
                    {/* FORCE ANY */}
                    {(question.header && question.header.length > 0) &&
                        question.header.map((item: any, index: number) => (
                            <QuestionHeaderItem key={index} content={item} />
                        ))}
                </div>

                <div className="my-3">
                    {
                        (question.question_type === "radio") && (question.options.length > 0) && (
                            question.options.map((option: any, index: number) => (
                                <QuestionOption
                                    key={index}
                                    index={index}
                                    data={option}
                                    correct_answer={question.correct_answer}
                                    correctionMode={correctionMode}
                                    markedAlternative={markedAlternative}
                                    onSelect={sendAnswerUpdate} />

                            ))
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Question;