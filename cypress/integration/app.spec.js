describe('Stringify', function () {
  before(() => {
    cy.visit('/')
  })

  context('home', () => {
    it('should see a home screen', () => {
      cy.get('main').contains('Welcome')
    })
  })

  context('sidebar', () => {
    it('should go to Categories', () => {
      cy.get('a').contains('Categories').click()
    })

    it('should go to New Releases', () => {
      cy.get('a').contains('New Releases').click()
    })

    it('should go to User Profile', () => {
      cy.get('a').contains('User Profile').click()
    })
  })

  context('search and listen to a song', () => {
    it('should search a phrase', () => {
      cy.get('input').type('test')
      cy.get('button').contains('Search').click()
    })

    it('should click on artist', () => {
      cy.get('main').find('ul').first().find('li').first().click()
    })

    it('should click on album', () => {
      cy.get('main').find('ul').first().find('li').first().click()
    })

    it('should play first track', () => {
      cy.get('main').find('li').first().click()
    })
  })
})
