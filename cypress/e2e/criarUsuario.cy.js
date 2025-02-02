describe("pagina Adm Cadastrar Usuario", () => {
    // Este bloco configura o login antes de cada teste
    beforeEach(() => {
        cy.visit("/");
        cy.get('input[id="email"]').type("user212@gmail.com");
        cy.get('input[type="password"]').type("CarinhaQueMoraLogoAli");
        cy.get('button[type="submit"]').click();
        cy.wait(1000); // Aguarda um tempo para garantir que o login foi realizado
    });

    it("cadastrar usuario corretamente", () => {
        // Navega para a página de navegação
        cy.visit("/adm/criarUsuario");
        cy.get('input[id="name"]').type("Heitor Augusto");
        cy.wait(1000); // Aguarda para garantir que a pesquisa aconteça
        cy.get('input[id="email"]').type("heitor@ufla.br");
        cy.wait(1000); // Aguarda para garantir que a pesquisa aconteça
        cy.get('input[id="birthDate"]').type("1999-12-12");
        cy.wait(1000); // Aguarda para garantir que a pesquisa aconteça
        cy.get('input[id="password"]').type("heitor123");
        cy.wait(1000); // Aguarda para garantir que a pesquisa aconteça
        cy.get('button[class="btn btn-primary"]').click();
        cy.contains("Usuário criado com sucesso!").should("be.visible"); // saida esperada
    });

    it("cadastrar usuario incorretamente baseado no email em branco", () => {
        // Navega para a página de navegação
        cy.visit("/adm/criarUsuario");
        cy.get('input[id="name"]').type("123");
        cy.wait(1000); // Aguarda para garantir que a pesquisa aconteça
        cy.get('input[id="email"]').type(" @gmail.com");
        cy.wait(1000); // Aguarda para garantir que a pesquisa aconteça
        cy.get('input[id="birthDate"]').type("1999-12-12");
        cy.wait(1000); // Aguarda para garantir que a pesquisa aconteça
        cy.get('input[id="password"]').type("errado@123");
        cy.wait(1000); // Aguarda para garantir que a pesquisa aconteça
        cy.get('button[class="btn btn-primary"]').click();
        cy.contains("Erro ao criar usuário. Tente novamente.").should("be.visible"); // saida esperada
    });

    it("cadastrar usuario incorretamente baseado no nome em branco", () => {
        // Navega para a página de navegação
        cy.visit("/adm/criarUsuario");
        cy.get('input[id="name"]').type(" "); // caractere em branco
        cy.wait(1000); // Aguarda para garantir que a pesquisa aconteça
        cy.get('input[id="email"]').type("nomeembranco@gmail.com");
        cy.wait(1000); // Aguarda para garantir que a pesquisa aconteça
        cy.get('input[id="birthDate"]').type("1999-12-12");
        cy.wait(1000); // Aguarda para garantir que a pesquisa aconteça
        cy.get('input[id="password"]').type("errado@123");
        cy.wait(1000); // Aguarda para garantir que a pesquisa aconteça
        cy.get('button[class="btn btn-primary"]').click();
        cy.contains("Erro ao criar usuário. Tente novamente.").should("be.visible"); // saida esperada
    });

    // cadastrar usuario incorretamente baseado na senha vazia
    it("cadastrar usuario com um caracter de senha ", () => {
        // Navega para a página de navegação
        cy.visit("/adm/criarUsuario");
        cy.get('input[id="name"]').type("senhaembranco"); // caractere em branco
        cy.wait(1000); // Aguarda para garantir que a pesquisa aconteça
        cy.get('input[id="email"]').type("senhaembranco@gmail.com");
        cy.wait(1000); // Aguarda para garantir que a pesquisa aconteça
        cy.get('input[id="birthDate"]').type("1999-12-12");
        cy.wait(1000); // Aguarda para garantir que a pesquisa aconteça
        cy.get('input[id="password"]').type(" ");
        cy.wait(1000); // Aguarda para garantir que a pesquisa aconteça
        cy.get('button[class="btn btn-primary"]').click();
        cy.contains("Erro ao criar usuário. Tente novamente.").should("be.visible"); // saida esperada
    });
});
