const Page = require('./helpers/page');

let page;

beforeEach(async () => {
  page = await Page.build();
  await page.goto('http://localhost:3000');
});

afterEach(async () => {
  await page.close();
});

test('the header has the correct text', async () => {
  const text = await page.getContentOf('a.brand-logo');
  console.log(text);
  expect(text).toEqual('Blogster');
});

test('clicking login button', async () => {
  await page.click('.right a');
  const urlHostName = await page.url();
  const hostName = new URL(urlHostName);
  console.log('*************************', urlHostName);
  console.log('########################', hostName.origin);
  expect(hostName.origin).toEqual('https://accounts.google.com');
});

///Setting up cookies: session and session.sig, in order to skip GoogleOAuth
test.only('After login shows logout button', async () => {
  await page.login();
  const text = await page.getContentOf('a[href="/auth/logout"]');
  expect(text).toEqual('Logout');
});
