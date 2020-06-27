describe('Menubar', () => {
  ['/', '/about'].forEach((url) => {
    it('menubar:' + url, () => {
      cy.visit(url);
      cy.get('.main_menu')
        .contains('ul', 'Home')
        .contains('ul', 'About')
        .contains('ul', 'Trips')
        .contains('ul', 'View')
        .contains('ul', 'New');
    });
  });
});

describe('Homepage', () => {
  it('title', () => {
    cy.visit('/');
    cy.contains('h1', 'GlobeTrotte');
  });
  it('description', () => {
    cy.visit('/');
    cy.contains('p', 'There is nothing here for now.');
    cy.contains('p', 'You should check back again soon!');
  });
});

describe('About', () => {
  it('title', () => {
    cy.visit('/about');
    cy.contains('h1', 'About');
  });
  it('description', () => {
    cy.visit('/about');
    cy.contains(
      'p',
      'Our goal is to change the way people share their travel experiences and how they plan for their future travels.',
    );
  });
});
