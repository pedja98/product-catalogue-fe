import { pcApi } from './core/pc.api'
import { PcApiTags } from '../../consts/common'
import { AddTariffPlanCharacteristic, TariffPlanCharacteristicResponse } from '../../types/tariffPlans'

export const tariffPlanCharacteristicApi = pcApi.injectEndpoints({
  endpoints: (builder) => ({
    getCharacteristicsByTariffPlanIdentifier: builder.query<TariffPlanCharacteristicResponse, string>({
      query: (tariffPlanIdentifier) =>
        `/tariff-plan-characteristics/tariff-plan/${tariffPlanIdentifier}/characteristics`,
      providesTags: () => [{ type: PcApiTags.TARIFF_PLAN_CHARACTERISTICS }],
    }),

    addTariffPlanCharacteristic: builder.mutation<{ message: string }, Partial<AddTariffPlanCharacteristic>>({
      query: (body) => ({
        url: '/tariff-plan-characteristics',
        method: 'POST',
        body,
      }),
      invalidatesTags: () => [{ type: PcApiTags.TARIFF_PLAN_CHARACTERISTICS }],
    }),

    deleteTariffPlanCharacteristic: builder.mutation<{ message: string }, { id: string }>({
      query: ({ id }) => ({
        url: `/tariff-plan-characteristics/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: () => [{ type: PcApiTags.TARIFF_PLAN_CHARACTERISTICS }],
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetCharacteristicsByTariffPlanIdentifierQuery,
  useAddTariffPlanCharacteristicMutation,
  useDeleteTariffPlanCharacteristicMutation,
} = tariffPlanCharacteristicApi
