const initialState = {
  isLoading: true,
  videoCards: [],
  isError: false,
  nextPageToken: '',
}

export default function home(state = initialState, { type, payload }) {
  switch (type) {
    case 'UPDATE_DATA':
      return {
        ...state,
        isLoading: false,
        videoCards: state.videoCards ? [...state.videoCards, ...payload] : payload,
      };
    case 'UPDATE_NEXT_TOKEN':
      return {
        ...state,
        nextPageToken: payload,
      };
    case 'ERROR':
        return {
            ...state,
            isLoading: false,
            isError: true,
        }
    case 'INIT_LOAD':
        return {
            ...state,
        }
    default:
      return state;
  }
}