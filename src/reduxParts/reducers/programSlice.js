import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import { HeadersApi } from "../../api/HeadersApi";
import { filterArrayByIds } from "../../helpers/filterArrayByIds";
import keycloak from "../../keycloak";

const apiUrl = process.env.REACT_APP_API_LOCAL_URL;
const apiKey = process.env.REACT_APP_API_LOCAL_KEY;

const programsAdapter = createEntityAdapter();

// const programsAdapter = createEntityAdapter({
//     selectId:(program)=>program.id
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

// export const selectprogramsByIds = createAsyncThunk("program/selectprogramsByIds", async (state,ids) => {
//   const selectedItems = [];
//   console.log(ids);
//   ids.forEach((id) => {
//     const item = state.programs.program.find((item) => item.id === id);
//     if (item) {
//       selectedItems.push(item);
//     }
//   });
//   return selectedItems;
// });


export const fetchPrograms = createAsyncThunk("program/fetchPrograms", async () => {
  const response = await fetch(`${apiUrl}program`);
  const data = await response.json();
  return data;
});

export const addProgram = createAsyncThunk("program/addProgram", async (program) => {
  
  
  const response = await fetch(`${apiUrl}program`, {
    method: "POST",
    // headers: HeadersApi,
    headers:{
      "Content-Type": "application/json",
      // 'Authorization': 'Bearer ' + keycloak.token
      'x-api-key':apiKey
    },
    body: JSON.stringify(program),
  });
  const data = await response.json();
  return data;
});

export const updateProgram = createAsyncThunk("program/updateProgram", async (program) => {
  const response = await fetch(`${apiUrl}program/${program.id}`, {
    method: "PATCH",
    // headers: HeadersApi,
    headers:{
      "Content-Type": "application/json",
      // 'Authorization': 'Bearer ' + keycloak.token
      'x-api-key':apiKey
    },
    body: JSON.stringify(program),
  });
  const data = await response.json();
  return data;
});

export const deleteProgram = createAsyncThunk("program/deleteProgram", async (id) => {
  const response = await fetch(`${apiUrl}program/${id}`, {
    method: "DELETE",
    // headers: HeadersApi,
        headers:{
      "Content-Type": "application/json",
      // 'Authorization': 'Bearer ' + keycloak.token
      'x-api-key':apiKey
    },
  });
  const data = await response.json();
  return id;
});




// const initialState = programsAdapter.getInitialState( {
//     programs:[],
//     status: "idle",
//     error: null,
  
// })
  // program: [],
  // status: "idle",
  // error: null,


// export const {
//     selectAll: selectAllAprograms,
//     selectById: selectprogramById,
//     selectIds: selectprogramIds,
//   } = booksAdapter.getSelectors((state) => state.program);

const programSlice = createSlice({
  name: "program",
  initialState :
    {
        program:{},
        programs:[],
        selectedPrograms:[],
        status:'idle',
        statusSelectedPrograms:'idle',
        error:null
        }
    
  ,
  reducers:{
    selectAllPrograms:(state)=>{
      return state.programs;
    },
    selectProgramsByIds :(state, action) =>{
      console.log(action.payload);
      console.log(state.program);
      const selectedIds = action.payload;
      const programsToHandle = state.programs;
      if(programsToHandle!=undefined && selectedIds!=undefined){
        if(Array.isArray(selectedIds)){
          state.selectedPrograms = filterArrayByIds(programsToHandle,selectedIds)
          state.statusSelectedPrograms='succeeded'
        }
        else{
          state.selectedPrograms = [state.programs.find((item) => item.id === Number(selectedIds))]
          state.statusSelectedPrograms='succeeded'
        }

      }
    //    return state.program.programs.filter((program) => action.payload.includes(program.id))
      return state;
      },
      selectProgramById:(state, action) =>{
        console.log(action);
        console.log(state);
        const id = action.payload;
        if(state.programs!=undefined){
            console.log(state.programs.find((item) => item.id === Number(id)));
            state.program = {...state.programs.find((item) => item.id === Number(id))}
            return state;
        }
        else{
          return state;
        }
      }
    
  }
      
  
  ,
  extraReducers: (builder) => {
    builder
      .addCase(fetchPrograms.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchPrograms.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.programs = action.payload;
      })
      .addCase(fetchPrograms.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // .addCase(selectprogramsByIds.pending,(state)=>{
      //   console.log('pending');
      //   state.status = "loading";
      //   state.error = null;
      // })
      // .addCase(selectprogramsByIds.fulfilled, (state, action) => {
      //   console.log('fulfilled');
      //   state.status = "succeeded";
      //   state.program = action.payload;
      // })
      // .addCase(selectprogramsByIds.rejected, (state, action) => {
      //   console.log('failed');
      //   state.status = "failed";
      //   state.error = action.error.message;
      // })
      .addCase(addProgram.fulfilled, (state, action) => {
        state.programs.push(action.payload);
      })
      .addCase(updateProgram.fulfilled, (state, action) => {
        const index = state.programs.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.programs[index] = action.payload;
        }
      })
      .addCase(deleteProgram.fulfilled, (state, action) => {
        state.programs = state.programs.filter((item) => item.id !== action.payload);
      })
      .addCase(selectProgramsByIds, (state,ids) =>{
        console.log('mpika ston builder');
        return state.programs.filter((program) => ids.includes(program.id))});
  },
});

export const selectprogramById = (state, id) => state.program.program.find((item) => item.id === id);

// export const selectprogramsByIds = (state, ids) =>
//   state.program.program.filter((program) => ids.includes(program.id));

export const selectProgramsStatus = (state) => state.program.status;

export const selectProgramsError = (state) => state.program.error;

export const{selectProgramsByIds, selectProgramById,selectAllPrograms } =programSlice.actions;

export default programSlice.reducer;