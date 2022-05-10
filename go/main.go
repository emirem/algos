package main

import (
	"fmt"
	"main/other"
	"sort"

	"rsc.io/quote"
)

func main() {
	fmt.Println(quote.Glass())

	something()

	other.OtherMain()
}

type person struct {
	name string
	age  int64
}

func doSmth(name string) *person {
	myp := person{name: name}
	myp.age = 45
	return &myp
}

func containsDuplicate(arr []int) bool {
	mp := make(map[int]bool)

	for i := 0; i < len(arr); i++ {
		if _, ok := mp[arr[i]]; ok {
			return true
		} else {
			mp[arr[i]] = true
		}
	}

	return false
}

func steps(n int) int {
	if n == 0 {
		return 0
	}
	if n == 1 {
		return 1
	}
	if n == 2 {
		return 2
	}

	return steps(n-1) + steps(n-2)
}

func missingNumber(nums []int) int {
	sort.Ints(nums) // sort asc

	for i := 0; i < len(nums); i++ {
		// Last num test
		if i+1 == len(nums) {
			if nums[i] != len(nums) {
				return len(nums)
			}
		} else {
			if nums[i]+1 != nums[i+1] {
				return nums[i] + 1
			}
		}
	}

	return -1
}

func maxProfit(prices []int) int {
	maxProfit, i, j := 0, 0, 0

	for j < len(prices)-1 {
		j++

		if prices[i] < prices[j] {
			currentProfit := prices[j] - prices[i]

			if currentProfit > maxProfit {
				maxProfit = currentProfit
			}
		} else {
			i = j
		}
	}

	return maxProfit
}

// Checking if the current num increments or decrements our current sum. If inc. -> add it, else just start a new sub-array. maxSum keeps track of the biggest sub-sum seen so far.
func maxSubArr(nums []int) int {
	curr := nums[0]
	maxSum := nums[0]

	for i := 1; i < len(nums); i++ {
		if curr+nums[i] > nums[i] {
			curr += nums[i]
		} else {
			curr = nums[i]
		}

		if curr > maxSum {
			maxSum = curr
		}
	}

	return maxSum
}

// Range sum
type NumArray struct {
	val []int
}

func Constructor(nums []int) NumArray {
	return NumArray{val: nums}
}

func (numArr *NumArray) SumRange(left int, right int) int {
	sum := 0

	for left <= right {
		sum += numArr.val[left]
		left++
	}

	return sum
}

type ListNode struct {
	Val  int
	Next *ListNode
}

// 2 pointers, where 1 traverses 2 and the other one 1 place. If there's a cycle/loop, faster pointer will catch up to slower one.
func hasCycle(head *ListNode) bool {
	fast := head
	slow := head

	if head == nil || head.Next == nil {
		return false
	}

	for fast != nil && fast.Next != nil {
		fast = fast.Next.Next
		slow = slow.Next

		if slow == fast {
			return true
		}
	}
	return false
}

func middleNode(head *ListNode) *ListNode {
	slow := head
	fast := head

	for fast != nil && fast.Next != nil {
		fast = fast.Next.Next
		slow = slow.Next
	}
	return slow
}

func reverseLL(head *ListNode) *ListNode {
	if head == nil || head.Next == nil {
		return head
	}

	res := reverseLL(head.Next)
	head.Next.Next = head
	head.Next = nil

	return res
}

func compareLists(node1 *ListNode, node2 *ListNode) bool {
	if node1 == nil && node2 == nil {
		return true
	}

	if node1 == nil || node2 == nil {
		return false
	}

	if node1.Val == node2.Val {
		return compareLists(node1.Next, node2.Next)
	}

	return false
}

func isPalinrome(head *ListNode) bool {
	stack := []int{}

	// generate stack
	currNode := head

	for currNode != nil {
		stack = append(stack, currNode.Val)
		currNode = currNode.Next
	}

	currNode = head

	for i := len(stack) - 1; i > 0; i-- {
		if stack[i] == currNode.Val {
			currNode = currNode.Next
		} else {
			return false
		}
	}

	return true
}

// recursion approach
// go through the list until nil
// if we find mathing val, we return that vals next?
func removeLinkedListElement(head *ListNode, val int) *ListNode {
	if head == nil {
		return head
	}

	curr := head

	for curr.Next != nil {
		if curr.Next.Val == val {
			curr.Next = curr.Next.Next
		} else {
			curr = curr.Next
		}
	}

	if head.Val == val {
		return head.Next
	}

	return head
}

func removeLinkedListElementRec(head *ListNode, val int) *ListNode {
	if head == nil {
		return head
	}

	nxt := removeLinkedListElementRec(head.Next, val)
	head.Next = nxt

	if head.Val == val {
		return head.Next
	}

	return head
}

func deleteDuplicatesLL(head *ListNode) *ListNode {
	cur := head

	for cur != nil {
		if cur.Next != nil && cur.Val == cur.Next.Val {
			cur.Next = cur.Next.Next
			continue
		}

		cur = cur.Next
	}

	return head
}

func mergeSortedLL(list1 *ListNode, list2 *ListNode) *ListNode {
	if list1 == nil {
		return list2
	}

	if list2 == nil {
		return list1
	}

	if list1.Val < list2.Val {
		list1.Next = mergeSortedLL(list1.Next, list2)
		return list1
	}

	list2.Next = mergeSortedLL(list1, list2.Next)

	return list2
}

// QuickSort
func partitionEnd(start int, end int, arr []int) int {
	pIndex := end
	i := start - 1
	j := start

	for j < pIndex {
		if arr[j] < arr[pIndex] {
			i += 1

			arr[i], arr[j] = arr[j], arr[i]
		}

		j += 1
	}

	arr[i+1], arr[pIndex] = arr[pIndex], arr[i+1]

	return i + 1
}

func partitionStart(start int, end int, arr []int) int {
	pIndex := start
	i := end + 1
	j := end

	for j > pIndex {
		if arr[j] > arr[pIndex] {
			i -= 1

			arr[i], arr[j] = arr[j], arr[i]
		}

		j -= 1
	}

	arr[i-1], arr[pIndex] = arr[pIndex], arr[i-1]

	return i - 1
}

func partitionMid(start int, end int, arr []int) int {
	pIndex := int((start + end) / 2)
	pivot := arr[pIndex]
	i := start
	j := end

	for i <= j {
		for arr[i] < pivot {
			i += 1
		}
		for arr[j] > pivot {
			j -= 1
		}

		if i <= j {
			arr[i], arr[j] = arr[j], arr[i]
			i += 1
			j -= 1
		}
	}

	return i
}

func qSortEnd(start int, end int, arr []int) []int {
	if start < end {
		p := partitionEnd(start, end, arr)

		qSortEnd(start, p-1, arr)
		qSortEnd(p+1, end, arr)
	}

	return arr
}

func qSortStart(start int, end int, arr []int) []int {
	if start < end {
		p := partitionStart(start, end, arr)

		qSortStart(start, p-1, arr)
		qSortStart(p+1, end, arr)
	}

	return arr
}

func qSortMid(start int, end int, arr []int) []int {
	if start < end {
		p := partitionMid(start, end, arr)

		if start < p-1 {
			qSortMid(start, p-1, arr)
		}
		if p < end {
			qSortMid(p, end, arr)
		}
	}

	return arr
}

// MergeSort
func merge(arr1 []int, arr2 []int) []int {
	var result []int
	var i, j = 0, 0

	for i < len(arr1) && j < len(arr2) {
		if arr1[i] < arr2[j] {
			result = append(result, arr1[i])
			i += 1
		} else {
			result = append(result, arr2[j])
			j += 1
		}
	}

	comb1 := append(result, arr1[i:]...)

	return append(comb1, arr2[j:]...)
}

func mergeSort(arr []int) []int {
	if len(arr) <= 1 {
		return arr
	}

	midPoint := len(arr) / 2
	arr1 := arr[:midPoint]
	arr2 := arr[midPoint:]

	return merge(mergeSort(arr1), mergeSort(arr2))
}

// BubbleSort
func bubbleSort(arr []int) []int {
	j := len(arr) - 1

	for j >= 0 {
		i := 0

		for i < j {
			if arr[i] > arr[i+1] {
				arr[i], arr[i+1] = arr[i+1], arr[i]
			}
			i += 1
		}

		j -= 1
	}

	return arr
}

func binarySearch(arr []int, target int) int {
	i, j := 0, len(arr)-1

	for i <= j {
		midValIdx := i + (j-i)/2

		if target == arr[midValIdx] {
			return midValIdx
		}

		if target > arr[midValIdx] {
			i = midValIdx + 1
		} else {
			j = midValIdx - 1
		}
	}

	return -1
}