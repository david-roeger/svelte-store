<script lang="ts">
    import { Store } from '@tanstack/store'
    import { useStore } from ".."

    const store = new Store({
      select: 0,
      ignored: 1,
    })

      const storeVal = useStore(store, (state) => state.select)

      let renderCount = 0;
      $: {
        $storeVal;
        renderCount += 1;
      }
</script>


<div>
  <p>Number rendered: {renderCount}</p>
  <p>Store: {$storeVal}</p>
  <button
    on:click={() =>
      store.setState((v) => ({
        ...v,
        select: 10,
      }))
    }
  >
    Update select
  </button>
  <button
    on:click={() =>
      store.setState((v) => ({
        ...v,
        ignored: 10,
      }))
    }
  >
    Update ignored
  </button>
</div>