describe("pagina login", () => {
    beforeEach(() => {
        cy.visit("/");
    }
    );
    it("deve fazer login com sucesso", () => {
        cy.wait(1000);
        cy.get('input[id="email"]').type("user212@gmail.com");
        cy.wait(1000);
        cy.get('input[type="password"]').type("CarinhaQueMoraLogoAli");
        cy.wait(1000);
        cy.get('button[type="submit"]').click();
        cy.url().should("include", "/navigation");
        cy.wait(3000);
    });

    it("Deve realizar login invalido", () => {
        cy.wait(1000);
        cy.get('input[id="email"]').type("user@gmail.com");
        cy.wait(1000);
        cy.get('input[type="password"]').type("senhaincorreta");
        cy.wait(1000);
        cy.get('button[type="submit"]').click();
        cy.contains("Houve um erro. Suas credenciais podem estar incorretas.").should("be.visible");
        cy.wait(2000)
    });

    // referente aos redirecionamentos
    it("Não deve redirecionar o usuario caso nao esteja autenticado via JWT", () => {
        cy.visit("/main");
        cy.url().should("include", "/login");
        cy.visit("/adm"); // tela do adm
        cy.url().should("include", "/login");
        cy.visit("/adm/criarUsuario");
        cy.url().should("include", "/login");
        cy.visit("/gerenciarUsuarios");
        cy.url().should("include", "/login");
        cy.visit("/relatorio/alugueisEVendas");
        cy.url().should("include", "/login");
        cy.visit("/relatorio/devolucao");
        cy.url().should("include", "/login");
        cy.visit("/GerenciarFilme");
        cy.url().should("include", "/login");
        cy.visit("/histPedidos");
        cy.url().should("include", "/login");
        cy.visit("/userSettings");
        cy.url().should("include", "/login");
      });
});