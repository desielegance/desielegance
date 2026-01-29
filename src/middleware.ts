import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { hashPassword } from '@/lib/auth'

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname

    // Only run inside /admin
    if (path.startsWith('/admin')) {
        // Allow the login page itself
        if (path === '/admin/login') {
            return NextResponse.next()
        }

        // Get the current session cookie
        const session = request.cookies.get('admin_session')

        // Calculate the expected hash based on CURRENT environment password
        // This ensures that if the password changes, all old sessions are immediately invalidated
        const currentPassword = process.env.ADMIN_PASSWORD || ''
        const expectedHash = await hashPassword(currentPassword)

        if (!session?.value || session.value !== expectedHash) {
            return NextResponse.redirect(new URL('/admin/login', request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: '/admin/:path*',
}
