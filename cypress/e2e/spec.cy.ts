///<reference types="cypress" />

describe('Welcome page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should welcome page', () => {
    cy.findByTestId('welcome-page').should('exist');
  });
  it('should toggle language', () => {
    const checkLanguage = (lang: string) => {
      if (lang === 'en') {
        cy.findAllByTestId('developers').should('have.text', 'Developers');
      }
      if (lang === 'ru') {
        cy.findAllByTestId('developers').should('have.text', 'Разработчики');
      }
    };
    cy.findAllByTestId('switch').click();
    cy.getAllLocalStorage().then((data) => {
      for (const key in data) {
        if (key === 'http://localhost:5173') {
          const lang = data[key].i18nextLng as string;
          checkLanguage(lang);
        }
      }
    });
    cy.findAllByTestId('switch').click();
    cy.getAllLocalStorage().then((data) => {
      for (const key in data) {
        if (key === 'http://localhost:5173') {
          const lang = data[key].i18nextLng as string;
          checkLanguage(lang);
        }
      }
    });
  });
  it('should open the sign-in form', () => {
    cy.findAllByTestId('sign-in').click();
    cy.findAllByTestId('login-form').should('exist');
  });
  it('should open the sign-up form', () => {
    cy.findAllByTestId('sign-up').click();
    cy.findAllByTestId('login-form').should('exist');
  });
});
describe('registration must be done', () => {
  it('should sign up', () => {
    cy.visit('/');
    cy.findAllByTestId('sign-up').click();
  });
});
