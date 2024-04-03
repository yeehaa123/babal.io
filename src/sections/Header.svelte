<script lang="ts">
  import { sideBarState } from "../stores/index";
  import SideBar from "../components/SideBar.svelte";
  import MenuButton from "../components/MenuButton.svelte";
  import NavBar from "../components/NavBar.svelte";
  export let navigation: Record<"name"| "href", string>[] = [];
</script>

<header class="bg-white">
  <NavBar {navigation}>
    <slot name="logo" slot="logo" />
    <MenuButton slot="menubutton" />
    </NavBar>
  <SideBar isSideBarOpen={$sideBarState} {navigation}>
    <slot name="logo" slot="logo" />
    <MenuButton slot="menubutton" />
  </SideBar>
</header>
