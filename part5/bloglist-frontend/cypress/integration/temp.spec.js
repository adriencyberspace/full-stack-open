describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'New User',
      username: 'Newnew',
      password: 'urfurf'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('log in').click()
    cy.contains('Login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('log in').click()
      cy.get('#username').type('Newnew')
      cy.get('#password').type('urfurf')
      cy.get('#login-button').click()

      cy.contains('New User logged in')
    })

    // it('fails with wrong credentials', function() {
    //   cy.contains('log in').click()
    //   cy.get('#username').type('Newnew')
    //   cy.get('#password').type('wrong')
    //   cy.get('#login-button').click()

    //   cy.get('.notification')
    //     .should('contain', 'wrong credentials')
    //     .and('have.css', 'color', 'rgb(255, 0, 0)')
    // })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.contains('log in').click()
      cy.get('#username').type('Newnew')
      cy.get('#password').type('urfurf')
      cy.get('#login-button').click()
    })

    it('A blog can be created and liked', function() {
      cy.contains('New Blog').click()
      cy.get('#title').type('New User')
      cy.get('#author').type('Cypress Blog Post')
      cy.get('#url').type('www.cypress.com')
      cy.contains('save').click()
      cy.contains('Cypress Blog Post')

      cy.contains('View').click()
      cy.contains('Like').click()
    })

    describe('when logged in', function() {
      beforeEach(function() {
        cy.login({ username: 'Newnew', password: 'urfurf' })
      })
  
      it('A blog can be created', function() {
        cy.contains('New User')
      })

    })
  })
})