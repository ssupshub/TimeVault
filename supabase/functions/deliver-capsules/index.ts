import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface TimeCapsule {
  id: string;
  message: string;
  file_url: string | null;
  file_type: string | null;
  delivery_method: string;
  delivery_target: string;
  unlock_date: string;
  is_delivered: boolean;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);
    const now = new Date().toISOString();

    const { data: capsules, error: fetchError } = await supabase
      .from("time_capsules")
      .select("*")
      .eq("is_delivered", false)
      .lte("unlock_date", now);

    if (fetchError) throw fetchError;

    const deliveryResults = [];

    for (const capsule of (capsules as TimeCapsule[]) || []) {
      try {
        if (capsule.delivery_method === "email") {
          console.log(`EMAIL DELIVERY: Would send to ${capsule.delivery_target}`);
          console.log(`Message: ${capsule.message}`);
          if (capsule.file_url) console.log(`File: ${capsule.file_url}`);
        } else if (capsule.delivery_method === "sms") {
          console.log(`SMS DELIVERY: Would send to ${capsule.delivery_target}`);
          console.log(`Message: ${capsule.message}`);
        }

        const { error: updateError } = await supabase
          .from("time_capsules")
          .update({ is_delivered: true, delivered_at: new Date().toISOString() })
          .eq("id", capsule.id);

        if (updateError) throw updateError;

        deliveryResults.push({
          id: capsule.id,
          status: "delivered",
          method: capsule.delivery_method,
          target: capsule.delivery_target,
        });
      } catch (error) {
        deliveryResults.push({
          id: capsule.id,
          status: "failed",
          error: error instanceof Error ? error.message : "Unknown error",
        });
      }
    }

    return new Response(
      JSON.stringify({ success: true, processed: deliveryResults.length, results: deliveryResults }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
