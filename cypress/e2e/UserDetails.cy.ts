describe('User Details', () => {
  it('shows a user\'s details', () => {
    cy.visit('/users/planetmalone');

    cy.get('[alt="planetmalone\'s avatar"]');
    cy.get('.avatar-list');
    cy.get('[data-testid="repository-card"]').should('have.length.greaterThan', 0);
    cy.get('#repository-list').scrollTo('bottom');
  });
});