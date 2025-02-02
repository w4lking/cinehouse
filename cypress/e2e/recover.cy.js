describe ("pagina de recuperar senha", () => {
    beforeEach(() => {
        cy.visit("/recover");
    });

    it("Enviar um email para um endereço vazio", () => {
        cy.wait(1000);
        cy.get('input[id="email"]').type(" ");
        cy.wait(1000);
        cy.get('button[type="submit"]').click();
        cy.wait(4000);
    });

    it("Enviar um email para um endereço inválido", () => {
        cy.wait(1000);
        cy.get('input[id="email"]').type("walkerlayon.com");
        cy.wait(1000);
        cy.get('button[type="submit"]').click();
        cy.wait(4000);
    });

    it("Enviar um email para um endereço válido", () => {
        cy.wait(1000);
        cy.get('input[id="email"]').type("walkerlayon@gmail.com");
        cy.get('button[type="submit"]').click();
        cy.wait(4000);
    });

});

