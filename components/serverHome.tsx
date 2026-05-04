import prisma from "@/app/lib/prisma"
import { FormModal } from "./formModal"

export async function ServerHome() {

    const posts = await prisma.post.findMany()

    return (

        <ul className="mt-8 flex flex-col gap-4">
            {posts && posts.length === 0 ? (
                <div className="text-center shadow-lg px-4 font-medium text-xl py-3 self-center rounded-lg">No posts, start writing post...</div>
            ) : (
                posts.map((post: any) => (
                    <div key={post.id} className="relative shadow-md px-3 py-4 mb-2 rounded-lg space-y-4 bg-white">
                        <div>
                            <div className="flex flex-col items-start">
                                <p className="capitalize font-bold text-lg">{post.title}</p>
                                <p className="text-sm text-gray-600">{post.body}</p>
                            </div>
                        </div>
                        <div className="flex justify-end border-t pt-2">
                            <FormModal post={post} />
                        </div>
                    </div>

                ))
            )
            }
        </ul>
    )
}

