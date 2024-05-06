import type { CoreStore } from ".";

import { OverlayModes } from "../overlays";
import { authActions } from '@/stores/authState';

export type Actions = {
  authenticate: () => void,
  signIn: () => void,
  signOut: () => void,
  editCourse: () => void,
  addNotes: () => void,
  cloneCourse: () => void;
  toggleBookmark: () => void,
  toggleComplete: () => void,
  toggleMetaVisible: () => void
  hideOverlay: () => void, hideCheckpoint: () => void
  showCheckpoint: (task: string) => void
}

export default function initialize($state: CoreStore) {
  const { login, logout } = authActions;

  function setOverlayMode(mode: OverlayModes) {
    $state.setKey("overlayMode", mode)
  }

  function hideOverlay() {
    $state.setKey("overlayMode", undefined)
  }

  function toggleBookmark() {
    $state.setKey("isBookmarked", !$state.get().isBookmarked)
  }

  function selectCheckpoint(task: string) {
    $state.setKey("checkpoint", task)
  }

  function unselectCheckpoint() {
    $state.setKey("checkpoint", undefined);
  }

  function showCheckpoint(task: string) {
    selectCheckpoint(task);
    setOverlayMode(OverlayModes.CHECKPOINT);
  };

  function cloneCourse() {
    setOverlayMode(OverlayModes.CLONE);
  }

  function hideCheckpoint() {
    unselectCheckpoint();
    hideOverlay();
  };

  async function authenticate() {
    await login();
    hideOverlay();
  }

  function signIn() {
    setOverlayMode(OverlayModes.AUTH);
  }

  async function signOut() {
    await logout();
    hideOverlay();
  }


  function editCourse() {
    setOverlayMode(OverlayModes.EDIT);
  }

  function addNotes() {
    console.log("NOTE");
  }


  function toggleComplete() {
    console.log
  }

  function toggleMetaVisible() {
    console.log
  }


  return {
    authenticate,
    signOut,
    signIn,
    editCourse,
    hideCheckpoint,
    hideOverlay,
    addNotes,
    cloneCourse,
    toggleBookmark,
    toggleComplete,
    toggleMetaVisible,
    showCheckpoint,
  }
}
