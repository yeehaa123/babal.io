<script lang="ts">
  export let navigation: Record<"name"| "href", string>[] = [];
</script>

<nav class="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
  <div class="flex lg:flex-1">
      <slot name="logo" />
  </div>
  <div class="flex lg:hidden">
    <slot name="menu-button"/>
  </div>
  <div class="hidden lg:flex lg:gap-x-12">
    {#each navigation as navItem}
      <a href={`/${navItem.href}`} class="text-sm font-semibold leading-6 text-gray-900">{navItem.name}</a>
    {/each}
  </div>
  <div class="hidden lg:flex lg:flex-1 lg:justify-end">
    <a href="/login" class="text-sm font-semibold leading-6 text-gray-900">Log in <span aria-hidden="true">&rarr;</span></a>
  </div>
</nav>
