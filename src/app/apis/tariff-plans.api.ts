import { pcApi } from './core/pc.api'
import { PcApiTags } from '../../consts/common'
import { TariffPlan } from '../../types/tariffPlans'

export const tariffPlanApi = pcApi.injectEndpoints({
  endpoints: (builder) => ({
    getTariffPlans: builder.query<TariffPlan[], void>({
      query: () => '/tariff-plans',
      providesTags: [PcApiTags.TARIFF_PLANS],
    }),
    getTariffPlanById: builder.query<TariffPlan, string>({
      query: (id) => `/tariff-plans/${id}`,
      providesTags: (result, error, id) => [{ type: PcApiTags.TARIFF_PLANS, id }],
    }),
    createTariffPlan: builder.mutation<{ message: string }, Partial<TariffPlan>>({
      query: (tariffPlan) => ({
        url: '/tariff-plans',
        method: 'POST',
        body: tariffPlan,
      }),
      invalidatesTags: [PcApiTags.TARIFF_PLANS],
    }),
    updateTariffPlan: builder.mutation<{ message: string }, { id: string; tariffPlan: Partial<TariffPlan> }>({
      query: ({ id, tariffPlan }) => ({
        url: `/tariff-plans/${id}`,
        method: 'PUT',
        body: tariffPlan,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: PcApiTags.TARIFF_PLANS, id }],
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetTariffPlansQuery,
  useGetTariffPlanByIdQuery,
  useCreateTariffPlanMutation,
  useUpdateTariffPlanMutation,
} = tariffPlanApi
