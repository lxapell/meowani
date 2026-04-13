function normalize(item: string | any): Normalized {
  if (typeof item === "string") {
    return { label: item, value: item };
  }
  return {
    label: "normal" in item ? item.normal : item.name,
    value: "query" in item ? item.query : item.name,
  };
}
