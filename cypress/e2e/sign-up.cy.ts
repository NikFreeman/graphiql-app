///<reference types="cypress" />

describe('sign up', () => {
  it('validation should work properly', () => {
    cy.visit('/sign-up');
    cy.get('button[type="submit"]').click();

    const validations = [
      {
        testId: 'email-input',
        name: 'email',
        required: 'Email field is required',
        validation: 'Email is Invalid',
      },
      {
        testId: 'password-input',
        name: 'password',
        required: 'Password field is required',
        validation: 'Password must be at least 8 characters',
      },
    ];
    cy.wrap(validations).each(
      ({
        testId,
        name,
        required,
        validation,
      }: {
        testId: string;
        name: string;
        required: string;
        validation: string;
      }) => {
        if (required) {
          cy.get(`[data-testid=${testId}]`)
            .as(`${name}`)
            .next(`div[id=${name}-feedback]`)
            .should('have.class', 'chakra-form__error-message')
            .should('contain', required);
        }
        if (validation) {
          cy.get(`[data-testid=${testId}]`).type('blabla');
          cy.focused()
            .next(`div[id=${name}-feedback]`)
            .should('have.class', 'chakra-form__error-message')
            .should('contain', validation);
        }
      }
    );

    const validEmail = 'real@mail.com';
    cy.get('@email').clear();
    cy.get('@email').type(validEmail);
    cy.get('@email').next('div[id=email-feedback]').should('not.exist');

    const validPassword = 'Qwerty123@';
    cy.get('@password').clear();
    cy.get('@password').type(validPassword);
    cy.get('@password').next('div[id=password-feedback]').should('not.exist');
  });
});
