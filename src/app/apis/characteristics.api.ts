import { PcApiTags } from '../../consts/common'
import { Characteristic } from '../../types/characteristics'
import { pcApi } from './core/pc.api'

export const characteristicApi = pcApi.injectEndpoints({
  endpoints: (builder) => ({
    getCharacteristics: builder.query<Characteristic[], void>({
      query: () => '/characteristics',
      providesTags: [PcApiTags.CHARACTERISTICS],
    }),
    getCharacteristicByIdentifier: builder.query<Characteristic, string>({
      query: (identifier) => `/characteristics/${identifier}`,
      providesTags: (result, error, id) => [{ type: PcApiTags.CHARACTERISTICS, id }],
    }),
    createCharacteristic: builder.mutation<{ message: string }, Partial<Characteristic>>({
      query: (characteristic) => ({
        url: '/characteristics',
        method: 'POST',
        body: characteristic,
      }),
      invalidatesTags: [PcApiTags.CHARACTERISTICS],
    }),
  }),
  overrideExisting: false,
})

export const { useGetCharacteristicsQuery, useGetCharacteristicByIdentifierQuery, useCreateCharacteristicMutation } =
  characteristicApi
