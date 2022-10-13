import useSWR from 'swr'

function useFetchAddons() {
    const { data, error } = useSWR('/addons')

    // console.log('useAddons')
    // console.log({ data, error })

    return {
        addons: data,
        addonsAreLoading: !error && !data,
        addonsError: error,
    }
}

export default useFetchAddons
