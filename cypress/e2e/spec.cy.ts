describe("searching", () => {
  it("tests searching", () => {
    cy.viewport(836, 737);
    cy.visit("https://www.google.com/");
    cy.get("#APjFqb").click();
    cy.get("#APjFqb").type("automated testing");
    cy.get("div.FPdoLc input.gNO89b").click();
    cy.location("href").should("eq", "https://www.google.com/search?q=automated+testing&sca_esv=571184275&sxsrf=AM9HkKmjJSFy0Ed89TcCbzNkdWzbKB9fbw%3A1696563342549&source=hp&ei=joAfZdjtHs6I4-EPlIC3aA&iflsig=AO6bgOgAAAAAZR-Onr3AYwQkYOVZUGvRwP-iLAkiETZU&ved=0ahUKEwjY7Pn6vuCBAxVOxDgGHRTADQ0Q4dUDCBE&oq=automated+testing&gs_lp=Egdnd3Mtd2l6IhFhdXRvbWF0ZWQgdGVzdGluZzIHECMYigUYJzIIEAAYigUYkQIyCBAAGMsBGIAEMggQABjLARiABDIIEAAYywEYgAQyCBAAGIoFGJECMgUQABiABDIKEAAYgAQYFBiHAjIKEAAYgAQYFBiHAjIFEAAYgARIrExQsANY0R1wAXgAkAEAmAF3oAGbDqoBBDQuMTO4AQzIAQD4AQGoAgrCAgcQIxjqAhgnwgIHEC4Y6gIYJ8ICBxAAGIoFGEPCAg4QLhiABBixAxjHARjRA8ICCBAAGIAEGLEDwgILEC4YgAQYxwEY0QPCAgsQABiABBixAxiDAcICCxAAGIoFGLEDGIMBwgIQEAAYgAQYFBiHAhixAxiDAcICEBAuGIAEGBQYhwIYxwEY0QM&sclient=gws-wiz");
    cy.get("#top_nav div:nth-of-type(2) > a").click();
    cy.location("href").should("eq", "https://www.google.com/search?q=automated+testing&sca_esv=571184275&tbm=isch&sxsrf=AM9HkKmcyTojHQ5rOTGz0YrMOdehMiGc0g:1696563361267&source=lnms&sa=X&ved=2ahUKEwjpvPKDv-CBAxUuxTgGHdT2BXUQ_AUoAXoECAIQAw&biw=836&bih=737&dpr=2");
    cy.get("div.O850f a:nth-of-type(2)").click();
    cy.location("href").should("eq", "https://www.google.com/search?q=automated+testing&source=lmns&tbm=vid&bih=737&biw=836&hl=en&sa=X&ved=2ahUKEwjilu-Ev-CBAxVIamwGHfQ6C_AQ_AUoAnoECAEQAg");
    cy.get("#top_nav div:nth-of-type(4) > a").click();
    cy.location("href").should("eq", "https://www.google.com/search?q=automated+testing&sca_esv=571184275&hl=en&tbm=nws&sxsrf=AM9HkKnRI6558WPjXECAh5GoqltkEod0ew:1696563364861&source=lnms&sa=X&ved=2ahUKEwjr_s2Fv-CBAxXewzgGHZi8DzMQ_AUoA3oECAEQBQ&biw=836&bih=737&dpr=2");
    cy.get("div:nth-of-type(5) > a").click();
    cy.location("href").should("eq", "https://www.google.com/search?q=automated+testing&sca_esv=571184275&hl=en&tbm=bks&sxsrf=AM9HkKlQ-o3xwlJXyueYKMCDBPsXsGOyMg:1696563366464&source=lnms&sa=X&ved=2ahUKEwiq7q-Gv-CBAxWYn2MGHeWcDWsQ_AUoBHoECAEQBg&biw=836&bih=737&dpr=2");
    cy.get("#top_nav div > div:nth-of-type(1) > a").click();
    cy.location("href").should("eq", "https://www.google.com/search?q=automated+testing&sca_esv=571184275&hl=en&sxsrf=AM9HkKl4XGt_zcdtYtfTErUnWYcbnlrN2w:1696563368201&source=lnms&sa=X&ved=2ahUKEwiM1JmHv-CBAxWlyDgGHTbrBy0Q_AUoAHoECAEQAg&biw=836&bih=737&dpr=2");
  });
});
