describe('Convert Currencies', () => {
  it('Open App', () => {
    cy.intercept('GET', '*api/symbols*', {
      fixture: 'symbols.json',
    }).as('getSymbols');
    cy.visit('/');

    cy.wait('@getSymbols');
  });
});
