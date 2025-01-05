import { prisma } from "@/db";

export async function invalidateUserSessions(id: number): Promise<boolean> {
  try {
    const deletedSessions = await prisma.session.deleteMany({ where: { User: { id } } });
    if (!deletedSessions) return false;
    return true;
  } catch (e) {
    return false;
  }
}

export async function createUserSessions(id: number) {
  try {
    const session = await prisma.session.create({
      data: {
        expires_at: Math.floor(new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).getTime() / 1000),
        User: { connect: { id } },
      },
    });
    if (!session) return;
    return session;
  } catch (e) {
    console.log(e);
    return;
  }
}
