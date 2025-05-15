import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getCurrentUser } from '../../../helpers/common'
import { PcApiTags } from '../../../consts/common'

export const pcApi = createApi({
  reducerPath: 'pcApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_PC_API}`,
    prepareHeaders: (headers) => {
      const currentUser = getCurrentUser()
      if (currentUser?.username && currentUser?.type) {
        headers.set('x-username', currentUser.username)
        headers.set('x-user-type', String(currentUser.type))
      }
      return headers
    },
  }),
  tagTypes: [
    PcApiTags.CHARACTERISTICS,
    PcApiTags.ADDONS,
    PcApiTags.TARIFF_PLANS,
    PcApiTags.TARIFF_PLAN_CHARACTERISTICS,
    PcApiTags.TARIFF_PLAN_DISCOUNTS,
  ],
  endpoints: () => ({}),
})
