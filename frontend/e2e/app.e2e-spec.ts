import { AppPage } from './app.po';

describe('mea5n-booster App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('MEAN Stack Contacts Application');
  });
});
