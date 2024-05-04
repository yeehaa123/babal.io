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
  hideOverlay: () => void,
  hideCheckpoint: () => void
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
    console.log($state.get().isBookmarked);
    $state.setKey("isBookmarked", !$state.get().isBookmarked)
  }

  function selectCheckpoint(task: string) {
    const course = $state.get().course;
    const checkpoint = course.checkpoints.find(t => t.task === task)
    const index = course.checkpoints.findIndex(t => t.task === task)
    if (checkpoint) {
      const learnData = $state.get().learnData;
      const isCompleted = learnData && learnData[index];
      $state.setKey("checkpoint", { ...checkpoint, isCompleted })
    }
  }
  function unselectCheckpoint() {
    $state.setKey("checkpoint", undefined);
  }

  function showCheckpoint(task: string) {
    selectCheckpoint(task);
    setOverlayMode(OverlayModes.CHECKPOINT);
  };

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
    console.log("EDIT");
  }

  function addNotes() {
    console.log("NOTE");
  }

  function cloneCourse() {
    console.log("CLONE");
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
