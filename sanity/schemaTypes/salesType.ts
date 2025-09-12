import { defineType, defineField } from 'sanity';
import { CircleDollarSign } from 'lucide-react';

export const salesType = defineType({
  name: 'sale',
  title: 'Sale',
  type: 'document',
  icon: CircleDollarSign,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Sale Title',
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Sale Description',
    }),
    defineField({
      name: 'discountAmount',
      type: 'number',
      title: 'Discount Amount',
      description: 'The amount of discount in percents or fixed',
    }),
    defineField({
      name: 'couponCode',
      type: 'string',
      title: 'Coupon Code',
    }),
    defineField({
      name: 'validFrom',
      type: 'datetime',
      title: 'Valid From',
    }),
    defineField({
      name: 'validTo',
      type: 'datetime',
      title: 'Valid To',
    }),
    defineField({
      name: 'isActive',
      type: 'boolean',
      title: 'Is Active',
      description: 'Toggle to activate or deactivate the sale',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      discountAmount: 'discountAmount',
      couponCode: 'couponCode',
      isActive: 'isActive',
    },
    prepare(select) {
      const { title, discountAmount, couponCode, isActive } = select;
      const status = isActive ? 'Active' : 'Inactive';
      return {
        title,
        subtitle: `${discountAmount}% off - Code: ${couponCode} - ${status}`,
      };
    },
  },
});
