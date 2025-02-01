describe ("pagina cadastro", () => {
    beforeEach(() => {
        cy.visit("/register");
    });

    it("Deve realizar cadastro com sucesso", () => {
        cy.wait(1000);
        cy.get('input[id="username"]').type("User Teste");
        cy.wait(1000);
        cy.get('input[id="cpf"]').type("123.456.789-00");
        cy.wait(1000);
        cy.get('input[id="email"]').type("teste@gmail.com");
        cy.wait(1000);
        cy.get('input[id="birthDate"]').type("1999-01-01");
        cy.wait(1000);
        cy.get('input[id="password"]').type("testeDoCypressCarinha12361");
        cy.wait(1000);
        cy.get('button[type="submit"]').click();
        cy.url().should("include", "/login");
        cy.wait(3000);
    });

    it("Deve realizar cadastro invalido, pois já existe esse cadastro", () => {
        cy.wait(1000);
        cy.get('input[id="username"]').type("User Teste");
        cy.wait(1000);
        cy.get('input[id="cpf"]').type("123.456.789-00");
        cy.wait(1000);
        cy.get('input[id="email"]').type("teste@gmail.com");
        cy.wait(1000);
        cy.get('input[id="birthDate"]').type("1999-01-01");
        cy.wait(1000);
        cy.get('input[id="password"]').type("testeDoCypressCarinha12361");
        cy.wait(1000);
        cy.get('button[type="submit"]').click();
        cy.url().should("include", "/login");
        cy.wait(3000);
    });
});

