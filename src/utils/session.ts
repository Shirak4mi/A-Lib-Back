import { prisma } from "@/db";

export async function invalidateUserSessions(id: number): Promise<boolean> {
  try {
    const deletedSessions = await prisma.user_Session.deleteMany({ where: { User: { id } } });
    if (!deletedSessions) return false;
    return true;
  } catch (e) {
    return false;
  }
}

export async function createUserSessions(id: number) {
  try {
    const session = await prisma.user_Session.create({
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

export async function invalidateBarberSessions(id: number): Promise<boolean> {
  try {
    const deletedSessions = await prisma.barber_Session.deleteMany({ where: { Barber: { id } } });
    if (!deletedSessions) return false;
    return true;
  } catch (e) {
    return false;
  }
}

export async function createBarberSessions(id: number) {
  try {
    const session = await prisma.barber_Session.create({
      data: {
        expires_at: Math.floor(new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).getTime() / 1000),
        Barber: { connect: { id } },
      },
    });
    if (!session) return;
    return session;
  } catch (e) {}
}
