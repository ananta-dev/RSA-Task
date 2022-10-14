import useSWR from 'swr'

function useFetchQuote() {
    const { data, error } = useSWR('/quote')

    return {
        quote: data ? data[0] : null,
        quoteIsLoading: !error && !data,
        quoteError: error,
    }
}

export default useFetchQuote
