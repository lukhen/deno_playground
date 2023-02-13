import { assertEquals } from "https://deno.land/std@0.141.0/testing/asserts.ts"

function head<A>(arr: A[]): A {
    return arr[0]
}

function tail<A>(arr: A[]): A {
    return arr[arr.length-1]
}

function f(nums: number[], i: number, acc: number[]): number[] {
    if (nums.length >= i-1)
	return acc.slice(1)
    return f(nums, i+1, acc.concat([nums[i] + tail(acc)]))
}

function runningSum(nums: number[]): number[] {
    return f(nums, 0, [0])
}

Deno.test("asdf", () => {
    //assertEquals(runningSum([]), [])
    assertEquals(runningSum([0]), [0])
    //assertEquals(runningSum([1]), [1])
    //assertEquals(runningSum([1, 2]), [1, 1+2])
    //assertEquals(runningSum([3,1,2,10,1]), [3,4,6,16,17]

})
