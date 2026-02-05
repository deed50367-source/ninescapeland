import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
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
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;

    // ========== AUTHENTICATION CHECK ==========
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(
        JSON.stringify({ error: "Unauthorized: No valid token provided" }),
        { status: 401, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Verify the requesting user's token
    const userClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const token = authHeader.replace("Bearer ", "");
    const { data: claimsData, error: claimsError } = await userClient.auth.getClaims(token);
    
    if (claimsError || !claimsData?.claims) {
      return new Response(
        JSON.stringify({ error: "Unauthorized: Invalid token" }),
        { status: 401, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const requestingUserId = claimsData.claims.sub;

    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    // ========== AUTHORIZATION CHECK ==========
    // Only existing admins can create new admins
    const { data: adminRole, error: roleCheckError } = await supabaseAdmin
      .from("user_roles")
      .select("role")
      .eq("user_id", requestingUserId)
      .eq("role", "admin")
      .maybeSingle();

    if (roleCheckError) {
      console.error("Role check error:", roleCheckError);
      return new Response(
        JSON.stringify({ error: "Authorization check failed" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    if (!adminRole) {
      return new Response(
        JSON.stringify({ error: "Forbidden: Admin access required to create new admins" }),
        { status: 403, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const { email, password }: CreateAdminRequest = await req.json();

    // Validate input
    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: "Email and password are required" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

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
