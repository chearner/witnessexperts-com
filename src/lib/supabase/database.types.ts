export type Database = {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string;
          slug: string;
          name: string;
          description: string | null;
          expert_count: number | null;
          sort_order: number;
        };
        Insert: {
          id?: string;
          slug: string;
          name: string;
          description?: string | null;
          expert_count?: number | null;
          sort_order?: number;
        };
        Update: {
          slug?: string;
          name?: string;
          description?: string | null;
          expert_count?: number | null;
          sort_order?: number;
        };
        Relationships: [];
      };
      us_states: {
        Row: {
          code: string;
          name: string;
          sort_order: number;
        };
        Insert: {
          code: string;
          name: string;
          sort_order: number;
        };
        Update: {
          name?: string;
          sort_order?: number;
        };
        Relationships: [];
      };
      subcategories: {
        Row: {
          id: string;
          category_id: string;
          name: string;
          sort_order: number;
        };
        Insert: {
          id?: string;
          category_id: string;
          name: string;
          sort_order?: number;
        };
        Update: {
          category_id?: string;
          name?: string;
          sort_order?: number;
        };
        Relationships: [
          {
            foreignKeyName: "subcategories_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "categories";
            referencedColumns: ["id"];
          },
        ];
      };
      profiles: {
        Row: {
          id: string;
          display_name: string | null;
          primary_category_slug: string | null;
          subcategory: string | null;
          bio: string | null;
          phone: string | null;
          us_state_code: string | null;
          listing_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          display_name?: string | null;
          primary_category_slug?: string | null;
          subcategory?: string | null;
          bio?: string | null;
          phone?: string | null;
          us_state_code?: string | null;
          listing_active?: boolean;
        };
        Update: {
          display_name?: string | null;
          primary_category_slug?: string | null;
          subcategory?: string | null;
          bio?: string | null;
          phone?: string | null;
          us_state_code?: string | null;
          listing_active?: boolean;
        };
        Relationships: [
          {
            foreignKeyName: "profiles_us_state_code_fkey";
            columns: ["us_state_code"];
            isOneToOne: false;
            referencedRelation: "us_states";
            referencedColumns: ["code"];
          },
        ];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
