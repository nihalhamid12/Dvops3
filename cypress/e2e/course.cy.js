describe('Course Management Frontend', () => {
  let baseUrl;
  before(() => {
    cy.task('startServer').then((url) => {
      baseUrl = url;
      cy.visit(baseUrl);
    });
  });
  after(() => {
    return cy.task('stopServer'); // Stop the server after the report is done
  });

  it('should add a new course', () => {
    cy.visit(baseUrl);
    // Open the modal and fill in the form
    cy.get('button[data-target="#courseModal"]').click();
    cy.get('#name').type('Test Course', { force: true });
    cy.get('#code').type('123', { force: true });

    // Click the add resource button
    cy.get('button.btn-primary').contains('Add New Course').click();
    // Verify the resource is in the table
  
  });
  
  it('should display an error if required fields are missing', () => {
    cy.visit(baseUrl);
    // Open the modal to add a new course
    cy.get('button[data-target="#courseModal"]')
       .should('be.visible')
       .click({ force: true });
      cy.wait(500); // Allow the modal to open
  
    // Leave fields empty and submit the form
    cy.get('#name').clear();
    cy.get('#code').clear();
    cy.get('button.btn-primary').contains('Add New Course').click();
  
    // Validate error message
    cy.get('#message').should('contain', 'All fields are required!');
    cy.get('#message').should('have.class', 'text-danger');
  });

  
  it('should display an error if course code is not exactly 3 digits', () => {
    cy.visit(baseUrl);
    // Open the modal to add a new course
    cy.get('button[data-target="#courseModal"]').click();
  
    // Fill in the name but provide an invalid course code
    cy.get('#name').type('Test Course', { force: true });
    cy.get('#code').type('12', { force: true }); // Invalid code: less than 3 digits
  
    // Submit the form
    cy.get('button.btn-primary').contains('Add New Course').click();
  
    // Validate error message
    cy.get('#message').should('contain', 'Course code must be exactly 3 digits!');
    cy.get('#message').should('have.class', 'text-danger');
  });
  
});