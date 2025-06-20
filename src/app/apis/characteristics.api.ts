import { PcApiTags } from '../../consts/common'
import { Characteristic, SaveCharacteristic } from '../../types/characteristics'
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
    createCharacteristic: builder.mutation<{ message: string }, Partial<SaveCharacteristic>>({
      query: (characteristic) => ({
        url: '/characteristics',
        method: 'POST',
        body: characteristic,
      }),
      invalidatesTags: [PcApiTags.CHARACTERISTICS],
    }),
    updateCharacteristic: builder.mutation<
      { message: string },
      { identifier: string; char: Partial<SaveCharacteristic> }
    >({
      query: ({ identifier, char }) => ({
        url: `/characteristics/${identifier}`,
        method: 'PUT',
        body: char,
      }),
      invalidatesTags: [PcApiTags.CHARACTERISTICS],
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetCharacteristicsQuery,
  useGetCharacteristicByIdentifierQuery,
  useCreateCharacteristicMutation,
  useUpdateCharacteristicMutation,
} = characteristicApi
