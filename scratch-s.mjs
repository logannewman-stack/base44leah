import puppeteer from 'puppeteer'
const browser = await puppeteer.launch({ headless:true, args:['--no-sandbox','--disable-setuid-sandbox','--use-gl=angle','--enable-unsafe-swiftshader'] })
const page = await browser.newPage(); await page.setViewport({width:1440,height:860})
const errs=[]; page.on('pageerror',e=>errs.push(e.message))
await page.goto('http://localhost:4390/',{waitUntil:'domcontentloaded',timeout:30000}).catch(()=>{})
await new Promise(r=>setTimeout(r,1800))
const sec=await page.evaluate(()=>{const e=document.getElementById('services');return {top:e.offsetTop,h:e.offsetHeight}})
let i=0
for(const f of [0.06,0.5,0.94]){ await page.evaluate(yy=>window.scrollTo(0,yy),Math.round(sec.top+f*(sec.h-860))); await new Promise(r=>setTimeout(r,1000)); await page.screenshot({path:`s-${i}.png`}); i++ }
console.log('pageerrors:',errs.length, errs.slice(0,3).join(' || '))
await browser.close()
