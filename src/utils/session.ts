import { prisma } from "@/db";
import { getWorkingTokenTime } from "./functions";

export async function invalidateUserSessions(id: number): Promise<boolean> {
  try {
    const deletedSessions = await prisma.session.deleteMany({ where: { User: { id } } });
    if (!deletedSessions) return false;
    return true;
  } catch (e) {
    return false;
  }
}

export async function createUserSessions(id: number, expires: boolean = true) {
  try {
    const session = await prisma.session.create({
      data: { expires_at: getWorkingTokenTime(expires ? 30 : 120), User: { connect: { id } } },
    });
    if (!session) return;
    return session;
  } catch (e) {
    console.log(e);
    return;
  }
}
