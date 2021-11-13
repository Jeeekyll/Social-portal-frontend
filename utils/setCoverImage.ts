const api = process.env.NEXT_PUBLIC_DOMAIN_API;

export const setCoverImage = (src: string | null): string => {
  if (!src || src.length === 0) return '/account/profile-empty.png';
  else {
    return `${api}/${src}`;
  }
};
