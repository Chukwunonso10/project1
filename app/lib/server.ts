"use server"

import prisma from "./prisma";
import { inputTypes, postSchema, signInType } from "./schema"
import { revalidatePath } from "next/cache";

export type PrevData = {
  success: boolean;
  error: boolean;
  errors?: Record<string, string[]>;
  message?: string;
}

export async function createPost(prevData: PrevData, data: inputTypes) {

  const result = postSchema.safeParse(data)
  if (!result.success) {
    return {
      success: false,
      error: true,
      errors: result.error.flatten().fieldErrors,
      message: "check your schema fields"
    }
  }

  try {
    await prisma.post.create({
      data: {
        title: data.title,
        body: data.body
      }
    })
    revalidatePath("/")
    return { success: true, error: false, message: "post creation was successfull" }

  } catch (error) {
    console.error("Database error", error)
    return { success: false, error: true, message: "Post creation was unsuccessfull" }
  }



}
export async function updatePost(prevData: PrevData, data: inputTypes) {

  const result = postSchema.safeParse(data)
  if (!result.success) {
    return {
      success: false,
      error: true,
      errors: result.error.flatten().fieldErrors,
      message: "check your schema fields"
    }
  }

  try {
    await prisma.post.update({
      where: { id: data.id },
      data: {
        title: data.title,
        body: data.body
      }
    })
    revalidatePath("/")
    return { success: true, error: false, message: "post update was successfull" }

  } catch (error) {
    console.error("Database error", error)
    return { success: false, error: true, message: "Post update was unsuccessfull" }
  }



}


export async function deletePost(id: string) {
  try {
    await prisma.post.delete({
      where: { id }
    })
    revalidatePath("/")
    return { success: true, error: false, message: "post deleted successfully" }

  } catch (error) {
    console.error("Database error", error)
    return { success: false, error: true, message: "Post deletion was unsuccessfull" }
  }
}


export async function signInAction(prevData: PrevData, data: signInType) {
  
  try {
    await prisma.user.create({
      data: {
        userName: data.userName,
        phoneNumber: data.PhoneNumber || "07032531817",
        email: data.email
      }
    })


    return { success: true, error: false, message: "Account created successfully" }
  } catch (error: any) {
    console.log("database error", error)
    return { success: false, error: true, message: error.message || "Failed to create account" }
  }
}