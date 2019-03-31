const Page = require('./helpers/page');

let page;
beforeEach(async () => {
  page = await Page.build();
  await page.goto('http://localhost:3000');
});
afterEach(async () => {
  page.close();
});

describe('When LoggedIn', async () => {
  beforeEach(async () => {
    await page.login();
    await page.click('a.btn-floating');
  });
  test('Form for new Blog appears', async () => {
    const text = await page.getContentOf('form label');
    expect(text).toEqual('Blog Title');
  });
  describe('When using invalig inputs', async () => {
    beforeEach(async () => {
      await page.click('form button');
    });
    test('form shows an error massage', async () => {
      const titleError = await page.getContentOf('.title .red-text');
      const contentError = await page.getContentOf('.content .red-text');
      expect(titleError).toEqual('You must provide a value');
      expect(contentError).toEqual('You must provide a value');
    });
  });
  describe('When using valid inputs', async () => {
    beforeEach(async () => {
      await page.type('.title input', 'my title');
      await page.type('.content input', 'my content');
      await page.click('form button');
    });
    test('Submitting takes user to review page', async () => {
      const text = await page.getContentOf('h5');
      expect(text).toEqual('Please confirm your entries');
    });
    test('Submitting then saving  add blog to the index page', async () => {
      await page.click('button.green');
      await page.waitFor('.card');
      const title = await page.getContentOf('.card-title');
      const content = await page.getContentOf('p');
      expect(title).toEqual('my title');
      expect(content).toEqual('my content');
    });
  });
});
