import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import { HeadersApi } from "../../api/HeadersApi";
import { filterArrayByIds } from "../../helpers/filterArrayByIds";
import keycloak from "../../keycloak";

const apiUrl = process.env.REACT_APP_API_LOCAL_URL;
const apiKey = process.env.REACT_APP_API_LOCAL_KEY;

const workoutsAdapter = createEntityAdapter();

// const workoutsAdapter = createEntityAdapter({
//     selectId:(workout)=>workout.id
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

// export const selectworkoutsByIds = createAsyncThunk("workout/selectworkoutsByIds", async (state,ids) => {
//   const selectedItems = [];
//   console.log(ids);
//   ids.forEach((id) => {
//     const item = state.workouts.workout.find((item) => item.id === id);
//     if (item) {
//       selectedItems.push(item);
//     }
//   });
//   return selectedItems;
// });


export const fetchWorkouts = createAsyncThunk("workout/fetchWorkouts", async () => {
  const response = await fetch(`${apiUrl}workout`);
  const data = await response.json();
  return data;
});

export const addWorkout = createAsyncThunk("workout/addWorkout", async (workout) => {
  
  
  const response = await fetch(`${apiUrl}workout`, {
    method: "POST",
    // headers: HeadersApi,
    headers:{
      "Content-Type": "application/json",
      // 'Authorization': 'Bearer ' + keycloak.token
      'x-api-key':apiKey
    },
    body: JSON.stringify(workout),
  });
  const data = await response.json();
  return data;
});

export const updateWorkout = createAsyncThunk("workout/updateWorkout", async (workout) => {
  const response = await fetch(`${apiUrl}workout/${workout.id}`, {
    method: "PATCH",
    // headers: HeadersApi,
    headers:{
      "Content-Type": "application/json",
       'Authorization': 'Bearer ' + keycloak.token
      // 'x-api-key':apiKey
    },
    body: JSON.stringify(workout),
  });
  const data = await response.json();
  return data;
});

export const deleteWorkout = createAsyncThunk("workout/deleteWorkout", async (id) => {
  const response = await fetch(`${apiUrl}workout/${id}`, {
    method: "DELETE",
    // headers: HeadersApi,
    headers:{
      "Content-Type": "application/json",
       'Authorization': 'Bearer ' + keycloak.token
      // 'x-api-key':apiKey
    },
  });
  const data = await response.json();
  return id;
});




// const initialState = workoutsAdapter.getInitialState( {
//     workouts:[],
//     status: "idle",
//     error: null,
  
// })
  // workout: [],
  // status: "idle",
  // error: null,


// export const {
//     selectAll: selectAllAworkouts,
//     selectById: selectworkoutById,
//     selectIds: selectworkoutIds,
//   } = booksAdapter.getSelectors((state) => state.workout);

const workoutSlice = createSlice({
  name: "workout",
  initialState :
    {
        workout:{},
        workouts:[],
        selectedWorkouts:[],
        status:'idle',
        error:null
        }
    
  ,
  reducers:{
    selectWorkoutsByIds :(state, action) =>{
      console.log(action);
      console.log(state.workout);
      const selectedIds = action.payload;
      const workoutsToHandle = state.workouts;
      if(Array.isArray(workoutsToHandle) && selectedIds!=undefined){
        state.selectedWorkouts = filterArrayByIds(workoutsToHandle,selectedIds)
      }else if(selectedIds==undefined){
        state.selectedWorkouts = []
      
      }
    //    return state.workout.workouts.filter((workout) => action.payload.includes(workout.id))
      return state;
      },
      selectWorkoutById:(state, action) =>{
        console.log(action);
        console.log(state);
        const id = action.payload;
        if(state.workouts!=undefined){
            console.log(state.workouts.find((item) => item.id === Number(id)));
            state.workout = {...state.workouts.find((item) => item.id === Number(id))}
            return state;
        }
      }
    
  }
      
  
  ,
  extraReducers: (builder) => {
    builder
      .addCase(fetchWorkouts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchWorkouts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.workouts = action.payload;
      })
      .addCase(fetchWorkouts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // .addCase(selectworkoutsByIds.pending,(state)=>{
      //   console.log('pending');
      //   state.status = "loading";
      //   state.error = null;
      // })
      // .addCase(selectworkoutsByIds.fulfilled, (state, action) => {
      //   console.log('fulfilled');
      //   state.status = "succeeded";
      //   state.workout = action.payload;
      // })
      // .addCase(selectworkoutsByIds.rejected, (state, action) => {
      //   console.log('failed');
      //   state.status = "failed";
      //   state.error = action.error.message;
      // })
      .addCase(addWorkout.fulfilled, (state, action) => {
        state.workouts.push(action.payload);
      })
      .addCase(updateWorkout.fulfilled, (state, action) => {
        const index = state.workouts.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.workouts[index] = action.payload;
        }
      })
      .addCase(deleteWorkout.fulfilled, (state, action) => {
        state.workouts = state.workouts.filter((item) => item.id !== action.payload);
      })
      .addCase(selectWorkoutsByIds, (state,ids) =>{
        return state.workouts.filter((workout) => ids.includes(workout.id))});
  },
});

export const selectworkoutById = (state, id) => state.workout.workout.find((item) => item.id === id);

// export const selectworkoutsByIds = (state, ids) =>
//   state.workout.workout.filter((workout) => ids.includes(workout.id));

export const selectWorkoutsStatus = (state) => state.workout.status;

export const selectWorkoutsError = (state) => state.workout.error;

export const{selectWorkoutsByIds, selectWorkoutById } =workoutSlice.actions;

export default workoutSlice.reducer;