var homePageObjects = function homePageObjects() {
  this.GetQuote = element(by.linkText('Get a Quote'));
  this.ZIPCode = element(by.id('zip'));
  this.DOB = element(by.id('dob'));
  this.Covered = element(by.id('coverage_type'));
  this.Go = element(by.id('btn_saveBig'));
  this.Enroll = element(by.id('applyQuotesPage'));
 
};

module.exports = homePageObjects;
