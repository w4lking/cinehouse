describe("pagina navigation", () => {
    // Este bloco configura o login antes de cada teste
    beforeEach(() => {
        cy.visit("/");
        cy.get('input[id="email"]').type("user212@gmail.com");
        cy.get('input[type="password"]').type("CarinhaQueMoraLogoAli");
        cy.get('button[type="submit"]').click();
        cy.wait(1000); // Aguarda um tempo para garantir que o login foi realizado
    });

    it("deve fazer login com sucesso", () => {
        // Teste de login
        cy.url().should("include", "/navigation"); // Exemplo de validação de URL após o login
    });

    it("pesquisando filme que existe", () => {
        // Navega para a página de navegação
        cy.visit("/navigation");
        cy.get('input[class="search-bar-filme"]').type("Joker");
        cy.wait(1000); // Aguarda para garantir que a pesquisa aconteça
    });

    it("pesquisando filme que nao existe", () => {
        // Navega para a página de navegação
        cy.visit("/navigation");
        cy.get('input[class="search-bar-filme"]').type("Round 6");
        cy.wait(1000); // Aguarda para garantir que a pesquisa aconteça
    });

    it("pesquisando filme com caracteres especiais", () => {
        // Navega para a página de navegação
        cy.visit("/navigation");
        cy.get('input[class="search-bar-filme"]').type("@#$%¨&*()_+"); // Caracteres especiais
        cy.wait(1000); // Aguarda para garantir que a pesquisa aconteça
    });

    it("vai utilizar filtro de preços", () => {
        // Navega para a página de navegação
        cy.visit("/navigation");
        cy.get('button[class="close-button-navigation"]').click(); // clicar no botao de abrir 
        cy.get('select[class="price-filter"]').select("Até R$10"); // Utiliza o método .select() para escolher a opção
        cy.wait(1000); // Aguarda para garantir que a pesquisa aconteça
    });

    it("vai utilizar filtro de preços com valores que nao existem", () => {
        // Navega para a página de navegação
        cy.visit("/navigation");
        cy.get('button[class="close-button-navigation"]').click(); // clicar no botao de abrir 
        cy.get('select[class="price-filter"]').select("A"); // Utiliza o método .select() para escolher a opção
        cy.wait(1000); // Aguarda para garantir que a pesquisa aconteça
    });

    it("vai utilizar filtro de ano", () => {
        // Navega para a página de navegação
        cy.visit("/navigation");
        cy.get('button[class="close-button-navigation"]').click(); // clicar no botao de abrir 
        cy.get('select[class="year-filter"]').select("2025"); // Utiliza o método .select() para escolher a opção
        cy.wait(1000); // Aguarda para garantir que a pesquisa aconteça
    });

    it("vai utilizar filtro de ano com caracteres especiais", () => {
        // Navega para a página de navegação
        cy.visit("/navigation");
        cy.get('button[class="close-button-navigation"]').click(); // clicar no botao de abrir 
        cy.get('select[class="year-filter"]').select("A"); // Utiliza o método .select() para escolher a opção
        cy.wait(1000); // Aguarda para garantir que a pesquisa aconteça
    });

    it("vai utilizar filtro de genero", () => {
        // Navega para a página de navegação
        cy.visit("/navigation");
        cy.get('select[class="genre-filter"]').select("Drama"); // Utiliza o método .select() para escolher a opção
        cy.wait(1000); // Aguarda para garantir que a pesquisa aconteça
    });


    // deslogar do site
    it("vai deslogar do site", () => {
        // Navega para a página de navegação
        cy.visit("/navigation");
        cy.get('button[class="close-button-navigation"]').click(); // clicar no botao de abrir 
        cy.wait(1000); // Aguarda para garantir que a pesquisa aconteça
        cy.contains('li', 'Sair').should('be.visible').click(); // Clica no botão de sair
    });
});
