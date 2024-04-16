import { ChatBean } from "../src/beans/ChatBean";
import { supabase } from "../src/supabase/supabase";

describe("Write message", () => {
  const date = new Date();
  test("Create message in chat1", async () => {
    const { error } = await supabase
      .from(`chat1`)
      .insert([{ custumerId: "test", content: `test+${date}` }]);

    // error should be null
    expect(error).toBeNull();
  });

  test("get message from chat1", async () => {
    const { data } = await supabase.from("chat1").select("*");
    const hasMessage = await data?.find(
      (value) => value.content === `test+${date}` && value.custumerId === "test"
    );
    expect(hasMessage).toBeTruthy();
  });
  // create same tests but for chat2, chat3 and chat4
  test("Create message in chat2", async () => {
    const { error } = await supabase
      .from(`chat2`)
      .insert([{ custumerId: "test", content: `test+${date}` }]);

    // error should be null
    expect(error).toBeNull();
  });

  test("get message from chat2", async () => {
    const { data } = await supabase.from("chat2").select("*");
    const hasMessage = await data?.find(
      (value) => value.content === `test+${date}` && value.custumerId === "test"
    );
    expect(hasMessage).toBeTruthy();
  });

  test("Create message in chat3", async () => {
    const { error } = await supabase
      .from(`chat3`)
      .insert([{ custumerId: "test", content: `test+${date}` }]);

    // error should be null
    expect(error).toBeNull();
  });

  test("get message from chat3", async () => {
    const { data } = await supabase.from("chat3").select("*");
    const hasMessage = await data?.find(
      (value) => value.content === `test+${date}` && value.custumerId === "test"
    );
    expect(hasMessage).toBeTruthy();
  });

  test("Create message in chat4", async () => {
    const { error } = await supabase
      .from(`chat4`)
      .insert([{ custumerId: "test", content: `test+${date}` }]);

    // error should be null
    expect(error).toBeNull();
  });

  test("get message from chat4", async () => {
    const { data } = await supabase.from("chat4").select("*");
    const hasMessage = await data?.find(
      (value) => value.content === `test+${date}` && value.custumerId === "test"
    );
    expect(hasMessage).toBeTruthy();
  });
});
