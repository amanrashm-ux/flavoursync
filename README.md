# FlavourSync UI

Professional static website and ordering experience for FlavourSync.in.

## Pages

- `index.html` - animated reel-style homepage and brand overview
- `menu.html` - live menu, GSAP-enhanced ingredient cards, taste profiles, cart checkout and schedule mode
- `schedule.html` - dedicated scheduled order flow
- `about.html` - about us page
- `story.html` - deeper brand story page
- `catering.html` - bulk order and catering enquiry page
- `packaging.html` - packaging system, pack sizes and printable label resources
- `contact.html` - contact, WhatsApp, phone and FAQ page
- `policies.html` - order, schedule, cancellation and privacy notes
- `credits.html` - menu image source and license notes

## Assets

- `assets/flavoursync-logo.png` - supplied full brand reference
- `assets/flavoursync-icon.png` - cropped icon mark used for loader/header
- `assets/pwa-icon-192.png`, `assets/pwa-icon-512.png`, `assets/pwa-maskable-512.png` - installable app icons
- `assets/apple-touch-icon.png` - iOS home-screen icon
- `assets/menu/` - local food photos used on supporting homepage/credit sections
- `assets/menu-video/` - locally hosted Coverr MP4 clips used for animated menu cards and cart previews
- Menu cards and cart rows use looping video previews with GSAP/floating ingredient overlays instead of static food photos
- `assets/video/flavoursync-reference-reel.mp4` - supplied 24-second food reel used in the homepage hero
- `assets/packaging/flavoursync-packaging-spec.csv` - vendor-ready pack size sheet
- `assets/packaging/label-sheet.html` - printable A4 label sheet
- `kinetic.js` - GSAP motion layer for reel, menu and card interactions

## PWA

This is a vanilla static PWA. It does not require React or a build step.

- `manifest.webmanifest` defines the installable app metadata.
- `service-worker.js` caches the app shell and offline fallback.
- `offline.html` is shown when a page cannot be loaded from the network.
- The floating mobile dock includes an `Install` action. Browser install prompts work on HTTPS deployments such as GitHub Pages, not from a local `file://` URL.

## WhatsApp

Orders and enquiries route to:

`https://wa.me/918405917655`

The UI opens a branded order handoff with the prepared message, an Open WhatsApp action, a copy-message fallback and a direct call action for `+91 84059 17655`.

The cart checkout includes item totals, packaging estimate, ASAP/scheduled timing, delivery locality, spice preference, payment preference and notes.
