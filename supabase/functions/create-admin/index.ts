import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface CreateAdminRequest {
  email: string;
  password: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    const { email, password }: CreateAdminRequest = await req.json();

    // Create user with admin client
    const { data: userData, error: createError } =
      await supabaseAdmin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
      });

    if (createError) {
      // If user already exists, try to get them
      if (createError.message.includes("already been registered")) {
        const { data: existingUsers, error: listError } =
          await supabaseAdmin.auth.admin.listUsers();

        if (listError) throw listError;

        const existingUser = existingUsers.users.find((u) => u.email === email);
        if (!existingUser) {
          throw new Error("User exists but could not be found");
        }

        // Check if already admin
        const { data: existingRole } = await supabaseAdmin
          .from("user_roles")
          .select("role")
          .eq("user_id", existingUser.id)
          .eq("role", "admin")
          .single();

        if (existingRole) {
          return new Response(
            JSON.stringify({ message: "User is already an admin", userId: existingUser.id }),
            { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
          );
        }

        // Add admin role
        const { error: roleError } = await supabaseAdmin
          .from("user_roles")
          .insert({ user_id: existingUser.id, role: "admin" });

        if (roleError) throw roleError;

        return new Response(
          JSON.stringify({ message: "Admin role added to existing user", userId: existingUser.id }),
          { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }
      throw createError;
    }

    // Add admin role for new user
    const { error: roleError } = await supabaseAdmin
      .from("user_roles")
      .insert({ user_id: userData.user.id, role: "admin" });

    if (roleError) throw roleError;

    return new Response(
      JSON.stringify({ message: "Admin user created successfully", userId: userData.user.id }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error creating admin:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
