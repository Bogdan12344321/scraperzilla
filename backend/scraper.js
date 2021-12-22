const puppeteer = require('puppeteer');

const scraper = async username => {
    const browser = await puppeteer.launch({
        args: [
            '--incognito'
        ],
        headless: true
    })

    //Open new page
    const page = await browser.newPage();
    //Got to instagram and wait until the html is fully loaded
    await page.goto('https://www.instagram.com/accounts/login', { waitUntil: "networkidle2" });
    const notifyBtns = await page.$x("//button[contains(text(),'Accept All')]");
    if (notifyBtns.length > 0) {
        await notifyBtns[0].click()
    } else {
        console.log("no notification buttons to click!")
    }
    await page.waitFor(3000);

    //TODO: I need to put this dummy account int .env or find another solution to view the insta page if you are not logged in
    await page.type('input[name=username]', 'bogdan_boshu@yahoo.com', { delay: 20 });
    await page.type('input[name=password]', '123D123#', { delay: 20 });
    await page.click('button[type=submit]', { delay: 20 });
    await page.waitFor(7000);

    await page.goto(`https://www.instagram.com/${username}`, { waitUntil: "networkidle2" });
    await page.waitFor(5000);

    //Get the following infromation from users profile by search in hmtl
    let posts = await page.$('div[id=react-root] > section > main > div > header > section > ul > li:nth-child(1) > span > span');
    let followers = await page.$('div[id=react-root] > section > main > div > header > section > ul > li:nth-child(2) > a > span');
    let following = await page.$('div[id=react-root] > section > main > div > header > section > ul > li:nth-child(3) > a > span');
    if (posts == undefined) {
        posts = await page.$('div[id=react-root] > div > div > section > main > div > header > section > ul > li:nth-child(1) > span > span');
        followers = await page.$('div[id=react-root]  > div > div > section > main > div > header > section > ul > li:nth-child(2) > span > span');
        following = await page.$('div[id=react-root]  > div > div > section > main > div > header > section > ul > li:nth-child(3) > span > span');

        if (followers == undefined) {
            followers = await page.$('div[id=react-root]  > div > div > section > main > div > header > section > ul > li:nth-child(2) > a > span');
        }

        if (following == undefined) {
            following = await page.$('div[id=react-root]  > div > div > section > main > div > header > section > ul > li:nth-child(3) > a > span');
        }
    }


    //Get the numbers inside the html tag
    const element_posts = await posts.getProperty('innerHTML');
    const element_following = await followers.getProperty('innerHTML');
    const element_followers = await following.getProperty('innerHTML');

    const inner_html_posts = await element_posts.jsonValue();
    const inner_html_followers = await element_followers.jsonValue();
    const inner_html_following = await element_following.jsonValue();


    await page.waitFor(3000);
    await browser.close();
    return { inner_html_posts, inner_html_followers, inner_html_following }
}

exports.scraper = scraper;
