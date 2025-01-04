import { BadRequestException, InternalServerErrorException, UnauthorizedException } from "@/utils/error";
import { generateDate, generateRandomSalt, generateToken } from "@/utils/functions";
import { prisma } from "@/db";

import type { TLoginUserDTO } from "../dtos";
import type { LRU } from "@/types";

export async function login({ email, password }: TLoginUserDTO): Promise<LRU> {
  try {
    const user = await prisma.user.findFirst({
      where: { email },
      select: {
        Status: { select: { name: true, id: true } },
        password_salt: true,
        first_name: true,
        last_name: true,
        username: true,
        password: true,
        email: true,
        id: true,
      },
    });

    if (!user || !user.password_salt || !user.password) throw new BadRequestException("User not found.");

    const { Status, password: hash, password_salt: salt, ...rest } = user;

    if (!(await Bun.password.verify(salt + password, hash, "argon2d")))
      throw new BadRequestException("Password is invalid.");

    if (Status.id === 1) throw new UnauthorizedException("Please validate your email, before login!");
    if (Status.id > 3) throw new UnauthorizedException("Account blocked or deleted, please contact support!");

    return rest;
  } catch (e) {
    throw e;
  }
}
