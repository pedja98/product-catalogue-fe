import { pcApi } from './core/pc.api'
import { PcApiTags } from '../../consts/common'
import { TariffPlanDiscount } from '../../types/tariffPlans'

export const tariffPlanDiscountApi = pcApi.injectEndpoints({
  endpoints: (builder) => ({
    getTariffPlanDiscounts: builder.query<TariffPlanDiscount[], void>({
      query: () => '/tariff-plan-discounts',
      providesTags: [PcApiTags.TARIFF_PLAN_DISCOUNTS],
    }),
    getTariffPlanDiscountById: builder.query<TariffPlanDiscount, string>({
      query: (id) => `/tariff-plan-discounts/${id}`,
      providesTags: (result, error, id) => [{ type: PcApiTags.TARIFF_PLAN_DISCOUNTS, id }],
    }),
    createTariffPlanDiscount: builder.mutation<{ message: string }, Partial<TariffPlanDiscount>>({
      query: (body) => ({
        url: '/tariff-plan-discounts',
        method: 'POST',
        body,
      }),
      invalidatesTags: [PcApiTags.TARIFF_PLAN_DISCOUNTS],
    }),
    updateTariffPlanDiscount: builder.mutation<{ message: string }, { id: string; body: Partial<TariffPlanDiscount> }>({
      query: ({ id, body }) => ({
        url: `/tariff-plan-discounts/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: PcApiTags.TARIFF_PLAN_DISCOUNTS, id }],
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetTariffPlanDiscountsQuery,
  useGetTariffPlanDiscountByIdQuery,
  useCreateTariffPlanDiscountMutation,
  useUpdateTariffPlanDiscountMutation,
} = tariffPlanDiscountApi
