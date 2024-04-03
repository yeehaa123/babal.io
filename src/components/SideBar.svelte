<script lang="ts">
import { sideBarState } from "../stores/index";
$: isOpen = $sideBarState ? "visible" : "hidden";
export let navigation: Record<"name"| "href", string>[] = [];
</script>

<div class={`${isOpen} lg:hidden`} role="dialog" aria-modal="true">
  <!-- Background backdrop, show/hide based on slide-over state. -->
  <div class="fixed inset-0 z-10"></div>
  <div class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
    <div class="flex items-center justify-between">
      <slot name="logo" />
      <slot name="menubutton"/>
    </div>
    <div class="mt-6 flow-root">
      <div class="-my-6 divide-y divide-gray-500/10">
        <div class="space-y-2 py-6">
          	{#each navigation as navItem}
          <a href={`/${navItem.href}`} class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">{navItem.name}</a>
	{/each}
        </div>
        <div class="py-6">
          <a href="#/login" class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Log in</a>
        </div>
      </div>
    </div>
  </div>
</div>
