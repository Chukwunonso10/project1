"use client"

import { inputTypes, postSchema } from "@/app/lib/schema"
import { deletePost, updatePost } from "@/app/lib/server"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { Dispatch, SetStateAction, startTransition, useActionState, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { PrevData } from "./createPostForm"

export type Type = "Edit" | "Delete" | null

export const FormModal = ({ post }: { post: any }) => {

    const [Open, setOpen] = useState(false)
    const [Type, setType] = useState<Type>(null)
    const [state, actionState, isPending] = useActionState(updatePost, { success: false, error: false } as PrevData)

    const router = useRouter()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<inputTypes>({
        resolver: zodResolver(postSchema),
        defaultValues: {
            title: post.title,
            body: post.body
        }
    })

    const onsubmit = handleSubmit((data) => {
        const payload = { ...data, id: post.id };
        startTransition(() => {
            actionState(payload as any);
        })
    })


    const deletebtn = async (id: string) => {
        const res = await deletePost(post.id)
        if (res.success) {
            toast.success("post successfully deleted")
            router.refresh()
            setOpen(false)
        }

    }

    useEffect(() => {
        if (state.success && Open) {
            toast.success(state.message || "Post updated successfully!")
            setOpen(false)
            router.refresh()
        } else if (state.error && Open) {
            toast.error(state.message || "Failed to update post")
        }
    }, [state, Open, router])

    if (Open && post.id && Type === "Delete") return (

        <div className="w-screen min-h-screen fixed bg-black/80 top-0 left-0 flex  items-center justify-center z-50">
            <div className="max-w-md rounded-lg shadow-lg bg-white p-6">
                <form className="flex flex-col gap-4">
                    <p className="capitalize text-red-500 px-2 font-bold text-sm py-4">This post will be delete parmenently. Are you sure ?</p>
                    <div className="flex gap-6 justify-center">
                        <button onClick={() =>
                            deletebtn(post.id)} type="button" className="px-4 rounded-lg py-1 bg-green-500 text-white cursor-pointer ">Ok</button>
                        <button onClick={() =>
                            setOpen(false)} type="button" className="px-4 rounded-lg py-1 bg-red-500 cursor-pointer text-white">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )

    return (
        <div className="flex gap-3">
            <button type="button" onClick={() => {
                setOpen(true)
                setType("Edit")
            }} className="px-4 rounded-lg py-1 bg-green-500 text-white">Edit</button>
            <button onClick={() => {
                setOpen(true)
                setType("Delete")
            }} type="button" className="px-4 rounded-lg py-1 bg-red-500 text-white">delete</button>

            {Open && post && Type === "Edit" ? (
                <div className="w-screen min-h-screen fixed bg-black/60 top-0 left-0 flex  items-center justify-center z-50">
                    <div className="relative flex shadow-lg rounded-lg bg-white max-w-md w-full items-center justify-center">

                        <button onClick={() =>
                            setOpen(false)} type="button" className="absolute top-6 right-2 px-4 py-1 font-extrabold text-2xl">X</button>

                        <form onSubmit={onsubmit} className="flex flex-col gap-4 p-8 w-full">
                            <h1 className="animate-pulse text-center capitalize font-extrabold text-xl">Edit Page</h1>


                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-gray-500">Post title</label>
                                <input type="text" {...register("title")}
                                    placeholder="Enter your title ..." className=" outline-none px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 w-full" />
                            </div>
                            {errors.title && <div className="w-max rounded-lg text-red-500 text-sm">{errors.title.message}</div>}
                            {state.errors?.title && <div className="text-red-500 text-sm">{state.errors?.title}</div>}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-gray-500">Post Body</label>
                                <textarea {...register("body")}
                                    placeholder="Enter your title ..." className=" outline-none px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 w-full min-h-40" />
                            </div>
                            {errors.body && <div className="w-max rounded-lg text-red-500 text-sm">{errors.body.message}</div>}
                            {state.errors?.body && <div className="text-red-500 text-sm">{state.errors?.body}</div>}

                            <button type="submit" className={`bg-green-500 p-2 rounded-lg shadow-md text-white ${isPending ? "cursor-not-allowed disabled opacity-50" : ""}`} disabled={isPending}>{isPending ? "Submitting..." : "Submit"}</button>
                        </form>
                    </div>
                </div>
            ) : ""}
        </div>
    )
}
