import { Pool } from 'pg'
import dotenv from 'dotenv'
dotenv.config()

async function testRawInsert() {
    const pool = new Pool({ connectionString: process.env.DIRECT_URL })
    const now = Date.now()
    const userName = "rawuser_" + now
    const email = "raw_" + now + "@example.com"
    const phoneNumber = "1112223333"

    try {
        const res = await pool.query(
            'INSERT INTO "User" ("id", "userName", "email", "phoneNumber") VALUES ($1, $2, $3, $4) RETURNING *',
            ['id_' + now, userName, email, phoneNumber]
        )
        console.log("Raw insert success:", res.rows[0])
    } catch (e: any) {
        console.error("Raw insert error:", e.message)
    } finally {
        await pool.end()
    }
}
testRawInsert()
