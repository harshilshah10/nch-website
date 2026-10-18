import './style.css';
import {products,contact} from './catalogue.js';
import {homeContent,archiveContent} from './original-theme.js';
const arrow='<svg class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg>';
const escapeHtml=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const categories=['All products',...new Set(products.map(p=>p.category))];
let category=new URLSearchParams(location.search).get('category')||'All products',query=(new URLSearchParams(location.search).get('q')||'').trim().toLowerCase(),limit=24;
if(!categories.includes(category))category='All products';
const route=location.pathname.replace(/\/?$/, '/');
let selected=[];
let requirements={};
try {const stored=JSON.parse(localStorage.getItem('nch-requirements')||'{}');if(stored && typeof stored==='object' && !Array.isArray(stored))requirements=stored;}catch {}
try {selected=JSON.parse(localStorage.getItem('nch-enquiry')||'[]').filter(id=>products.some(p=>p.id===id));} catch {}
const app=document.querySelector('#app');
app.innerHTML=`
<header><a class="brand original-brand" href="/" aria-label="Nairobi Central Hardware home"><span class="brand-symbol">nch<span>.</span></span><span>NAIROBI CENTRAL<br>HARDWARE LIMITED</span></a><nav aria-label="Main navigation"><a href="/">Home</a><a href="/products/">Products</a><a href="/contact/">Contact</a><a href="/blog/">Blog</a><a href="/careers/">Careers</a></nav><button class="enquiry outline">Your enquiry <span class="count">0</span> ${arrow}</button></header>
<main id="home"><div id="home-content">${homeContent()}</div><div id="page-content"></div><div id="catalogue-content"><section class="products-banner"><h1>Products</h1><p>Find what you need and add it to an enquiry. We’ll confirm prices and availability.</p></section>
<section id="products" class="catalogue section"><div class="catalogue-layout"><aside class="category-sidebar"><details id="category-picker" open><summary>Browse categories <span id="active-category">All products</span></summary><div class="category-options" role="group" aria-label="Product categories">${categories.map(c=>`<button data-category="${escapeHtml(c)}" aria-pressed="${c===category}"><span>${escapeHtml(c)}</span><small>${c==='All products'?products.length:products.filter(p=>p.category===c).length}</small></button>`).join('')}</div></details></aside><div class="catalogue-results"><div class="catalogue-toolbar"><label class="search"><span aria-hidden="true">⌕</span><input type="search" placeholder="Search products, e.g. taps, gloves, screws…" aria-label="Search products"/></label><button id="clear-filters" class="quiet-link">Clear filters</button></div><div class="results-note"><span id="result-count" aria-live="polite"></span><span id="filter-summary"></span></div><div class="product-grid" id="product-grid"></div><button class="button outline load-more" id="load-more">Show more products</button></div></div></section>
<div class="enquiry-tray" hidden><div><strong id="tray-count"></strong></div><button class="button primary enquiry">Review enquiry ${arrow}</button></div>
</div><section class="contact section" id="contact"><div><p class="eyebrow">NAIROBI CENTRAL HARDWARE LTD</p><h2>Contact Us</h2><p>Visit us, call us, or contact us for prices and orders.</p><div class="social-links"><p>Stay informed by following us at:</p><a href="https://www.facebook.com/nairobicentralhardware">Facebook</a><a href="https://www.instagram.com/nairobicentralhardware/?hl=en">Instagram</a><a href="https://www.youtube.com/@NAIROBICENTRALHARDWARE">YouTube</a><a href="https://x.com/nairobicentral1">Twitter</a><a href="https://www.linkedin.com/company/nairobi-central-hardware-ltd/posts/">LinkedIn</a></div></div><div class="contact-actions"><button class="button orange enquiry">Prepare an enquiry <span>${arrow}</span></button><p><a href="mailto:${contact.email}">${contact.email}</a><br><span>Get in touch for prices and availability.</span></p><p><a href="tel:${contact.phone}">+254 704 656 651</a><br><a href="tel:${contact.secondPhone}">+254 705 235 256</a></p><address>${contact.address}</address><a class="text-link" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Nairobi Central Hardware Ltd '+contact.address)}" target="_blank" rel="noopener noreferrer">Find us on Google Maps ${arrow}</a><div class="contact-departments"><h3>Contact us</h3><p>Admin: <a href="mailto:admin@nairobicentralhardware.com">admin@nairobicentralhardware.com</a><br>Sales enquiries: <a href="mailto:sales.nchl@gmail.com">sales.nchl@gmail.com</a><br>Accounts: <a href="mailto:finance@nairobicentralhardware.com">finance@nairobicentralhardware.com</a><br>Human Resource: <a href="mailto:hr@nairobicentralhardware.com">hr@nairobicentralhardware.com</a></p></div></div></section></main>
<footer><a class="brand original-brand" href="/"><span class="brand-symbol">nch<span>.</span></span><span>NAIROBI CENTRAL<br>HARDWARE LIMITED</span></a><div class="footer-links"><a href="/products/">Products</a><a href="/contact/">Contact</a><a href="/blog/">Journal</a><a href="/careers/">Careers</a></div><span>© ${new Date().getFullYear()} Nairobi Central Hardware Ltd</span></footer>
<dialog id="detail-dialog" aria-labelledby="detail-title"></dialog><dialog id="enquiry-dialog" aria-labelledby="enquiry-title"><div class="dialog-head"><p class="eyebrow">YOUR NEXT PROJECT</p><button class="close" aria-label="Close enquiry">×</button></div><h2 id="enquiry-title">Your enquiry</h2><p class="muted">Add quantities or specifications below. This is a request for pricing, not an order.</p><div id="enquiry-items"></div><label class="notes-label" for="notes">Additional project details</label><textarea id="notes" rows="4" placeholder="For example: Please advise on available brands and collection options."></textarea><p class="preview-note">Email opens your email app. Review and send your enquiry there.</p><div class="dialog-actions"><a class="button orange" id="email-enquiry" href="mailto:${contact.email}">Enquire by email ${arrow}</a><button class="button green" id="copy">Copy enquiry</button><button class="button outline" id="download">Download list ↓</button></div><p id="copy-status" role="status"></p></dialog><div id="toast" role="status"></div>`;
document.querySelector('#home-content').hidden=route!=='/';
document.querySelector('#catalogue-content').hidden=route!=='/products/';
document.querySelector('#contact').hidden=route!=='/contact/';
if(!['/','/products/','/contact/'].includes(route)) document.querySelector('#page-content').innerHTML=archiveContent(route);
if(route==='/contact/') {const heading=document.querySelector('#contact h2');const h1=document.createElement('h1');h1.innerHTML=heading.innerHTML;heading.replaceWith(h1);}
document.querySelectorAll('nav a').forEach(a=>{if(a.getAttribute('href')===route)a.setAttribute('aria-current','page');});
document.querySelector('#active-category').textContent=category;
document.querySelector('input[type=search]').value=query;
document.title=(route==='/products/'?'Products':route==='/contact/'?'Contact':route==='/careers/'?'Careers':route.startsWith('/blog')?'Blog':'Nairobi Central Hardware')+' | Nairobi Central Hardware Ltd';
for(const img of document.querySelectorAll('img')){img.addEventListener('error',()=>{img.hidden=true;img.parentElement.classList.add('image-unavailable');const fallback=img.parentElement.querySelector('.brand-fallback');if(fallback)fallback.hidden=false;});}
const grid=document.querySelector('#product-grid');
function render(){
 const visible=products.filter(p=>(category==='All products'||p.category===category)&&`${p.name} ${p.category}`.toLowerCase().includes(query));
 document.querySelector('#result-count').textContent=`${visible.length} products · ${Math.min(limit,visible.length)} shown`;
 document.querySelector('#filter-summary').textContent=category;
 document.querySelector('#active-category').textContent=category;
 document.querySelectorAll('[data-category]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.category===category)));
 document.querySelector('#clear-filters').hidden=category==='All products'&&!query;
 document.querySelector('#load-more').hidden=visible.length<=limit;
 grid.innerHTML=visible.length?visible.slice(0,limit).map(p=>`<article class="product ${selected.includes(p.id)?'is-selected':''}"><p class="product-category">${escapeHtml(p.category)}</p><div class="product-title"><h3><button data-detail="${p.id}">${escapeHtml(p.name)}</button></h3></div><button class="add-product ${selected.includes(p.id)?'added':''}" data-add="${p.id}" aria-label="${selected.includes(p.id)?'Remove':'Add'} ${escapeHtml(p.name)} ${selected.includes(p.id)?'from':'to'} enquiry" aria-pressed="${selected.includes(p.id)}">${selected.includes(p.id)?'✓ Selected':'+ Add to enquiry'}</button></article>`).join(''):'<div class="empty"><h3>No products found.</h3><p>Try a different term or clear your category to search the whole catalogue.</p><button id="reset" class="button outline">Show all products</button></div>';
 document.querySelectorAll('.count').forEach(el=>el.textContent=selected.length);
 document.querySelector('.enquiry-tray').hidden=!selected.length||route!=='/products/';
 document.querySelector('#tray-count').textContent=`${selected.length} product ${selected.length===1?'type':'types'} in your enquiry`;
 document.body.classList.toggle('has-enquiry',!!selected.length&&route==='/products/');
 if(route==='/products/'){
  const params=new URLSearchParams();if(category!=='All products')params.set('category',category);if(query)params.set('q',query);
  history.replaceState(null,'',location.pathname+(params.size?'?'+params.toString():''));
 }
}
function saveRequirements(){try{localStorage.setItem('nch-requirements',JSON.stringify(requirements));localStorage.setItem('nch-project-notes',document.querySelector('#notes').value);}catch{}}
function persist(){try{localStorage.setItem('nch-enquiry',JSON.stringify(selected));}catch{}render();}
function toggle(id){
 const wasSelected=selected.includes(id);selected=wasSelected?selected.filter(x=>x!==id):[...selected,id];persist();
 document.querySelector('#toast').textContent=`${products.find(p=>p.id===id).name} ${wasSelected?'removed from':'added to'} your enquiry. Nothing has been sent.`;
 document.querySelector(`[data-add="${id}"]`)?.focus({preventScroll:true});
}
function renderEnquiry(){
 const items=document.querySelector('#enquiry-items');items.replaceChildren();document.querySelector('#copy-status').textContent='';
 if(!selected.length){items.innerHTML='<p class="empty-list">Your list is empty. Add products from the catalogue, or describe your project below.</p>';return;}
 selected.forEach(id=>{const p=products.find(p=>p.id===id);const row=document.createElement('div');row.className='enquiry-item';row.innerHTML=`<div class="enquiry-item-heading"><div><strong>${escapeHtml(p.name)}</strong><small>${escapeHtml(p.category)}</small></div><button class="remove" data-remove="${id}" aria-label="Remove ${escapeHtml(p.name)}">Remove</button></div><label for="request-${id}">Quantity, size or brand <span>(optional)</span></label><input id="request-${id}" data-request="${id}" aria-label="Requirements for ${escapeHtml(p.name)} in ${escapeHtml(p.category)}" maxlength="250" placeholder="e.g. 2 pieces, ½ inch, preferred brand" value="${escapeHtml(typeof requirements[id]==='string'?requirements[id]:'')}"/>`;items.append(row);});
}
function enquiryText(){return `Hello Nairobi Central Hardware,\n\nI'd like to ask about pricing and availability for:\n${selected.map(id=>{const p=products.find(p=>p.id===id);return '- '+p.name+' ('+p.category+')'+(requirements[id]?' — '+requirements[id]:'');}).join('\n')||'(Please see my project details below.)'}\n\n${document.querySelector('#notes').value}\n\nPlease confirm the available options and current stock.`;}
document.querySelector('#email-enquiry').addEventListener('click',e=>{e.currentTarget.href=`mailto:${contact.email}?subject=${encodeURIComponent('Product enquiry — Nairobi Central Hardware')}&body=${encodeURIComponent(enquiryText())}`;});
const enquiryDialog=document.querySelector('#enquiry-dialog'), detailDialog=document.querySelector('#detail-dialog');
document.addEventListener('click',e=>{const el=e.target.closest('button');if(!el)return;if(el.dataset.add)toggle(el.dataset.add);if(el.dataset.category){category=el.dataset.category;limit=24;render();if(matchMedia('(max-width:800px)').matches)document.querySelector('#category-picker').open=false;}if(el.dataset.detail){const p=products.find(p=>p.id===el.dataset.detail);detailDialog.innerHTML=`<div class="dialog-head"><p class="eyebrow">${escapeHtml(p.category)}</p><button class="close" aria-label="Close product details">×</button></div><h2 id="detail-title">${escapeHtml(p.name)}</h2><p>Ask us about available sizes, brands and specifications.</p><p class="preview-note">Add this product to your enquiry, then enter the quantity or specifications you need. Nothing is ordered or sent automatically.</p><button class="button green" id="detail-add" data-id="${p.id}">${selected.includes(p.id)?'Remove from':'Add to'} enquiry</button>`;detailDialog.showModal();}if(el.id==='detail-add'){toggle(el.dataset.id);detailDialog.close();}if(el.classList.contains('enquiry')){renderEnquiry();enquiryDialog.showModal();}if(el.classList.contains('close'))el.closest('dialog').close();if(el.dataset.remove){toggle(el.dataset.remove);renderEnquiry();}if(el.id==='reset'||el.id==='clear-filters'){query='';category='All products';document.querySelector('input[type=search]').value='';document.querySelector('#active-category').textContent='All products';limit=24;render();}});
if(matchMedia('(max-width:800px)').matches)document.querySelector('#category-picker').open=false;
try{document.querySelector('#notes').value=localStorage.getItem('nch-project-notes')||'';}catch{}
document.querySelector('#notes').addEventListener('input',saveRequirements);
document.querySelector('#enquiry-items').addEventListener('input',e=>{if(e.target.dataset.request){requirements[e.target.dataset.request]=e.target.value;saveRequirements();}});
document.querySelector('#load-more').addEventListener('click',()=>{limit+=24;render();});
document.querySelector('input[type=search]').addEventListener('input',e=>{query=e.target.value.trim().toLowerCase();limit=24;render();});
document.querySelector('#copy').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(enquiryText());document.querySelector('#copy-status').textContent='Enquiry copied. Nothing has been sent.';}catch{document.querySelector('#copy-status').textContent='Clipboard is unavailable. Use Download list to save your enquiry.';}});
document.querySelector('#download').addEventListener('click',()=>{const url=URL.createObjectURL(new Blob([enquiryText()],{type:'text/plain'}));const a=document.createElement('a');a.href=url;a.download='nch-product-enquiry.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);document.querySelector('#copy-status').textContent='Enquiry downloaded. Nothing has been sent.';});
for(const dialog of document.querySelectorAll('dialog')){dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});}
render();

// Animate only when content enters the viewport, and never hide it before JS runs.
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
if(!reducedMotion.matches && 'IntersectionObserver' in window){
 const observer=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting){entry.target.animate([{opacity:.65,transform:'translateY(12px)'},{opacity:1,transform:'translateY(0)'}],{duration:400,easing:'cubic-bezier(.2,.7,.3,1)'});observer.unobserve(entry.target);}}},{threshold:.12});
 document.querySelectorAll('.category-section,.about-modern,.founder-section,.testimonials,.faq,.brands-original,.project-cta').forEach(el=>observer.observe(el));
}
