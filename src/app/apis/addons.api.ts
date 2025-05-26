import { pcApi } from './core/pc.api'
import { PcApiTags } from '../../consts/common'
import { Addon, SaveAddon } from '../../types/addons'

export const addonApi = pcApi.injectEndpoints({
  endpoints: (builder) => ({
    getAddons: builder.query<Addon[], void>({
      query: () => '/addons',
      providesTags: [PcApiTags.ADDONS],
    }),
    getAddonByIdentifier: builder.query<Addon, string>({
      query: (identifier) => `/addons/${identifier}`,
      providesTags: (result, error, identifier) => [{ type: PcApiTags.ADDONS, identifier }],
    }),
    createAddon: builder.mutation<{ message: string }, Partial<SaveAddon>>({
      query: (addon) => ({
        url: '/addons',
        method: 'POST',
        body: addon,
      }),
      invalidatesTags: [PcApiTags.ADDONS],
    }),
    updateAddon: builder.mutation<{ message: string }, { identifier: string; addon: Partial<Addon> }>({
      query: ({ identifier, addon }) => ({
        url: `/addons/${identifier}`,
        method: 'PUT',
        body: addon,
      }),
      invalidatesTags: (result, error, { identifier }) => [{ type: PcApiTags.ADDONS, identifier }],
    }),
  }),
  overrideExisting: false,
})

export const { useGetAddonsQuery, useGetAddonByIdentifierQuery, useCreateAddonMutation, useUpdateAddonMutation } =
  addonApi
