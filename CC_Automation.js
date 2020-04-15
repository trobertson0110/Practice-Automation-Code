function formInput(a, b){
    cy.get(a)
		.should('be.visible')
		.scrollIntoView()
		.clear()
		.type(b)
}

function formSelect(a, b){
    cy.get(a)
		.should('be.visible')
		.scrollIntoView()
		.select(b)
}

function formInvoke(a, b){
	cy.get(a)
		.should('be.visible')
		.scrollIntoView()
		.invoke('attr', b)
		
}

describe('Currency Converter Automation', function () {
    it('can enter valid information into each field and return a result', function () {
        cy.visit('https://www.nationalarchives.gov.uk/currency-converter')
		
        // Check the result isn't already visible
        cy.get('#currency-result.currency')
            .should('not.be.visible')
			
        formSelect('#currency-year', '1270')
           			
        formInput('#currency-pounds', '10')
			
        formSelect('#currency-shillings', '5')
			
        formSelect('#currency-old-pence', '8')
	
        cy.get('#currency-submit')
            .should('be.visible')
            .click()
			
        cy.get('#currency-result.currency')
            .should('be.visible')
    })
	
	it('can enter a negative number and receive an error - Pounds', function (){
		cy.visit('https://www.nationalarchives.gov.uk/currency-converter')
		
		formSelect('#currency-year', '1270')
           			
        formInput('#currency-pounds', '-5010')
			
        formSelect('#currency-shillings', '5')
			
        formSelect('#currency-old-pence', '8')
		
		cy.get('#currency-submit')
            .should('be.visible')
            .click()
			
        cy.get('#currency-result.currency')
            .should('not.be.visible')
			
		cy.get('#currency-error')
			.should('be.visible')
		
	})
	
	it('can enter a letter and receive an error - Shillings', function(){
		cy.visit('https://www.nationalarchives.gov.uk/currency-converter')
		
		formSelect('#currency-year', '1270')
           			
        formInput('#currency-pounds', '10')
			
        formInvoke('#currency-shillings', 'text')
			
        formSelect('#currency-old-pence', '8')
		
		cy.get('#currency-submit')
            .should('be.visible')
            .click()
			
        cy.get('#currency-result.currency')
            .should('not.be.visible')
			
		cy.get('#currency-error')
			.should('be.visible')
		
	})
	
	it('can enter invalid information and receive an error - Old Pence', function(){
		cy.visit('https://www.nationalarchives.gov.uk/currency-converter')
		
		formSelect('#currency-year', '1270')
           			
        formInput('#currency-pounds', '10')
			
        formInvoke('#currency-shillings', 'text')
			
        formInvoke('#currency-old-pence', 'text')
		
		cy.get('#currency-submit')
            .should('be.visible')
            .click()
			
        cy.get('#currency-result.currency')
            .should('not.be.visible')
		
		cy.get('#currency-error')
			.should('be.visible')
			
	})
	
	/* it('can enter invalid information and receive an error -  ', function(){
		cy.visit('https://www.nationalarchives.gov.uk/currency-converter')
		
		formSelect('#currency-year', '1270')
           			
        formInput('#currency-pounds', '10')
			
        formSelect('#currency-shillings', '5')
			
        formSelect('#currency-old-pence', '8')
		
	}) */

})