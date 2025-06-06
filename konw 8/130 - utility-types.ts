///////////////////////////////////////////////////////////////////
// Utility types - gotowce:)
// Pełna lista: 
// https://www.typescriptlang.org/docs/handbook/utility-types.html
///////////////////////////////////////////////////////////////////

// Partial
type WszystkoOpcjonalne = Partial<{ x: number, y: number }>

// Required
type WszystkoWymagane = Required<{ x?: number, y: number }>

// Readonly (shallow!)
type WszystkoZamrozone = Readonly<{ x: number, y: number[] }>
// const xb: WszystkoZamrozone = { x: 1, y: [2] }
// xb.y.push(3)

// type Product = { id: number, name: string, price: number, comments: { comment: string, date: string }[] }
// type ProductComments = {id: number, comments: string[]}
// Pick
type TylkoImieIWiek = Pick<{ imie: string, nazwisko: string, wiek: number }, 'imie' | 'wiek'>

// Omit
type TylkoImieIWiek2 = Omit<{ imie: string, nazwisko: string, wiek: number }, 'nazwisko'>
// można zepsuć
type TylkoImieIWiek3 = Omit<{ imie: string, nazwisko: string, wiek: number }, 'nazw3isko'>
// i można napisać własny, type-safe Omit
type SafeOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

type TylkoImieIWiek4 = SafeOmit<{ imie: string, nazwisko: string, wiek: number }, 'nazwisko'>

// Record
type AlbumId = string
type AlbumDescription = { title: string, description: string }
type SlownikAlbumow = Record<AlbumId, AlbumDescription>
// type SlownikAlbumow2 = {
//   [albumId: string]: AlbumDescription
// }

// NonNullable
type NullableString = string | null
type AlwaysString = NonNullable<NullableString>

// Utility types można podglądnąć w lib.es5.d.ts - świetne źródło wiedzy!
type User5 = { name: string } | null
function userGetName(user: NonNullable<User5>) {
  console.log(user.name)
}