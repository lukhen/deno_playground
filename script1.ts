import * as E from "https://deno.land/x/fp_ts@v2.11.4/Either.ts"
import * as TE from "https://deno.land/x/fp_ts@v2.11.4/TaskEither.ts"

import { assertEquals, assert } from "https://deno.land/std@0.141.0/testing/asserts.ts"

interface User {
    name: string
}

const f_success:
    (n: number) => TE.TaskEither<Error, User> =
    n => TE.tryCatch(
        () => new Promise((resolve, reject) => {
            setTimeout(() => { resolve({ name: "lukhen" }) }),
                2000
        }),
        E.toError
    )


const f_failure:
    (n: number) => TE.TaskEither<Error, User> =
    n => TE.tryCatch(
        () => new Promise((resolve, reject) => {
            setTimeout(() => { reject("some error") }),
                2000
        }),
        E.toError
    )


Deno.test("Some test", async () => {
    const x = await f_success(2)()
    assert(E.isRight(x), "fetch failed")
})

Deno.test("Another test", async () => {
    const x = await f_failure(2)()
    assert(E.isLeft(x), "fetch succeded")
})

const x: E.Either<number, string> = E.right("qw")

Deno.test("First deno test", () => {
    assertEquals(x, E.right("qw"), "failed because of some reason")
})

