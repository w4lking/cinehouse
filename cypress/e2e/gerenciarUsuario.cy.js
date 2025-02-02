describe("pagina gerenciar usuario", () => {
    // Este bloco configura o login antes de cada teste
    beforeEach(() => {
        cy.visit("/");
        cy.get('input[id="email"]').type("user212@gmail.com");
        cy.get('input[type="password"]').type("CarinhaQueMoraLogoAli");
        cy.get('button[type="submit"]').click();
        cy.wait(1000); // Aguarda um tempo para garantir que o login foi realizado
    });

    it("pesquisar usuario que está no banco de dados", () => {
        // Navega para a página de navegação
        cy.visit("/gerenciarUsuarios");
        cy.get('input').type("Julia");
        cy.wait(3000); // Aguarda para garantir que a pesquisa aconteça
    });

    it("pesquisar usuario que não está no banco", () => {
        // Navega para a página de navegação
        cy.visit("/gerenciarUsuarios");
        cy.get('input').type("Pedro Scommegna");
        cy.wait(2000); // Aguarda para garantir que a pesquisa aconteça
        cy.contains("Nenhum usuário encontrado.").should("be.visible"); // saida esperada
        cy.wait(5000); // Aguarda para garantir que a pesquisa aconteça
    });

    it("pesquisar caracteres especiais", () => {
        // Navega para a página de navegação
        cy.visit("/gerenciarUsuarios");
        cy.get('input').type("@#!$%¨&*()_+{}|:?><");
        cy.wait(2000); // Aguarda para garantir que a pesquisa aconteça
        cy.contains("Nenhum usuário encontrado.").should("be.visible"); // saida esperada
        cy.wait(5000); // Aguarda para garantir que a pesquisa aconteça
    });

it("alterar dados do funcionario", () => {
        cy.visit("/gerenciarUsuarios");
        cy.contains('.usuario-item', 'Layon Walker').get('button').contains('Alterar').click();
        // Espera o SEGUNDO pop-up aparecer e interage com ele
        cy.get('input[id="salario"]').clear().type("ABCDE");
        cy.wait(3000);
        cy.get('button[class="btn salvar"]').click();
        cy.wait(2000); // Aguarda para garantir que a pesquisa aconteça
    });
    
    it("alterar dados do funcionario com caracteres especiais", () => {
        cy.visit("/gerenciarUsuarios");
        cy.contains('.usuario-item', 'Layon Walker').get('button').contains('Alterar').click();
        // Espera o SEGUNDO pop-up aparecer e interage com ele
        cy.get('input[id="salario"]').clear().type("@#$%&*");
        cy.wait(3000);
        cy.get('button[class="btn salvar"]').click();
        cy.wait(5000); // Aguarda para garantir que a pesquisa aconteça
    });

    it("alterar dados do usuário colocando email invalido", () => {
        // Navega para a página de gerenciamento de usuários
        cy.visit("/gerenciarUsuarios");
        
        // Digita o nome do usuário no campo de busca
        cy.get('input').type("Julia");
        
        // Aguarda para garantir que a pesquisa seja processada
        cy.wait(1000);
    
        // Clica no botão "Alterar" do usuário Julia
        cy.contains("Nome do usuário: Julia")
        cy.get('button[class="btn alterar"]').click();
        
        cy.get('input[class="input-nome"]').clear().type("Julia Silva");
        cy.get('input[class="input-email"]').clear().type("ABCDE");
        cy.get('input[class="input-dataNasc"]').clear().type("1999-01-01");
        cy.wait(4000);
        cy.get('button[class="btn salvar"]').click();
        cy.wait(5000); // Aguarda para garantir que a pesquisa aconteça
    });

    it("alterar dados do usuário colocando email em branco", () => {
        // Navega para a página de gerenciamento de usuários
        cy.visit("/gerenciarUsuarios");
        
        // Digita o nome do usuário no campo de busca
        cy.get('input').type("Julia");
        
        // Aguarda para garantir que a pesquisa seja processada
        cy.wait(1000);
    
        // Clica no botão "Alterar" do usuário Julia
        cy.contains("Nome do usuário: Julia")
        cy.get('button[class="btn alterar"]').click();
        
        cy.get('input[class="input-nome"]').clear().type("Julia Sem Email");
        cy.get('input[class="input-email"]').clear().type(" ");
        cy.get('input[class="input-dataNasc"]').clear().type("1999-01-03");
        cy.wait(5000);
        cy.get('button[class="btn salvar"]').click();
        cy.wait(5000); // Aguarda para garantir que a pesquisa aconteça
    });

    it("alterar dados do usuário colocando email e nome em branco", () => {
        // Navega para a página de gerenciamento de usuários
        cy.visit("/gerenciarUsuarios");
        
        // Digita o nome do usuário no campo de busca
        cy.get('input').type("Julia");
        
        // Aguarda para garantir que a pesquisa seja processada
        cy.wait(1000);
    
        // Clica no botão "Alterar" do usuário Julia
        cy.contains("Nome do usuário: Julia")
        cy.get('button[class="btn alterar"]').click();
        
        cy.get('input[class="input-nome"]').clear().type(" ");
        cy.get('input[class="input-email"]').clear().type(" ");
        cy.get('input[class="input-dataNasc"]').clear().type("1999-01-03");
        cy.wait(5000);
        cy.get('button[class="btn salvar"]').click();
        cy.wait(5000); // Aguarda para garantir que a pesquisa aconteça
    });

});