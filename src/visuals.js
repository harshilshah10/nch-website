export const arrow = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg>';
export function categoryIcon(name){const paths={
'Farming Tools':'M5 4v7q7 5 14 0V4M12 4v17M8 4v7m8-7v7',
'Hand Tools':'m14 4 3 3 4-1-1 5-4 2-9 9-4-4 9-9V5l4-2',
'Plumbing':'M3 8h10V4h5v9H8v7H3zM2 7v7m5 5H2m10-16h7',
'Safety Wear':'M4 14a8 8 0 0 1 16 0M2 14h20v5H2zM10 4v7m4-7v7',
'Furniture Fittings':'M5 3h14v18H5zM8 6h8v12H8zM14 12h1',
'Fasteners':'m12 2 9 5v10l-9 5-9-5V7zM8 8h8v8H8z',
'Building Items':'M2 5h20v14H2zM2 12h20M10 5v7m5 0v7',
'Irrigation':'M12 2s-7 8-7 13a7 7 0 0 0 14 0c0-5-7-13-7-13zM8 15q0 4 4 4'};return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${paths[name]||paths['Hand Tools']}"/></svg>`;}
