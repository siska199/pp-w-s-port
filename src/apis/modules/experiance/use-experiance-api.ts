import ENDPOINT from '@apis/constant'

import useAPI from '@hooks/use-api'
import experiances from '@lib/data/dummy/experiances.json'
import { TPaginationQueryParams } from '@typescript/global.d'

const useExperianceAPI = () => {
  const { apiClient } = useAPI()

  type TQueryObjectGetListExperiance = TPaginationQueryParams &
    Partial<{
      company: string
      profession: string
      start_at: Date
      end_at: Date
    }>

  const getListExperiance = async (queryObject: TQueryObjectGetListExperiance) => {
    await apiClient({
      endpoint: ENDPOINT.EXPERIANCE.GET_LIST_EXPERIANCE,
      queryObject
    })
    return {
      message: 'Successfully Get Data',
      status: 200,
      data: experiances,
      current_page: 1,
      total_page: 10,
      sort_by: 'company',
      sort_dir: 'desc'
    }
  }

  const getDetailExperiance = async (id: string) => {
    await apiClient({
      endpoint: ENDPOINT.EXPERIANCE.GET_DETAIL_EXPERIANCE(id)
    })

    return {
      message: 'Successfully Get Data',
      status: 200,
      data: {
        id: '0p9o8n7m-6l5k-4j3i-2h1g-8f7e6d5c4b2b',
        id_company: '7s6r5q4p-3z2x-1w0v-9u8t-5d4c3b2a1k2b',
        company_name: 'Innovatech LLC',
        id_profession: '9l8k7j6h-5g4f-3e2d-1c0b-2a3z4x5w6v2b',
        profession_name: 'Product Manager',
        projects: [
          { id: 'i9j8k7l6', name: 'Project X' },
          { id: 'm5n4o3p2', name: 'Project Y' }
        ],
        tech_stacks: ['Python', 'Django', 'PostgreSQL'],
        created_at: '2024-10-26T14:45:00.000Z',
        updated_at: '2024-10-26T14:45:00.000Z'
      }
    }
  }

  interface TPayloadAddExperiance {
    id_company: string
    id_profession: string
    start_at: Date
    end_at: Date
    description: string
  }
  const addExperiance = async (payload: TPayloadAddExperiance) => {
    await apiClient({
      endpoint: ENDPOINT.EXPERIANCE.ADD_EXPERIANCE,
      payload
    })

    return {
      message: 'Successfully Create Data'
    }
  }

  interface TParamsEditExperiance {
    id: string
    payload: Partial<TPayloadAddExperiance>
  }

  const editExperiance = async (params: TParamsEditExperiance) => {
    const { id, payload } = params
    await apiClient({
      endpoint: ENDPOINT.EXPERIANCE.EDIT_EXPERIANCE(id),
      payload
    })

    return {
      message: 'Successfully Edit Data Data'
    }
  }

  const deleteExperiance = async (id: string) => {
    await apiClient({
      endpoint: ENDPOINT.EXPERIANCE.DELETE_EXPERIANCE(id)
    })

    return {
      message: 'Successfully Edit Data Data'
    }
  }

  return {
    getListExperiance,
    getDetailExperiance,
    addExperiance,
    editExperiance,
    deleteExperiance
  }
}

export default useExperianceAPI
