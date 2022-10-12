import { useContext } from 'react'
import { QuoteContext } from '../contexts/QuoteContext'

export default function useQuoteContext() {
    return useContext(QuoteContext)
}
