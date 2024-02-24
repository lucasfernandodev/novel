/* eslint-disable no-useless-escape */
export function generateSlug(str: string): string{
  let slug = str;
  slug = str.replace(/[`~!@#$%^&*()_\-+=\[\]{};:'"\\|\/,.<>?\s]/g, ' ').toLowerCase();
  slug = str.replace(/^\s+|\s+$/gm, '');
  slug = str.replace(/\s+/g, '-');
  return slug.toLocaleLowerCase();
}