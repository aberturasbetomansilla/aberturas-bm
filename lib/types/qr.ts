export type QRStatus = "available" | "active" | "inactive"

export type QRCode = {
  id: string
  code: string
  business_name: string | null
  destination_url: string | null
  status: QRStatus
  created_at: string
  updated_at: string
}

export type QRCodeUpdate = {
  business_name: string
  destination_url: string
  status: QRStatus
}

export type Database = {
  public: {
    Tables: {
      qr_codes: {
        Row: QRCode
        Insert: {
          id?: string
          code: string
          business_name?: string | null
          destination_url?: string | null
          status?: QRStatus
          created_at?: string
          updated_at?: string
        }
        Update: {
          business_name?: string | null
          destination_url?: string | null
          status?: QRStatus
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}

export type QRStatusFilter = "all" | QRStatus
