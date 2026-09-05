import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

import { getSupabaseEnv } from "@/lib/supabase/env"

export async function updateAdminSession(request: NextRequest) {
  const { url, anonKey, isConfigured } = getSupabaseEnv()
  const pathname = request.nextUrl.pathname
  const isLoginPath = pathname === "/admin/login"

  if (!isConfigured || !url || !anonKey) {
    if (pathname.startsWith("/admin") && !isLoginPath) {
      const redirectUrl = request.nextUrl.clone()
      redirectUrl.pathname = "/admin/login"
      return NextResponse.redirect(redirectUrl)
    }

    return NextResponse.next()
  }

  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => {
          request.cookies.set(name, value)
        })
        supabaseResponse = NextResponse.next({
          request,
        })
        cookiesToSet.forEach(({ name, value, options }) => {
          supabaseResponse.cookies.set(name, value, options)
        })
      },
    },
  })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user && pathname.startsWith("/admin") && !isLoginPath) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = "/admin/login"
    return NextResponse.redirect(redirectUrl)
  }

  if (user && isLoginPath) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = "/admin/qr"
    return NextResponse.redirect(redirectUrl)
  }

  return supabaseResponse
}
