import { CreatePostForm } from "@/components/createPostForm"
import { ServerHome } from "@/components/serverHome"

export default function Home() {
  return (
    <div className="flex items-center justify-center bg-gray-50 w-screen min-h-screen py-10">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <CreatePostForm />

        <div className="mt-10 pt-10 border-t border-gray-200">
          <h2 className="text-xl font-bold text-center mb-4">Recent Posts</h2>
          <ServerHome />
        </div>
      </div>
    </div>
  )
}