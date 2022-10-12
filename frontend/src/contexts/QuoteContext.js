import { createContext } from 'react'

export const QuoteContext = createContext({
    monthlyBilling: null,
    setMonthlyBilling: () => {},
    addonSelection: null,
    setAddonSelection: () => {},
    selectedAddonsTotal: null,
    setSelectedAddonsTotal: () => {},
})
