const api = process.env.NEXT_PUBLIC_DOMAIN_API;

export const setCoverImage = (src: string | null): string => {
  return src ? `${api}/${src}` : '/account/profile-empty.png';
};
