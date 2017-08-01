import { GestBudgetPage } from './app.po';

describe('gest-budget App', function() {
  let page: GestBudgetPage;

  beforeEach(() => {
    page = new GestBudgetPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
