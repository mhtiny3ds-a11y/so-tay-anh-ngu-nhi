const CACHE="sotay-anh-ngu-nhi-v2";
const ASSETS=["./", "index.html", "manifest.webmanifest", "icons/icon.svg", "icons/icon-192.png", "icons/icon-512.png", "fonts/baloo-2-latin-500-normal.woff2", "fonts/baloo-2-latin-700-normal.woff2", "fonts/baloo-2-latin-800-normal.woff2", "fonts/baloo-2-latin-ext-500-normal.woff2", "fonts/baloo-2-latin-ext-700-normal.woff2", "fonts/baloo-2-latin-ext-800-normal.woff2", "fonts/baloo-2-vietnamese-500-normal.woff2", "fonts/baloo-2-vietnamese-700-normal.woff2", "fonts/baloo-2-vietnamese-800-normal.woff2", "fonts/fonts.css", "fonts/nunito-latin-400-normal.woff2", "fonts/nunito-latin-600-italic.woff2", "fonts/nunito-latin-600-normal.woff2", "fonts/nunito-latin-700-normal.woff2", "fonts/nunito-latin-800-normal.woff2", "fonts/nunito-latin-ext-400-normal.woff2", "fonts/nunito-latin-ext-600-italic.woff2", "fonts/nunito-latin-ext-600-normal.woff2", "fonts/nunito-latin-ext-700-normal.woff2", "fonts/nunito-latin-ext-800-normal.woff2", "fonts/nunito-vietnamese-400-normal.woff2", "fonts/nunito-vietnamese-600-italic.woff2", "fonts/nunito-vietnamese-600-normal.woff2", "fonts/nunito-vietnamese-700-normal.woff2", "fonts/nunito-vietnamese-800-normal.woff2"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));self.skipWaiting();});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim();});
self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET")return;
  const isPage=e.request.mode==="navigate"||e.request.url.endsWith(".html");
  if(isPage){ // trang chính: lấy bản mới nhất từ mạng trước, mất mạng thì dùng bản đã lưu
    e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(CACHE).then(x=>x.put(e.request,c));return r;})
      .catch(()=>caches.match(e.request,{ignoreSearch:true}).then(r=>r||caches.match("index.html"))));
    return;
  }
  e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(r=>r||fetch(e.request)));
});
