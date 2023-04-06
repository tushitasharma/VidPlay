const initialState = {
  isLoading: true,
  videoInfo: null,
  isError: false,
}

export default function video(state = initialState, { type, payload }) {
  switch (type) {
    case 'UPDATE_VIDEO_DATA':
      return {
        ...state,
        isLoading: false,
        videoInfo: payload,
      };
    case 'VIDEO_ERROR':
        return {
            ...state,
            isLoading: false,
            isError: true,
        }
    default:
      return state;
  }
}