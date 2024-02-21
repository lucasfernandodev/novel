export async function getNovels() {
  const req = await fetch("http://192.168.1.5:3000/novels");
  const novels = await req.json();
  return novels;
}