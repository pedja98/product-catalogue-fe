import { pcApi } from './core/pc.api'
import { PcApiTags } from '../../consts/common'
import { SaveTariffPlanDiscount, TariffPlanDiscountResponse } from '../../types/tariffPlans'

export const tariffPlanDiscountApi = pcApi.injectEndpoints({
  endpoints: (builder) => ({
    getTariffPlanDiscountsByTariffPlanIdentifier: builder.query<TariffPlanDiscountResponse, string>({
      query: (identifier) => `/tariff-plan-discounts/tariff-plan/${identifier}/discounts`,
      providesTags: (result, error, id) => [{ type: PcApiTags.TARIFF_PLAN_DISCOUNTS, id }],
    }),

    createTariffPlanDiscount: builder.mutation<{ message: string }, Partial<SaveTariffPlanDiscount>>({
      query: (body) => ({
        url: '/tariff-plan-discounts',
        method: 'POST',
        body,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: PcApiTags.TARIFF_PLAN_DISCOUNTS, id: arg.tariffPlanIdentifier },
      ],
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
      // Optional: You can also invalidate using tariffPlanIdentifier if available
      invalidatesTags: (result, error, { id }) => [{ type: PcApiTags.TARIFF_PLAN_DISCOUNTS, id }],
    }),

    deleteTariffPlanDiscount: builder.mutation<{ message: string }, { id: string; tariffPlanIdentifier: string }>({
      query: ({ id }) => ({
        url: `/tariff-plan-discounts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { tariffPlanIdentifier }) => [
        { type: PcApiTags.TARIFF_PLAN_DISCOUNTS, id: tariffPlanIdentifier },
      ],
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetTariffPlanDiscountsByTariffPlanIdentifierQuery,
  useCreateTariffPlanDiscountMutation,
  useUpdateTariffPlanDiscountMutation,
  useDeleteTariffPlanDiscountMutation,
} = tariffPlanDiscountApi
