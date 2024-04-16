import { supabase } from "../src/supabase/supabase";

describe("supabase registration", () => {
  test("supabase create a user with empty values", async () => {
    let error = false;
    try {
      const { error } = await supabase.auth.signUp({
        email: "",
        password: "",
      });
      if (error) {
        throw error;
      }
    } catch (error) {
      error = true;
    }
    expect(error).toBeTruthy;
  });

  test("supabase create a user with valid values", async () => {
    let error = false;
    try {
      const { error } = await supabase.auth.signUp({
        email: "admin@ad.pom",
        password: "adadad",
      });
      if (error) {
        throw error;
      }
    } catch (error) {
      error = true;
    }
    expect(error).toBeFalsy;
  });
});
