describe("Testes para página de adm", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get('input[id="email"]').type("user212@gmail.com");
    cy.get('input[type="password"]').type("CarinhaQueMoraLogoAli");
    cy.get('button[type="submit"]').click();
    cy.wait(1000); // Aguarda um tempo para garantir que o login foi realizado
  });

  it("Deve ser possível acessar o relatório de alugueis e vendas", () => {
    cy.get('button[class="close-button-navigation"]').click();
    cy.wait(800);
    cy.visit("/adm");

    cy.visit("/relatorio/alugueisEVendas");
    cy.wait(5000);
  });

  it("Deve ser possível acessar o relatório de devoluções", () => {
    cy.get('button[class="close-button-navigation"]').click();
    cy.wait(800);
    cy.visit("/adm");

    cy.visit("/relatorio/devolucao");
  });
});
