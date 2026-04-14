export type Database = {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string;
          slug: string;
          name: string;
          description: string | null;
          sort_order: number;
        };
        Insert: {
          id?: string;
          slug: string;
          name: string;
          description?: string | null;
          sort_order?: number;
        };
        Update: {
          slug?: string;
          name?: string;
          description?: string | null;
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
      profile_featured_placements: {
        Row: {
          id: string;
          profile_id: string;
          page_path: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          profile_id: string;
          page_path: string;
          created_at?: string;
        };
        Update: {
          profile_id?: string;
          page_path?: string;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "profile_featured_placements_profile_id_fkey";
            columns: ["profile_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: Record<string, never>;
    Functions: {
      category_expert_counts: {
        Args: Record<string, never>;
        Returns: { slug: string; expert_count: number }[];
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
