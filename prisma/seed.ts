import { PrismaClient } from '@prisma/client';
import { TagsEnum } from '../src/common/enums/tags.enum';

const prisma = new PrismaClient();

async function main() {
  await prisma.sentenceTag.createMany({
    data: Object.values(TagsEnum).map((tag) => ({ tag })),
  });
}
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
