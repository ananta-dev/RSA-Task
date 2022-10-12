import { useState, createContext, useEffect } from 'react'
import styled from 'styled-components'
import TopBar from './TopBar'
import QuoteHeader from './QuoteHeader'
import Addons from './Addons'
import Spinner from './Spinner'
import useFetchQuote from '../hooks/useFetchQuote'
import useFetchAddons from '../hooks/useFetchAddons'
import { QuoteContext } from '../contexts/QuoteContext'

export const KylesQuoteContext = createContext()

function QuotePage() {
    const [monthlyBilling, setMonthlyBilling] = useState(true)
    const [addonSelection, setAddonSelection] = useState(null)
    const [selectedAddonsTotal, setSelectedAddonsTotal] = useState({
        monthly: 10,
        annual: 120,
    })
    const [totalAmount, setTotalAmount] = useState({
        monthly: 30,
        annual: 250,
    })

    const { quote, quoteIsLoading, quoteError } = useFetchQuote()
    const { addons, addonsAreLoading, addonsError } = useFetchAddons()

    useEffect(() => {
        if (addons) {
            const noAddonSelected = new Map()
            addons.forEach(addon => {
                noAddonSelected.set(addon.id, false)
            })
            setAddonSelection(noAddonSelected)
        }
    }, [addons])

    // const updateTotal = () => {
    //     console.log('Updating Total!!!')
    //     console.log({ addonSelection })
    //     const newAddonsMonthlyTotal = addons.reduce((prev, addon)=>{
    //         if (addonSelection.get(addon.id)) {
    //             prev+addon.
    //         }

    //     },0)
    // }

    console.log('QuoteSummary, quote')
    console.log({ quote, quoteIsLoading, quoteError })

    console.log('QuoteSummary, addons')
    console.log({ addons, addonsAreLoading, addonsError })

    console.log('Addon Selection:')
    console.log({ addonSelection, setAddonSelection })

    return (
        <QuoteContext.Provider
            value={{
                monthlyBilling,
                setMonthlyBilling,
                addonSelection,
                setAddonSelection,
                selectedAddonsTotal,
                setSelectedAddonsTotal,
            }}
        >
            <Styles>
                <TopBar />
                <div className='alert-info'>
                    <h1>
                        Loading! Please wait...
                        <i class='fa fa-spinner fa-spin' aria-hidden='true'></i>
                    </h1>
                </div>
                {quoteIsLoading && (
                    <div>
                        <h1>Loading quote</h1>
                        <Spinner />
                    </div>
                )}
                {quoteError && <h1>Error while fetching quote from server</h1>}
                {quote && <QuoteHeader quote={quote[0]} />}
                {addonsAreLoading && (
                    <div>
                        <h1>
                            Loading addons
                            <i
                                class='fa fa-spinner fa-spin'
                                aria-hidden='true'
                            ></i>
                        </h1>
                        {/* <Spinner /> */}
                    </div>
                )}
                {addonsError && (
                    <h1>Error while fetching addons from server</h1>
                )}
                {addons && <Addons addons={addons} />}
            </Styles>
        </QuoteContext.Provider>
    )
}

const Styles = styled.div`
    background-color: #fff;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 3rem;
    color: #282c34;

    .alert-info {
        font-size: 4rem;
        position: relative;
        padding: 1.5rem 2.5rem;
        margin: 2rem 0 1rem 0;
        border: 1px solid transparent;
        border-radius: 0.25rem;
        color: #155724;
        background-color: #d4edda;
        border-color: #c3e6cb;
    }
`

export default QuotePage
