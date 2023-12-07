const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

// Warm the cache for specific URLs
warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

// Cache navigation requests with the pageCache strategy
registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// Cache assets with StaleWhileRevalidate strategy
registerRoute(
	({ request }) => ["style", "script", "worker"].includes(request.destination),
	new StaleWhileRevalidate({
		// Name of the cache storage.
		cacheName: "asset-cache",
		plugins: [
			// This plugin will cache responses with these headers to a maximum-age of 30 days.
			new CacheableResponsePlugin({
				statuses: [0, 200],
			}),
		],
	})
);