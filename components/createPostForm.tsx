"use client"

import { useForm } from "react-hook-form"
import { inputTypes, postSchema } from "@/app/lib/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { createPost } from "@/app/lib/server"
import { useActionState, startTransition, useEffect } from "react"
import { toast } from "react-toastify"

export type PrevData = {
    success: boolean;
    error: boolean;
    errors?: Record<string, string[]>;
    message?: string;
}

export function CreatePostForm() {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<inputTypes>({ resolver: zodResolver(postSchema) })

    const [state, actionState, isPending] = useActionState(createPost, { success: false, error: false } as PrevData)

    const onsubmit = handleSubmit((data) => {
        startTransition(() => {
            actionState(data);
        });
    })

    useEffect(() => {
        if (state.success) {
            toast.success(state.message || "Post created successfully")
            reset()
        } else if (state.error) {
            toast.error(state.message || "Failed to create post")
        }
    }, [state, reset])

    return (
        <form onSubmit={onsubmit} className="flex flex-col gap-4">
            <h1 className="animate-pulse text-center capitalize font-extrabold text-xl">welcome to my Blog page</h1>

            <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-500">Post title</label>
                <input type="text" {...register("title")}
                    placeholder="Enter your title ..." className=" outline-none px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 w-full" />
                {errors.title && <div className="text-red-500 text-sm">{errors.title.message}</div>}
                {state.errors?.title && <div className="text-red-500 text-sm">{state.errors?.title}</div>}
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-500">Post Body</label>
                <textarea {...register("body")}
                    placeholder="Write your post body..." className=" outline-none px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 w-full min-h-40" />
                {errors.body && <div className="text-red-500 text-sm">{errors.body.message}</div>}
                {state.errors?.body && <div className="text-red-500 text-sm">{state.errors?.body}</div>}
            </div>

            <button type="submit" className={`bg-green-500 p-2 text-white font-bold rounded-lg shadow-md ${isPending ? "cursor-not-allowed opacity-50" : ""}`} disabled={isPending}>
                {isPending ? "Submitting..." : "Submit"}
            </button>
        </form>
    )
}
