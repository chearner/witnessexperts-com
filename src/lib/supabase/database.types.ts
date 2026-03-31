export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          display_name: string | null;
          primary_category_slug: string | null;
          subcategory: string | null;
          bio: string | null;
          phone: string | null;
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
          listing_active?: boolean;
        };
        Update: {
          display_name?: string | null;
          primary_category_slug?: string | null;
          subcategory?: string | null;
          bio?: string | null;
          phone?: string | null;
          listing_active?: boolean;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
