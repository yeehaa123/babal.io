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

const { login, logout } = authActions;

function setOverlayMode(mode: OverlayModes) {
  console.log(mode)
}

function hideOverlay() {
  console.log()
}

function toggleBookmark() {
  console.log()
}

function selectCheckpoint(task: string) {
  console.log(task)
}

function unselectCheckpoint() {
  console.log()
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


export default {
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
