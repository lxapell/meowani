export const getShimmerDataURL = (hex: string) => {
  const s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"><rect width="1" height="1" fill="${hex}"/></svg>`;

  const base64 =
    typeof window === "undefined" ? Buffer.from(s).toString("base64") : btoa(s);

  return `data:image/svg+xml;base64,${base64}`;
};
