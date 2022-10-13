// import { useState } from 'react'
import styled from 'styled-components'
// import Spinner from './Spinner'
// import useFetchAddons from '../hooks/useFetchAddons'
import AddonCard from './AddonCard'

import useQuoteContext from '../hooks/useQuoteContext'

function Addons({ addons }) {
    // const { addons, isLoading, isError } = useFetchAddons()

    const { addonSelection, setAddonSelection, setSelectedAddonsTotal } =
        useQuoteContext()

    console.log({ addons })

    const toggleAddonSelection = addonId => {
        // console.log('toggleAddonSelection')
        // console.log('addonId')
        const newSelectionState = !addonSelection.get(addonId)
        const updatedSelection = new Map(
            addonSelection.set(addonId, newSelectionState)
        )
        setAddonSelection(updatedSelection)
        // updateTotal()
    }

    // if (isError) return <h1>Error while fetching addons</h1>
    // if (isLoading) return <Spinner />

    // console.log('Addons')

    return (
        <Wrapper>
            <div className='addons-container'>
                {addons &&
                    addons.map(addon => (
                        <AddonCard
                            key={addon.title}
                            addon={addon}
                            toggleAddonSelection={toggleAddonSelection}
                        />
                    ))}
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 2rem;
    /* width: 100%; */
    /* background-color: #fff; */
    background-color: pink;
    border: var(--mainBorder);
    .addons-container {
        background-color: lightblue;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-row-gap: 2.2rem;
        grid-column-gap: 2rem;
    }
`

export default Addons
