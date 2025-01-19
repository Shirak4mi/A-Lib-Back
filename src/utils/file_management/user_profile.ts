import { cleanFilePath, isValidDirectory } from "./functions";
import sharp from "sharp";

import type { TSavedFileDataSchema } from "@/types";

export async function saveUserProfilePicture(file?: File, filePath?: string): Promise<TSavedFileDataSchema> {
  if (!file) return null;
  filePath = !filePath ? "/public/" : filePath;

  const dividedName = file.name.split(".");
  const filename = dividedName.slice(0, dividedName.length - 1).join(".");
  const workToDir = await isValidDirectory(filePath.concat("/"));

  if (workToDir.length) await cleanFilePath(workToDir);

  const actualFilePath = filePath.concat(`/${file.name}`);
  const compressedFilePath = filePath.concat(`/${filename}.webp`);
  const thumbnailFilePath = filePath.concat(`/${filename}-thumbnail.webp`);

  // Deactivate Sharp Cache for file Async Management
  sharp.cache(false);

  await Bun.write(actualFilePath, file);
  await Bun.write(compressedFilePath, await sharp(actualFilePath).webp({ quality: 75, lossless: true }).end().toArray());
  await Bun.write(thumbnailFilePath, await sharp(compressedFilePath).resize(200, 200).end().toArray());
  await Bun.file(actualFilePath).unlink();

  return { compressedFilePath, thumbnailFilePath };
}
