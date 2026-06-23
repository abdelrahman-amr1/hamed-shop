// Supabase Configuration for H.M Group Storefront
// Replace the values below with your Supabase URL and Anon Key

const supabaseUrl = 'YOUR_SUPABASE_PROJECT_URL';
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY';

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
