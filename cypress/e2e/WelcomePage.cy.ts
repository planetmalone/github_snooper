describe('template spec', () => {
  it('renders on small screens', () => {
    cy.viewport('iphone-x');
    cy.visit('/');

    cy.get('#sidebar').should('not.be.visible');
    cy.get('#sidebar-trigger').click();
    cy.get('#sidebar').should('be.visible');
  });

  it('renders on medium screens', () => {
    cy.viewport('ipad-2');
    cy.visit('/');

    cy.get('#sidebar').should('not.be.visible');
    cy.get('#sidebar-trigger').click();
    cy.get('#sidebar').should('be.visible');
  });

  it('renders on large screens', () => {
    cy.viewport('macbook-11');
    cy.visit('/');

    cy.get('#sidebar').should('be.visible');
  });

  it('has the correct number of starter users', () => {
    cy.visit('/');

    cy.get('[data-testid="summary-card"]').should('have.length', 8);
  });
})