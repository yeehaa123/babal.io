<script lang="ts">
import { sideBarState } from "../stores/index";
$: isOpen = $sideBarState ? "visible" : "hidden";
</script>

<div class={`${isOpen} lg:hidden`} role="dialog" aria-modal="true">
  <slot/>
</div>
