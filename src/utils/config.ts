// env

export const config = (key: string) => {
  return import.meta.env.get(key);
};
