import { createAction } from '@ngrx/store';

export const isLoading = createAction('[UI Component] Is Loadig');
export const stopLoading = createAction('[UI Component] Stop Loadig');