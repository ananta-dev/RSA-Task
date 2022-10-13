import { useState, useEffect } from 'react'
import styled from 'styled-components'
import useFetchQuote from '../hooks/useFetchQuote'
import useFetchAddons from '../hooks/useFetchAddons'
import NewAddonCard from './NewAddonCard'
import TopBar from './TopBar'
import spinner from '../assets/images/spinner.gif'

function NewQuotePage() {
    const [monthlyBilling, setMonthlyBilling] = useState(true)
    const [addonSelection, setAddonSelection] = useState(new Map())
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

    const formatDateTime = dateString => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' }
        return new Date(dateString).toLocaleString('en-GB', options)
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

                {/* Note: Proper error management is required for data fetching */}
                {(quoteError || addonsError) && (
                    <h1>
                        Errors encountered while retrieving data from the
                        server.
                    </h1>
                )}

                {/* -------- Quote Summary Section -------- */}
                {quote && (
                    <div className='row px-4 mb-5 quote-summary'>
                        <div className='col-lg-6 mt-1 pt-4 pb-2 d-flex flex-column gap-3 quote-details'>
                            <span className='fs-1'>Hey {quote.firstName},</span>
                            <span className='fs-6'>
                                Here is your quote for Royal & Sun Alliance, St.
                                Marks Court, Chart Way
                            </span>
                            <span className='fs-6'>
                                Quote reference: {quote.quoteRef}
                            </span>
                            <span className='fs-6'>
                                Cover starts on:{' '}
                                {formatDateTime(quote.startDate)}
                            </span>
                        </div>
                        <div className='col-lg-6 py-2'>
                            <div className='card border-dark rounded-0 pt-3 pe-3 pb-4 ps-2 text-center'>
                                <div className='card-body d-flex flex-column justify-content-start align-items-center pb-0'>
                                    <p className='total-price'>£21.64</p>
                                    <p className='fs-3 lh-1 pb-1'>per month</p>
                                    <p className='fs-6 lh-1 mb-4 tax-text'>
                                        This price includes Insurance Premium
                                        Tax at the current rate. No charge for
                                        paying monthly.
                                    </p>
                                </div>
                                <div className='card-footer border-0 pt-0'>
                                    <BillingToggleButton>
                                        Switch to annual
                                    </BillingToggleButton>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* -------- Addons Section -------- */}
                {addons && (
                    <>
                        <div className='row px-4 fs-1'>
                            <div className='col-12 py-2 '>
                                Tailor your cover with our optional extra
                            </div>
                        </div>
                        <div className='row px-4'>
                            {addons.map(addon => (
                                <NewAddonCard
                                    key={addon.id}
                                    addon={addon}
                                    selected={addonSelection.get(addon.id)}
                                    toggleAddonSelection={toggleAddonSelection}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </Styles>
    )
}

const BillingToggleButton = styled.button`
    border: 0.01rem solid black;
    border-radius: 0.4rem;
    background: #ddd;
    font-family: MoreThan-Bold;
    font-size: 1.3rem;
    padding: 0.7rem 1.6rem;
    float: center;
    width: 70%;
`

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

    .total-price {
        font-size: 3.6rem;
        line-height: 0.6em;
    }

    .tax-text {
        width: 70%;
    }

    @media (max-width: 768px) {
        .total-price {
            font-size: 3rem;
        }
    }

    // revise this!
    @media (max-width: 992px) {
        .quote-details {
            margin-top: 0;
            padding-top: 0;
        }

        .quote-summary {
            margin-top: 0;
            padding-top: 0;
        }
    }
`

export default NewQuotePage
