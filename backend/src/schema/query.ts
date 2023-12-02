import { Product } from "@prisma/client";

export const ProductQuery = {
    /**
     * Gets the information of a product by its id.
     * @param parent The field's parent.
     * @param args The arguments for the current field.
     * @param contextValue The context of the current operation.
     * @returns The information of the product.
     */
    product(parent, args, contextValue): Product {
        return contextValue.prisma.Product.findUnique({
            where: {
                id: args.id
            }
        });
    },
    /**
     * Gets the information of all products.
     * @param parent The field's parent.
     * @param args The arguments for the current field.
     * @param contextValue The context of the current operation.
     * @returns The information of all products.
     */
    products(parent, args, contextValue): Product[] {
        return contextValue.prisma.Product.findMany();
    }
}