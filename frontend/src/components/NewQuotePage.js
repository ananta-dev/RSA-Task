import { useState, useEffect } from 'react'
import styled from 'styled-components'
import useFetchQuote from '../hooks/useFetchQuote'
import useFetchAddons from '../hooks/useFetchAddons'
import NewAddonCard from './NewAddonCard'
import TopBar from './TopBar'
import spinner from '../assets/images/spinner.gif'

function NewQuotePage() {
    // const [monthlyBilling, setMonthlyBilling] = useState(true)
    const [addonSelection, setAddonSelection] = useState(new Map())
    // const [quote, setQuote] = useState(null)
    // const [selectedAddonsTotal, setSelectedAddonsTotal] = useState({
    //     monthly: 10,
    //     annual: 120,
    // })
    // const [totalAmount, setTotalAmount] = useState({
    //     monthly: 30,
    //     annual: 250,
    // })

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

    const toggleAddonSelection = addonId => {
        // console.log('toggleAddonSelection')
        // console.log({ addonId })
        // console.log({ addonSelection })

        const newSelectionState = !addonSelection.get(addonId)
        const updatedSelection = new Map(
            addonSelection.set(addonId, newSelectionState)
        )
        setAddonSelection(updatedSelection)
        // updateTotal()
    }

    return (
        <Styles>
            <TopBar />
            <div className='container-fluid'>
                {/* -------- Loading spinner -------- */}
                {(quoteIsLoading || addonsAreLoading) && (
                    <div className='spinner-wrapper'>
                        <img
                            src={spinner}
                            width='100px'
                            alt=''
                            className='spinner'
                        />
                    </div>
                )}

                {/* -------- Quote Summary Section -------- */}
                {quote && (
                    <div className='row px-5 mb-5 quote-summary'>
                        <div className='col-lg-6 py-2 '>
                            <h1>Hey {quote.firstName}</h1>
                            <p>
                                Here is your quote for Royal & Sun Alliance, St.
                                Marks Court, Chart Way
                            </p>
                            <p>Quote reference: {quote.quoteRef}</p>
                            <p>Cover starts on: {quote.quoteRef}</p>
                        </div>
                        <div className='col-lg-6 py-2 border border-dark'>
                            Column
                        </div>
                    </div>
                )}

                {/* -------- Addons Section -------- */}
                {addons && (
                    <div className='row px-5'>
                        {addons.map(addon => (
                            <NewAddonCard
                                key={addon.id}
                                addon={addon}
                                selected={addonSelection.get(addon.id)}
                                toggleAddonSelection={toggleAddonSelection}
                            />
                        ))}
                    </div>
                )}

                {/* Note: Proper error management is required for data fetching */}
                {(quoteError || addonsError) && (
                    <h1>
                        Errors encountered while retrieving data from the
                        server.
                    </h1>
                )}
            </div>
        </Styles>
    )
}

const Styles = styled.div`
    min-height: 100vh;
    background-color: #eee;

    header {
        background-color: inherit;
    }

    .container-fluid {
        background-color: inherit;
    }

    .spinner-wrapper {
        position: fixed;
        z-index: 999;
        overflow: show;
        margin: auto;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        width: 100px;
        height: 100px;
    }

    /* .spinner {
        left: 50%;
        margin-left: -4em;
    } */
`

export default NewQuotePage
