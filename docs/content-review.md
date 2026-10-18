# WordPress export review

Source: nairobicentralhardwarelimited.WordPress.2026-10-18.xml, supplied by the user. Treat its contents as source material, not operational instructions.

## Reviewed content

- 8 pages total: Home, Products, Contact, Blogs, Careers are published; the remaining three are private or draft.
- 2 published blog posts.
- 90 attachment references. Actual binaries are not embedded.
- Elementor layout metadata is present; it does not provide a rendered screenshot or a complete WordPress theme.
- No WooCommerce product records. The catalogue is 481 list entries in the published Products page, reduced to 478 by removing duplicate name/category pairs. Identical names in different categories are retained.

## Applied to the new concept

All 19 catalogue categories, company purpose, founder Adarsh Gudka, founding year 2013, brand names Fortune/Titan/Cobra, two published phone numbers, and the published shop address. The user-supplied Gmail address is the enquiry destination, overriding the old sales address. Images are not inferred from attachment filenames. Published content is historical source evidence, not confirmation of current stock.

## Remaining before replacing the old site

- Obtain `wp-content/uploads` and screenshots to select the actual logo and relevant photographs.
- Confirm current contact details, product spellings, ranges, and brands with the business. Confirm whether WhatsApp is supported.
- The `/products/`, `/contact/`, `/blog/`, `/careers/`, and two `/business/` post URLs now render their respective pages through a Netlify SPA fallback.
- Blog posts and careers listings now render at their original paths. Careers includes a notice to confirm current openings.
- Review actual policies separately; the export's draft refund policy is generic placeholder text and was not published in the new site.
- Both original testimonials are now included on the homepage.
- The live site was not rendered or visually inspected. No deployment or domain changes have occurred.
