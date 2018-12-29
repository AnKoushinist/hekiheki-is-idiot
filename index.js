const puppeteer = require('puppeteer');
const random = require('random-number');

const wait = n => new Promise(r => setTimeout(r, n));
const uaVariant = [
    "Yoshiyuki Takahashi is UNKO",
    "HekiHeki is UNKO",
    "Kiyomichi Oohashi is UNKO",

    "Yoshiyuki Takahashi is SHIT",
    "HekiHeki is SHIT",
    "Kiyomichi Oohashi is SHIT",

    "Sex w/ Kiyomichi Oohashi",

    "Taichi Fujiwara is watching YOU",
    "Takahiro Karasawa is watching YOU"
];
const noop = () => {};
const uaRandom = random.generator({
    min: 0,
    max: uaVariant.length - 1,
    integer: true
});

(async () => {
    console.log("Opening browser...");
    const browser = await puppeteer.launch({
        args: [
            '--proxy-server=socks5://127.0.0.1:9050', // Change here if necessary
        ]
    });
    const page = await browser.newPage();
    await page.setUserAgent(`Mozilla/${uaRandom()*uaRandom()} (${uaVariant[uaRandom()]})`);
    await page.setJavaScriptEnabled(true);
    console.log("Loading page...");
    try {
        await page.goto('http://hirogakuillegalact.blog.jp/', {
            timeout: 10
        });
    } catch (error) {}
    for (let i = 0; i < 5; i++) {
        console.log(`Reload (${i+1}/5) and wait 10 seconds`);
        await wait(10000);
        await page.reload();
    }
    console.log("Finish");
    await page.close();
    await browser.close();
})().then(noop, noop);