/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-param-reassign */
/**
 * bem helper
 * b() // 'button'
 * b('text') // 'button__text'
 * b({ disabled }) // 'button button--disabled'
 * b('text', { disabled }) // 'button__text button__text--disabled'
 * b(['disabled', 'primary']) // 'button button--disabled button--primary'
 */

export type Mod = string | Record<string, any>;
export type Mods = Mod | Mod[];

function gen(name: string, mods?: Mods): string {
  if (!mods) {
    return ''
  }

  if (typeof mods === 'string') {
    return ` ${name}--${mods}`
  }

  if (Array.isArray(mods)) {
    return mods.reduce<string>((ret, item) => ret + gen(name, item), '')
  }
  return Object.keys(mods).reduce((ret, key) => ret + (mods[key] ? gen(name, key) : ''), '')
}

export function createBEM(name: string) {
  return (el?: Mods, mods?: Mods, pure?: boolean): Mods => {
    if (el && typeof el !== 'string') {
      mods = el
      el = ''
    }

    el = el ? `${name}__${el}` : name

    return !!pure ? `${gen(el, mods)}` : `${el}${gen(el, mods)}`
  }
}

export type BEM = ReturnType<typeof createBEM>;
export type CreateNamespaceReturn = [BEM, string];

export function createNamespace(name: string, prefix?: string): CreateNamespaceReturn {
  name = `${prefix || 'van'}-${name}`
  return [ createBEM(name), name ]
}

