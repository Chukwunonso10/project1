"use client"

import { count } from "console"
import { useEffect, useRef, useState } from "react"

export const UseReff = ()=>{
    const [count, setCount] = useState(0)
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
    console.log(intervalRef)

    // useEffect(()=>{
    //     intervalRef.current = setInterval(() => {
    //         setCount(count => count + 1)
    //     }, 1000);
    // }, [])
   
    const pause = ()=>{}

    
    return (
        <div>
            <p>count: {count}</p>
            <button onClick={pause}>Pause</button>

        </div>
    )
}
