import { cleanFilePath, isValidDirectory } from "./functions";
import { unlink } from "node:fs/promises";

import sharp from "sharp";

import type { TSavedFileDataObj } from "@/types";

export async function saveUserProfilePicture(username: string, file?: File, fp?: string): Promise<TSavedFileDataObj> {
  if (!file) return null;
  fp = !fp ? "/public/" : fp;

  const workToDir = await isValidDirectory(fp.concat("/"));
  if (workToDir.length) await cleanFilePath(workToDir);

  const actualFilePath = fp.concat(`/${file.name}`);
  const compressedFilePath = fp.concat(`/${username}.webp`);
  const thumbnailFilePath = fp.concat(`/${username}-thumbnail.webp`);

  // Deactivate Sharp Cache for file Async Management
  sharp.cache(false);

  await Bun.write(actualFilePath, file);
  await Bun.write(compressedFilePath, await sharp(actualFilePath).webp({ quality: 75, lossless: true }).end().toArray());
  await Bun.write(thumbnailFilePath, await sharp(compressedFilePath).resize(200, 200).end().toArray());
  await unlink(actualFilePath);

  return { compressedFilePath, thumbnailFilePath };
}
