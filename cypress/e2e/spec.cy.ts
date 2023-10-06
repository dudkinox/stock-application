describe("Recording 10/6/2023 at 1:12:20 PM", () => {
  it("tests Recording 10/6/2023 at 1:12:20 PM", () => {
    cy.viewport(540, 737);
    cy.visit("https://www.google.com/");
    cy.get("#APjFqb").click();
    cy.get("#APjFqb").type("guitar");
    cy.get("div.UUbT9 input.gNO89b").click();
    cy.location("href").should(
      "eq",
      "https://www.google.com/search?q=guitar&sca_esv=571184275&sxsrf=AM9HkKnjC52J02Qnkw8_TehL2mIRJHIQyg%3A1696572541222&source=hp&ei=faQfZYjKCpKR4-EP9v-CkAs&iflsig=AO6bgOgAAAAAZR-yjbrbyY6u30zgT22jM-QECmXMHCTm&ved=0ahUKEwjI_Jud4eCBAxWSyDgGHfa_ALIQ4dUDCAk&oq=guitar&gs_lp=Egdnd3Mtd2l6IgZndWl0YXIyBxAjGIoFGCcyDhAAGIoFGLEDGIMBGJECMggQABiKBRiSAzIIEAAYigUYkgMyDRAAGIAEGBQYhwIYsQMyCBAAGMsBGIAEMggQLhjLARiABDIIEAAYywEYgAQyCxAAGIAEGLEDGIMBMggQABjLARiABEjBgAFQugdYwHVwD3gAkAEDmAGJAqAB9QmqAQUwLjYuMrgBDMgBAPgBAagCCsICBxAjGOoCGCfCAhEQLhiABBixAxiDARjHARjRA8ICDhAuGIAEGLEDGMcBGNEDwgIIEAAYgAQYsQPCAggQABiKBRixA8ICBRAAGIAEwgILEC4YigUYsQMYgwHCAgsQLhiABBixAxiDAcICCxAAGIoFGLEDGIMBwgIIEAAYgAQYkgPCAggQABiABBjJAw&sclient=gws-wiz"
    );
    cy.get("#rso > div:nth-of-type(1) h3").click();
    cy.location("href").should(
      "eq",
      "https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&ved=2ahUKEwi75ID_4eCBAxXy1zgGHeUqCVYQFnoECAoQAQ&url=https%3A%2F%2Fctmusicshop.com%2Fproduct-category%2Fmusic-instrument%2Fguitar%2F&usg=AOvVaw2QrJ1GUjpxGVWzjEGrU4fk&opi=89978449"
    );
  });
});
