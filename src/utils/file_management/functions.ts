import { readdir, unlink, rmdir } from "node:fs/promises";

export async function isValidDirectory(dirPath?: string): Promise<Array<string>> {
  if (!dirPath) return [];
  try {
    return (await readdir(dirPath, { recursive: true })).map((x) => dirPath.concat(x));
  } catch (e) {
    return [];
  }
}

export async function cleanFilePath(filesOnDir: Array<string>): Promise<void> {
   await Promise.all(filesOnDir.map(async (file) => await unlink(file)));
}

export async function cleanFilePathNFolder(ofp: string, filesOnDir: Array<string>): Promise<void> {
  await Promise.all(filesOnDir.map(async (file) => await unlink(file)));
  await rmdir(ofp);
}
