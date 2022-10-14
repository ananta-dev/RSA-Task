import { useState, useEffect } from 'react'
import styled from 'styled-components'
import useFetchQuote from '../hooks/useFetchQuote'
import useFetchAddons from '../hooks/useFetchAddons'
import AddonCard from './AddonCard'
import TopBar from './TopBar'
import spinner from '../assets/images/spinner.gif'
import StickyFooter from './StickyFooter'

function QuotePage() {
    const [monthlyBilling, setMonthlyBilling] = useState(true)
    const [addonSelection, setAddonSelection] = useState(null)
    const [totalPrice, setTotalPrice] = useState({
        monthly: 0,
        annual: 0,
    })
    const { quote, quoteIsLoading, quoteError } = useFetchQuote()
    const { addons, addonsAreLoading, addonsError } = useFetchAddons()

    // Load monthlyBilling (billing period selection) and addonSelection
    // from localStorage if found there and set them.
    // This preserves choices in case of browser refresh (F5).
    useEffect(() => {
        const storedMonthlyBilling = window.localStorage.getItem(
            'RSA-Task-monthlyBilling'
        )
        if (storedMonthlyBilling) {
            setMonthlyBilling(JSON.parse(storedMonthlyBilling))
        }

        const storedAddonSelection = window.localStorage.getItem(
            'RSA-Task-addonSelection'
        )
        if (storedAddonSelection) {
            const updatedSelection = new Map(JSON.parse(storedAddonSelection))
            setAddonSelection(updatedSelection)
        }
    }, [])

    // If addons has been fetched and set, and addonSelection has not been set,
    // as in not available in local storage, then set addonSelection to a new
    // empty selection with no addon selected).
    useEffect(() => {
        if (addons && !addonSelection) {
            const noAddonSelected = new Map()
            addons.forEach(addon => {
                noAddonSelected.set(addon.id, false)
            })
            setAddonSelection(noAddonSelected)
        }
    }, [addons])

    // If quote, addons or addonSelection change, and none of them is null,
    // it it time to calculate and set the total price.
    useEffect(() => {
        if (quote && addons && addonSelection) {
            const [addonsMonthlyTotal, addonsAnnualTotal] = addons.reduce(
                (prev, addon) =>
                    addonSelection.get(addon.id)
                        ? [
                              prev[0] + addon.monthlyPrice,
                              prev[1] + addon.annualPrice,
                          ]
                        : prev,
                [0, 0]
            )
            setTotalPrice({
                monthly: quote.monthlyPrice + addonsMonthlyTotal,
                annual: quote.annualPrice + addonsAnnualTotal,
            })
        }
    }, [quote, addons, addonSelection])

    // When we change the selection status of one addon, we also save
    // the selection state of all addons (addonSelection) to local storage.
    const toggleAddonSelection = addonId => {
        const newSelectionState = !addonSelection.get(addonId)
        const updatedSelection = new Map(
            addonSelection.set(addonId, newSelectionState)
        )
        window.localStorage.setItem(
            'RSA-Task-addonSelection',
            JSON.stringify([...updatedSelection])
        )
        setAddonSelection(updatedSelection)
    }

    // When we change the billing period, we save it to local storage.
    const toggleBillingPeriod = () => {
        window.localStorage.setItem(
            'RSA-Task-monthlyBilling',
            JSON.stringify(!monthlyBilling)
        )
        setMonthlyBilling(prev => !prev)
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

                {/* Note: Proper error management is required for data fetching. */}
                {/* This is a temporary solution in case the API is not working. */}
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
                                <div
                                    id='price-div'
                                    className='card-body d-flex flex-column justify-content-start align-items-center pb-0'
                                >
                                    <p className='total-price'>
                                        £
                                        {monthlyBilling
                                            ? totalPrice.monthly.toFixed(2)
                                            : totalPrice.annual.toFixed(2)}
                                    </p>
                                    <p className='fs-3 lh-1 pb-1'>
                                        {monthlyBilling
                                            ? 'per month'
                                            : 'per year'}
                                    </p>
                                    <p className='fs-6 lh-1 mb-4 tax-text'>
                                        This price includes Insurance Premium
                                        Tax at the current rate.{' '}
                                        {monthlyBilling
                                            ? 'No charge for paying monthly.'
                                            : ''}
                                    </p>
                                </div>
                                <div className='card-footer bg-white border-0 pt-0'>
                                    <BillingToggleButton
                                        onClick={() => toggleBillingPeriod()}
                                    >
                                        Switch to{' '}
                                        {monthlyBilling ? 'annual' : 'monthly'}
                                    </BillingToggleButton>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* -------- Addons Section -------- */}
                {addons && addonSelection && (
                    <>
                        <div className='row px-4 fs-1'>
                            <div className='col-12 py-2 '>
                                Tailor your cover with our optional extras
                            </div>
                        </div>
                        <div className='row px-4 mb-5 pb-5'>
                            {addons.map(addon => (
                                <AddonCard
                                    key={addon.id}
                                    addon={addon}
                                    monthlyBilling={monthlyBilling}
                                    selected={addonSelection.get(addon.id)}
                                    toggleAddonSelection={toggleAddonSelection}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* -------- Sticky Footer shows total price when price in summary is not visible -------- */}
            <StickyFooter
                dataFetched={quote && addons}
                monthlyBilling={monthlyBilling}
                totalPrice={totalPrice}
            />
        </Styles>
    )
}

const BillingToggleButton = styled.button`
    border: 0.01rem solid #0c8400;
    color: #0c8400;
    border-radius: 0.4rem;
    background: #e8e8e8;
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
        color: #0c8400;
    }

    .tax-text {
        width: 70%;
        min-height: 2rem;
    }

    @media (max-width: 768px) {
        .total-price {
            font-size: 3rem;
        }

        .tax-text {
            min-height: 3rem;
        }
    }
`

export default QuotePage
