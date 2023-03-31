import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import { HeadersApi } from "../../api/HeadersApi";
import { filterArrayByIds } from "../../helpers/filterArrayByIds";
import keycloak from "../../keycloak";

const apiUrl = process.env.REACT_APP_API_LOCAL_URL;
const apiKey = process.env.REACT_APP_API_LOCAL_KEY;

const profilesAdapter = createEntityAdapter();

// const profilesAdapter = createEntityAdapter({
//     selectId:(profile)=>profile.id
// });
/**
 * export const selectItemsByIds = createAsyncThunk(
  'items/selectItemsByIds',
  async (ids) => {
    const response = await fetch(`/api/items?ids=${ids.join(',')}`);
    const data = await response.json();
    return data;
  }
);
 */

// export const selectprofilesByIds = createAsyncThunk("profile/selectprofilesByIds", async (state,ids) => {
//   const selectedItems = [];
//   console.log(ids);
//   ids.forEach((id) => {
//     const item = state.profiles.profile.find((item) => item.id === id);
//     if (item) {
//       selectedItems.push(item);
//     }
//   });
//   return selectedItems;
// });


export const fetchProfiles = createAsyncThunk("profile/fetchProfiles", async () => {
  const response = await fetch(`${apiUrl}profile`);
  const data = await response.json();
  return data;
});

export const addProfile = createAsyncThunk("profile/addProfile", async (profile) => {
  
  
  const response = await fetch(`${apiUrl}profile`, {
    method: "POST",
    // headers: HeadersApi,
    headers:{
      "Content-Type": "application/json",
    //   'Authorization': 'Bearer ' + keycloak.token
    'x-api-key':apiKey
    },
    body: JSON.stringify(profile),
  });
  const data = await response.json();
  return data;
});

export const updateProfile = createAsyncThunk("profile/updateProfile", async (profile) => {
  const response = await fetch(`${apiUrl}profile/${profile.id}`, {
    method: "PATCH",
    // headers: HeadersApi,
    headers:{
      "Content-Type": "application/json",
    //   'Authorization': 'Bearer ' + keycloak.token
    'x-api-key':apiKey
    },
    body: JSON.stringify(profile),
  });
  const data = await response.json();
  return data;
});

export const deleteProfile = createAsyncThunk("profile/deleteProfile", async (id) => {
  const response = await fetch(`${apiUrl}profile/${id}`, {
    method: "DELETE",
    // headers: HeadersApi,
        headers:{
      "Content-Type": "application/json",
    //   'Authorization': 'Bearer ' + keycloak.token
    'x-api-key':apiKey
    },
  });
  const data = await response.json();
  return id;
});




// const initialState = profilesAdapter.getInitialState( {
//     profiles:[],
//     status: "idle",
//     error: null,
  
// })
  // profile: [],
  // status: "idle",
  // error: null,


// export const {
//     selectAll: selectAllAprofiles,
//     selectById: selectprofileById,
//     selectIds: selectprofileIds,
//   } = booksAdapter.getSelectors((state) => state.profile);

const profileSlice = createSlice({
  name: "profile",
  initialState :
    {
        profile:{},
        profiles:[],
        selectedProfiles:[],
        status:'idle',
        statusSelectedProfiles:'idle',
        error:null
        }
    
  ,
  reducers:{
    selectProfilesByIds :(state, action) =>{
      console.log(action.payload);
      console.log(state.profile);
      const selectedIds = action.payload;
      const profilesToHandle = state.profiles;
      if(profilesToHandle!=undefined && selectedIds!=undefined){
        if(Array.isArray(selectedIds)){
          state.selectedProfiles = filterArrayByIds(profilesToHandle,selectedIds)
          state.statusSelectedProfiles='succeeded'
        }
        else{
          state.selectedProfiles = [state.profiles.find((item) => item.id === Number(selectedIds))]
          state.statusSelectedProfiles='succeeded'
        }

      }
    //    return state.profile.profiles.filter((profile) => action.payload.includes(profile.id))
      return state;
      },
      selectProfileById:(state, action) =>{
        console.log(action);
        console.log(state);
        const id = action.payload;
        if(state.profiles!=undefined){
            console.log(state.profiles.find((item) => item.id === Number(id)));
            state.profile = {...state.profiles.find((item) => item.id === Number(id))}
            return state;
        }
      }
    
  }
      
  
  ,
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfiles.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProfiles.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.profiles = action.payload;
      })
      .addCase(fetchProfiles.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // .addCase(selectprofilesByIds.pending,(state)=>{
      //   console.log('pending');
      //   state.status = "loading";
      //   state.error = null;
      // })
      // .addCase(selectprofilesByIds.fulfilled, (state, action) => {
      //   console.log('fulfilled');
      //   state.status = "succeeded";
      //   state.profile = action.payload;
      // })
      // .addCase(selectprofilesByIds.rejected, (state, action) => {
      //   console.log('failed');
      //   state.status = "failed";
      //   state.error = action.error.message;
      // })
      .addCase(addProfile.fulfilled, (state, action) => {
        state.profiles.push(action.payload);
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        const index = state.profiles.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.profiles[index] = action.payload;
        }
      })
      .addCase(deleteProfile.fulfilled, (state, action) => {
        state.profiles = state.profiles.filter((item) => item.id !== action.payload);
      })
      .addCase(selectProfilesByIds, (state,ids) =>{
        console.log('mpika ston builder');
        return state.profiles.filter((profile) => ids.includes(profile.id))});
  },
});

export const selectprofileById = (state, id) => state.profile.profile.find((item) => item.id === id);

// export const selectprofilesByIds = (state, ids) =>
//   state.profile.profile.filter((profile) => ids.includes(profile.id));

export const selectProfilesStatus = (state) => state.profile.status;

export const selectProfilesError = (state) => state.profile.error;

export const{selectProfilesByIds, selectProfileById } =profileSlice.actions;

export default profileSlice.reducer;