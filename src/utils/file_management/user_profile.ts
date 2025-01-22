import { cleanFilePathNFolder, isValidDirectory } from "./functions";
import { unlink } from "node:fs/promises";

import sharp from "sharp";

import type { TSavedFileDataObj } from "@/types";

export async function saveUserProfilePicture(username: string, file?: File): Promise<TSavedFileDataObj> {
  if (!file) return null;
  const fp = `public/user/${username}`;

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

export async function updateUserProfilePicture(nuname: string, ouname: string, file?: File): Promise<TSavedFileDataObj> {
  if (!file) return null;
  const fp = `public/user/${nuname}`;
  const ofp = `public/user/${ouname}/`;

  const workToDir = await isValidDirectory(ofp);
  if (workToDir.length) await cleanFilePathNFolder(ofp, workToDir);

  const actualFilePath = fp.concat(`/$temporalPic`);
  const compressedFilePath = fp.concat(`/${nuname}.webp`);
  const thumbnailFilePath = fp.concat(`/${nuname}-thumbnail.webp`);

  // Deactivate Sharp Cache for file Async Management
  sharp.cache(false);

  await Bun.write(actualFilePath, file);
  await Bun.write(compressedFilePath, await sharp(actualFilePath).webp({ quality: 75, lossless: true }).end().toArray());
  await Bun.write(thumbnailFilePath, await sharp(compressedFilePath).resize(200, 200).end().toArray());
  await unlink(actualFilePath);

  return { compressedFilePath, thumbnailFilePath };
}
