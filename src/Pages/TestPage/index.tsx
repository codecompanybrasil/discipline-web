import WarningTemplate from "@/Layouts/WarningTemplate"
import ResultPanel from "../AvaliationPage/Result"

function TestPage() {
    const testFunc = (value: string) => {
        return value
    }

    return (
        <>
            <WarningTemplate>
                <ResultPanel
                    numberCorrect={10}
                    numberQuestions={90}
                    numberNonResponse={2}
                    setPage={testFunc}
                    resultQuestion={[]} />
            </WarningTemplate>
        </>
    )
}

export default TestPage