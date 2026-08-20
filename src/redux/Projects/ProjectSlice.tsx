import type { Schema } from "@/amplify/data/resource";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { generateClient } from "aws-amplify/data";

type Project = Schema["UptimeProjects"]["type"];
type ProjectUpdateInput = Partial<
  Pick<
    Project,
    | "userId"
    | "projectID"
    | "status"
    | "name"
    | "url"
    | "responseTime"
    | "lastChecked"
  >
>;

interface ProjectState {
  projects: Project[];
  loading: boolean;
  error: string | null | undefined;
}

const initialState: ProjectState = {
  projects: [],
  loading: false,
  error: null,
};

const client = generateClient<Schema>();

export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async (_, { rejectWithValue }) => {
    try {
      const { data, errors } = await client.models.UptimeProjects.list();

      if (errors) {
        console.error("Error fetching projects:", errors);
        return rejectWithValue(
          errors[0]?.message || "Failed to fetch projects",
        );
      }

      return data;
      //eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error?.message || "Failed to fetch projects");
    }
  },
);

export const createProject = createAsyncThunk(
  "projects/createProject",

  async (
    formData: {
      userId: string;
      projectID: string;
      name: string;
      url: string;
      status: "ACTIVE" | "DOWN";
    },
    { rejectWithValue },
  ) => {
    try {
      const client = generateClient<Schema>();

      const { data, errors } = await client.models.UptimeProjects.create({
        userId: formData.userId,
        projectID: formData.projectID,
        name: formData.name,
        url: formData.url,
        status: formData.status,
      } as never);

      if (errors?.length) {
        console.error("Error creating project:", errors);

        return rejectWithValue(
          errors[0]?.message || "Failed to create project",
        );
      }

      return data;
    } catch (error: unknown) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to create project",
      );
    }
  },
);

export const deleteProject = createAsyncThunk(
  "projects/deleteProjects",
  async (deleteInput: { id: string }, { rejectWithValue }) => {
    try {
      const client = generateClient<Schema>();

      const { errors } = await client.models.UptimeProjects.delete(deleteInput);

      if (errors) {
        console.error("Error deleting project:", errors);
        return rejectWithValue(
          errors[0]?.message || "Failed to delete project",
        );
      }

      return deleteInput;
      //eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error?.message || "Failed to delete projects");
    }
  },
);

export const updateProject = createAsyncThunk(
  "projects/updateProject",
  async (
    {
      id,
      updateInput,
    }: {
      id: string;
      updateInput: ProjectUpdateInput;
    },
    { rejectWithValue },
  ) => {
    try {
      const { data, errors } = await client.models.UptimeProjects.update({
        id,
        ...updateInput,
      } as never);

      if (errors?.length) {
        return rejectWithValue(
          errors[0]?.message || "Failed to update project",
        );
      }

      return data;
    } catch (error: unknown) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to update project",
      );
    }
  },
);

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      })

      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(createProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = state.projects || [];
        if (action.payload) {
          state.projects.push(action.payload);
        }
      })
      .addCase(createProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = state?.projects.filter(
          (p) => p?.id !== action?.payload.id,
        );
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.projects.findIndex(
          (project) => project.id === action.payload?.id,
        );
        if (index !== -1 && action.payload) {
          state.projects[index] = action.payload;
        }
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default projectSlice.reducer;
