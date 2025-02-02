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
        cy.viewport(1920, 1080);
        cy.visit("/gerenciarFilme");
        cy.get('button[class="btn-adicionar"]').click();
        cy.wait(1000);
        cy.get('input[id="nome"]').type("Alice: ");
        cy.wait(1000);
        cy.get('textarea[id="sinopse"]').type("Subservience é um suspense de ficção científica dirigido por Scott Dale. O filme segue uma androide com inteligência artificial comprada por uma família para ajudá-los com as tarefas domésticas. No entanto, o robô cria consciência e a situação começa a ficar assustadora");
        cy.wait(1000);
        cy.get('select[id="categoria"]').select("Ação");
        cy.wait(1000);
        cy.get('input[id="data-lancamento"]').type("2024-12-12");
        cy.wait(1000); 
        cy.get('input[id="preco-compra"]').type("10");
        cy.wait(1000); 
        cy.get('input[id="qtd-estoque"]').type("5");
        cy.wait(1000);
        cy.get('input[id="disponivel-locacao"]').click();
        cy.wait(1000);
        cy.get('input[id="classificacao-indicativa"]').type("18");
        cy.wait(1000);
        cy.get('input[id="imagem"]').type("https://lrmonline.com/wp-content/uploads/2024/08/subservience-header.jpg");
        cy.wait(1000);
        cy.get('button[id="btn salvar"]').click();
        cy.wait(1000);
        cy.visit("/navigation");
        cy.wait(7000);
    });


        it("Alterar o filme corretamente", () => {
        // Navega para a página de navegação
        cy.viewport(1920, 1080);
        cy.visit("/gerenciarFilme");

        cy.get('input').type("Alice");
        cy.wait(3000); // Aguarda para garantir que a pesquisa aconteça
        cy.get('button[class="btn alterar"]').click();
        cy.wait(1000);
        cy.get('input[class="input-nome-filme"]').clear().type("Alice: Subservience");
        cy.wait(1000);
        cy.get('select[class="input-categoria"]').select("Drama");
        cy.wait(1000);
        cy.get('input[class="input-data-lancamento"]').type("2024-10-11");
        cy.wait(1000); 
        cy.get('input[class="input-preco-compra"]').clear().type("15");
        cy.wait(1000); 
        cy.get('input[class="input-qtd-estoque"]').clear().type("2");
        cy.wait(1000);
        cy.get('input[class="input-classificacao-indicativa"]').clear().type("16");
        cy.wait(1000);
        cy.get('button[class="btn salvar"]').click();
        cy.wait(1000);
        cy.visit("/navigation");
        cy.wait(7000);
    });

});
