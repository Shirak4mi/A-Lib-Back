import { cleanFilePathNFolder, isValidDirectory } from "../functions";
import { unlink } from "node:fs/promises";

import sharp from "sharp";

import type { TSavedFileDataArray } from "@/types";

export async function saveBusinessMainPictures(bname?: string, files?: Array<File>): Promise<TSavedFileDataArray> {
  if (!bname || !files) return null;
  const fp = `public/business/${bname}`;
  const responsable: TSavedFileDataArray = [];

  // Deactivate Sharp Cache for file Async Management
  sharp.cache(false);

  await Promise.all(
    files.map(async (file, idx) => {
      const fname = file.name.split(".");
      const fext = fname.splice(fname.length - 1).join(".");
      const compressedFilePath = fp.concat(`/${idx + 1}.webp`);
      const actualFilePath = fp.concat(`/${idx + 1}_main.${fext}`);
      const thumbnailFilePath = fp.concat(`/${idx + 1}-thumbnail.webp`);

      await Bun.write(actualFilePath, file);
      await Bun.write(compressedFilePath, await sharp(actualFilePath).webp({ quality: 75, lossless: true }).end().toArray());
      await Bun.write(thumbnailFilePath, await sharp(compressedFilePath).resize(200, 200).end().toArray());
      await unlink(actualFilePath);

      responsable.push({ compressedFilePath, thumbnailFilePath });
    })
  );

  return responsable;
}
