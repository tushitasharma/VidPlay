const initialState = {
  isCommentLoading: true,
  comments: null,
  isCommentError: false,
}

export default function comments(state = initialState, { type, payload }) {
  switch (type) {
    case 'UPDATE_COMMENTS_DATA':
      return {
        ...state,
        isCommentLoading: false,
        comments: payload,
      };
    case 'COMMENTS_ERROR':
        return {
            ...state,
            isCommentLoading: false,
            isCommentError: true,
        }
    default:
      return state;
  }
}