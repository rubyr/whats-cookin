const chai = require('chai');
const expect = chai.expect;
const User = require('../src/user');
const Ingredient = require('../src/Ingredient');
const Recipe = require('../src/recipe');

describe('user', function() {
  let user;
  this.beforeEach(function() {
    user = new User(0);
  });

  it('should be a function', function() {
    expect(User).to.be.a('function');
  });

  it('should instantiate a new user', function() {
    expect(user).to.be.an.instanceof(User);
  });

  it('should have an id', function() {
    expect(user.id).to.equal(0);
  });

  it('should have a name', function() {
    expect(user.name).to.equal('Testy McTestFace');
  });

  it('should have a pantry', function() {
    expect(user.pantry).to.deep.equal([
      new Ingredient(11477, {amount: 4}),
    ]);
  });

  it('should have a list of favorite recipes', function() {
    user.addFavorite(595736);
    expect(user.favoriteRecipes).to.deep.equal([new Recipe(595736)]);
  });

  it('should have a toCook list', function() {
    user.addToCook(595736);
    expect(user.toCook).to.deep.equal([new Recipe(595736)]);
  })
});