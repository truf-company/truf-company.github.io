'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "version.json": "d977212451cbde087c74c9484d93fb7d",
"index.html": "a98911925f093beef1059aae7bb0d70d",
"/": "a98911925f093beef1059aae7bb0d70d",
"main.dart.js": "e3331621d3faa45141e45de963ccea55",
"404.html": "0a27a4163254fc8fce870c8cc3a3f94f",
"flutter.js": "a85fcf6324d3c4d3ae3be1ae4931e9c5",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "1dfb08db6e94252f3376b5910eb8ecaa",
"assets/AssetManifest.json": "f8448c6adfc55c61246029c7c695a4ec",
"assets/NOTICES": "c97f59150776a7e3e0bb77686fcca83f",
"assets/FontManifest.json": "349de92afa1d5acfbbdb294b8c19d280",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/packages/truf_app_icons/assets/icons/question_list_item_icon.svg": "850833ddad0a6a61732efe87ed0cd57d",
"assets/packages/truf_app_icons/assets/icons/coins_header.svg": "e6723a32dfc7a71b02ec90ebfe9cddcb",
"assets/packages/truf_app_icons/assets/icons/lock_icon.svg": "d44e6bdcf71f8a1270cb41782abc0c43",
"assets/packages/truf_app_icons/assets/icons/question_header.svg": "5501a9046c5b3212bbad3f93871240e8",
"assets/fonts/Rouna-MediumItalic.otf": "1afeaf5feafeaec6781993ccee0cc680",
"assets/fonts/Rouna-BoldItalic.otf": "2c7e4b765ded80e2792250c464dfbfe4",
"assets/fonts/Rouna-Medium.otf": "65cb794b0f7a72baa848291fcf4dffe3",
"assets/fonts/Rouna-Bold.otf": "efcf53cd04f30d949101d10abb5f91b5",
"assets/fonts/Rouna-RegularItalic.otf": "8fd102f0857bd7ff9c601efe6e14798f",
"assets/fonts/Rouna-Regular.otf": "775141776b63c61c38be096238a176c4",
"assets/fonts/MaterialIcons-Regular.otf": "e7069dfd19b331be16bed984668fe080",
"assets/assets/icons/technology/healthcare.svg": "893d5b1a95b698789bd9d2ab82f3afd8",
"assets/assets/icons/technology/industries.svg": "81a0672f14f9ae44ee922ec1fb1f7cb6",
"assets/assets/icons/technology/financials.svg": "87dfe281c342372b27e0708f97e61733",
"assets/assets/icons/technology/consumerDiscretionary.svg": "9b4636928835efe59307597ed48de1e6",
"assets/assets/icons/technology/other.svg": "1acf5319b35d534761c1a1bd42b34d61",
"assets/assets/icons/technology/technology.svg": "28f0c9718b3d2ea139f51d3b34509a2c",
"assets/assets/icons/instruments/tesla.svg": "db2f18b11e2fb36298246f06af1e7c88",
"assets/assets/icons/instruments/microsoft.svg": "1704b31f9d0bb941c420a684ef08a937",
"assets/assets/icons/instruments/amazon.svg": "d8a7b18e6e33e38750c4216fe59bca91",
"assets/assets/icons/instruments/google.svg": "4f51a2c55f5318924028b41737122af2",
"assets/assets/icons/widgets/percentage_slider/divider_circle.svg": "f064259cfa1ac650d58fd7f0756b3261",
"assets/assets/graphics/flows/financial-freedom-flow/last-page/last-page-logo.png": "d6917c9378ce7890c91e09c9b80c98f0",
"assets/assets/graphics/flows/financial-freedom-flow/last-page/last-page.png": "d77494541001007dce1c31c28b74f1cc",
"assets/assets/graphics/flows/financial-freedom-flow/repeating-investment-setup/header.png": "a14a7243e7919d5addb47a40aee602da",
"assets/assets/graphics/flows/financial-freedom-flow/index-funds/regions.png": "495a7566237e9f4319e76f0f010404cc",
"assets/assets/graphics/flows/financial-freedom-flow/index-funds/index-funds-header.png": "a614b1c35b1e10fb60c312d28406fcc1",
"canvaskit/canvaskit.js": "97937cb4c2c2073c968525a3e08c86a3",
"canvaskit/profiling/canvaskit.js": "c21852696bc1cc82e8894d851c01921a",
"canvaskit/profiling/canvaskit.wasm": "371bc4e204443b0d5e774d64a046eb99",
"canvaskit/canvaskit.wasm": "3de12d898ec208a5f31362cc00f09b9e"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
