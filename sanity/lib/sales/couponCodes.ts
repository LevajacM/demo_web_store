export const COUPON_CODES = {
  BFRIDAY: 'BFRIDAY',
  YSALE: 'YSALE',
  MSALE: 'MSALE',
  WSALE: 'WSALE',
} as const;

export type CouponCode = keyof typeof COUPON_CODES;
