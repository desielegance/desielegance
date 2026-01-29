import { NextResponse } from 'next/server'
import { hashPassword } from '@/lib/auth'

export async function POST(request: Request) {
    try {
        const { password } = await request.json()
        const currentPassword = process.env.ADMIN_PASSWORD || ''

        if (password === currentPassword) {
            const response = NextResponse.json({ success: true })

            // Generate hash of the password to use as session value
            const sessionHash = await hashPassword(currentPassword)

            // Set HttpOnly cookie
            response.cookies.set('admin_session', sessionHash, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 60 * 60 * 24 * 7, // 1 week
                path: '/',
            })

            return response
        }

        return NextResponse.json(
            { error: 'Invalid password' },
            { status: 401 }
        )
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        )
    }
}
