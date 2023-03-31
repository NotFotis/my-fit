import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import { filterArrayByIds } from "../../helpers/filterArrayByIds";
import { removeObjectsById } from "../../helpers/removeObjectsByid";
import { HeadersApi } from "../../api/HeadersApi";
import keycloak from "../../keycloak";
const apiUrl = process.env.REACT_APP_API_LOCAL_URL;
const apiKey = process.env.REACT_APP_API_LOCAL_KEY;

const goalsAdapter = createEntityAdapter();

// const goalsAdapter = createEntityAdapter({
//     selectId:(goal)=>goal.id
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

// export const selectGoalsByIds = createAsyncThunk("goal/selectGoalsByIds", async (state,ids) => {
//   const selectedItems = [];
//   console.log(ids);
//   ids.forEach((id) => {
//     const item = state.goals.goal.find((item) => item.id === id);
//     if (item) {
//       selectedItems.push(item);
//     }
//   });
//   return selectedItems;
// });


export const fetchGoals = createAsyncThunk("goal/fetchGoals", async () => {
  const response = await fetch(`${apiUrl}goal`);
  console.log(apiUrl);
  console.log(response);
  const data = await response.json();
  return data;
});

export const addGoal = createAsyncThunk("goal/addGoal", async (goal) => {
  
  
  const response = await fetch(`${apiUrl}goal`, {
    method: "POST",
    // headers: HeadersApi,
    headers:{
      "Content-Type": "application/json",
      // 'Authorization': 'Bearer ' + keycloak.token
      'x-api-key':apiKey
    },
    body: JSON.stringify(goal),
  });
  const data = await response.json();
  return data;
});

export const updateGoal = createAsyncThunk("goal/updateGoal", async (goal) => {
  const response = await fetch(`${apiUrl}goal/${goal.id}`, {
    method: "PATCH",
    // headers: HeadersApi,
    headers:{
      "Content-Type": "application/json",
      // 'Authorization': 'Bearer ' + keycloak.token
      'x-api-key':apiKey
    },
    body: JSON.stringify(goal),
  });
  const data = await response.json();
  return data;
});

export const deleteGoal = createAsyncThunk("goal/deleteGoal", async (id) => {
  const response = await fetch(`${apiUrl}goal/${id}`, {
    method: "DELETE",
    // headers: HeadersApi,
    headers:{
      "Content-Type": "application/json",
      // 'Authorization': 'Bearer ' + keycloak.token
      'x-api-key':apiKey
    }
  });
  const data = await response.json();
  return id;
});




// const initialState = goalsAdapter.getInitialState( {
//     goals:[],
//     status: "idle",
//     error: null,
  
// })
  // goal: [],
  // status: "idle",
  // error: null,


// export const {
//     selectAll: selectAllAgoals,
//     selectById: selectGoalById,
//     selectIds: selectGoalIds,
//   } = booksAdapter.getSelectors((state) => state.goal);

const goalSlice = createSlice({
  name: "goals",
//   initialState :goalsAdapter.getInitialState(
//     {
            
//             goals:[],
//             status:'idle',
//             error:null
        
//     }
//   ),
  initialState :
    {
            goal:{},
            goals:[],
            selectedGoals:[],
            goalsNotIncluded:[],
            status:'idle',
            error:null
        
    }
  ,
  reducers:{
    selectGoalsByIds :(state, action) =>{
    //   console.log(action.payload);
    //   console.log(state.goals);
    //    return state.goals.filter((goal) => action.payload.includes(goal.id))
        const selectedIds = action.payload;
        // const selectedIds = [24,25];
        console.log(selectedIds);
        console.log(state.goals);
        const goalsToHandle = state.goals;
        if(goalsToHandle!==undefined){
          state.selectedGoals = filterArrayByIds(goalsToHandle,selectedIds);
          goalsToHandle.length=0;
      }
      console.log(state.selectedGoals);
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
        const goalsToHandle = state.goals;
        if(goalsToHandle!==undefined && selectedIds!=undefined){
          state.goalsNotIncluded = removeObjectsById(state.goals,selectedIds)
          console.log(state.goalsNotIncluded);
        }
        return state;
      },
      selectGoalById:(state, action) =>{
        console.log(action);
        console.log(state);
        const id = action.payload;
        if(state.goals !== undefined){
            console.log(state.goals.find((item) => item.id === Number(id)));
            state.goal = {...state.goals.find((item) => item.id === Number(id))}
            return state;
        }
      }
    // selectGoalById:goalsAdapter.getSelectors().selectById,
    
  }
      
  
  ,
  extraReducers: (builder) => {
    builder
      .addCase(fetchGoals.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchGoals.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(state.goals);
        console.log(action.payload);
        state.goals = action.payload;
      })
      .addCase(fetchGoals.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // .addCase(selectGoalsByIds.pending,(state)=>{
      //   console.log('pending');
      //   state.status = "loading";
      //   state.error = null;
      // })
      // .addCase(selectGoalsByIds.fulfilled, (state, action) => {
      //   console.log('fulfilled');
      //   state.status = "succeeded";
      //   state.goal = action.payload;
      // })
      // .addCase(selectGoalsByIds.rejected, (state, action) => {
      //   console.log('failed');
      //   state.status = "failed";
      //   state.error = action.error.message;
      // })
      .addCase(addGoal.fulfilled, (state, action) => {
        state.goals.push(action.payload);
      })
      .addCase(updateGoal.fulfilled, (state, action) => {
        console.log(action.payload);
        console.log(state.goals);
        const index = state.goals.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.goals[index] = action.payload;
        }
      })
      .addCase(deleteGoal.fulfilled, (state, action) => {
        console.log(action);
        console.log(action.payload);
        state.goals = state.goals.filter((item) => item.id !== Number(action.payload));
        return state;
      })
      .addCase(selectGoalsByIds, (state,ids) =>{
        console.log('mpika ston builder');
        return state.goals.filter((goal) => ids.includes(goal.id))
    });
  },
});

// export const selectGoalById = (state, id) => state.goals.find((item) => item.id === id);

// export const selectGoalsByIds = (state, ids) =>
//   state.goal.goal.filter((goal) => ids.includes(goal.id));

export const selectGoalsStatus = (state) => state.goals.status;

export const selectGoalsError = (state) => state.goals.error;

export const{selectGoalsByIds, selectGoalById, selectTheRestErxercises} =goalSlice.actions;

export default goalSlice.reducer;