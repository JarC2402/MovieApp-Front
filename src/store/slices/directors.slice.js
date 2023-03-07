import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { genericRequestThunk } from './app.slice';

export const directorsSlice = createSlice({
    name: 'directors',
    initialState: [],
    reducers: {
        setDirectors: (_, action) => action.payload,
        addDirector: (state, { payload }) => { state.push(payload) },
        deleteDirector: (state, { payload }) =>
            state.filter(director => director.id !== payload),
        updateDirector: (state, { payload: { id, director } }) => {
            const index = state.findIndex(director => director.id === id);
            state[index] = director;
        }
    }
})

export const getDirectorsThunk = () => (dispatch) => {
    dispatch(genericRequestThunk(async () => {
        const res = await axios.get('/director')
        dispatch(setDirectors(res.data));
    }));
}

export const addDirectorThunk = director => dispatch => {
    dispatch(genericRequestThunk(async () => {
        const res = await axios.post('/director', director);
        dispatch(addDirector(res.data));
    }, "Director added successfully"))
}

export const deleteDirectorThunk = id => dispatch => {
    dispatch(genericRequestThunk(async () => {
        await axios.delete(`/director/${id}`)
        dispatch(deleteDirector(id));
    }, "Director deleted successfully"))
}

export const updateDirectorThunk = (id, directorParams) => dispatch => {
    dispatch(genericRequestThunk(async () => {
        const {data: director} = await axios.put(`/director/${id}`, directorParams)
        dispatch(updateDirector({id, director}))
    }, "Director updated succesfully"));
}


export const { setDirectors, addDirector, deleteDirector, updateDirector } = directorsSlice.actions;

export default directorsSlice.reducer;
