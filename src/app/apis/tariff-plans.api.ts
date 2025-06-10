import { pcApi } from './core/pc.api'
import { PcApiTags } from '../../consts/common'
import { SaveTariffPlan, TariffPlan } from '../../types/tariffPlans'

export const tariffPlanApi = pcApi.injectEndpoints({
  endpoints: (builder) => ({
    getTariffPlans: builder.query<TariffPlan[], void>({
      query: () => '/tariff-plans',
      providesTags: [PcApiTags.TARIFF_PLANS],
    }),
    getTariffPlanByIdentifier: builder.query<TariffPlan, string>({
      query: (id) => `/tariff-plans/${id}`,
      providesTags: (result, error, id) => [{ type: PcApiTags.TARIFF_PLANS, id }],
    }),
    createTariffPlan: builder.mutation<{ message: string }, SaveTariffPlan>({
      query: (tariffPlan) => ({
        url: '/tariff-plans',
        method: 'POST',
        body: tariffPlan,
      }),
      invalidatesTags: [PcApiTags.TARIFF_PLANS],
    }),
    updateTariffPlan: builder.mutation<{ message: string }, { identifier: string; tariffPlan: SaveTariffPlan }>({
      query: ({ identifier: id, tariffPlan }) => ({
        url: `/tariff-plans/${id}`,
        method: 'PUT',
        body: tariffPlan,
      }),
      invalidatesTags: (result, error, { identifier }) => [{ type: PcApiTags.TARIFF_PLANS, identifier }],
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetTariffPlansQuery,
  useGetTariffPlanByIdentifierQuery,
  useCreateTariffPlanMutation,
  useUpdateTariffPlanMutation,
} = tariffPlanApi
