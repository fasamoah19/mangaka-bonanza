export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      Manga: {
        Row: {
          created_at: string
          genres: string[] | null
          id: number
          image_url: string | null
          in_print: boolean | null
          manga_series: number | null
          mangaka: number | null
          name: string | null
          price: number | null
          rating: number | null
          release_date: string | null
          slug: string | null
          summary: string | null
        }
        Insert: {
          created_at?: string
          genres?: string[] | null
          id?: number
          image_url?: string | null
          in_print?: boolean | null
          manga_series?: number | null
          mangaka?: number | null
          name?: string | null
          price?: number | null
          rating?: number | null
          release_date?: string | null
          slug?: string | null
          summary?: string | null
        }
        Update: {
          created_at?: string
          genres?: string[] | null
          id?: number
          image_url?: string | null
          in_print?: boolean | null
          manga_series?: number | null
          mangaka?: number | null
          name?: string | null
          price?: number | null
          rating?: number | null
          release_date?: string | null
          slug?: string | null
          summary?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Manga_manga_series_fkey"
            columns: ["manga_series"]
            referencedRelation: "MangaSeries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Manga_mangaka_fkey"
            columns: ["mangaka"]
            referencedRelation: "Mangaka"
            referencedColumns: ["id"]
          }
        ]
      }
      Mangaka: {
        Row: {
          bio: string | null
          birth_place: string | null
          created_at: string
          dob: string | null
          first_manga_title: string | null
          id: number
          image_url: string | null
          most_recent_manga: string | null
          name: string | null
          slug: string | null
        }
        Insert: {
          bio?: string | null
          birth_place?: string | null
          created_at?: string
          dob?: string | null
          first_manga_title?: string | null
          id?: number
          image_url?: string | null
          most_recent_manga?: string | null
          name?: string | null
          slug?: string | null
        }
        Update: {
          bio?: string | null
          birth_place?: string | null
          created_at?: string
          dob?: string | null
          first_manga_title?: string | null
          id?: number
          image_url?: string | null
          most_recent_manga?: string | null
          name?: string | null
          slug?: string | null
        }
        Relationships: []
      }
      MangaSeries: {
        Row: {
          created_at: string
          first_cover_url: string | null
          genres: string[] | null
          id: number
          mangaka: number | null
          name: string | null
          slug: string | null
          summary: string | null
        }
        Insert: {
          created_at?: string
          first_cover_url?: string | null
          genres?: string[] | null
          id?: number
          mangaka?: number | null
          name?: string | null
          slug?: string | null
          summary?: string | null
        }
        Update: {
          created_at?: string
          first_cover_url?: string | null
          genres?: string[] | null
          id?: number
          mangaka?: number | null
          name?: string | null
          slug?: string | null
          summary?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "MangaSeries_mangaka_fkey"
            columns: ["mangaka"]
            referencedRelation: "Mangaka"
            referencedColumns: ["id"]
          }
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
