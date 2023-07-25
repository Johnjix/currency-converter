describe('Convert Currencies', () => {
  it('Open App', () => {
    cy.intercept('GET', '*api/symbols*', {
      fixture: 'symbols.json',
    }).as('getSymbols');

    cy.intercept('GET', 'http://data.fixer.io/api/convert*', {
      fixture: 'convert-endpoint.json',
    }).as('getConvert');
    cy.visit('/');

    cy.wait('@getSymbols');
    // cy.wait('@getConvert');
  });
});
