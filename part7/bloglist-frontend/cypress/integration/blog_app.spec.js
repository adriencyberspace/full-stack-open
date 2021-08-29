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
      cy.login({ username: 'Newnew', password: 'urfurf' })
    })

    it('A blog can be created', function() {
      cy.contains('New Blog').click()
      cy.get('#title').type('New User')
      cy.get('#author').type('Cypress Blog Post')
      cy.get('#url').type('www.cypress.com')
      cy.contains('save').click()
      cy.contains('Cypress Blog Post')
    })


    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'Sparky blog', author: 'Sparky', url: 'www.sparky.com' })
      })

      it('it can be liked', function () {
        cy.contains('View').click()
        cy.contains('Like').click()
      })

      it('it can be removed by user', function () {
        cy.contains('View').click()
        cy.contains('Remove').click()
        cy.get('html').should('not.contain', 'Sparky blog')
      })
    })

    describe('and a multiple blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'Blog One', author: 'New User', url: 'www.sparky.com', likes: 80 })
        cy.createBlog({ title: 'Blog Two', author: 'Sparky', url: 'www.sparky.com', likes: 4 })
        cy.createBlog({ title: 'Blog Three', author: 'Abby', url: 'www.abby.com', likes: 900 })
      })

      it('all can be viewed', function () {
        cy.contains('Blog One').siblings().find('button').first().as('viewButton')
        cy.get('@viewButton').click()

        cy.contains('Blog Two').siblings().find('button').first().as('viewButton')
        cy.get('@viewButton').click()

        cy.contains('Blog Three').siblings().find('button').first().as('viewButton')
        cy.get('@viewButton').click()
      })

      it('first blog has 900 likes', function () {
        cy.contains('View').click()
        cy.get('.like').parent().as('likesCount')
        cy.get('@likesCount').contains(900)
      })
    })
  })
})