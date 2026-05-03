/**
 * Fetches a remote URL and returns an error placeholder element when the response is OK; throws an Error containing the HTTP status when the response is not OK.
 *
 * @returns A React element (`<div>Error</div>`) used as an error placeholder.
 * @throws Error containing the HTTP status code when the fetch response is not OK.
 */
export default async function TestError() {
  const waste = await fetch("https://randomshit.flwdfke");
  if (!waste.ok) throw new Error(`[Error] ${waste.status}`);

  return <div>Error</div>;
}
