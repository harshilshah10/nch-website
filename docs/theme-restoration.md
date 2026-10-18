# Theme restoration from WordPress export

The published Elementor page metadata is the source of the new styling, rather than unused templates or Elementor's generic default palette.

- Home: white sections, headings `#363636`, text `#6b6b6b`, emphasis `#c90000`, Open Sans headings and Raleway testimonials. Original hero uses Background.jpg and a light/red overlay.
- Products: background/overlay colors `#280000` and `#490000`, category text `#3a0200`, separators `#d1d1d1`, Poppins typography.
- Contact: dark `#1e0000`, green accents `#08BA77`/`#32DA9B`, white text.
- Footer: light `#f9f9f9` with grey text.

Restored homepage sections and wording: company introduction, eight featured categories, Adarsh Gudka's biography, both customer testimonials, contact CTA. Restored public Blog, Careers and both article URLs. Catalogue browsing and enquiry functionality remain. Original departmental emails and social links are displayed; the user-supplied Gmail remains the generated-enquiry destination.

Image URLs reference the existing WordPress host. They are not bundled locally and could not be fetched from the cloud environment. Images fail gracefully; hero backgrounds have color fallbacks. Do not delete or migrate the old WordPress media until images have been copied locally. The typographic NCH wordmark is provisional because the export includes several logo variants without a definitive active theme logo setting.

This is a reconstruction from content and Elementor settings, not execution of the OceanWP/Elementor theme. Exact spacing, header settings, rendered imagery, and responsive behavior still need comparison against screenshots. No WordPress plugins, shortcodes, or arbitrary exported scripts execute in this application. The original WPForms form is replaced with the functioning enquiry flow; no form backend has been invented.

Published careers listings retain their original links, with a note that availability should be confirmed. The export's generic draft policy and private pages remain excluded. The export is historical content, not proof of current inventory or vacancies.
