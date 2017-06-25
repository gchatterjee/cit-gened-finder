import { CitGenedFinderPage } from './app.po';

describe('cit-gened-finder App', () => {
  let page: CitGenedFinderPage;

  beforeEach(() => {
    page = new CitGenedFinderPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
