-- Migration: Add state column to documents table
-- Run this against both the local SQLite DB and the remote Turso DB.
ALTER TABLE documents ADD COLUMN state TEXT NOT NULL DEFAULT 'pending';
