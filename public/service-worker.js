console.log("Service worker running");
const OFFLINE_URL = "fallback.html";
const CACHE_NAME = "v1";
let theme = "light";

self.addEventListener("message", ({ data }) => {
  if (data.theme) {
    theme = data.theme;
  }
});
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        "fonts.css",
        "player.png",
        "/static/js/bundle.js",
        "/static/js/vendors~main.chunk.js",
        "/static/js/main.chunk.js",
        new Request("fallback-light.html", { cache: "reload" }),
        new Request("fallback-dark.html", { cache: "reload" }),
      ]);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  //   event.waitUntil(
  //     (async () => {
  //       // Enable navigation preload if it's supported.
  //       // See https://developers.google.com/web/updates/2017/02/navigation-preload
  //       if ("navigationPreload" in self.registration) {
  //         await self.registration.navigationPreload.enable();
  //       }
  //     })()
  //   );
});
self.addEventListener("fetch", (event) => {
  if (event.request.mode === "navigate") {
    event.respondWith(
      (async (theme) => {
        try {
          throw new Error(""); //Testing
        } catch (error) {
          try {
            console.log("Fetch failed; returning offline page instead.", error);

            // const cache = await caches.open(CACHE_NAME);
            if (theme == "light") {
              return await caches.match("fallback-light.html");
            } else {
              return await caches.match("fallback-dark.html");
            }
            //   const cachedResponse = await cache.match(OFFLINE_URL);
            //   return cachedResponse;
          } catch (e) {
            return fetch(event.request).catch((e) => console.log);
          }
        }
      })(theme)
    );
    return;
  }

  if (
    event.request.destination === "script" ||
    event.request.destination === "style" ||
    event.request.destination === "image"
  ) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return (
          response || fetch(event.request).catch((e) => console.log("error pa"))
        );
      })
    );
  }
});
