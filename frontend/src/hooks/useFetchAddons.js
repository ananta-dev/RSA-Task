import useSWR from 'swr'

function useFetchAddons() {
    const { data, error } = useSWR('/addons')

    return {
        addons: data,
        addonsAreLoading: !error && !data,
        addonsError: error,
    }
}

export default useFetchAddons
