import EventService from "@/services/article/Media.js";
import * as types from "@/store/mutation-types";

export const fetchMedia = ({ commit }, payload) => {
  commit(types.SET_MEDIA_LOADING, true);
  EventService.getArticlesEvent(payload.itemsPerPage, payload.pageStart, payload.page, payload.search, payload.category, payload.rangeDate)
    .then((response) => {
      console.log(response.data.data);
      commit(types.SET_MEDIA_BADGE, response.data.badges);
      commit(types.SET_ALL_MEDIA, response.data.data.rows);
      commit(types.SET_COUNT, response.data.data.count);
      commit(types.SET_MEDIA_LOADING, false);
    })
    .catch((error) => {
      console.log(error);
    });
};

