import { createClient } from "@supabase/supabase-js";
import { SUPABASE_PRIVATE_KEY, SUPABASE_URL } from "./constants";

const supabaseAdmin = createClient(
  SUPABASE_URL as string,
  SUPABASE_PRIVATE_KEY as string
);

export default supabaseAdmin;
