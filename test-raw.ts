import { Pool } from 'pg'
import dotenv from 'dotenv'
dotenv.config()

async function testRaw() {
    const pool = new Pool({ connectionString: process.env.DIRECT_URL })
    try {
        const res = await pool.query('SELECT NOW()')
        console.log("Raw connection success:", res.rows[0])
    } catch (e: any) {
        console.error("Raw connection error:", e.message)
    } finally {
        await pool.end()
    }
}
testRaw()
