import { supabase } from "../src/supabase/supabase";

describe("supabase dish", () => {
  test("supabase get dish by correct id", async () => {
    const { data } = await supabase.from("Dish").select("*").eq("id", 2);
    expect(data?.length).toBeGreaterThan(0);
  });

  test("supabase get dish by incorrect id", async () => {
    const { data } = await supabase.from("Dish").select("*").eq("id", 0);
    expect(data?.length).toEqual(0);
  });
});
