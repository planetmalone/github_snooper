describe('Sidebar', () => {
  it('searches for users', () => {
    cy.viewport('macbook-11');
    cy.visit('/');

    cy.get('#user-search').type('test');
    cy.get('#sidebar [data-testid="summary-card"]').should('have.length.greaterThan', 0);
  });

  it('clears users when search is blank', () => {
    cy.viewport('macbook-11');
    cy.visit('/');

    cy.get('#user-search').type('t');
    cy.get('#user-search').type('{backspace}');
    cy.get('#sidebar [data-testid="summary-card"]').should('not.exist');
  });

  it('opens user details upon selection', () => {
    cy.viewport('macbook-11');
    cy.visit('/');

    cy.get('#user-search').type('test');
    cy.get('#sidebar [data-testid="summary-card"] button').first().click();

    cy.url().should('include', '/users/test');
    cy.get('#github-user-page');
  });
})