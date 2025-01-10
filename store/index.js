export const state = () => ({
  active:true,
  active_img:true,
  active_bkimage:true,
  active_video:true,
  form: {},
  stepAddVideo:0,
  rightDrawer:false,
});
export const mutations = {
  SET_FORM(state, updatedForm) {
    state.form = updatedForm;
  },
  SET_ACTIVE(state, updatedActive) {
    state.active = updatedActive;
  },
  SET_ACTIVE_IMG(state, updatedActive) {
    state.active_img = updatedActive;
  },
  SET_ACTIVE_BKIMG(state, updatedActive) {
    state.active_bkimage = updatedActive;
  },
  SET_ACTIVE_VIDEO(state, updatedActive) {
    state.active_video = updatedActive;
  },
  SET_STEP_ADD_VIDEO(state, updatedActive){
    state.stepAddVideo = updatedActive;
  },
  SET_STEP_RightDrawer(state, updatedActive){
    state.rightDrawer = updatedActive;
  },
};