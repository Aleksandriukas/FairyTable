import { jwtDecode } from "jwt-decode";
import { supabase } from "../src/supabase/supabase";

describe("supabase auth", () => {
  test("supabase sign in a correct user", async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email: "adminas@adminas.com",
      password: "adminas",
    });
    expect(error?.status).toEqual(undefined);
  });
  test("supabase sign in an incorrect user", async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email: "a",
      password: "a",
    });
    expect(error?.status).toEqual(400);
  });
});
