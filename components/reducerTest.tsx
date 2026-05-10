"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useReducer, useTransition } from "react"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import { signInSchema, signInType } from "@/app/lib/schema"
import { signInAction } from "@/app/lib/server"

type State = {
    success: boolean
    error: boolean
    message: string
    isLoading: boolean
}

type Action =
    | { type: "SUBMIT_STARTED" }
    | { type: "SUBMIT_SUCCESS", message: string }
    | { type: "SUBMIT_ERROR", message: string }
    | { type: "RESET" }

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "SUBMIT_STARTED":
            return { ...state, isLoading: true, error: false, success: false, message: "Creating account..." }
        case "SUBMIT_SUCCESS":
            return { ...state, isLoading: false, success: true, error: false, message: action.message }
        case "SUBMIT_ERROR":
            return { ...state, isLoading: false, success: false, error: true, message: action.message }
        case "RESET":
            return { success: false, error: false, message: "", isLoading: false }
        default:
            return state
    }
}

export default function ReducerSignIn() {
    const router = useRouter()

    const initialState: State = { success: false, error: false, message: "", isLoading: false }
    const [state, dispatch] = useReducer(reducer, initialState)
    const [isPending, startTransition] = useTransition()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<signInType>({ resolver: zodResolver(signInSchema) })

    const onSubmit = handleSubmit((data) => {
        dispatch({ type: "SUBMIT_STARTED" })

        startTransition(async () => {
            const result = await signInAction({ success: false, error: false, message: "" }, data)
            if (result.success) {
                dispatch({ type: "SUBMIT_SUCCESS", message: result.message || "Account successfully created" })
            } else {
                dispatch({ type: "SUBMIT_ERROR", message: result.message || "Error creating account" })
            }
        })
    })

    useEffect(() => {
        if (state.success) {
            toast.success(state.message)
            reset()
            router.push("/")
        }
        if (state.error) {
            toast.error(state.message)
        }
    }, [state.success, state.error, state.message, reset, router])

    return (
        <div className="flex items-center justify-center bg-[#0a0a0a] min-h-screen w-screen px-4 overflow-hidden relative">
            {/* Animated Background Orbs */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-green-500/10 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[120px] animate-pulse delay-700"></div>

            <div className="relative z-10 max-w-md w-full">
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-10 transform transition-all duration-500 hover:scale-[1.01]">
                    <form onSubmit={onSubmit} className="flex flex-col gap-6 w-full">
                        <div className="text-center space-y-2 mb-8">
                            <h1 className="text-3xl font-bold bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent">
                                Create Account
                            </h1>
                            <p className="text-gray-400 text-sm font-medium italic">Join our community today</p>
                        </div>

                        <div className="space-y-5">
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider ml-1">Username</label>
                                <input
                                    type="text"
                                    {...register("userName")}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 outline-none focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 transition-all"
                                    placeholder="e.g. JohnDoe"
                                />
                                {errors.userName && <p className="text-red-400 text-[10px] uppercase font-bold ml-1 tracking-tight">{errors.userName.message}</p>}
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider ml-1">Phone Number</label>
                                <input
                                    type="text"
                                    {...register("PhoneNumber")}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 outline-none focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 transition-all"
                                    placeholder="+1 (555) 000-0000"
                                />
                                {errors.PhoneNumber && <p className="text-red-400 text-[10px] uppercase font-bold ml-1 tracking-tight">{errors.PhoneNumber.message}</p>}
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider ml-1">Email Address</label>
                                <input
                                    type="email"
                                    {...register("email")}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 outline-none focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 transition-all"
                                    placeholder="john@example.com"
                                />
                                {errors.email && <p className="text-red-400 text-[10px] uppercase font-bold ml-1 tracking-tight">{errors.email.message}</p>}
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={state.isLoading || isPending}
                            className="mt-6 w-full cursor-pointer bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-green-900/20 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {state.isLoading || isPending ? (
                                 <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    <span>Creating Account...</span>
                                </>
                            ) : (
                                "Sign Up"
                            )}
                        </button>

                        <div className="text-center mt-4">
                            <p className="text-gray-500 text-xs font-medium">
                                By signing up, you agree to our Terms & Privacy
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
