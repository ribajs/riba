import { IFormatter } from '../../interfaces/formatter';
/**
 * a >= b && a <= c
 */
export const betweenFormatter: IFormatter = {
  name: 'between',
  read(num: number,  ...nums: any[]) {
    return num >= nums[0] && num <= nums[1];
  },
};
