export function GET() {
  const icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
    <rect width="64" height="64" rx="14" fill="#0b0f0a"/>
    <path d="M18 35h15v8H18V35Zm13-14h15v8H31v-8Zm-9 0h8v22h-8V21Zm12 0h8v22h-8V21Z" fill="#bfff00"/>
  </svg>`;

  return new Response(icon, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
