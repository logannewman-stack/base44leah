import puppeteer from 'puppeteer'
const browser = await puppeteer.launch({ headless:true, args:['--no-sandbox','--disable-setuid-sandbox','--use-gl=angle','--enable-unsafe-swiftshader'] })
const page = await browser.newPage(); await page.setViewport({width:1366,height:820})
const errs=[]; page.on('pageerror',e=>errs.push(e.message))
await page.goto('http://localhost:4391/',{waitUntil:'domcontentloaded',timeout:30000}).catch(()=>{})
await new Promise(r=>setTimeout(r,1500))
const H=await page.evaluate(()=>document.body.scrollHeight)
for(let f=0;f<=1.0001;f+=0.08){ await page.evaluate(y=>window.scrollTo(0,y),Math.round(f*(H-820))); await new Promise(r=>setTimeout(r,220)) }
console.log('root len:',await page.evaluate(()=>document.getElementById('root')?.innerHTML.length), '| pageerrors:',errs.length, errs.slice(0,3).join(' || '))
await browser.close()
