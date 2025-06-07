import { pcApi } from './core/pc.api'
import { PcApiTags } from '../../consts/common'
import { AddTariffPlanCharacteristic, TariffPlanCharacteristicResponse } from '../../types/tariffPlans'

export const tariffPlanCharacteristicApi = pcApi.injectEndpoints({
  endpoints: (builder) => ({
    getCharacteristicsByTariffPlan: builder.query<TariffPlanCharacteristicResponse, string>({
      query: (tariffPlanIdentifier) =>
        `/tariff-plan-characteristics/tariff-plan/${tariffPlanIdentifier}/characteristics`,
      providesTags: (result, error, tariffPlanId) => [
        { type: PcApiTags.TARIFF_PLAN_CHARACTERISTICS, id: tariffPlanId },
      ],
    }),
    addTariffPlanCharacteristic: builder.mutation<{ message: string }, Partial<AddTariffPlanCharacteristic>>({
      query: (body) => ({
        url: '/tariff-plan-characteristics',
        method: 'POST',
        body,
      }),
      invalidatesTags: (result, error, body) => [
        { type: PcApiTags.TARIFF_PLAN_CHARACTERISTICS, id: body.tariffPlanId },
      ],
    }),
    deleteTariffPlanCharacteristic: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/tariff-plan-characteristics/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [PcApiTags.TARIFF_PLAN_CHARACTERISTICS],
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetCharacteristicsByTariffPlanQuery,
  useAddTariffPlanCharacteristicMutation,
  useDeleteTariffPlanCharacteristicMutation,
} = tariffPlanCharacteristicApi
