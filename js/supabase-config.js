// Supabase Configuration for H.M Group Storefront
// Replace the values below with your Supabase URL and Anon Key

const supabaseUrl = 'https://qklewhtuhryovkqxowhq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFrbGV3aHR1aHJ5b3ZrcXhvd2hxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIyMzI3MzMsImV4cCI6MjA5NzgwODczM30.rD4puQdnXzGXcAi-QxpfdAfKpDEUHXWTRNHH8vLtbgY';

// Initialize Supabase Client
let supabaseClient = null;
if (typeof supabase !== 'undefined') {
  try {
    supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);
    window.supabaseDb = supabaseClient;
  } catch (e) {
    console.error("Error initializing Supabase client:", e);
  }
} else {
  console.warn("Supabase SDK was not loaded.");
}
