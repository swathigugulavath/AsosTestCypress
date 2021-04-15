import StudentPageElements from '../support/studentPageElements';

const mapping = {
  firstName: {
    valMessage: 'Please enter your first name',
    errorElement: '#firstName-error',
  },
  lastName: {
    valMessage: '',
    errorElement: '#lastName-error',
  },
  asosMail: {
    valMessage: 'Please enter a valid email address',
    errorElement: '#asosEmail-error',
  },
  studentMail: {
    valMessage: 'Please enter a valid email address',
    errorElement: '#studentEmail-error',
  },
  gradYear: {
    valMessage: 'Please select which year you will graduate in',
    errorElement: '#graduationYear-error',
  },
  wearGender: {
    valMessage: 'Please select an option',
    errorElement: '#fashionGender-error',
  }
}


describe('Student Discount validation Tests', () => {
    beforeEach(() => {
      cy.visit('https://www.asos.com/discover/students/asos-on-campus/student-validation/');
      
      })
    it('Verify the student discount completion with valid user details', () => {
        const studentPageElements = new StudentPageElements();
        //repeated calls to checkSubmission to test if mandatory fields are actually mandatory. 
        // Submission with empty mandatory fields means the field isnt actually mandatory
        studentPageElements.getFirstName().type('Test');
        cy.checkSubmission();
        studentPageElements.getLastName().type('Test');
        studentPageElements.getCountry().select('United Kingdom');
        studentPageElements.getAsosEmailAddress().type('test@t.com');
        cy.checkSubmission();
        studentPageElements.getStudentEmailAddress().type('test@t.com');
        cy.checkSubmission();
        studentPageElements.getGradualtionYear().first().check();
        cy.checkSubmission();
        studentPageElements.getMensCollectionLabel().click();
        studentPageElements.getTermandConditionLink().contains('Terms & Conditions apply.').click();
        studentPageElements.getCloseTermsandConditions().click();
        studentPageElements.getSubmitButton().click();
        
    });

    it('Verify error messages for all fields when no data is enetered', () => {
      //Check if all mandatory fields are marked as invalid in DOM for an empty form submit and 
      //also if it shows a validation error besides each field
      const studentPageElements = new StudentPageElements();
      const {firstName, lastName, asosMail, studentMail, gradYear, wearGender} = mapping;
      studentPageElements.getSubmitButton().click();
      studentPageElements.getFirstName().then($el => cy.checkFieldValidity($el, firstName.errorElement, firstName.valMessage, false));
      studentPageElements.getAsosEmailAddress().then($el => cy.checkFieldValidity($el, asosMail.errorElement, asosMail.valMessage, false));
      studentPageElements.getStudentEmailAddress().then($el => cy.checkFieldValidity($el, studentMail.errorElement, studentMail.valMessage, false));
      studentPageElements.getGradualtionYear().first().then($el => cy.checkFieldValidity($el, gradYear.errorElement, gradYear.valMessage, false));
      studentPageElements.getMensCollectionInput().first().then($el => cy.checkFieldValidity($el, wearGender.errorElement, wearGender.valMessage, false));

      //Check all optional fields do not have a validation error
      studentPageElements.getLastName().then($el => cy.checkFieldValidity($el, lastName.errorElement, lastName.valMessage, true));

    });

    it('data sanity check', () => {
      const studentPageElements = new StudentPageElements();
      const {asosMail} = mapping;
      let longName = 'Wikipedia is an online free-content encyclopedia project helping to create a world in which everyone can freely share in the sum of all knowledge. It is supported by the Wikimedia Foundation and based on a model of freely editable content.';
      studentPageElements.getFirstName().type(longName).should('have.value', longName.slice(0, 100));
      studentPageElements.getLastName().type(longName).should('have.value', longName.slice(0, 100));

      studentPageElements.getAsosEmailAddress().type('fff.com').then($el => cy.checkFieldValidity($el, asosMail.errorElement, asosMail.valMessage, false));
      studentPageElements.getAsosEmailAddress().clear().type('fff.com@').then($el => cy.checkFieldValidity($el, asosMail.errorElement, asosMail.valMessage, false));
      studentPageElements.getAsosEmailAddress().clear().type('fff@f.com@').then($el => cy.checkFieldValidity($el, asosMail.errorElement, asosMail.valMessage, false));
      
      studentPageElements.getAsosEmailAddress().clear().type('fff@f.com').then($el => cy.checkFieldValidity($el, asosMail.errorElement, '', true));
    })
})