describe("pagina de gerenciar filme", () => {
    // Este bloco configura o login antes de cada teste
    beforeEach(() => {
        cy.visit("/");
        cy.get('input[id="email"]').type("user212@gmail.com");
        cy.get('input[type="password"]').type("CarinhaQueMoraLogoAli");
        cy.get('button[type="submit"]').click();
        cy.wait(1000); // Aguarda um tempo para garantir que o login foi realizado
    });

    it("cadastrar Filme corretamente", () => {
        // Navega para a página de navegação
        cy.visit("/gerenciarFilme");
        cy.get('button[class="btn alterar"]').click();
        cy.get('input[id="input-nome-filme"]').type("Alice: Subservience");
        cy.wait(1000);
        cy.get('input[id="input-sinopse"]').type("Subservience é um suspense de ficção científica dirigido por Scott Dale. O filme segue uma androide com inteligência artificial comprada por uma família para ajudá-los com as tarefas domésticas. No entanto, o robô cria consciência e a situação começa a ficar assustadora");
        cy.wait(1000);
        cy.get('select[class="input-categoria"]').select("Ação");
        cy.wait(1000);
        cy.get('input[id="input-data-lancamento"]').type("2024-12-12");
        cy.wait(1000); 
        cy.get('input[id="input-preco-compra"]').type("10");
        cy.wait(1000); 
        cy.get('input[id="input-qtd-estoque"]').type("5");
        cy.wait(1000);
        cy.get('input[id="input-classificacao-indicativa"]').type("18");
        cy.wait(1000);
        cy.get('input[id="input-imagem"]').type("https://lrmonline.com/wp-content/uploads/2024/08/subservience-header.jpg");
        cy.wait(1000);
        cy.get('button[class="btn salvar"]').click();
        cy.contains("Filme cadastrado com sucesso!").should("be.visible");
    });

});
