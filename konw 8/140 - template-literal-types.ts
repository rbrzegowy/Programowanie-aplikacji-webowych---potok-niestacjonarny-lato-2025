////////////////////////////////
// Template Literal Types
////////////////////////////////
type Msg = 'everything_is_ok' | 'something_went_wrong'
type MsgIdKey = `${Msg}_id_key`


type Cities1 = 'krakow' | 'wroclaw' | 'poznan'
type Cities2 = 'warszawa' | 'gdynia' | 'szczecin'
type CrossCities = `${Cities1}-${Cities2}`

// z liczbami:
type ZipCode = `${number}-${number}`
const zip: ZipCode = '1268854-116463' // 😠

type Digit0To9 = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
type Digit1To9 = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

// zobacz w podpowiedzi:
type TwoDigits = `${Digit0To9}${Digit0To9}`
// tego nie próbuj, raczej pobaw się zapałkami...
// type ZipCode2 = `${Digit0To9}${Digit0To9}-${Digit0To9}${Digit0To9}${Digit0To9}`
// raczej generujemy ahead of time takie rzeczy

// typy dla jednostek rozmiarów w CSS
type ValueInPx = `${number}px`
type PercentValue = `${Digit0To9}%` | `${Digit1To9}${Digit0To9}%` | '100%'

// @ts-expect-error
const value: ValueInPx = '10%'

//Poprawna wartość:
const value2: ValueInPx = '25px'


// Modyfikatory wbudowane (intrinsic):
// Uppercase<StringType>
// Lowercase<StringType>
// Capitalize<StringType>
// Uncapitalize<StringType>
type UserPropertyName = 'name'
type APIUserPropertyName = Uppercase<UserPropertyName>


// fajny przykład z dokumentacji ts na string unions:
// makewatchedObject dodaje do dowolnego obiektu metodę "on" 
// "on" pozwala nasłuchiwać na zmiany we właściowściach obiektu 
// (taki addEventListener na wartość zadanej właściwości obiektu))

// ZADANIE: nazwy zdarzeń dla "on" są generowane na podstawie kluczy obiektu
type WatchableObject<T> = T & { on(eventName: string, cb: (newValue: any) => void): void }

// ale powyższe pozwala podać dowolny eventName, idziemy dalej:
// type WatchableObject<T> = { on(eventName: `${string}Changed`, cb: (newValue: any) => void): void }

// spoko, ale powyższe pozwala podać dowolny eventName kończący się na "Changed" 
// a chcemy tylko firstnameChanged, lastNameChanged, ageChanged itd
// nie możemy użyć samego keyof T bo w template literal type nie możemy dać symbol
// (a keyof T to string | number | symbol) - więc go ucinamy intersekcją z string
// type WatchableObject<T> = {
//   on(eventName: `${keyof T}Changed`, callback: (newValue: any) => void): void
// }
// type OnlyStringKeys<T> = string & keyof T
// type WatchableObject<T> = {
//   on(eventName: `${OnlyStringKeys<T>}Changed`, callback: (newValue: any) => void): void
// }

// wszystko fajnie, tylko dlaczego musimy mieć "any" w callbacku? Nie musimy:)
// możemy klucz wyinferować z eventName do generyka Key
// type WatchableObject<T> = {
//   on<Key extends OnlyStringKeys<T>>(eventName: `${Key}Changed`, callback: (newValue: T[Key]) => void): void
// }


declare function makeWatchedObject<T>(obj: T): T & WatchableObject<T>
const person = makeWatchedObject({
  firstName: "Saoirse",
  lastName: "Ronan",
  age: 26,
})

person.on(
  'firstNameChanged',
  (newValue) => console.log(`firstName was changed to ${newValue} !`)
)