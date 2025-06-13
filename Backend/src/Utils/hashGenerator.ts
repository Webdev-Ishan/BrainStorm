function generateShortLink(link: string): string {
  let hash = 0;

  for (let i = 0; i < link.length; i++) {
    hash = (hash * 31 + link.charCodeAt(i)) >>> 0; // simple hash
  }

  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let shortLink = '';

  while (hash > 0 && shortLink.length < 12) {
    shortLink += chars[hash % 62];
    hash = Math.floor(hash / 62);
  }

  return shortLink.padEnd(12, 'x'); // pad to ensure 12 characters
}

export default generateShortLink;