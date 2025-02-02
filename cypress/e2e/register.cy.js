describe ("pagina cadastro", () => {
    beforeEach(() => {
        cy.visit("/register");
    });

    it("Realizar cadastro com nome em branco", () => {
        cy.wait(1000);
        cy.get('input[id="username"]').type(" ");
        cy.wait(1000);
        cy.get('input[id="cpf"]').type("123.456.789-00");
        cy.wait(1000);
        cy.get('input[id="email"]').type("emBranco@gmail.com");
        cy.wait(1000);
        cy.get('input[id="birthDate"]').type("1999-01-01");
        cy.wait(1000);
        cy.get('input[id="password"]').type("testeDoCypressCarinha12361");
        cy.wait(1000);
        cy.get('button[type="submit"]').click();
        cy.url().should("include", "/register");
        cy.wait(3000);
    });

    it("Realizar cadastro com cpf vázio", () => {
        cy.wait(1000);
        cy.get('input[id="username"]').type("User Teste 2");
        cy.wait(1000);
        cy.get('input[id="cpf"]').type(" ");
        cy.wait(1000);
        cy.get('input[id="email"]').type("cpfEmBranco@gmail.com");
        cy.wait(1000);
        cy.get('input[id="birthDate"]').type("1999-01-01");
        cy.wait(1000);
        cy.get('input[id="password"]').type("testeDoCypressCarinha12361");
        cy.wait(1000);
        cy.get('button[type="submit"]').click();
        cy.url().should("include", "/register");
        cy.wait(3000);
    });

    it("Realizar cadastro com email vázio", () => {
        cy.wait(1000);
        cy.get('input[id="username"]').type("User Teste 3");
        cy.wait(1000);
        cy.get('input[id="cpf"]').type("091.222.170-45");
        cy.wait(1000);
        cy.get('input[id="email"]').type(" ");
        cy.wait(1000);
        cy.get('input[id="birthDate"]').type("1999-01-01");
        cy.wait(1000);
        cy.get('input[id="password"]').type("testeDoCypressCarinha12361");
        cy.wait(1000);
        cy.get('button[type="submit"]').click();
        cy.url().should("include", "/register");
        cy.wait(3000);
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
        cy.url().should("include", "/register");
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
        cy.url().should("include", "/register");
        cy.wait(3000);
    });
});

