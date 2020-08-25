export const SEARCH_IMAGES = "SEARCH_IMAGES";
export const searchImagesAction = (data) => {
  return {
    type: SEARCH_IMAGES,
    payload: {
      data: data
    }
  };
};