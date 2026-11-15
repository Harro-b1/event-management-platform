import { PrismaClient, Role } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

    const director = await prisma.user.create({
        data: { name: "Demo Director", email: "director@example.com", passwordHash: "secretPass", role: Role.DIRECTOR },
    });

    await prisma.user.create({
        data: { name: "Demo Member", email: "member@example.com", passwordHash: "secretPass" },
    });

    await prisma.equipment.createMany({
        data: [
            { name: "Speaker", totalQuantity: 4 },
            { name: "Microphone", totalQuantity: 6 },
        ],
    });

    await prisma.event.create({
        data: {
            name: "Welcome Night",
            date: new Date("2026-12-05T18:00:00Z"),
            venue: "Main Hall",
            tasks: {
                create: [{ title: "Book venue", dueDate: new Date("2026-11-25"), ownerId: director.id }],
            },
        },
    });
}

main().finally(() => prisma.$disconnect());