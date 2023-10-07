describe("search", () => {
  it("tests search", () => {
    cy.viewport(846, 737);
    cy.visit("https://www.google.com/");
    cy.get("#APjFqb").click();
    cy.get("#APjFqb").type("จองตั๋วดูหนัง");
    cy.get("div.UUbT9 input.gNO89b").click();
    cy.location("href").should(
      "eq",
      "https://www.google.com/search?q=%E0%B8%88%E0%B8%AD%E0%B8%87%E0%B8%95%E0%B8%B1%E0%B9%8B%E0%B8%A7%E0%B8%94%E0%B8%B9%E0%B8%AB%E0%B8%99%E0%B8%B1%E0%B8%87&sca_esv=571229774&sxsrf=AM9HkKm7z4MjuV9QPZXQ4z1BVW3B8466tA%3A1696583686668&source=hp&ei=BtAfZeunJtr71e8P7LC9oAc&iflsig=AO6bgOgAAAAAZR_eFuxmG-KIF4Z-S4i4yAtMYQO-WEn1&ved=0ahUKEwjrwuTfiuGBAxXaffUHHWxYD3QQ4dUDCAk&oq=%E0%B8%88%E0%B8%AD%E0%B8%87%E0%B8%95%E0%B8%B1%E0%B9%8B%E0%B8%A7%E0%B8%94%E0%B8%B9%E0%B8%AB%E0%B8%99%E0%B8%B1%E0%B8%87&gs_lp=Egdnd3Mtd2l6IifguIjguK3guIfguJXguLHguYvguKfguJTguLnguKvguJnguLHguIcyCBAAGMsBGIAEMggQABjLARiABDIIEAAYywEYgAQyCBAAGMsBGIAEMggQABjLARiABDIIEAAYywEYgAQyBBAAGB4yBBAAGB4yBBAAGB4yBBAAGB5IyEFQwRBY2CxwAXgAkAEAmAGpAaABwAyqAQQzLjEwuAEMyAEA-AEBqAIKwgIHECMY6gIYJ8ICBBAjGCfCAgwQIxiKBRgTGIAEGCfCAgUQABiABMICBRAuGIAEwgILEC4YgAQYxwEYrwE&sclient=gws-wiz"
    );
    cy.get("#rso > div:nth-of-type(1) > div > div > div h3").click();
    cy.location("href").should(
      "eq",
      "https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&ved=2ahUKEwi17KfxiuGBAxUKzzgGHcjPACoQFnoECAsQAQ&url=https%3A%2F%2Fwww.majorcineplex.com%2F&usg=AOvVaw3zSrR_qmJ-EcFk7rK7lSTo&opi=89978449"
    );
  });
});
