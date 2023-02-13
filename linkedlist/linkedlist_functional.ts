import * as O from "https://raw.githubusercontent.com/lukhen/fp-ts/master/deno_dist/Option.ts"
import * as A from "https://raw.githubusercontent.com/lukhen/fp-ts/master/deno_dist/Array.ts"
import {pipe} from "https://raw.githubusercontent.com/lukhen/fp-ts/master/deno_dist/function.ts"
import { assertEquals } from "https://deno.land/std@0.141.0/testing/asserts.ts"


interface Element<A> {
    val: A
    next: LL<A>
}

type LL<A> = O.Option<Element<A>>

function getNext<A>(el: LL<A>): LL<A> {
    return pipe(
	el,
	O.chain(el => el.next)
    )
}

function setNext<A>(el: LL<A>): (ll: LL<A>) => void {
    return ll => {
	pipe(
	    ll,
	    O.map(x => {x.next = el})
	)
    }
}

function emptyList<A>(): LL<A> {
    return O.none
}

function addAtHead<A>(val: A): (head: LL<A>) => LL<A> {
    return head => O.some({val, next: head})
}

function getElementAt<A>(index: number): (head: LL<A>) => O.Option<Element<A>> {

    function f(index: number, curIndex: number): (head: LL<A>) => O.Option<Element<A>> {
	return head => index == curIndex ? head : pipe(
	    head,
	    O.fold(
		() => head,
		h => f(index, curIndex+1)(h.next)
	    ))
    }

    return f(index, 0)
}

function getValueAt<A>(index: number): (head: LL<A>) => O.Option<A> {
    return head => pipe(
	head,
	getElementAt(index),
	O.map(el => el.val)
    )
}

/*
Remove head
Examples:
removeHead(emptyList()) => O.none
removeHead({val: 1, next: O.none}) => O.none
removeHead({val: 1, next: O.some({val: 2, next: O.none})}) => O.some({val: 2, next: O.none})
*/
function removeHead<A>(ll: LL<A>): LL<A> {
    return pipe(
	ll,
	O.fold(
	    () => ll,
	    head => head.next
	)
    )
}

Deno.test("ad", () => {
    const el4: LL<number> = O.some({val: 100, next: O.none})
    const el3: LL<number> = O.some({val: 100, next: O.none})
    const el2: LL<number> = O.some({val: 100, next: el3})
    const el1: LL<number> = O.some({val: 100, next: el2})
    const el0: LL<number> = O.some({val: 100, next: el1})

    pipe(
	el0,
	getNext,
	getNext,
	getNext,
	setNext(el0)
    )

    const slow = pipe(
	el0,
	getNext,
	getNext,
	getNext,
	getNext
    )

    const fast = pipe(
	el0,
	getNext,
	getNext,
	getNext,
	getNext,
	getNext,
	getNext,
	getNext,
	getNext
    )
    console.log(slow == fast)
})


Deno.test("step, empty", () => {
    assertEquals(removeHead(emptyList()), O.none)
})

Deno.test("step, one element", () => {
    const l: LL<number> = O.some({val: 2, next: O.none})
    assertEquals(removeHead(l), O.none)
})

Deno.test("step, two elements", () => {
    const l: LL<number> = O.some({val: 1, next: O.some({val: 2, next: O.none})})
    assertEquals(removeHead(l), O.some({val: 2, next: O.none}))
})



Deno.test("get, empty", () => {

    let ll = emptyList()
    assertEquals(getValueAt(0)(ll), O.none)
})

Deno.test("get 0th, length=1", () => {

    let ll = emptyList<number>()
    assertEquals(
	getValueAt(0)(addAtHead(1)(ll)),
	O.some(1)
    )
})

Deno.test("get 1st, length=2", () => {

    const val = pipe(
	emptyList<number>(),
	addAtHead(2),
	addAtHead(1),
	getValueAt(1)
    )
    assertEquals(val, O.some(2))
})

Deno.test("get 2nd, length=3", () => {

    const val = pipe(
	emptyList<number>(),
	addAtHead(3),
	addAtHead(2),
	addAtHead(1),
	getValueAt(2)
    )
    assertEquals(val, O.some(3))
})

Deno.test("get 3rd, length=4", () => {

    const val = pipe(
	emptyList<number>(),
	addAtHead(3),
	addAtHead(2),
	addAtHead(1),
	addAtHead(0),
	getValueAt(3)
    )
    assertEquals(val, O.some(3))
})

Deno.test("get 4th, length=5", () => {

    const val = pipe(
	emptyList<number>(),
	addAtHead(4),
	addAtHead(3),
	addAtHead(2),
	addAtHead(1),
	addAtHead(0),
	getValueAt(4)
    )
    assertEquals(val, O.some(4))
})


Deno.test("addAtHead", () => {
    const val = pipe(
	emptyList<number>(),
	addAtHead(1),
	getValueAt(0)
    )
    assertEquals(val, O.some(1))
})
