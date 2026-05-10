import prisma from './app/lib/prisma'
import dotenv from 'dotenv'
dotenv.config()

async function testSignIn() {
    const data = {
        userName: "puser_" + Date.now(),
        PhoneNumber: "9998887777",
        email: "p_" + Date.now() + "@example.com"
    }

    try {
        const user = await prisma.user.create({
            data: {
                userName: data.userName,
                phoneNumber: data.PhoneNumber,
                email: data.email
            }
        })
        console.log("SUCCESS:", user)
    } catch (error: any) {
        console.error("ERROR:", error.message)
    } finally {
        await prisma.$disconnect()
    }
}

testSignIn()
