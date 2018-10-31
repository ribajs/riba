/**
 * a >= b && a <= c
 */
export const between = (num: number,  ...nums: any[]) => {
  return num >= nums[0] && num <= nums[1];
};
