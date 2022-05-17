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

class ListNode {
  val: number;
  next?: ListNode;

  constructor(val: number, next?: ListNode) {
    this.val = val;
    this.next = next;
  }
}

function traverseLinkedList(head?: ListNode): void {
  if (!head) return;

  console.log(head.val);
  traverseLinkedList(head.next);
}

function reverseLinkedList(head?: ListNode): ListNode | undefined {
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

function hasCycle(head: ListNode | undefined): boolean {
  if (!head) return false;

  let slow: ListNode | undefined = head;
  let fast: ListNode | undefined = head.next;

  while (fast && fast.next) {
    fast = fast.next.next;
    slow = slow?.next;

    if (slow === fast) {
      return true;
    }
  }

  return false;
}

function middleNode(head: ListNode | undefined): ListNode | undefined {
  if (!head) {
    return undefined;
  }

  let slow: ListNode | undefined = head;
  let fast: ListNode | undefined = head.next;

  while (fast) {
    fast = fast.next?.next;
    slow = slow?.next;
  }

  return slow;
}

function isPalindrome(head: ListNode | undefined): boolean {
  if (!head) {
    return false;
  }

  const stack = [];
  let curentNode: ListNode | undefined = head;

  while (curentNode) {
    stack.push(curentNode.val);
    curentNode = curentNode.next;
  }

  curentNode = head;

  for (let i = stack.length - 1; i > 0; i--) {
    if (stack[i] !== curentNode?.val) {
      return false;
    }

    curentNode = curentNode.next;
  }

  return true;
}

function removeElements(
  head: ListNode | undefined,
  val: number
): ListNode | undefined {
  if (!head) {
    return undefined;
  }
  let currentNode: ListNode | undefined = head;

  while (currentNode?.next) {
    while (currentNode?.next?.val === val) {
      currentNode.next = currentNode?.next?.next;
    }

    currentNode = currentNode?.next;
  }

  if (head.val === val) return head.next;

  return head;
}

function deleteDuplicates(head: ListNode | undefined): ListNode | undefined {
  if (!head) {
    return undefined;
  }

  let currentNode: ListNode | undefined = head;

  while (currentNode?.next) {
    while (currentNode?.val === currentNode?.next?.val) {
      currentNode.next = currentNode.next?.next;
    }

    currentNode = currentNode.next;
  }

  return head;
}

function mergeTwoLists(
  list1: ListNode | undefined,
  list2: ListNode | undefined
): ListNode | undefined {
  if (!list1) return list2;
  if (!list2) return list1;

  if (list1.val < list2.val) {
    list1.next = mergeTwoLists(list1.next, list2);
    return list1;
  }

  list2.next = mergeTwoLists(list1, list2.next);
  return list2;
}

function nextGreatestLetter(letters: string[], target: string): string {
  let left = 0;
  let right = letters.length - 1;
  let maxIdx = 0;

  while (left <= right) {
    const midIdx = left + Math.floor((right - left) / 2);

    if (target < letters[midIdx]) {
      maxIdx = midIdx;
      right = midIdx - 1;
    } else {
      left = midIdx + 1;
    }
  }

  return letters[maxIdx];
}

function peakIndexInMountainArray(arr: number[]): number {
  let left = 0;
  let right = arr.length - 1;
  let result = -1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);

    result = mid;

    if (arr[mid] < arr[mid + 1]) {
      left = mid + 1;
    } else if (arr[mid] < arr[mid - 1]) {
      right = mid - 1;
    } else {
      // we are there
      break;
    }
  }

  return result;
}

let arr = [43, 231, 43, 12];
let head = new ListNode(
  1,
  new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(3))))
);

// console.log(hasCycle(head));
// console.log(isPalindrome(head));
// console.log(removeElements(head, 1));
// console.log(deleteDuplicates(head));

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
// console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]));
// console.log(nextGreatestLetter(["c", "f", "j"], "j"));
// console.log(peakIndexInMountainArray([0, 10, 5, 2]));
