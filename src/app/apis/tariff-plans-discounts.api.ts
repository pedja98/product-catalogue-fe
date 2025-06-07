import { pcApi } from './core/pc.api'
import { PcApiTags } from '../../consts/common'
import { SaveTariffPlanDiscount, TariffPlanDiscountResponse } from '../../types/tariffPlans'

export const tariffPlanDiscountApi = pcApi.injectEndpoints({
  endpoints: (builder) => ({
    getTariffPlanDiscountByIdentifier: builder.query<TariffPlanDiscountResponse, string>({
      query: (identifier) => `/tariff-plan-discounts/${identifier}`,
      providesTags: (result, error, id) => [{ type: PcApiTags.TARIFF_PLAN_DISCOUNTS, id }],
    }),
    createTariffPlanDiscount: builder.mutation<{ message: string }, Partial<SaveTariffPlanDiscount>>({
      query: (body) => ({
        url: '/tariff-plan-discounts',
        method: 'POST',
        body,
      }),
      invalidatesTags: [PcApiTags.TARIFF_PLAN_DISCOUNTS],
    }),
    updateTariffPlanDiscount: builder.mutation<
      { message: string },
      { id: string; body: Partial<SaveTariffPlanDiscount> }
    >({
      query: ({ id, body }) => ({
        url: `/tariff-plan-discounts/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: PcApiTags.TARIFF_PLAN_DISCOUNTS, id }],
    }),
    deleteTariffPlanDiscount: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/tariff-plan-discounts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [PcApiTags.TARIFF_PLAN_CHARACTERISTICS],
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetTariffPlanDiscountByIdentifierQuery,
  useCreateTariffPlanDiscountMutation,
  useUpdateTariffPlanDiscountMutation,
  useDeleteTariffPlanDiscountMutation,
} = tariffPlanDiscountApi
