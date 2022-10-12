import { useState, useEffect } from 'react'
import styled from 'styled-components'
import useFetchQuote from '../hooks/useFetchQuote'
import useFetchAddons from '../hooks/useFetchAddons'
import NewAddonCard from './NewAddonCard'
import TopBar from './TopBar'

function NewQuotePage() {
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

    const toggleAddonSelection = addonId => {
        console.log('toggleAddonSelection')
        console.log({ addonId })
        console.log({ addonSelection })

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
                <section>Quote Summary Section</section>
                <div className='row px-5 mb-5'>
                    <div className='col-md-6 py-2 border border-dark'>
                        Column
                    </div>
                    <div className='col-md-6 py-2 border border-dark'>
                        Column
                    </div>
                </div>

                <section>Addons Section</section>

                <div className='row px-5'>
                    {addons &&
                        addons.map(addon => (
                            <NewAddonCard
                                key={addon.id}
                                addon={addon}
                                selected={addonSelection.get(addon.id)}
                                toggleAddonSelection={toggleAddonSelection}
                            />
                        ))}
                </div>
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
`

export default NewQuotePage
