import * as Eq from "https://deno.land/x/fp_ts@v2.11.4/Eq.ts"
import * as O from "https://deno.land/x/fp_ts@v2.11.4/Option.ts"
import {Functor1, map as xxx, Functor2, getFunctorComposition} from "https://deno.land/x/fp_ts@v2.11.4/Functor.ts"
import * as A from "https://deno.land/x/fp_ts@v2.11.4/Array.ts"
import * as E from "https://deno.land/x/fp_ts@v2.11.4/Either.ts"
import { HKT, URItoKind,URItoKind2, URIS, Kind2, Kind } from "https://deno.land/x/fp_ts@v2.11.4/HKT.ts"

type URIS2 = keyof URItoKind2<any, any>



export const OURI = "Option"
export type OURI = typeof OURI
export const AURI = "Array"
export type AURI = typeof AURI
export const EURI = "Either"
export type EURI = typeof EURI

export const RURI = "Rep"
export type RURI = typeof RURI

interface Resp<A> {
    body: A
}

declare module 'https://deno.land/x/fp_ts@v2.11.4/HKT.ts' {
    interface URItoKind<A> {
	readonly Rep: Resp<A>
    }
}

export const respFunctor: Functor1<RURI> = {
    URI: RURI,
    map: (fa, f) => ({body: f(fa.body)})
}


export const optionFunctor: Functor1<OURI> = {
    URI: OURI,
    map: (fa, f) => O.map(f)(fa)
}

export const arrayFunctor: Functor1<AURI> = {
    URI: AURI,
    map: (fa, f) => A.map(f)(fa)
}

export const eitherFunctor: Functor2<EURI> = {
    URI: EURI,
    map: (fa, f) => E.map(f)(fa)
}



function mapX<M, A>(x: HKT<M, A>, f: (y: HKT<M, A>) => A): A {
    return f(x)
}
