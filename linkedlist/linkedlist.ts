import * as O from "https://raw.githubusercontent.com/lukhen/fp-ts/master/deno_dist/Option.ts"
import * as A from "https://raw.githubusercontent.com/lukhen/fp-ts/master/deno_dist/Array.ts"
import {pipe} from "https://raw.githubusercontent.com/lukhen/fp-ts/master/deno_dist/function.ts"
import { assertEquals } from "https://deno.land/std@0.141.0/testing/asserts.ts"

interface Element<A> {
    val: A
    next?: Element<A>
}

type LL<A> = null | Element<A>


class MyLinkedList {

    head?: Element<number> = undefined
    
    constructor() {
	
    }

    getElement(index: number): Element<number> | undefined {
	let cur = this.head
	for (let i = 0; i<index; i++) {
	    cur = cur?.next
	}
	return cur
    }

    
    get(index: number): number {
	const cur = this.getElement(index)
	if (cur == undefined)
	    return -1
	else
	    return cur.val
	    
    }

    addAtTail(val: number): void {
	if (this.head == undefined)
	    this.head = {val, next: undefined}
	else {
	    let cur = this.head
	    while (cur.next !== undefined) {
		cur = cur.next
	    }
	    cur.next = {val, next: undefined}
	}
    }
    
    addAtHead(val: number): void {
	this.head = {val, next: this.head}
    }

    addAtIndex(index: number, val: number): void {
	if (index == 0)
	    this.addAtHead(val)
	else {
	    let x = this.getElement(index-1)
	    if (x !== undefined) {
		let y = x?.next
		x.next = {val, next: y}
	    }
	}
    }

    deleteAtIndex(index: number): void {
	if (index == 0)
	    this.head = this.head?.next
	else {
	    let x = this.getElement(index-1)
	    if (x !== undefined) {
		let y = x.next?.next
		x.next = y
	    }
	}
	
    }
}

Deno.test("add at index", () => {

    let ll = new MyLinkedList()
    ll.addAtIndex(0, 0)
    assertEquals(ll.get(0), 0)
    ll.addAtIndex(0, -1)
    assertEquals(ll.get(0), -1)
    ll.addAtIndex(3, 3)
    assertEquals(ll.get(0), -1)
    assertEquals(ll.get(1), 0)
    assertEquals(ll.get(2), -1)
    ll.addAtIndex(2, 1)
    assertEquals(ll.get(0), -1)
    assertEquals(ll.get(1), 0)
    assertEquals(ll.get(2), 1)
    assertEquals(ll.get(3), -1)
    ll.deleteAtIndex(1)
    assertEquals(ll.get(0), -1)
    assertEquals(ll.get(1), 1)
    assertEquals(ll.get(2), -1)
    ll.deleteAtIndex(2)
    assertEquals(ll.get(0), -1)
    assertEquals(ll.get(1), 1)
    assertEquals(ll.get(2), -1)
    ll.deleteAtIndex(0)
    assertEquals(ll.get(0), 1)
    assertEquals(ll.get(1), -1)
    ll.deleteAtIndex(0)
    assertEquals(ll.get(0), -1)
})


Deno.test("get, empty", () => {

    let ll = new MyLinkedList()
    assertEquals(ll.get(0), -1)
})

Deno.test("get 1st, length=2", () => {

    let ll = new MyLinkedList()
    ll.addAtHead(2)
    ll.addAtHead(1)
    assertEquals(ll.get(1), 2)
})

Deno.test("get 2nd, length=3", () => {

    let ll = new MyLinkedList()
    ll.addAtHead(3)
    ll.addAtHead(2)
    ll.addAtHead(1)
    assertEquals(ll.get(2), 3)
})

Deno.test("get 3rd, length=4", () => {

    let ll = new MyLinkedList()
    ll.addAtHead(3)
    ll.addAtHead(2)
    ll.addAtHead(1)
    ll.addAtHead(0)
    assertEquals(ll.get(3), 3)
})

Deno.test("get 4th, length=5", () => {

    let ll = new MyLinkedList()
    ll.addAtHead(4)
    ll.addAtHead(3)
    ll.addAtHead(2)
    ll.addAtHead(1)
    ll.addAtHead(0)
    assertEquals(ll.get(4), 4)
})


Deno.test("addAtHead", () => {

    let ll = new MyLinkedList()
    ll.addAtHead(1)
    assertEquals(ll.get(0), 1)
})

Deno.test("addAtTail", () => {

    let ll = new MyLinkedList()
    ll.addAtTail(1)
    assertEquals(ll.get(0), 1)
})

Deno.test("addAtTail", () => {

    let ll = new MyLinkedList()
    ll.addAtTail(1)
    ll.addAtTail(2)
    assertEquals(ll.get(1), 2)
    ll.addAtHead(121)
    assertEquals(ll.get(5), -1)
    assertEquals(ll.get(2), 2)
    assertEquals(ll.get(0), 121)
})
