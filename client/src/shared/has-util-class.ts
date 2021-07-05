import { flattenArray } from './array'
const regexMap = new Map<string, RegExp>()

/**
 * Check if a user provided className to have specific prefix, useful if you
 * want to avoid conflict of tailwind className
 *
 * @param className the className that is user provided
 * @param utilPrefixes the prefixes you wish to check, e.g. `w-`
 */
export const hasUtilClass = (className: string | undefined, ...utilPrefixes: string[]) => {
  if (!className) {
    return false
  }

  const cacheKey = utilPrefixes.join(',')

  const cachedRegex = regexMap.get(cacheKey)
  if (cachedRegex) {
    return cachedRegex.test(className)
  }

  const regexPattern = flattenArray(utilPrefixes.map((prefix) => [`^${prefix}`, `\\s${prefix}`])).join('|')

  const regex = new RegExp(regexPattern)

  regexMap.set(cacheKey, regex)

  return regex.test(className)
}
