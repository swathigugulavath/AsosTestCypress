class StudentPageElements{
    getFirstName() { return cy.get('#firstName')}
    getLastName() { return cy.get('#lastName') };
    getCountry() { return cy.get('#territory')};
    getAsosEmailAddress() { return cy.get('#asosEmail') };
    getStudentEmailAddress() { return cy.get('#studentEmail')};
    getGradualtionYear() { return cy.get('[name="graduationYear"]')};
    getMensCollectionLabel() { return cy.get('label[for="Male"]') };
    getMensCollectionInput() { return cy.get('input[name="fashionGender"]') };
    getTermandConditionLink() { return cy.get('a[class="js-openModal"]') };
    getCloseTermsandConditions() { return cy.get('button[class="modal__close js-closeModal"]') } ;
    getSubmitButton() { return cy.get('#submitButton') };
}

export default StudentPageElements;