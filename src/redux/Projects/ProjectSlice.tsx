// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
// import { generateClient } from "aws-amplify/api";
// import { listProjects } from "../../graphql/queries";
// import { createProjects, deleteProjects } from "../../graphql/mutations";

// interface Project {
//     projectID?: string | null;
//     status?: string | null;
//     name?: string | null;
//     responseTime?: string | null;
//     url?: string | null;
//     lastChecked?: string | null;
//     __typename: string | null;
// }

// interface ProjectState {
//     projects: (Project | null)[];
//     loading: boolean;
//     error: string | null | undefined;
// }

// const initialState: ProjectState = {
//     projects: [],
//     loading: false,
//     error: null,
// };

// export const fetchProjects = createAsyncThunk(
//     "projects/fetchProjects",
//     async (_, { rejectWithValue }) => {
//         try {
//             const client = generateClient();
//             const result = await client.graphql({
//                 query: listProjects,
//             });
//             console.log(result?.data?.listProjects?.items)
//             return result?.data?.listProjects?.items ?? [];
//             //eslint-disable-next-line @typescript-eslint/no-explicit-any
//         } catch (error: any) {
//             return rejectWithValue(
//                 error?.message || "Failed to fetch projects"
//             );
//         }
//     }
// );

// export const createProject = createAsyncThunk(
//     "projects/createProject",

//     async (formData: { projectID: string; name: string; url: string, status: string }, { rejectWithValue }) => {
//         try {
//             const client = generateClient();

//             const result = await client.graphql({
//                 query: createProjects,
//                 variables: {
//                     input: formData,
//                 },
//             });

//             return result.data.createProjects;
//             //eslint-disable-next-line @typescript-eslint/no-explicit-any
//         } catch (error: any) {
//             return rejectWithValue(
//                 error?.message || "Failed to create project"
//             );
//         }
//     }
// );


// export const deleteProject = createAsyncThunk(
//     "projects/deleteProjects",
//     async (deleteInput: { projectID: string, status: string }, { rejectWithValue }) => {
//         try {
//             const client = generateClient();

//             const result = await client.graphql({
//                 query: deleteProjects,
//                 variables: {
//                     input: deleteInput,
//                 },
//             });

//             return result.data.deleteProjects;
//             //eslint-disable-next-line @typescript-eslint/no-explicit-any
//         } catch (error: any) {
//             return rejectWithValue(
//                 error?.message || "Failed to delete projects"
//             );
//         }
//     }
// );

// const projectSlice = createSlice({
//     name: "projects",
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchProjects.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })

//             .addCase(fetchProjects.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.projects = action.payload;
//             })

//             .addCase(fetchProjects.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload as string;
//             })


//             .addCase(createProject.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(createProject.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.projects.push(action.payload);
//             })
//             .addCase(createProject.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload as string;
//             })
//             .addCase(deleteProject.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(deleteProject.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.projects = state.projects.filter((p) => p?.projectID !== action.payload.projectID);
//             })
//             .addCase(deleteProject.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload as string;
//             });

//     },
// });


// export default projectSlice.reducer
