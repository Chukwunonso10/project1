import { CreatePostForm } from "@/components/createPostForm"
import { ServerHome } from "@/components/serverHome"
import { CopyForm} from "@/components/iscopy"
import { UseReff } from "@/components/useReff"
import prisma from "./lib/prisma"
import Push from "@/components/reducerTest"
import ReducerSignIn from "@/components/reducerTest"

export default async function Home() {

  return (
    <div className="flex items-center justify-center bg-gray-50 w-screen min-h-screen py-10">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        
        <CreatePostForm />

        <div className="mt-10 pt-10  border-t border-gray-200 relative">
          <h2 className="text-xl font-bold text-center mb-4">Recent Posts</h2>
          <ServerHome />
          <CopyForm />
          <UseReff />
          <ReducerSignIn />
        
        </div>
      </div>
    </div>
  )
}