import { PrismaClient } from "@prisma/client";
import { logger } from 'App/Logging/Winston';

const prisma = new PrismaClient();
prisma.$use(async (params, next) => {
    logger.info({ params });

    const result = await next(params);
    logger.info({ result });

    return result;
});

export default prisma;