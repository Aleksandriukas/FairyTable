describe("registe chef", () => {
  test("test false email format", () => {
    const re =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    let email = "";
    const initialText = "aabbcc";
    let errorEmailFormat = false;
    email = initialText;
    if (!email.match(re)) {
      errorEmailFormat = true;
    }
    expect(email).toEqual(initialText);
    expect(errorEmailFormat).toBeTruthy;
  });

  test("test true email format", () => {
    const re =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    let email = "";
    const initialText = "aabbcc@email.com";
    let errorEmailFormat = false;
    email = initialText;
    if (!email.match(re)) {
      errorEmailFormat = true;
    }
    expect(email).toEqual(initialText);
    expect(errorEmailFormat).toBeFalsy;
  });

  test("test false password format", () => {
    let password = "";
    const initialPassword = "aa";
    let errorPasswordFormat = false;
    password = initialPassword;
    if (password.length < 6) {
      errorPasswordFormat = true;
    }
    expect(password).toEqual(initialPassword);
    expect(errorPasswordFormat).toBeTruthy;
  });

  test("test true password format", () => {
    let password = "";
    const initialPassword = "aa";
    let errorPasswordFormat = false;
    password = initialPassword;
    if (password.length < 6) {
      errorPasswordFormat = true;
    }
    expect(password).toEqual(initialPassword);
    expect(errorPasswordFormat).toBeFalsy;
  });
});
