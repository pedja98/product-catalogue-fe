import { pcApi } from './core/pc.api'
import { PcApiTags } from '../../consts/common'
import { Addon, SaveAddon } from '../../types/addons'

export const addonApi = pcApi.injectEndpoints({
  endpoints: (builder) => ({
    getAddons: builder.query<Addon[], void>({
      query: () => '/addons',
      providesTags: [PcApiTags.ADDONS],
    }),
    getAddonById: builder.query<Addon, string>({
      query: (id) => `/addons/${id}`,
      providesTags: (result, error, id) => [{ type: PcApiTags.ADDONS, id }],
    }),
    createAddon: builder.mutation<{ message: string }, Partial<SaveAddon>>({
      query: (addon) => ({
        url: '/addons',
        method: 'POST',
        body: addon,
      }),
      invalidatesTags: [PcApiTags.ADDONS],
    }),
    updateAddon: builder.mutation<{ message: string }, { id: string; addon: Partial<Addon> }>({
      query: ({ id, addon }) => ({
        url: `/addons/${id}`,
        method: 'PUT',
        body: addon,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: PcApiTags.ADDONS, id }],
    }),
  }),
  overrideExisting: false,
})

export const { useGetAddonsQuery, useGetAddonByIdQuery, useCreateAddonMutation, useUpdateAddonMutation } = addonApi
