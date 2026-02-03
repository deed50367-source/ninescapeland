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
      asset_folders: {
        Row: {
          created_at: string
          id: string
          name: string
          parent_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          parent_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          parent_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "asset_folders_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "asset_folders"
            referencedColumns: ["id"]
          },
        ]
      }
      assets: {
        Row: {
          created_at: string
          file_name: string
          file_path: string
          file_size: number | null
          folder_id: string | null
          height: number | null
          id: string
          mime_type: string | null
          updated_at: string
          width: number | null
        }
        Insert: {
          created_at?: string
          file_name: string
          file_path: string
          file_size?: number | null
          folder_id?: string | null
          height?: number | null
          id?: string
          mime_type?: string | null
          updated_at?: string
          width?: number | null
        }
        Update: {
          created_at?: string
          file_name?: string
          file_path?: string
          file_size?: number | null
          folder_id?: string | null
          height?: number | null
          id?: string
          mime_type?: string | null
          updated_at?: string
          width?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "assets_folder_id_fkey"
            columns: ["folder_id"]
            isOneToOne: false
            referencedRelation: "asset_folders"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_posts: {
        Row: {
          author_id: string | null
          content: string | null
          cover_image: string | null
          created_at: string
          excerpt: string | null
          id: string
          language: string
          published_at: string | null
          seo_description: string | null
          seo_keywords: string | null
          seo_title: string | null
          slug: string
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          author_id?: string | null
          content?: string | null
          cover_image?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          language?: string
          published_at?: string | null
          seo_description?: string | null
          seo_keywords?: string | null
          seo_title?: string | null
          slug: string
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          author_id?: string | null
          content?: string | null
          cover_image?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          language?: string
          published_at?: string | null
          seo_description?: string | null
          seo_keywords?: string | null
          seo_title?: string | null
          slug?: string
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      case_studies: {
        Row: {
          area_sqm: number | null
          city: string | null
          client_name: string | null
          client_testimonial: string | null
          country: string
          created_at: string
          description: string | null
          featured: boolean | null
          id: string
          images: string[] | null
          project_type: string
          title: string
        }
        Insert: {
          area_sqm?: number | null
          city?: string | null
          client_name?: string | null
          client_testimonial?: string | null
          country: string
          created_at?: string
          description?: string | null
          featured?: boolean | null
          id?: string
          images?: string[] | null
          project_type: string
          title: string
        }
        Update: {
          area_sqm?: number | null
          city?: string | null
          client_name?: string | null
          client_testimonial?: string | null
          country?: string
          created_at?: string
          description?: string | null
          featured?: boolean | null
          id?: string
          images?: string[] | null
          project_type?: string
          title?: string
        }
        Relationships: []
      }
      chat_messages: {
        Row: {
          content: string
          created_at: string
          id: string
          is_ai_response: boolean
          is_staff_reply: boolean | null
          replied_by: string | null
          role: string
          session_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          is_ai_response?: boolean
          is_staff_reply?: boolean | null
          replied_by?: string | null
          role: string
          session_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          is_ai_response?: boolean
          is_staff_reply?: boolean | null
          replied_by?: string | null
          role?: string
          session_id?: string
        }
        Relationships: []
      }
      chat_sessions: {
        Row: {
          assigned_to: string | null
          created_at: string
          customer_browser: string | null
          customer_city: string | null
          customer_country: string | null
          customer_device: string | null
          customer_ip: string | null
          customer_language: string | null
          customer_os: string | null
          customer_timezone: string | null
          id: string
          last_message_at: string | null
          notes: string | null
          page_url: string | null
          referrer: string | null
          session_id: string
          status: string
          updated_at: string
        }
        Insert: {
          assigned_to?: string | null
          created_at?: string
          customer_browser?: string | null
          customer_city?: string | null
          customer_country?: string | null
          customer_device?: string | null
          customer_ip?: string | null
          customer_language?: string | null
          customer_os?: string | null
          customer_timezone?: string | null
          id?: string
          last_message_at?: string | null
          notes?: string | null
          page_url?: string | null
          referrer?: string | null
          session_id: string
          status?: string
          updated_at?: string
        }
        Update: {
          assigned_to?: string | null
          created_at?: string
          customer_browser?: string | null
          customer_city?: string | null
          customer_country?: string | null
          customer_device?: string | null
          customer_ip?: string | null
          customer_language?: string | null
          customer_os?: string | null
          customer_timezone?: string | null
          id?: string
          last_message_at?: string | null
          notes?: string | null
          page_url?: string | null
          referrer?: string | null
          session_id?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      inquiries: {
        Row: {
          assigned_to: string | null
          country: string
          created_at: string
          email: string
          estimated_area: number | null
          estimated_budget: string | null
          id: string
          message: string | null
          name: string
          phone: string | null
          project_type: string
          status: string | null
          updated_at: string
        }
        Insert: {
          assigned_to?: string | null
          country: string
          created_at?: string
          email: string
          estimated_area?: number | null
          estimated_budget?: string | null
          id?: string
          message?: string | null
          name: string
          phone?: string | null
          project_type: string
          status?: string | null
          updated_at?: string
        }
        Update: {
          assigned_to?: string | null
          country?: string
          created_at?: string
          email?: string
          estimated_area?: number | null
          estimated_budget?: string | null
          id?: string
          message?: string | null
          name?: string
          phone?: string | null
          project_type?: string
          status?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      product_categories: {
        Row: {
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          is_active: boolean | null
          name: string
          name_ar: string | null
          name_de: string | null
          name_en: string | null
          name_es: string | null
          name_pt: string | null
          slug: string
          sort_order: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          name: string
          name_ar?: string | null
          name_de?: string | null
          name_en?: string | null
          name_es?: string | null
          name_pt?: string | null
          slug: string
          sort_order?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          name?: string
          name_ar?: string | null
          name_de?: string | null
          name_en?: string | null
          name_es?: string | null
          name_pt?: string | null
          slug?: string
          sort_order?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      product_variants: {
        Row: {
          created_at: string
          id: string
          image_url: string | null
          is_active: boolean | null
          name: string
          price: number | null
          product_id: string
          sku: string | null
          sort_order: number | null
          specifications: Json | null
          stock_quantity: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          name: string
          price?: number | null
          product_id: string
          sku?: string | null
          sort_order?: number | null
          specifications?: Json | null
          stock_quantity?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          name?: string
          price?: number | null
          product_id?: string
          sku?: string | null
          sort_order?: number | null
          specifications?: Json | null
          stock_quantity?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_variants_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          category_id: string | null
          created_at: string
          description: string | null
          description_ar: string | null
          description_de: string | null
          description_en: string | null
          description_es: string | null
          description_pt: string | null
          featured_image: string | null
          features: string[] | null
          gallery_images: string[] | null
          id: string
          is_active: boolean | null
          is_featured: boolean | null
          name: string
          name_ar: string | null
          name_de: string | null
          name_en: string | null
          name_es: string | null
          name_pt: string | null
          price_max: number | null
          price_min: number | null
          price_unit: string | null
          seo_description: string | null
          seo_keywords: string | null
          seo_title: string | null
          short_description: string | null
          slug: string
          sort_order: number | null
          specifications: Json | null
          updated_at: string
        }
        Insert: {
          category_id?: string | null
          created_at?: string
          description?: string | null
          description_ar?: string | null
          description_de?: string | null
          description_en?: string | null
          description_es?: string | null
          description_pt?: string | null
          featured_image?: string | null
          features?: string[] | null
          gallery_images?: string[] | null
          id?: string
          is_active?: boolean | null
          is_featured?: boolean | null
          name: string
          name_ar?: string | null
          name_de?: string | null
          name_en?: string | null
          name_es?: string | null
          name_pt?: string | null
          price_max?: number | null
          price_min?: number | null
          price_unit?: string | null
          seo_description?: string | null
          seo_keywords?: string | null
          seo_title?: string | null
          short_description?: string | null
          slug: string
          sort_order?: number | null
          specifications?: Json | null
          updated_at?: string
        }
        Update: {
          category_id?: string | null
          created_at?: string
          description?: string | null
          description_ar?: string | null
          description_de?: string | null
          description_en?: string | null
          description_es?: string | null
          description_pt?: string | null
          featured_image?: string | null
          features?: string[] | null
          gallery_images?: string[] | null
          id?: string
          is_active?: boolean | null
          is_featured?: boolean | null
          name?: string
          name_ar?: string | null
          name_de?: string | null
          name_en?: string | null
          name_es?: string | null
          name_pt?: string | null
          price_max?: number | null
          price_min?: number | null
          price_unit?: string | null
          seo_description?: string | null
          seo_keywords?: string | null
          seo_title?: string | null
          short_description?: string | null
          slug?: string
          sort_order?: number | null
          specifications?: Json | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "product_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      quick_reply_templates: {
        Row: {
          category: string | null
          content: string
          created_at: string
          created_by: string | null
          id: string
          sort_order: number | null
          title: string
          updated_at: string
        }
        Insert: {
          category?: string | null
          content: string
          created_at?: string
          created_by?: string | null
          id?: string
          sort_order?: number | null
          title: string
          updated_at?: string
        }
        Update: {
          category?: string | null
          content?: string
          created_at?: string
          created_by?: string | null
          id?: string
          sort_order?: number | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      site_image_config: {
        Row: {
          category: string
          config_key: string
          created_at: string
          description: string | null
          id: string
          image_url: string
          label: string | null
          sort_order: number | null
          updated_at: string
        }
        Insert: {
          category?: string
          config_key: string
          created_at?: string
          description?: string | null
          id?: string
          image_url: string
          label?: string | null
          sort_order?: number | null
          updated_at?: string
        }
        Update: {
          category?: string
          config_key?: string
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string
          label?: string | null
          sort_order?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      site_image_config_logs: {
        Row: {
          changed_at: string
          changed_by: string | null
          config_key: string
          id: string
          new_image_url: string
          old_image_url: string | null
          user_email: string | null
        }
        Insert: {
          changed_at?: string
          changed_by?: string | null
          config_key: string
          id?: string
          new_image_url: string
          old_image_url?: string | null
          user_email?: string | null
        }
        Update: {
          changed_at?: string
          changed_by?: string | null
          config_key?: string
          id?: string
          new_image_url?: string
          old_image_url?: string | null
          user_email?: string | null
        }
        Relationships: []
      }
      user_permissions: {
        Row: {
          created_at: string | null
          granted_at: string | null
          granted_by: string | null
          id: string
          permission: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          granted_at?: string | null
          granted_by?: string | null
          id?: string
          permission: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          granted_at?: string | null
          granted_by?: string | null
          id?: string
          permission?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      whatsapp_clicks: {
        Row: {
          country: string | null
          created_at: string
          id: string
          language: string | null
          metadata: Json | null
          page_url: string | null
          referrer: string | null
          session_id: string | null
          source: string
          user_agent: string | null
        }
        Insert: {
          country?: string | null
          created_at?: string
          id?: string
          language?: string | null
          metadata?: Json | null
          page_url?: string | null
          referrer?: string | null
          session_id?: string | null
          source: string
          user_agent?: string | null
        }
        Update: {
          country?: string | null
          created_at?: string
          id?: string
          language?: string | null
          metadata?: Json | null
          page_url?: string | null
          referrer?: string | null
          session_id?: string | null
          source?: string
          user_agent?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      chat_sessions_public: {
        Row: {
          created_at: string | null
          id: string | null
          last_message_at: string | null
          session_id: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string | null
          last_message_at?: string | null
          session_id?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string | null
          last_message_at?: string | null
          session_id?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      chat_sessions_staff: {
        Row: {
          assigned_to: string | null
          created_at: string | null
          customer_language: string | null
          id: string | null
          last_message_at: string | null
          notes: string | null
          page_url: string | null
          referrer: string | null
          session_id: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          assigned_to?: string | null
          created_at?: string | null
          customer_language?: string | null
          id?: string | null
          last_message_at?: string | null
          notes?: string | null
          page_url?: string | null
          referrer?: string | null
          session_id?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          assigned_to?: string | null
          created_at?: string | null
          customer_language?: string | null
          id?: string | null
          last_message_at?: string | null
          notes?: string | null
          page_url?: string | null
          referrer?: string | null
          session_id?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      get_staff_session_metadata: {
        Args: { p_session_id: string }
        Returns: {
          created_at: string
          customer_language: string
          page_url: string
          referrer: string
        }[]
      }
      has_permission: {
        Args: { _permission: string; _user_id: string }
        Returns: boolean
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "staff" | "user"
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
    Enums: {
      app_role: ["admin", "staff", "user"],
    },
  },
} as const
