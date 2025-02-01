describe("Testes para página de adm", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.wait(1000);
    cy.get('input[id="email"]').type("user212@gmail.com");
    cy.wait(1000);
    cy.get('input[type="password"]').type("CarinhaQueMoraLogoAli");
    cy.wait(1000);
    cy.get('button[type="submit"]').click();
    cy.wait(3000);
    cy.visit("/adm");
  });

  it("Deve ser possível acessar o relatório de alugueis e vendas", () => {
    cy.get('[data-testid="aluguel-cypress"]').click();
  });
});
