import { readFileSync } from 'fs'

export const getVersion = () => {
    try {
        const data = readFileSync('./version').toString()
        const lines = data.split(/\r?\n/)
        return lines[0]
    } catch (e) {
        return '0.0.1'
    }
}

export type InterfaceToType<T> = { [K in keyof T]: T[K] }
export type InterfaceToTypeNested<T> = T extends object ? { [K in keyof T]: InterfaceToType<T[K]> } : T

export type SnakeToCamelCase<S extends string> = S extends `${infer T}_${infer U}` ? `${Lowercase<T>}${Capitalize<SnakeToCamelCase<U>>}` : S
export type SnakeToCamelCaseNested<T> = T extends object ? { [K in keyof T as SnakeToCamelCase<K & string>]: SnakeToCamelCaseNested<T[K]> } : T
export type CamelToSnakeCase<S extends string> = S extends `${infer T}${infer U}` ? `${T extends Capitalize<T> ? '_' : ''}${Lowercase<T>}${CamelToSnakeCase<U>}` : S
export type CamelToSnakeCaseNested<T> = T extends object ? { [K in keyof T as CamelToSnakeCase<K & string>]: CamelToSnakeCaseNested<T[K]> } : T

export const camelToSnake = (str: string): string => str.split(/(?=[A-Z])/).join('_').toLowerCase()
export const snakeToCamel = (str: string): string => str.replace(/_([a-z])/g, g => g[1].toUpperCase())
export function objectToCamel<T>(obj: T): SnakeToCamelCaseNested<T> {
    return Object.fromEntries(Object.entries(obj).map(([key, val]) => ([snakeToCamel(key), val]))) as SnakeToCamelCaseNested<T>
}
export function objectToSnake<T>(obj:T): CamelToSnakeCaseNested<T> {
    return Object.fromEntries(Object.entries(obj).map(([key, val]) => ([camelToSnake(key), val]))) as CamelToSnakeCaseNested<T>
}
