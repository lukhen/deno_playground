import { assertEquals } from "https://deno.land/std@0.141.0/testing/asserts.ts"

/*
  https://leetcode.com/problems/search-insert-position/
  
Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.

You must write an algorithm with O(log n) runtime complexity.

 

Example 1:

Input: nums = [1,3,5,6], target = 5
Output: 2

Example 2:

Input: nums = [1,3,5,6], target = 2
Output: 1

Example 3:

Input: nums = [1,3,5,6], target = 7
Output: 4
*/

function f(nums: number[], target: number, l: number, r: number): number {
    if (l == r) {
	if (nums[l] > target)
	    return l
	else if (nums[l] < target)
	    return l+1
	else
	    return l
    }
    else {
	const p = ~~((r+l)/2)
	if (nums[p] == target)
	    return p
	else if (nums[p] < target)
	    return f(nums, target, p+1, r)
	else
	    if (p == l)
		return f(nums, target, l, p)
	    else
		return f(nums, target, l, p-1)
    }
}

function searchInsert(nums: number[], target: number): number {
    if (nums.length == 0)
	return 0
    else
	return f(nums, target, 0, nums.length-1)
}



Deno.test("1", () => {
    assertEquals(searchInsert([], 2), 0)
    assertEquals(searchInsert([0], 2), 1)
    assertEquals(searchInsert([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 18], 17), 17)
    assertEquals(searchInsert([1, 3, 5, 6, 8, 10], 2), 1)

    assertEquals(searchInsert([6], 5), 0)
    assertEquals(searchInsert([1], 5), 1)
    assertEquals(searchInsert([1, 3, 5, 6], 5), 2)
    assertEquals(searchInsert([1, 3, 5, 6], 2), 1)
    assertEquals(searchInsert([1, 3, 5, 6], 7), 4)
    
})


//searchInsert([1, 3, 5, 6, 8, 10], 0)
//searchInsert([1, 3, 5, 6, 8, 10], 2)
