const initialState = {
  isLoading: true,
  channelRow: null,
  videoRows: null,
  isError: false,
}

export default function search(state = initialState, { type, payload }) {
  switch (type) {
    case 'UPDATE_SEARCH_CHANNEL':
      return {
        ...state,
        isLoading: false,
        channelRow: payload,
      };
    case 'UPDATE_SEARCH_VIDEO':
      return {
        ...state,
        isLoading: false,
        videoRows: payload,
      };
    case 'SEARCH_ERROR':
        return {
            ...state,
            isLoading: false,
            isError: true,
        }
    default:
      return state;
  }
}