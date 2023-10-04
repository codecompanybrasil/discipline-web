import { useEffect, useState } from "react";
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
    index: number,
    data: { hash: string, option_text: string },
    correct_answer: string,
    correctionMode?: boolean,
    markedAlternative?: string,
    onSelect?: (hash: string) => void
}

function QuestionOption({
    index = 0,
    data,
    correct_answer,
    correctionMode = false,
    markedAlternative,
    onSelect }: QuestionProps) {
    const optionLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

    const [selected, setSelected] = useState(false)
    const [correct, setCorrect] = useState(false)
    const [wrong, setWrong] = useState(false)

    const toggleSelect = () => {
        if (onSelect) onSelect(data.hash)
    }

    useEffect(() => {
        if(correctionMode) {
            if (markedAlternative) {
                setCorrect(data.hash === correct_answer)
                setWrong(data.hash == markedAlternative && data.hash !== correct_answer)
            } else {
                setCorrect(false)
                setWrong(false)
            }
        } else {
            if (markedAlternative) {
                setSelected(markedAlternative === data.hash)
            }
        }
    }, [markedAlternative, correctionMode])

    return (
        <div className={styles.alternative}>
            <button type="button"
                className={[
                    styles.radio_alternative,
                    selected ? styles.selected : undefined,
                    correct ? styles.correct : undefined,
                    wrong ? styles.wrong : undefined
                ].join(" ")}
                onClick={() => toggleSelect()}
                disabled={correctionMode}>
                {optionLetters[index]}
            </button>

            <span className={styles.response}>{data.option_text}</span>
        </div>
    )
}

export default QuestionOption;