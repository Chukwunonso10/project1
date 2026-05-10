"use client"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

export const CopyForm = ()=>{
    const [value, setValue] = useState("")
    const [copied, setIscopied] = useState<boolean>(false)

    const handleCopy = async ()=>{
        navigator.clipboard.writeText(value)
        setIscopied(true)
        setTimeout(()=>{
            setIscopied(false)
            setValue("")
            
        }, 1000)
        
    
    }
    useEffect(()=>{
        if(copied && value !== ""){
            toast.success("copied to clipboard")
        }
        setIscopied(false)
        
    }, [copied])
    
    return (
        <div className="">
            <input type="text"
            className="outline-none border border-gray-300 px-4 py-2"
            placeholder="start typing"
            onChange={(e)=>setValue(e.target.value)}
            value={value}
             />
            <button className="border px-4 py-2 rounded-lg" onClick={handleCopy}>copy now</button>
            {copied && value !== "" && (
                <p className={`absolute top-0 left-0 transition-all`}>
                Text copied successfully
            </p>
            )}
        </div>
    )
}