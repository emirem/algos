package main

import (
	"testing"
)

func TestMain(t *testing.T) {
	got := doSmth("myname")

	if got.name != "myname" || got.age != 45 {
		t.Error("Failed. Got: ", got)
	}
}

func TestContainsDuplicate(t *testing.T) {
	var sm = []int{1, 2, 3, 3}

	if containsDuplicate(sm) == false {
		t.Error("Fail")
	}
}

func TestSteps(t *testing.T) {
	var tests = []struct {
		val  int
		want int
	}{
		{0, 0},
		{1, 1},
		{2, 2},
		{3, 3},
		{4, 5},
		{5, 8},
	}

	for _, tt := range tests {
		res := steps(tt.val)
		if res != tt.want {
			t.Errorf("Wrong steps. Wanted %d, with %d. Got %d", tt.want, tt.val, res)
		}
	}
}

func TestMissingNumber(t *testing.T) {
	nums := []int{3, 0, 1}
	nums2 := []int{0, 1}

	res := missingNumber(nums)

	if res != 2 {
		t.Errorf("Got %d | Expected %d", res, 2)
	}

	res2 := missingNumber(nums2)

	if res2 != 2 {
		t.Errorf("Got %d | Expected %d", res2, 2)
	}
}

func TestMaxProfit(t *testing.T) {
	var tests = []struct {
		val  []int
		want int
	}{
		{[]int{7, 1, 5, 3, 6, 4}, 5},
		{[]int{7, 6, 4, 3, 1}, 0},
	}

	for _, test := range tests {
		maxP := maxProfit(test.val)

		if maxP != test.want {
			t.Errorf("Max profit is wrong. Expected %d | Got %d", test.want, maxP)
		}
	}
}

func TestMaxSubArr(t *testing.T) {
	var tests = []struct {
		val  []int
		want int
	}{
		{[]int{-2, 1, -3, 4, -1, 2, 1, -5, 4}, 6},
		{[]int{1}, 1},
		{[]int{5, 4, -1, 7, 8}, 23},
	}

	for _, test := range tests {
		maxP := maxSubArr(test.val)

		if maxP != test.want {
			t.Errorf("Max profit is wrong. Expected %d | Got %d", test.want, maxP)
		}
	}
}

func TestRangeSum(t *testing.T) {
	obj := Constructor([]int{1, 2, 3})
	result := obj.SumRange(0, 2)

	if result != 6 {
		t.Errorf("Sum range failed. Expected %d | Got %d", 6, result)
	}
}

func TestLinkedListCycle(t *testing.T) {
	node1 := ListNode{Val: 3}
	node2 := ListNode{Val: 2}
	node3 := ListNode{Val: 0}
	node4 := ListNode{Val: -4}

	node1.Next = &node2
	node2.Next = &node3
	node3.Next = &node4
	node4.Next = &node2

	res := hasCycle(&node1)

	if res != true {
		t.Errorf("List cycle check failed. Expected %v | Got %v", true, res)
	}
}

func TestMiddleNode(t *testing.T) {
	node1 := ListNode{Val: 1}
	node2 := ListNode{Val: 2}
	node3 := ListNode{Val: 3}
	node4 := ListNode{Val: 4}
	node5 := ListNode{Val: 5}
	node6 := ListNode{Val: 6}

	node1.Next = &node2
	node2.Next = &node3
	node3.Next = &node4
	node4.Next = &node5
	node5.Next = &node6

	res := middleNode(&node1)

	if res.Val != 4 {
		t.Errorf("List cycle check failed. Expected %v | Got %v", 4, res.Val)
	}
}

func TestIsPalindrome(t *testing.T) {
	list := ListNode{Val: 1, Next: &ListNode{Val: 2, Next: &ListNode{Val: 2, Next: &ListNode{Val: 1}}}}

	isPal := isPalinrome(&list)

	if isPal != true {
		t.Errorf("Should be palindrome")
	}
}

func TestRemoveLinkedListElement(t *testing.T) {
	list := ListNode{Val: 1, Next: &ListNode{Val: 2, Next: &ListNode{Val: 3, Next: &ListNode{Val: 1}}}}

	removed := removeLinkedListElement(&list, 1)

	curr := removed

	for curr != nil {
		if curr.Val == 1 {
			t.Errorf("Node should not exist")
		}
		curr = curr.Next
	}
}

func TestRemoveLinkedListElementRec(t *testing.T) {
	list := ListNode{Val: 1, Next: &ListNode{Val: 2, Next: &ListNode{Val: 3, Next: &ListNode{Val: 1}}}}

	removed := removeLinkedListElementRec(&list, 1)

	curr := removed

	for curr != nil {
		if curr.Val == 1 {
			t.Errorf("Node should not exist")
		}
		curr = curr.Next
	}
}

// func TestRemoveLLDuplicats(t *testing.T) {
// 	list := &ListNode{Val: 1, Next: &ListNode{Val: 1, Next: &ListNode{Val: 1, Next: &ListNode{Val: 2}}}}

// 	removed := deleteDuplicatesLL(list)
// 	cur := removed
// 	var nums []int

// 	for cur != nil {
// 		nums = append(nums, cur.Val)
// 	}

// 	if removed == list {
// 		t.Errorf("List did not change")
// 	}
// }

func TestMergeSortedLL(t *testing.T) {
	list1 := &ListNode{Val: 1, Next: &ListNode{Val: 2}}
	list2 := &ListNode{Val: 3, Next: &ListNode{Val: 4}}

	merged := mergeSortedLL(list1, list2)

	curr := merged

	for curr.Next != nil {
		curr = curr.Next

		if curr.Next != nil && curr.Val > curr.Next.Val {
			t.Errorf("Node should not be here: %d", curr.Val)
		}
	}
}

func TestQSort(t *testing.T) {
	arr := []int{54, 14, 1, 6, 43, 6}

	sortedStart := qSortStart(0, len(arr)-1, arr)
	sortedEnd := qSortEnd(0, len(arr)-1, arr)
	sortedMid := qSortMid(0, len(arr)-1, arr)

	for idx, num := range sortedStart {
		if idx+1 < len(sortedStart) && num > sortedStart[idx+1] {
			t.Errorf("Not sorted with start %v", sortedStart)
			break
		}
	}

	for idx, num := range sortedEnd {
		if idx+1 < len(sortedEnd) && num > sortedEnd[idx+1] {
			t.Errorf("Not sorted with end %v", sortedEnd)
			break
		}
	}

	for idx, num := range sortedMid {
		if idx+1 < len(sortedMid) && num > sortedMid[idx+1] {
			t.Errorf("Not sorted with end %v", sortedMid)
			break
		}
	}
}

func TestMergeSort(t *testing.T) {
	arr := []int{54, 14, 1, 6, 43, 6}

	sorted := mergeSort(arr)

	for idx, num := range sorted {
		if idx+1 < len(sorted) && num > sorted[idx+1] {
			t.Errorf("Not sorted with end %v", sorted)
			break
		}
	}
}

func TestBubbleSort(t *testing.T) {
	arr := []int{54, 14, 1, 6, 43}

	sorted := bubbleSort(arr)

	for idx, num := range sorted {
		if idx+1 < len(sorted) && num > sorted[idx+1] {
			t.Errorf("Not sorted with end %v", sorted)
			break
		}
	}
}

func TestBinarySearch(t *testing.T) {
	arr := []int{-1, 0, 3, 5, 9, 12}

	res := binarySearch(arr, 12)

	if res == -1 {
		t.Errorf("Value should exist")
	}
}

func TestNextGreatestLetter(t *testing.T) {
	arr := []byte("cfj")
	result := nextGreatesLetter(arr, []byte("c")[0])

	if string(result) != "f" {
		t.Errorf("Wrong letter %d %v", result, string(result))
	}
}

func TestPeakIndexMountainArray(t *testing.T) {
	arr := []int{24, 69, 100, 99, 79, 78, 67, 36, 26, 19}
	result := peakIndexMountainArray(arr)

	if result != 2 {
		t.Errorf("Wrong peak %d", result)
	}
}

// func TestTreeTraversal(t *testing.T) {
// 	tree := TreeNode{Val: 1, Left: &TreeNode{Val: 2, Left: &TreeNode{Val: 4}, Right: &TreeNode{Val: 5}}, Right: &TreeNode{Val: 3, Left: &TreeNode{Val: 6}, Right: &TreeNode{Val: 7}}}

// 	treeTraversal(&tree)

// 	// t.Errorf("Wrong tree %v", tree)
// }

func TestTreeDFS(t *testing.T) {
	tree := TreeNode{Val: 1, Left: &TreeNode{Val: 2, Left: &TreeNode{Val: 4}, Right: &TreeNode{Val: 5}}, Right: &TreeNode{Val: 3, Left: &TreeNode{Val: 6}, Right: &TreeNode{Val: 7}}}

	result := treeDFS(&tree, 1)

	if result == -1 {
		t.Errorf("Value not found in tree %v", result)
	}

}

func TestTreeBFS(t *testing.T) {
	tree := &TreeNode{Val: 1, Left: &TreeNode{Val: 2, Left: &TreeNode{Val: 4}, Right: &TreeNode{Val: 5}}, Right: &TreeNode{Val: 3, Left: &TreeNode{Val: 6}, Right: &TreeNode{Val: 7}}}

	result := treeBFS(tree, 6)

	if result == -1 {
		t.Errorf("Value not found in tree %v", result)
	}
}

func TestAverageOfLevels(t *testing.T) {
	tree := &TreeNode{Val: 1, Left: &TreeNode{Val: 2, Left: &TreeNode{Val: 4}, Right: &TreeNode{Val: 5}}, Right: &TreeNode{Val: 3, Left: &TreeNode{Val: 6}, Right: &TreeNode{Val: 7}}}

	sums := averageOfLevels(tree)
	expected := []float64{1, 2.5, 5.5}

	for idx, num := range sums {
		if num != expected[idx] {
			t.Errorf("Expected sum not there %v", num)
		}
	}
}

func TestMinDepth(t *testing.T) {
	tree := &TreeNode{Val: 1, Left: &TreeNode{Val: 2, Left: &TreeNode{Val: 4}}, Right: &TreeNode{Val: 3, Left: &TreeNode{Val: 6}, Right: &TreeNode{Val: 7}}}

	min := minDepth(tree)

	if min != 3 {
		t.Errorf("Min depth is wrong %d", min)
	}
}

func TestIsSameTree(t *testing.T) {
	tree := &TreeNode{Val: 1, Left: &TreeNode{Val: 2, Left: &TreeNode{Val: 4}}, Right: &TreeNode{Val: 3, Left: &TreeNode{Val: 6}, Right: &TreeNode{Val: 7}}}
	tree2 := &TreeNode{Val: 1, Left: &TreeNode{Val: 2, Left: &TreeNode{Val: 4}}, Right: &TreeNode{Val: 3, Left: &TreeNode{Val: 6}, Right: &TreeNode{Val: 7}}}

	isSame := isSameTree(tree, tree2)

	if isSame == false {
		t.Error("Should be the same tree")
	}
}

func TestHasPathSum(t *testing.T) {
	tree := &TreeNode{Val: 1, Left: &TreeNode{Val: 2}, Right: &TreeNode{Val: 3}}

	hasSum := hasPathSum(tree, 4)

	if hasSum == false {
		t.Errorf("Should have that sum %v", hasSum)
	}
}

// func TestMergeTrees(t *testing.T) {
// 	tree1 := TreeNode{Val: 1, Left: &TreeNode{Val: 3, Left: &TreeNode{Val: 5}}, Right: &TreeNode{Val: 2}}
// 	tree2 := TreeNode{Val: 2, Left: &TreeNode{Val: 1, Right: &TreeNode{Val: 4}}, Right: &TreeNode{Val: 3, Right: &TreeNode{Val: 7}}}

// 	res := mergeTrees(&tree1, &tree2)

// 	t.Errorf("Tree not merged properly %v", res)
// }

func TestLowestCommonAncestor(t *testing.T) {
	tree := &TreeNode{Val: 6, Left: &TreeNode{Val: 2, Left: &TreeNode{Val: 0}, Right: &TreeNode{Val: 4}}, Right: &TreeNode{Val: 8, Left: &TreeNode{Val: 7}, Right: &TreeNode{Val: 9}}}

	res := lowestCommonAncestor(tree, &TreeNode{Val: 2}, &TreeNode{Val: 4})

	if res.Val != 2 {
		t.Errorf("Common ancestor is wrong %v", res)
	}
}

// func TestInvertTree(t *testing.T) {
// 	tree := &TreeNode{Val: 2, Left: &TreeNode{Val: 1}, Right: &TreeNode{Val: 3}}

// 	res := invertTree(tree)

// 	treeTraversal(res)

// 	t.Errorf("Invert result %v", res)
// }

func TestTwoSum(t *testing.T) {
	nums := []int{3, 2, 4}
	target := 6
	expected := []int{1, 2}

	res := twoSum(nums, target)

	for idx, val := range res {
		if val != expected[idx] {
			t.Errorf("Two sum wrong %v", res)
		}
	}
}

func TestTwoSumSorted(t *testing.T) {
	nums := []int{2, 7, 11, 15}
	target := 9

	res := twoSumSorted(nums, target)

	if res != [2]int{0, 1} {
		t.Errorf("Two sum sorted wrong %v", res)
	}
}

func TestSortedSquares(t *testing.T) {
	arr := []int{-4, -1, 0, 3, 10}
	expected := []int{0, 1, 9, 16, 100}

	res := sortedSquares(arr)

	for idx, val := range res {
		if val != expected[idx] {
			t.Errorf("Sorted square wrong %v", res)
		}
	}
}

func TestBackspaceCompare(t *testing.T) {
	str := "y#fo##f"
	str2 := "y#f#o##f"

	if backSpaceCompare(str, str2) == false {
		t.Error("Strings should be the same")
	}
}
