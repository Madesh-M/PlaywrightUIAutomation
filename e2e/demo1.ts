let message1: string = "Hi";

let num: number = 22;
let numArr: number[] = [10, 20, 30];
let bool: boolean = true;

//if you are not sure of type then
let name1: any = "this can be any type";
name1 = 22;

console.log(message1);

function add(a: number, b: number): number {
  return a + b;
}

add(3, 4);

//json object in ts

let user: { name: string; age: number } = { name: "Mada", age: 22 };
