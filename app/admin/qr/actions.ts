"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { qrConfigureSchema, qrEditSchema } from "@/lib/validations/qr"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import type { QRStatus } from "@/lib/types/qr"

type ActionResult = {
  success: boolean
  error?: string
}

async function requireAdmin() {
  const supabase = await createServerSupabaseClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("No autorizado")
  }

  return supabase
}

export async function configureQrCode(
  id: string,
  input: { business_name: string; destination_url: string },
): Promise<ActionResult> {
  const parsed = qrConfigureSchema.safeParse(input)

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Datos inválidos" }
  }

  try {
    const supabase = await requireAdmin()
    const { error } = await supabase
      .from("qr_codes")
      .update({
        business_name: parsed.data.business_name,
        destination_url: parsed.data.destination_url,
        status: "active",
      })
      .eq("id", id)

    if (error) {
      return { success: false, error: error.message }
    }

    revalidatePath("/admin/qr")
    revalidatePath("/q", "layout")
    return { success: true }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "No se pudo guardar",
    }
  }
}

export async function updateQrCode(
  id: string,
  input: { business_name: string; destination_url: string; status: QRStatus },
): Promise<ActionResult> {
  const parsed = qrEditSchema.safeParse(input)

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Datos inválidos" }
  }

  try {
    const supabase = await requireAdmin()
    const { error } = await supabase
      .from("qr_codes")
      .update({
        business_name: parsed.data.business_name,
        destination_url: parsed.data.destination_url,
        status: parsed.data.status,
      })
      .eq("id", id)

    if (error) {
      return { success: false, error: error.message }
    }

    revalidatePath("/admin/qr")
    revalidatePath("/q", "layout")
    return { success: true }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "No se pudo actualizar",
    }
  }
}

export async function setQrStatus(
  id: string,
  status: QRStatus,
): Promise<ActionResult> {
  try {
    const supabase = await requireAdmin()
    const { error } = await supabase.from("qr_codes").update({ status }).eq("id", id)

    if (error) {
      return { success: false, error: error.message }
    }

    revalidatePath("/admin/qr")
    revalidatePath("/q", "layout")
    return { success: true }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "No se pudo cambiar el estado",
    }
  }
}

export async function logoutAdmin(): Promise<void> {
  const supabase = await createServerSupabaseClient()
  await supabase.auth.signOut()
  redirect("/admin/login")
}
