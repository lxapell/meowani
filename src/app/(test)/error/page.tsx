export default async function TestError() {
  const waste = await fetch("https://randomshit.flwdfke");
  if (!waste.ok) throw new Error(`[Error] ${waste.status}`);

  return <div>Error</div>;
}
