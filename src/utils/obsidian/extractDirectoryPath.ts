export default function extractDirectoryPath(path: string): string {
  const lastSlashIndex = path.lastIndexOf("/");
  return lastSlashIndex !== -1 ? path.substring(0, lastSlashIndex) : "";
}
