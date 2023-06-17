export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          operationName?: string;
          query?: string;
          variables?: Json;
          extensions?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      blocks: {
        Row: {
          change: boolean;
          created_at: string;
          duration: number;
          id: string;
          is_visible: boolean;
          layer: number;
          name: string | null;
          project_id: string;
          start: number;
          type: string;
          updated_at: string;
        };
        Insert: {
          change?: boolean;
          created_at?: string;
          duration?: number;
          id: string;
          is_visible?: boolean;
          layer?: number;
          name?: string | null;
          project_id: string;
          start?: number;
          type?: string;
          updated_at?: string;
        };
        Update: {
          change?: boolean;
          created_at?: string;
          duration?: number;
          id?: string;
          is_visible?: boolean;
          layer?: number;
          name?: string | null;
          project_id?: string;
          start?: number;
          type?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "blocks_project_id_fkey";
            columns: ["project_id"];
            referencedRelation: "projects";
            referencedColumns: ["id"];
          }
        ];
      };
      images: {
        Row: {
          block_id: string;
          height: number;
          project_id: string;
          source: string | null;
          width: number;
        };
        Insert: {
          block_id: string;
          height?: number;
          project_id: string;
          source?: string | null;
          width?: number;
        };
        Update: {
          block_id?: string;
          height?: number;
          project_id?: string;
          source?: string | null;
          width?: number;
        };
        Relationships: [
          {
            foreignKeyName: "images_block_id_fkey";
            columns: ["block_id"];
            referencedRelation: "blocks";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "images_project_id_fkey";
            columns: ["project_id"];
            referencedRelation: "projects";
            referencedColumns: ["id"];
          }
        ];
      };
      projects: {
        Row: {
          created_at: string;
          creator: string;
          id: string;
          is_public: boolean;
          last_edit_at: string;
          name: string;
        };
        Insert: {
          created_at?: string;
          creator: string;
          id: string;
          is_public?: boolean;
          last_edit_at?: string;
          name: string;
        };
        Update: {
          created_at?: string;
          creator?: string;
          id?: string;
          is_public?: boolean;
          last_edit_at?: string;
          name?: string;
        };
        Relationships: [
          {
            foreignKeyName: "projects_creator_fkey";
            columns: ["creator"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      styles: {
        Row: {
          available: boolean;
          block_id: string;
          change: boolean;
          created_at: string;
          final_style: string;
          id: string;
          initial_style: string;
          key: string;
        };
        Insert: {
          available?: boolean;
          block_id: string;
          change?: boolean;
          created_at?: string;
          final_style?: string;
          id: string;
          initial_style?: string;
          key: string;
        };
        Update: {
          available?: boolean;
          block_id?: string;
          change?: boolean;
          created_at?: string;
          final_style?: string;
          id?: string;
          initial_style?: string;
          key?: string;
        };
        Relationships: [
          {
            foreignKeyName: "styles_block_id_fkey";
            columns: ["block_id"];
            referencedRelation: "blocks";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null;
          avif_autodetection: boolean | null;
          created_at: string | null;
          file_size_limit: number | null;
          id: string;
          name: string;
          owner: string | null;
          public: boolean | null;
          updated_at: string | null;
        };
        Insert: {
          allowed_mime_types?: string[] | null;
          avif_autodetection?: boolean | null;
          created_at?: string | null;
          file_size_limit?: number | null;
          id: string;
          name: string;
          owner?: string | null;
          public?: boolean | null;
          updated_at?: string | null;
        };
        Update: {
          allowed_mime_types?: string[] | null;
          avif_autodetection?: boolean | null;
          created_at?: string | null;
          file_size_limit?: number | null;
          id?: string;
          name?: string;
          owner?: string | null;
          public?: boolean | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "buckets_owner_fkey";
            columns: ["owner"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      migrations: {
        Row: {
          executed_at: string | null;
          hash: string;
          id: number;
          name: string;
        };
        Insert: {
          executed_at?: string | null;
          hash: string;
          id: number;
          name: string;
        };
        Update: {
          executed_at?: string | null;
          hash?: string;
          id?: number;
          name?: string;
        };
        Relationships: [];
      };
      objects: {
        Row: {
          bucket_id: string | null;
          created_at: string | null;
          id: string;
          last_accessed_at: string | null;
          metadata: Json | null;
          name: string | null;
          owner: string | null;
          path_tokens: string[] | null;
          updated_at: string | null;
          version: string | null;
        };
        Insert: {
          bucket_id?: string | null;
          created_at?: string | null;
          id?: string;
          last_accessed_at?: string | null;
          metadata?: Json | null;
          name?: string | null;
          owner?: string | null;
          path_tokens?: string[] | null;
          updated_at?: string | null;
          version?: string | null;
        };
        Update: {
          bucket_id?: string | null;
          created_at?: string | null;
          id?: string;
          last_accessed_at?: string | null;
          metadata?: Json | null;
          name?: string | null;
          owner?: string | null;
          path_tokens?: string[] | null;
          updated_at?: string | null;
          version?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey";
            columns: ["bucket_id"];
            referencedRelation: "buckets";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "objects_owner_fkey";
            columns: ["owner"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string;
          name: string;
          owner: string;
          metadata: Json;
        };
        Returns: undefined;
      };
      extension: {
        Args: {
          name: string;
        };
        Returns: string;
      };
      filename: {
        Args: {
          name: string;
        };
        Returns: string;
      };
      foldername: {
        Args: {
          name: string;
        };
        Returns: unknown;
      };
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>;
        Returns: {
          size: number;
          bucket_id: string;
        }[];
      };
      search: {
        Args: {
          prefix: string;
          bucketname: string;
          limits?: number;
          levels?: number;
          offsets?: number;
          search?: string;
          sortcolumn?: string;
          sortorder?: string;
        };
        Returns: {
          name: string;
          id: string;
          updated_at: string;
          created_at: string;
          last_accessed_at: string;
          metadata: Json;
        }[];
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
