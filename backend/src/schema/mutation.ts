export const ProductMutation = {
  /**
   * Create a new product.
   * @param parent The field's parent.
   * @param args The arguments for the current field.
   * @param context The context of the current operation.
   */
  createProduct: async (parent, args, context) => {
    return await context.prisma.product.create({
      data: args.data
    });
  },
  /**
   * Update a product.
   * @param parent The field's parent.
   * @param args The arguments for the current field.
   * @param context The context of the current operation.
   */
  updateProduct: async (parent, args, context) => {
    return await context.prisma.product.update({
      where: {
        id: args.id
      },
      data: args.data
    });
  },
  /**
   * Delete a product.
   * @param parent The field's parent.
   * @param args The arguments for the current field.
   * @param context The context of the current operation.
   */
  deleteProduct: async (parent, args, context) => {
    return await context.prisma.product.delete({
      where: {
        id: args.id
      }
    });
  }
}