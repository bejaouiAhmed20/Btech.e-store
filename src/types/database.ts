/**
 * Handwritten types mirroring the Supabase schema created by the migrations in
 * `supabase/migrations/`. If the schema changes, update this file (or replace it
 * with `supabase gen types typescript` output — see docs/SUPABASE_SETUP.md).
 */

export type OrderStatus = 'pending' | 'contacted' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled'

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string | null
          phone: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          phone?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          phone?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          reference: string
          user_id: string | null
          template_id: string
          template_name: string
          template_price: number
          template_currency: string
          customer_name: string
          customer_email: string
          customer_phone: string
          customization_details: string | null
          status: OrderStatus
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          reference?: string
          user_id?: string | null
          template_id: string
          template_name: string
          template_price: number
          template_currency: string
          customer_name: string
          customer_email: string
          customer_phone: string
          customization_details?: string | null
          status?: OrderStatus
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          reference?: string
          user_id?: string | null
          template_id?: string
          template_name?: string
          template_price?: number
          template_currency?: string
          customer_name?: string
          customer_email?: string
          customer_phone?: string
          customization_details?: string | null
          status?: OrderStatus
          created_at?: string
          updated_at?: string
        }
      }
    }
    Functions: {
      claim_my_guest_orders: {
        Args: Record<string, never>
        Returns: number
      }
    }
    Enums: {
      order_status: OrderStatus
    }
  }
}
