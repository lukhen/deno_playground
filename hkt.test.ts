interface Box<A> {
    value: A
} 

interface URItoKind<A> {
    'Array': Array<A>
    'Box': Box<A>
}

type URIS = keyof URItoKind<unknown>

type Kind<F extends URIS, A> = URItoKind<A>[F]

interface Mappable<F extends URIS> {
    readonly map: <A, B>(f: (a: A) => B) => (as: Kind<F, A>) => Kind<F, B>
}

const mappableBox: Mappable<'Box'> = {
    map: f => boxwithA => ({value: f(boxwithA.value)})
}


mappableBox.map((n: number) => n.toString())
