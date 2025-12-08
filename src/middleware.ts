import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // We cannot access localStorage in middleware (server-side).
    // In a real app with HttpOnly cookies, we would check cookies here.
    // For this JWT-in-localStorage implementation, client-side protection is primary,
    // but we can add a check if we move to Cookies later.

    // However, since we are using localStorage as requested (often implies simple JWT),
    // Middleware can't read it.
    // BUT the user asked for "Protected Routes".
    // Best practice for Next.js + JWT is Cookies.
    // Given constraints, I will implement a client-side HOC or persistent check in layout.
    // BUT, to be "Protected Routes" in Next.js sense, let's see if we can at least redirect 
    // if visiting /dashboard without a subtle hint? 
    // No, without cookies, middleware is limited.

    // Pivot: I will stick to the Client-Side check in DashboardLayout which I already did?
    // Let's re-verify DashboardLayout.

    return NextResponse.next();
}

// See src/app/dashboard/layout.tsx for the actual client-side protection implementation
// which checks localStorage.
