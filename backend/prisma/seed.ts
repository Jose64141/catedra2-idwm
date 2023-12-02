import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const productsData: Prisma.ProductCreateInput[] = [
    {
        name: "Comino Molido",
        price: 1200,
        description: "Comino molido de la marca Cousine & Co. El mejor comino extraido de la Índia, por campesinos artesanales y molido a mano siguiendo los más altos estándares de calidad. Dele más sabor y profundidad a sus comidas.",
        imageUrl: "https://res.cloudinary.com/dsjcs2tj7/image/upload/v1701528181/catedra2-idwm/410152-360-360_ehvpzo.png",
    },
    {
        name: "Surtido De Mariscos",
        price: 1200,
        description: "Comino molido de la marca Cousine & Co. El mejor comino extraido de la Índia, por campesinos artesanales y molido a mano siguiendo los más altos estándares de calidad. Dele más sabor y profundidad a sus comidas.",
        imageUrl: "https://res.cloudinary.com/dsjcs2tj7/image/upload/v1701528181/catedra2-idwm/SURT-MARIS-CCO_fvfd0g.png",
    },
    {
        name: "Castañas de caju",
        price: 4200,
        description: "Comino molido de la marca Cousine & Co. El mejor comino extraido de la Índia, por campesinos artesanales y molido a mano siguiendo los más altos estándares de calidad. Dele más sabor y profundidad a sus comidas.",
        imageUrl: "https://res.cloudinary.com/dsjcs2tj7/image/upload/v1701528181/catedra2-idwm/Casta%C3%B1a-de-caju-100-g_db3cwy.png",
    },
    {
        name: "Ciboulette Molido",
        price: 1200,
        description: "Comino molido de la marca Cousine & Co. El mejor comino extraido de la Índia, por campesinos artesanales y molido a mano siguiendo los más altos estándares de calidad. Dele más sabor y profundidad a sus comidas.",
        imageUrl: "https://res.cloudinary.com/dsjcs2tj7/image/upload/v1701528183/catedra2-idwm/Ciboulette-en-sobre-2-g-1-160576820_ufqgoj.png",
    },
    {
        name: "Stevia En Polvo",
        price: 1200,
        description: "Comino molido de la marca Cousine & Co. El mejor comino extraido de la Índia, por campesinos artesanales y molido a mano siguiendo los más altos estándares de calidad. Dele más sabor y profundidad a sus comidas.",
        imageUrl: "https://res.cloudinary.com/dsjcs2tj7/image/upload/v1701528184/catedra2-idwm/Endulzante-sachet-stevia-100-un-1-159597551_vzq5hf.png",
    }
];

async function main() {
    console.log(`Start seeding ...`);

    for (const p of productsData) {
        const product = await prisma.product.create({
            data: p
        });
        console.log(`Created user with id: ${product.id}`);
    }

    console.log(`Seeding finished.`);
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
