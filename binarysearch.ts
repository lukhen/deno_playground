import { assertEquals } from "https://deno.land/std@0.141.0/testing/asserts.ts"

function searchlr(nums: number[], target: number, left: number, right: number): number {
    if (right - left == 0) {
	if (nums[0] == target)
	    return 0
	else
	    return -1
    }
    if (right-left < 0)
	return -1
    if(right-left == 1) {
	if(nums[right] == target)
	    return right
	else if(nums[left] == target)
	    return left
	else return -1
    }
    const pivot = ~~((right+left)/2)
    if (nums[pivot] == target)
	return pivot
    else if (target < nums[pivot])
	return searchlr(nums, target, left, pivot)
    else
	return searchlr(nums, target, pivot, right)
}


function search(nums: number[], target: number): number {
    return searchlr(nums, target, 0, nums.length-1)
}

Deno.test("empty", () => {
    assertEquals(search([], 0), -1)
})

Deno.test("unempty", () => {
    assertEquals(search([5], 5), 0)
    assertEquals(search([1, 2, 3, 4, 5], 3), 2)
    assertEquals(search([1, 2, 3, 4, 5], 1), 0)
    assertEquals(search([1, 2, 3, 4, 5], 5), 4)
    assertEquals(search([1, 2, 3, 4, 5], 6), -1)
})
// one element list ...
//search([1, 2, 3, 4, 5], 5)
