export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      admin_users: {
        Row: {
          created_at: string
          id: string
          role: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: string
          user_id?: string
        }
        Relationships: []
      }
      category_images: {
        Row: {
          category_name: string
          created_at: string
          id: string
          image_url: string
          updated_at: string
        }
        Insert: {
          category_name: string
          created_at?: string
          id?: string
          image_url: string
          updated_at?: string
        }
        Update: {
          category_name?: string
          created_at?: string
          id?: string
          image_url?: string
          updated_at?: string
        }
        Relationships: []
      }
      customers: {
        Row: {
          address: string | null
          created_at: string
          email: string | null
          id: string
          name: string
          phone: string
          status: string
          store_id: string
          total_orders: number
          total_spent: number
          updated_at: string
        }
        Insert: {
          address?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name: string
          phone: string
          status?: string
          store_id: string
          total_orders?: number
          total_spent?: number
          updated_at?: string
        }
        Update: {
          address?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name?: string
          phone?: string
          status?: string
          store_id?: string
          total_orders?: number
          total_spent?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "customers_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
        ]
      }
      demo_requests: {
        Row: {
          business_name: string | null
          business_type: string | null
          created_at: string
          email: string
          id: string
          message: string | null
          name: string
          phone: string
          status: string
          updated_at: string
        }
        Insert: {
          business_name?: string | null
          business_type?: string | null
          created_at?: string
          email: string
          id?: string
          message?: string | null
          name: string
          phone: string
          status?: string
          updated_at?: string
        }
        Update: {
          business_name?: string | null
          business_type?: string | null
          created_at?: string
          email?: string
          id?: string
          message?: string | null
          name?: string
          phone?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      invoices: {
        Row: {
          created_at: string | null
          customer_address: string | null
          customer_name: string
          customer_phone: string | null
          discount_amount: number | null
          discount_percentage: number | null
          gst_amount: number | null
          gst_percentage: number | null
          id: string
          invoice_number: string
          items: Json
          order_id: string | null
          payment_method: string | null
          payment_status: string | null
          store_id: string
          subtotal: number
          total_amount: number
        }
        Insert: {
          created_at?: string | null
          customer_address?: string | null
          customer_name: string
          customer_phone?: string | null
          discount_amount?: number | null
          discount_percentage?: number | null
          gst_amount?: number | null
          gst_percentage?: number | null
          id?: string
          invoice_number: string
          items?: Json
          order_id?: string | null
          payment_method?: string | null
          payment_status?: string | null
          store_id: string
          subtotal?: number
          total_amount?: number
        }
        Update: {
          created_at?: string | null
          customer_address?: string | null
          customer_name?: string
          customer_phone?: string | null
          discount_amount?: number | null
          discount_percentage?: number | null
          gst_amount?: number | null
          gst_percentage?: number | null
          id?: string
          invoice_number?: string
          items?: Json
          order_id?: string | null
          payment_method?: string | null
          payment_status?: string | null
          store_id?: string
          subtotal?: number
          total_amount?: number
        }
        Relationships: [
          {
            foreignKeyName: "invoices_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string
          data: Json | null
          id: string
          is_read: boolean
          message: string | null
          store_id: string
          title: string
          type: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          data?: Json | null
          id?: string
          is_read?: boolean
          message?: string | null
          store_id: string
          title: string
          type: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          data?: Json | null
          id?: string
          is_read?: boolean
          message?: string | null
          store_id?: string
          title?: string
          type?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notifications_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string
          customer_address: string | null
          customer_name: string
          customer_phone: string
          delivery_mode: string | null
          id: string
          items: Json
          notes: string | null
          order_type: string | null
          payment_method: string | null
          status: string
          store_id: string
          total_amount: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          customer_address?: string | null
          customer_name: string
          customer_phone: string
          delivery_mode?: string | null
          id?: string
          items?: Json
          notes?: string | null
          order_type?: string | null
          payment_method?: string | null
          status?: string
          store_id: string
          total_amount?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          customer_address?: string | null
          customer_name?: string
          customer_phone?: string
          delivery_mode?: string | null
          id?: string
          items?: Json
          notes?: string | null
          order_type?: string | null
          payment_method?: string | null
          status?: string
          store_id?: string
          total_amount?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          category: string | null
          compare_price: number | null
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          is_available: boolean | null
          name: string
          price: number
          stock_quantity: number | null
          store_id: string
          updated_at: string
        }
        Insert: {
          category?: string | null
          compare_price?: number | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_available?: boolean | null
          name: string
          price: number
          stock_quantity?: number | null
          store_id: string
          updated_at?: string
        }
        Update: {
          category?: string | null
          compare_price?: number | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_available?: boolean | null
          name?: string
          price?: number
          stock_quantity?: number | null
          store_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "products_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string
          id: string
          phone: string
          updated_at: string
          user_id: string
          whatsapp: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name: string
          id?: string
          phone: string
          updated_at?: string
          user_id: string
          whatsapp?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string
          id?: string
          phone?: string
          updated_at?: string
          user_id?: string
          whatsapp?: string | null
        }
        Relationships: []
      }
      store_customizations: {
        Row: {
          accent_color: string | null
          announcement_active: boolean | null
          announcement_text: string | null
          banner_image_url: string | null
          banner_subtitle: string | null
          banner_text: string | null
          created_at: string
          facebook_url: string | null
          id: string
          instagram_url: string | null
          layout_style: string | null
          logo_url: string | null
          show_banner: boolean | null
          show_categories: boolean | null
          show_offers_section: boolean | null
          show_search: boolean | null
          store_id: string
          tagline: string | null
          theme_color: string | null
          updated_at: string
          welcome_message: string | null
          whatsapp_number: string | null
        }
        Insert: {
          accent_color?: string | null
          announcement_active?: boolean | null
          announcement_text?: string | null
          banner_image_url?: string | null
          banner_subtitle?: string | null
          banner_text?: string | null
          created_at?: string
          facebook_url?: string | null
          id?: string
          instagram_url?: string | null
          layout_style?: string | null
          logo_url?: string | null
          show_banner?: boolean | null
          show_categories?: boolean | null
          show_offers_section?: boolean | null
          show_search?: boolean | null
          store_id: string
          tagline?: string | null
          theme_color?: string | null
          updated_at?: string
          welcome_message?: string | null
          whatsapp_number?: string | null
        }
        Update: {
          accent_color?: string | null
          announcement_active?: boolean | null
          announcement_text?: string | null
          banner_image_url?: string | null
          banner_subtitle?: string | null
          banner_text?: string | null
          created_at?: string
          facebook_url?: string | null
          id?: string
          instagram_url?: string | null
          layout_style?: string | null
          logo_url?: string | null
          show_banner?: boolean | null
          show_categories?: boolean | null
          show_offers_section?: boolean | null
          show_search?: boolean | null
          store_id?: string
          tagline?: string | null
          theme_color?: string | null
          updated_at?: string
          welcome_message?: string | null
          whatsapp_number?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "store_customizations_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: true
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
        ]
      }
      store_promotions: {
        Row: {
          created_at: string
          description: string | null
          discount_amount: number | null
          discount_percentage: number | null
          end_date: string | null
          id: string
          image_url: string | null
          is_active: boolean | null
          start_date: string | null
          store_id: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          discount_amount?: number | null
          discount_percentage?: number | null
          end_date?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          start_date?: string | null
          store_id: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          discount_amount?: number | null
          discount_percentage?: number | null
          end_date?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          start_date?: string | null
          store_id?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "store_promotions_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
        ]
      }
      stores: {
        Row: {
          address: string | null
          business_mode: string
          category: string
          city: string
          created_at: string
          id: string
          is_active: boolean | null
          name: string
          state: string
          subscription_plan_id: string | null
          subscription_status: string | null
          trial_ends_at: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          address?: string | null
          business_mode: string
          category: string
          city: string
          created_at?: string
          id?: string
          is_active?: boolean | null
          name: string
          state: string
          subscription_plan_id?: string | null
          subscription_status?: string | null
          trial_ends_at?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          address?: string | null
          business_mode?: string
          category?: string
          city?: string
          created_at?: string
          id?: string
          is_active?: boolean | null
          name?: string
          state?: string
          subscription_plan_id?: string | null
          subscription_status?: string | null
          trial_ends_at?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "stores_subscription_plan_id_fkey"
            columns: ["subscription_plan_id"]
            isOneToOne: false
            referencedRelation: "subscription_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      subscription_plans: {
        Row: {
          created_at: string
          features: Json | null
          id: string
          is_active: boolean | null
          is_popular: boolean | null
          name: string
          period: string
          price: number
        }
        Insert: {
          created_at?: string
          features?: Json | null
          id?: string
          is_active?: boolean | null
          is_popular?: boolean | null
          name: string
          period?: string
          price: number
        }
        Update: {
          created_at?: string
          features?: Json | null
          id?: string
          is_active?: boolean | null
          is_popular?: boolean | null
          name?: string
          period?: string
          price?: number
        }
        Relationships: []
      }
      wishlists: {
        Row: {
          created_at: string
          id: string
          product_id: string
          store_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          product_id: string
          store_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          product_id?: string
          store_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "wishlists_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "wishlists_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
