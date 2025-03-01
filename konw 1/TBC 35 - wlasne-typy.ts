////////////////////////////////
// Własne typy
// semantyka - nazwy typów zwyczajowo piszemy PascalCasem
// typ deklarujemy za pomocą słowa kluczowego 'type'
////////////////////////////////



////////////////////////////////
// Tuple - tutaj np. wartość wagi i jednostka wagi
////////////////////////////////
type Waga = [number, string]

const wagaMotyla: Waga = [6, 'gram']
type CityLatLong = [string, number, number]
const krakow: CityLatLong = ['Kraków', 50.049683, 19.944544]
// tuple z etykietami:
type ValueChange = [prev: number, next: number]

const newPrice: ValueChange = [100, 50]
newPrice

// tuple:
// 1. likwidują problem typowania tablic o różnym typie zawartości w poszczególnych polach
// type Waga: any[]
// type Waga: (number | string)[]
// 2. mają stała długość - uporządkowane (co do kolejności) kolekcje elementów

// tuple niestety są mało czytelne w użyciu:
const krakowLat = krakow[0] // a może krakow[1]?

// można ładniej:
// const wagaMotyla2 = {
//   wartosc: 6,
//   jednostka: 'gram',
// }
// type CityLatLng = {
//   name: string,
//   lat: number,
//   long: number,
// }

// użycie:
// 1. Parametry resztowe funkcji: 
function fnRest(reqArg: string, ...rest: [number, string, string]) {}
fnRest // zacznij nawias i zobacz na podpowiedź argumentów :)
// 2. i w drugą stronę - przekazywanie tupla jako parametry
const tup = [1, 'string', 'string2'] as const
fnRest('req', ...tup)
// 3. tuple można destrukturyzować z jednoznacznym typem
// array
const arr = [1, 2, 'trzy']
// detrukturyzacja tablicy - zobacz typy
const [jeden, dwa, trzy] = arr // typy dla jeden, dwa, trzy: string | number

// tuple
const t456: [number, number, string] = [4, 5, 'sześć']
const [cztery, piec, szesc] = t456 // typy: number, number, string
