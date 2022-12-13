import { createSlice, PayloadAction, isAnyOf } from '@reduxjs/toolkit';
import { IinitialStateAuth, IResponseUser } from '../types';
import { deleteUser, getUserById, signIn, logout, signUpAndSignIn, updateUser } from './authThunk';

const initialState: IinitialStateAuth = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  token: '',
  isDelete: false,
};

const sliceAuth = createSlice({
  name: 'auth',
  initialState,

  reducers: {
    callReset(state) {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = '';
    },
    setUser(state, action: PayloadAction<IResponseUser>) {
      state.user = action.payload;
    },
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    setIsDelete(state) {
      state.isDelete = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // .addCase(signUpAndSignIn.pending, (state) => {
      //   state.isLoading = true;
      // })
      .addCase(signUpAndSignIn.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token.token;
        // const parseToken: IParseToken = parseJwt(action.payload.token.token);
        // localStorage.setItem('exp', JSON.stringify(parseToken.exp));
        localStorage.setItem('user', JSON.stringify(action.payload.user));
        localStorage.setItem('token', JSON.stringify(action.payload.token.token));
      })
      // .addCase(signUpAndSignIn.rejected, (state, action) => {
      //   state.isLoading = false;
      //   state.isError = true;
      //   state.user = null;

      //   if (action.payload) {
      //     state.message = action.payload.message;
      //   } else {
      //     state.message = 'Error Server.';
      //   }
      // })
      // .addCase(signIn.pending, (state) => {
      //   state.isLoading = true;
      // })
      .addCase(signIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.token = action.payload;
        // const parseToken: IParseToken = parseJwt(action.payload);
        // localStorage.setItem('exp', JSON.stringify(parseToken.exp));
        localStorage.setItem('token', JSON.stringify(action.payload));
      })
      // .addCase(signIn.rejected, (state, action) => {
      //   state.isLoading = false;
      //   state.isError = true;

      //   if (action.payload) {
      //     state.message = action.payload.message;
      //   } else {
      //     state.message = 'Error Server.';
      //   }
      // })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.token = '';
      })
      // .addCase(getUserById.pending, (state) => {
      //   state.isLoading = true;
      // })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      // .addCase(deleteUser.pending, (state) => {
      //   state.isLoading = true;
      // })
      .addCase(deleteUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isDelete = true;
        state = initialState;
      })
      // .addCase(updateUser.pending, (state) => {
      //   state.isLoading = true;
      // })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      // .addCase(updateUser.rejected, (state, action) => {
      //   state.isLoading = false;
      //   state.isError = true;

      //   if (action.payload) {
      //     state.message = action.payload.message;
      //   } else {
      //     state.message = 'Error Server.';
      //   }
      // })
      .addMatcher(
        isAnyOf(
          signUpAndSignIn.pending,
          signIn.pending,
          getUserById.pending,
          deleteUser.pending,
          updateUser.pending
        ),
        (state) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(
          signUpAndSignIn.rejected,
          signIn.rejected,
          getUserById.rejected,
          deleteUser.rejected,
          updateUser.rejected
        ),
        (state, action) => {
          state.isLoading = false;
          state.isError = true;

          if (action.payload) {
            state.message = action.payload.message;
          } else {
            state.message = 'Error Server.';
          }
        }
      );
  },
});

export const { callReset, setUser, setToken, setIsDelete } = sliceAuth.actions;

export default sliceAuth.reducer;
