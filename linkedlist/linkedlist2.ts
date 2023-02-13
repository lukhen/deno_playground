import { assertEquals } from "https://deno.land/std@0.141.0/testing/asserts.ts"

class ListNode {
     val: number
     next: ListNode | null

     constructor(val?: number, next?: ListNode | null) {
         this.val = (val===undefined ? 0 : val)
         this.next = (next===undefined ? null : next)
     }
 }


let x = new ListNode()

Deno.test("asdf", () => {
    let no_cycle_list = new ListNode(
	0,
	new ListNode(
	    1,
	    new ListNode(
		2,
		new ListNode(
		    3,
		    null
		)
	    )
	)
    )

    let list_with_cycle = new ListNode(
	0,
	new ListNode(
	    1,
	    new ListNode(
		2,
		new ListNode(
		    3,
		    null
		)
	    )
	)
    )

    list_with_cycle.next!.next!.next!.next = list_with_cycle.next

    console.log(list_with_cycle.next?.next?.next?.next?.next?.next?.next?.val)
})
