import useSWR from 'swr'

function useFetchQuote() {
    const { data, error } = useSWR('/quote')

    return {
        quote: data,
        quoteIsLoading: !error && !data,
        quoteError: error,
    }
}

export default useFetchQuote
