/*
-型定義-
*/

// プリミティブ型
// 具体的な値を代入すれば自動で型推論される
const str = 'test'
const num = 1
const bool = true

// 配列の場合、中身の型[]
const numArray: number[] = [num, 1, 2, 3]
const strArray: string[] = [str, 'foo', 'bar', 'foobar']

// 例として使用するArrayの中身を定義
interface testArray {
  value: number;
  text: string;
}

// オブジェクト
const testuser: { firstname: string; lastname: string } = {
  firstname: 'quai',
  lastname: 'mars'
}

// 配列の中身がオブジェクトの時
const fooArray: testArray[] = [
  { value: 1, text: '文字' },
  { value: 2, text: '文字' },
  { value: 3, text: '文字' },
  { value: 4, text: '文字' }
]

/*
type:型や型の組み合わせに別名を付ける
型の組み合わせの定義はInterfaceでは不可

typeとinterfaceではオーバーライドした際の型の定義方法が異なる

組み合わせ
- 交差型：A & B    AとBの両方が代入される
- 共用体型：A | B  AとBのどちらかが代入される
- タプル型：[A, B] 配列の中身と順番を定義
*/

/*
-ジェネリクス-
*/

// 関数のジェネリクス
// 定義段階では型が未定なT型を<T>で設定する
function test<T> (arg: T): T {
  return arg
}

// 実行段階で<>内に型を指定することで引数Tの型解決をする
test<number>(1)
test<string>('文字列')
test('文字列２')

// 引数：型が未定なT,n
// 戻り値：中身がTのArray
function multiply<T> (value: T, n: number): Array<T> {
// 中身にTをとる戻り値用の配列を用意
  const result: Array<T> = []
  result.length = n
  // fillで配列の中身を全てvalue<T型> に変更
  result.fill(value)
  return result
}

// 実行段階で<>内にTの型を宣言

// 30が10個入った配列
const numValue = multiply<number>(30, 10)
// HELLOが10個入った配列
const strValue = multiply<string>('HELLO', 10)

// オブジェクトのジェネリクス
interface Hoge<T> {
  value: T;
}
const hoge: Hoge<string> = { value: 'ふー' }
const hoge2: Hoge<string> = { value: 'valueの型はstring' }
const hoge3: Hoge<number> = { value: 12345 }

/*
Interface
*/
interface Person {
  name: string;
  age: number;
}

const taro: Person = {
  name: '太郎',
  age: 12
}

/*
constとreadonly
*/

// constは変数の再代入NG（参照先の変更）
// プロパティのアクセスと変更はOK
const x = { y: 1 }
// x = { y: 2 } error
x.y = 2 // ok

// readonlyは再代入はOK
// プロパティの変更はNG
let obj: { readonly x: number } = { x: 1 }
obj = { x: 2 } // 許可される
// obj.x = 2;

// DeepReadOnly:プロパティも変数の再代入も禁止
const obj2: { readonly x: number } = { x: 1 }
