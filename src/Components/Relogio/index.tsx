import { useState, useEffect, useRef } from "react"
import styles from './component.module.css'

type RelogioProps = {
    hours?: number,
    minutes?: number,
    seconds?: number,
    pauseTime?: boolean,
    hideMode?: boolean,
    endTime?: () => void
}

type RelogioCounterProps = {
    hours: number,
    minutes: number,
    seconds: number
}

function Relogio({hours=0, minutes=0, seconds=0, endTime = () => {}, pauseTime=false, hideMode=false}: RelogioProps) {
    const myPauseTime = useRef<boolean>(false)
    const endOfTime = useRef<boolean>(false)
    // const interval = useRef<NodeJS.Timer>()

    const [relogio, setRelogio] = useState<RelogioCounterProps>({
        hours: hours,
        minutes: minutes,
        seconds: seconds
    })

    const timeBeautifier = (time: number) => {
        let timeString = String(time)
        if (timeString.length === 1) {
            return `0${timeString}`
        } else {
            return timeString
        }
    }

    const decreaseTime = () => {
        if (relogio.seconds - 1 > 0) {
            setRelogio(time => {
                return {
                    hours: time.hours,
                    minutes: time.minutes,
                    seconds: time.seconds - 1
                }
            })
        } else {
            if (relogio.minutes - 1 > 0) {
                setRelogio(time => {
                    return {
                        hours: time.hours,
                        minutes: time.minutes - 1,
                        seconds: 59
                    }
                })
            } else {
                if (relogio.hours - 1 > 0) {
                    setRelogio(time => {
                        return {
                            hours: time.hours - 1,
                            minutes: 59,
                            seconds: 59
                        }
                    })
                } else {
                    setRelogio(time => {
                        return {
                            hours: 0,
                            minutes: 0,
                            seconds: 0
                        }
                    })
                    myPauseTime.current = true
                    endTime()
                }
            }
        }
    }

    // interval.current = setInterval(decreaseTime, 1000)
    // console.log("COmeçei o intervalo")

    useEffect(() => {
        // console.log("Checking clock")
        //alert("clicked")
        if (!pauseTime && !myPauseTime.current) {
            //alert("Check OK")
            const intervall = setInterval(decreaseTime, 1000)
            
            return () => clearInterval(intervall)
        }
    }, [relogio, myPauseTime, pauseTime])

    return (
        <>
            {hideMode ? (
                <span className={styles.time}>--:--:--</span>
            ) : (
                <span className={styles.time}>{timeBeautifier(relogio.hours)}:{timeBeautifier(relogio.minutes)}:{timeBeautifier(relogio.seconds)}</span>
            )}
        </>
    )
}

export default Relogio