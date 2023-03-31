import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import { filterArrayByIds } from "../../helpers/filterArrayByIds";
import { removeObjectsById } from "../../helpers/removeObjectsByid";
import { HeadersApi } from "../../api/HeadersApi";
import keycloak from "../../keycloak";
const apiUrl = process.env.REACT_APP_API_LOCAL_URL;
const apiKey = process.env.REACT_APP_API_LOCAL_KEY;

const exercisesAdapter = createEntityAdapter();

// const exercisesAdapter = createEntityAdapter({
//     selectId:(exercise)=>exercise.id
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

// export const selectExercisesByIds = createAsyncThunk("exercise/selectExercisesByIds", async (state,ids) => {
//   const selectedItems = [];
//   console.log(ids);
//   ids.forEach((id) => {
//     const item = state.exercises.exercise.find((item) => item.id === id);
//     if (item) {
//       selectedItems.push(item);
//     }
//   });
//   return selectedItems;
// });


export const fetchExercises = createAsyncThunk("exercise/fetchExercises", async () => {
  const response = await fetch(`${apiUrl}exercise`);
  console.log(apiUrl);
  console.log(response);
  const data = await response.json();
  return data;
});

export const addExercise = createAsyncThunk("exercise/addExercise", async (exercise) => {
  
  
  const response = await fetch(`${apiUrl}exercise`, {
    method: "POST",
    // headers: HeadersApi,
    headers:{
      "Content-Type": "application/json",
       'Authorization': 'Bearer ' + keycloak.token
      // 'x-api-key':apiKey
    },
    body: JSON.stringify(exercise),
  });
  const data = await response.json();
  return data;
});

export const updateExercise = createAsyncThunk("exercise/updateExercise", async (exercise) => {
  const response = await fetch(`${apiUrl}exercise/${exercise.id}`, {
    method: "PATCH",
    // headers: HeadersApi,
    headers:{
      "Content-Type": "application/json",
      'Authorization': 'Bearer ' + keycloak.token
      // 'x-api-key':apiKey
    },
    body: JSON.stringify(exercise),
  });
  const data = await response.json();
  return data;
});

export const deleteExercise = createAsyncThunk("exercise/deleteExercise", async (id) => {
  const response = await fetch(`${apiUrl}exercise/${id}`, {
    method: "DELETE",
    // headers: HeadersApi,
    headers:{
      "Content-Type": "application/json",
       'Authorization': 'Bearer ' + keycloak.token
      // 'x-api-key':apiKey
    }
  });
  const data = await response.json();
  return id;
});




// const initialState = exercisesAdapter.getInitialState( {
//     exercises:[],
//     status: "idle",
//     error: null,
  
// })
  // exercise: [],
  // status: "idle",
  // error: null,


// export const {
//     selectAll: selectAllAexercises,
//     selectById: selectExerciseById,
//     selectIds: selectExerciseIds,
//   } = booksAdapter.getSelectors((state) => state.exercise);

const exerciseSlice = createSlice({
  name: "exercises",
//   initialState :exercisesAdapter.getInitialState(
//     {
            
//             exercises:[],
//             status:'idle',
//             error:null
        
//     }
//   ),
  initialState :
    {
            exercise:{},
            exercises:[],
            selectedExercises:[],
            exercisesNotIncluded:[],
            status:'idle',
            error:null
        
    }
  ,
  reducers:{
    selectExercisesByIds :(state, action) =>{
    //   console.log(action.payload);
    //   console.log(state.exercises);
    //    return state.exercises.filter((exercise) => action.payload.includes(exercise.id))
        const selectedIds = action.payload;
        // const selectedIds = [24,25];
        console.log(selectedIds);
        console.log(state.exercises);
        const exercisesToHandle = state.exercises;
        if(exercisesToHandle!==undefined){
          state.selectedExercises = filterArrayByIds(exercisesToHandle,selectedIds);
          exercisesToHandle.length=0;
      }
      console.log(state.selectedExercises);
        return state;
        
        // return selectedIds.reduce((selectedEntities, id) => {
      //   if (state[id]) {
      //     selectedEntities[id] = state[id];
      //   }
      //   return selectedEntities;
      // }, {});

      },
      selectTheRestErxercises : (state,action)=>{
        const selectedIds=action.payload;
        console.log(selectedIds);
        const exercisesToHandle = state.exercises;
        if(exercisesToHandle!==undefined && selectedIds!=undefined){
          state.exercisesNotIncluded = removeObjectsById(state.exercises,selectedIds)
          console.log(state.exercisesNotIncluded);
        }
        return state;
      },
      selectExerciseById:(state, action) =>{
        console.log(action);
        console.log(state);
        const id = action.payload;
        if(state.exercises !== undefined){
            console.log(state.exercises.find((item) => item.id === Number(id)));
            state.exercise = {...state.exercises.find((item) => item.id === Number(id))}
            return state;
        }
      }
    // selectExerciseById:exercisesAdapter.getSelectors().selectById,
    
  }
      
  
  ,
  extraReducers: (builder) => {
    builder
      .addCase(fetchExercises.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchExercises.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(state.exercises);
        console.log(action.payload);
        state.exercises = action.payload;
      })
      .addCase(fetchExercises.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // .addCase(selectExercisesByIds.pending,(state)=>{
      //   console.log('pending');
      //   state.status = "loading";
      //   state.error = null;
      // })
      // .addCase(selectExercisesByIds.fulfilled, (state, action) => {
      //   console.log('fulfilled');
      //   state.status = "succeeded";
      //   state.exercise = action.payload;
      // })
      // .addCase(selectExercisesByIds.rejected, (state, action) => {
      //   console.log('failed');
      //   state.status = "failed";
      //   state.error = action.error.message;
      // })
      .addCase(addExercise.fulfilled, (state, action) => {
        state.exercises.push(action.payload);
      })
      .addCase(updateExercise.fulfilled, (state, action) => {
        console.log(action.payload);
        console.log(state.exercises);
        const index = state.exercises.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.exercises[index] = action.payload;
        }
      })
      .addCase(deleteExercise.fulfilled, (state, action) => {
        console.log(action);
        console.log(action.payload);
        state.exercises = state.exercises.filter((item) => item.id !== Number(action.payload));
        return state;
      })
      .addCase(selectExercisesByIds, (state,ids) =>{
        console.log('mpika ston builder');
        return state.exercises.filter((exercise) => ids.includes(exercise.id))
    });
  },
});

// export const selectExerciseById = (state, id) => state.exercises.find((item) => item.id === id);

// export const selectExercisesByIds = (state, ids) =>
//   state.exercise.exercise.filter((exercise) => ids.includes(exercise.id));

export const selectExercisesStatus = (state) => state.exercises.status;

export const selectExercisesError = (state) => state.exercises.error;

export const{selectExercisesByIds, selectExerciseById, selectTheRestErxercises} =exerciseSlice.actions;

export default exerciseSlice.reducer;