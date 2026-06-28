import { config } from "dotenv";
import { hash } from "bcryptjs";

config({ path: ".env.local" });
config();

async function main() {
  const { prisma } = await import("../src/lib/prisma");

  const email = process.env.CRM_ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.CRM_ADMIN_PASSWORD;
  const name = process.env.CRM_ADMIN_NAME?.trim() || "Zen Time Pro";

  if (!email || !password) {
    throw new Error("Define CRM_ADMIN_EMAIL and CRM_ADMIN_PASSWORD before running the bootstrap.");
  }

  const passwordHash = await hash(password, 12);

  const user = await prisma.user.upsert({
    where: { email },
    update: {
      name,
      passwordHash,
      role: "ADMIN",
      isActive: true,
    },
    create: {
      email,
      name,
      passwordHash,
      role: "ADMIN",
      isActive: true,
    },
  });

  console.log(`CRM admin ready: ${user.email}`);
  await prisma.$disconnect();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
