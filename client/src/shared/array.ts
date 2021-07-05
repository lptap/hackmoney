export type NestedArray<T> = Array<T | NestedArray<T>>

/**
 * Flatten an array recursively
 *
 * @see https://github.com/jonschlinkert/arr-flatten
 * @license MIT
 */
export function flattenArray<T>(nestedArray: NestedArray<T>): T[] {
  const result: T[] = []

  flatten(nestedArray, result)

  return result
}

function flatten<T>(input: NestedArray<T>, result: T[]) {
  let arrLen = input.length
  let index = 0

  while (arrLen--) {
    const current = input[index++]
    if (Array.isArray(current)) {
      flatten(current, result)
    } else {
      result.push(current)
    }
  }
}

/**
 * Create an array with particular length
 *
 * @param length the length of the array to be created
 * @param filler the value of all elements in the array
 */
export const createArray = <T = unknown>(length: number, filler: T = undefined as any as T) => {
  const result: T[] = []
  for (let index = 0; index < length; index++) {
    result.push(filler)
  }
  return result
}

/**
 * Iterate array like list, e.g. NodeList
 */
export function forEach<T>(list: ArrayLike<T>, callback: (el: T, index: number) => void) {
  for (let index = 0; index < list.length; index++) {
    const element = list[index]
    callback(element, index)
  }
}

export function isSimilarArray<T>(arrayOne: T[], arrayTwo: T[]): boolean {
  if (arrayOne === arrayTwo) {
    return true
  }
  if (arrayOne.length !== arrayTwo.length) {
    return false
  }
  return arrayOne.every((item, index) => item === arrayTwo[index])
}

const arrayMoveMutate = <T>(array: T[], from: number, to: number): void => {
  const startIndex = from < 0 ? array.length + from : from

  if (startIndex >= 0 && startIndex < array.length) {
    const endIndex = to < 0 ? array.length + to : to

    const [item] = array.splice(from, 1)
    array.splice(endIndex, 0, item)
  }
}

/**
 * Move an array item to a different position.
 *
 * Shamelessly copied from `array-move`
 */
export const arrayMove = <T>(array: readonly T[], from: number, to: number): T[] => {
  const result = [...array]
  arrayMoveMutate(result, from, to)
  return result
}
