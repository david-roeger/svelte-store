import type { AnyUpdater, Store } from '@tanstack/store';
import { untrack } from 'svelte';

export * from '@tanstack/store';

export type NoInfer<T> = [T][T extends any ? 0 : never];

export function useStore<
	TState,
	TSelected = NoInfer<TState>,
	TUpdater extends AnyUpdater = AnyUpdater
>(
	store: Store<TState, TUpdater>,
	selector: (state: NoInfer<TState>) => TSelected = (d) => d as any
) {
  // set initial value
	let slice = $state(selector(store.state))

  // on mount subscribe to store
  $effect(() => {
    const unsub = store.subscribe(() => {
      untrack(() => {
      	const data = selector(store.state);
        if(!shallow(slice, data)) {
          slice = data
        }
      })
		
		});
		return () => unsub();
	});
		
	return {get value() { return slice }}
}

export function shallow<T>(objA: T, objB: T) {
  if (Object.is(objA, objB)) {
    return true
  }

  if (
    typeof objA !== 'object' ||
    objA === null ||
    typeof objB !== 'object' ||
    objB === null
  ) {
    return false
  }

  const keysA = Object.keys(objA)
  if (keysA.length !== Object.keys(objB).length) {
    return false
  }

  for (let i = 0; i < keysA.length; i++) {
    if (
      !Object.prototype.hasOwnProperty.call(objB, keysA[i] as string) ||
      !Object.is(objA[keysA[i] as keyof T], objB[keysA[i] as keyof T])
    ) {
      return false
    }
  }
  return true
}
