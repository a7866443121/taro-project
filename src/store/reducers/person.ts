
import initialState from '../state'

export const reducers = (state = initialState, action) => {
  if (action.reducer) {
    return setState(state,action.reducer, action.payload)
  } else {
    return state
  }
}

// var reducers = {
//   setState(state, person){
//     state.person = person;
//     return state
//   }
// }

const setState = function(state, reducer, payload){
    state[reducer] = payload;
    return state
  }
}