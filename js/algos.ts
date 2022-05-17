// QuickSort

function partitionEnd(start: number, end: number, arr: number[]): number {
  const pivotIdx = start;
  let j = end;
  let i = end + 1;

  while (j > pivotIdx) {
    if (arr[j] > arr[pivotIdx]) {
      i--;
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }

    j--;
  }

  const temp = arr[i - 1];
  arr[i - 1] = arr[pivotIdx];
  arr[pivotIdx] = temp;

  return i - 1;
}

function partitionStart(start: number, end: number, arr: number[]): number {
  const pivotIdx = end;
  let j = start;
  let i = start - 1;

  while (j < pivotIdx) {
    if (arr[j] < arr[pivotIdx]) {
      i++;

      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }

    j++;
  }

  const temp = arr[i + 1];
  arr[i + 1] = arr[pivotIdx];
  arr[pivotIdx] = temp;

  return i + 1;
}

function partitionMid(start: number, end: number, arr: number[]): number {
  const pivotIdx = Math.floor(start + end / 2);
  let i = start;
  let j = end;

  while (i <= j) {
    while (arr[i] < arr[pivotIdx]) {
      i++;
    }
    while (arr[j] > arr[pivotIdx]) {
      j--;
    }

    if (i <= j) {
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;

      i++;
      j--;
    }
  }

  return i;
}

function quickSortStart(start: number, end: number, arr: number[]): number[] {
  if (start < end) {
    const p = partitionStart(start, end, arr);

    quickSortStart(start, p - 1, arr);
    quickSortStart(p + 1, end, arr);
  }

  return arr;
}

function quickSortEnd(start: number, end: number, arr: number[]): number[] {
  if (start < end) {
    const p = partitionEnd(start, end, arr);

    quickSortStart(start, p - 1, arr);
    quickSortStart(p + 1, end, arr);
  }

  return arr;
}

function quickSortMid(start: number, end: number, arr: number[]): number[] {
  if (start < end) {
    const p = partitionMid(start, end, arr);

    if (p < start - 1) {
      quickSortMid(start, p - 1, arr);
    }

    if (p < end) {
      quickSortMid(p, end, arr);
    }
  }

  return arr;
}

function merge(arr: number[], arr2: number[]): number[] {
  const result: number[] = [];
  let i = 0;
  let j = 0;

  while (i < arr.length - 1 && j < arr2.length - 1) {
    if (arr[i] < arr[j]) {
      result.push(arr[i]);
      i++;
    } else {
      result.push(arr[j]);
      j++;
    }
  }

  return result.concat(arr.slice(i)).concat(arr2.slice(j));
}

function mergeSort(arr: number[]): number[] {
  if (arr.length <= 1) {
    return arr;
  }

  const midPoint = Math.floor(arr.length / 2);
  const left = arr.slice(0, midPoint);
  const right = arr.slice(midPoint);

  return merge(mergeSort(left), mergeSort(right));
}

function bubbleSort(arr: number[]): number[] {
  let i = 0;
  let j = arr.length - 1;

  while (j >= 0) {
    while (i < j) {
      if (arr[i] > arr[i + 1]) {
        const temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
      }
      i++;
    }
    i = 0;
    j--;
  }

  return arr;
}

function binarySearch(arr: number[], target: number): number {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const midIdx = left + Math.floor((right - left) / 2);

    if (arr[midIdx] === target) {
      return midIdx;
    }

    if (target < arr[midIdx]) {
      right = midIdx - 1;
    } else {
      left = midIdx + 1;
    }
  }

  return -1;
}

class LinkNode {
  val: number;
  next?: LinkNode;

  constructor(val: number, next?: LinkNode) {
    this.val = val;
    this.next = next;
  }
}

function traverseLinkedList(head?: LinkNode): void {
  if (!head) return;

  console.log(head.val);
  traverseLinkedList(head.next);
}

function reverseLinkedList(head?: LinkNode): LinkNode | undefined {
  if (!head || !head.next) return head;

  const result = reverseLinkedList(head.next);
  head.next.next = head;
  head.next = undefined;

  return result;
}

function containsDuplicate(nums: number[]): boolean {
  const seenNums: { [key: number]: boolean } = {};

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] in seenNums) {
      return true;
    }

    seenNums[nums[i]] = true;
  }

  return false;
}

function missingNumber(nums: number[]): number {
  const sorted = nums.sort();

  for (let i = 0; i < sorted.length; i++) {
    if (i === sorted.length - 1) {
      return sorted.length;
    }

    if (sorted[i + 1] != sorted[i] + 1) {
      return sorted[i] + 1;
    }
  }

  return 0;
}

function findDisappearedNumbers(nums: number[]): number[] {
  const result: number[] = [];
  const seenNums: { [key: number]: boolean } = {};

  for (let i = 1; i <= nums.length; i++) {
    seenNums[i] = false;
  }

  for (let i = 0; i < nums.length; i++) {
    seenNums[nums[i]] = true;
  }

  for (let key in seenNums) {
    if (seenNums[key] === false) {
      result.push(parseInt(key));
    }
  }

  return result;
}

function singleNumber(nums: number[]): number {
  const result = -1;

  for (let i = 0; i < nums.length; i++) {
    const bsres = binarySearch(
      nums.slice(0, i).concat(nums.slice(i + 1)),
      nums[i]
    );

    if (bsres === -1) {
      return nums[i];
    }
  }

  return result;
}

const stairsCalcMap: { [key: number]: number } = {};
function climbStairs(n: number): number {
  if (n === 0) return 0;
  if (n === 1) return 1;
  if (n === 2) return 2;

  if (stairsCalcMap[n]) {
    return stairsCalcMap[n];
  }

  stairsCalcMap[n] = climbStairs(n - 1) + climbStairs(n - 2);

  return stairsCalcMap[n];
}

function maxProfit(prices: number[]): number {
  let i = 0;
  let j = 1;
  let maxProfit = 0;

  while (j < prices.length) {
    const currentProfit = prices[j] - prices[i];

    if (prices[j] < prices[i]) {
      i = j;
    }

    if (currentProfit > maxProfit) {
      maxProfit = currentProfit;
    }

    j++;
  }

  return maxProfit;
}

function maxSubArray(nums: number[]): number {
  let maxSum = nums[0];
  let currSum = nums[0];

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] > currSum + nums[i]) {
      currSum = nums[i];
    } else {
      currSum += nums[i];
    }

    if (maxSum < currSum) {
      maxSum = currSum;
    }
  }

  return maxSum;
}

let arr = [43, 231, 43, 12];
let head = new LinkNode(
  1,
  new LinkNode(2, new LinkNode(3, new LinkNode(4, new LinkNode(5))))
);

// console.log("QS Start", quickSortStart(0, arr.length - 1, arr));
// console.log("QS End", quickSortEnd(0, arr.length - 1, arr));
// console.log("QS Mid", quickSortMid(0, arr.length - 1, arr));
// console.log("MergeSort", mergeSort(arr));
// console.log("Bubble", bubbleSort(arr));
// console.log("BS", binarySearch([1, 2, 3, 4, 5, 6, 7], 2));
// traverseLinkedList(head);
// const newList = reverseLinkedList(head);
// traverseLinkedList(newList);
// console.log(containsDuplicate([1, 2, 3, 3]));
// console.log(missingNumber([9, 6, 4, 2, 3, 5, 7, 0, 1]));
// console.log(missingNumber([3, 0, 1]));
// console.log(findDisappearedNumbers([5, 4, 6, 7, 9, 3, 10, 9, 5, 6]));
// console.log(singleNumber([1]));
// console.log(climbStairs(5));
// console.log(maxProfit([7, 1, 5, 3, 6, 4]));
console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]));
