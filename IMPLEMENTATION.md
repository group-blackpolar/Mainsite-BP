# Mainsite ecosystem update

The site follows the supplied `BLACK_POLAR_MASTER_CONTEXT.md` (2026-09-13): independent NORTH, ARCTIC FOX and ERMINE products, planned SNOWY OWL, and CORECROW as the shared foundation. Product pages are conceptual marketing, not product applications. The existing Spanish/English shell and inverted palette are retained.

Routes: `/north`, `/arcticfox`, `/ermine`, and localized equivalents under `/es-lat` and `/en-us`. The homepage includes seven client-facing service cards, company/resources/contact destinations and a planned SNOWY OWL note. Product/menu/footer links and locale switching preserve the page context. Motion respects reduced-motion preferences; reveal content is visible without JavaScript.

Contact submits JSON to `${NEXT_PUBLIC_CORECROW_URL}/v1/contact`, defaulting to `https://api.blackpolar.org`. No database library, credentials, session authority, or product backend is present. Successful UI submission requires a confirmed HTTP 201; errors retain the form. API base configuration is public and contains no secrets.

## Validation and release

Run `pnpm lint` and `pnpm build`. Linux builds produce `.next/standalone/server.js` with public/static assets copied by the post-build script. The repository's standalone PM2 example uses port 3000. The inspected VPS keeps the legacy Express service on 3000; `scripts/deploy-vps.sh` runs the new `blackpolar-mainsite` PM2 process on loopback 3100, checks a candidate first, and retains the previous release configuration. nginx must target 3100 after initial rollout. Windows uses a normal Next build because this workstation cannot create traced pnpm symlinks.

The local browser pass covers the homepage, all three product pages, navigation, and a real contact submission through isolated local CoreCrow/PostgreSQL. A browser viewport override did not take effect, so mobile rendering has not been visually certified. Responsive CSS is included. Inherited legal placeholders have been replaced with a concise publication-pending notice; company-approved policies are still required.

No product application was created, and NORTH's repository was not modified. The pre-existing work in the repository remains part of the working tree. A production deployment is separate from local verification.
