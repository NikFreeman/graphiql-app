///<reference types="cypress" />
import { getLanguageFromLocalStorage, setLanguageToLocalStorage } from '../utils/getLanguage';

describe('Welcome page', () => {
  it('should change the language by clicking on the switch lang button ', () => {
    cy.visit('/');

    cy.findByTestId('switch')
      .as('lang-switch')
      .contains('EN')
      .then(() => {
        expect(getLanguageFromLocalStorage()).equal('en-US');
      });
    cy.findByTestId('developers').as('developers').contains('Developers');

    cy.get('@lang-switch').click();
    cy.get('@lang-switch')
      .contains('РУС')
      .then(() => {
        expect(getLanguageFromLocalStorage()).equal('ru');
      });
    cy.get('@developers').contains('Разработчики');
  });

  it('should use language defined in localStorage', () => {
    setLanguageToLocalStorage('ru');

    cy.visit('/');
    cy.findByTestId('switch')
      .contains('РУС')
      .then(() => {
        expect(getLanguageFromLocalStorage()).equal('ru');
      });
    cy.findByTestId('developers').contains('Разработчики');

    cy.log('language should not change after page reloads');
    cy.reload();
    expect(getLanguageFromLocalStorage()).equal('ru');
  });

  it('should open the authorization form when clicking on the sign-in button', () => {
    cy.visit('/');

    cy.findByTestId('sign-in').click();
    cy.url().should('include', '/sign-in');
  });

  it.only('should open the registration form when clicking on the sign-up button', () => {
    cy.visit('/');

    cy.findByTestId('sign-up').click();
    cy.url().should('include', '/sign-up');
  });
});
