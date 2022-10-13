import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { HideOn } from 'react-hide-on-scroll'
import useFetchQuote from '../hooks/useFetchQuote'
import useFetchAddons from '../hooks/useFetchAddons'
import AddonCard from './AddonCard'
import TopBar from './TopBar'
import spinner from '../assets/images/spinner.gif'

function QuotePage() {
    const [monthlyBilling, setMonthlyBilling] = useState(true)
    const [addonSelection, setAddonSelection] = useState(new Map())
    const [totalPrice, setTotalPrice] = useState({
        monthly: 0,
        annual: 0,
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

    useEffect(() => {
        if (quote) {
            setTotalPrice({
                monthly: quote.monthlyPrice,
                annual: quote.annualPrice,
            })
        }
    }, [quote])

    const toggleAddonSelection = addonId => {
        const newSelectionState = !addonSelection.get(addonId)
        const updatedSelection = new Map(
            addonSelection.set(addonId, newSelectionState)
        )
        const [addonsMonthlyTotal, addonsAnnualTotal] = addons.reduce(
            (prev, addon) =>
                updatedSelection.get(addon.id)
                    ? [
                          prev[0] + addon.monthlyPrice,
                          prev[1] + addon.annualPrice,
                      ]
                    : prev,
            [0, 0]
        )
        setAddonSelection(updatedSelection)
        setTotalPrice({
            monthly: quote.monthlyPrice + addonsMonthlyTotal,
            annual: quote.annualPrice + addonsAnnualTotal,
        })
    }

    const toggleBillingPeriod = () => {
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
                {addons && (
                    <>
                        <div className='row px-4 fs-1'>
                            <div className='col-12 py-2 '>
                                Tailor your cover with our optional extra
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

            {quote && addons && (
                <HideOn divID='price-div' inverse>
                    <div className='sticky-footer'>
                        <span className='fs-1 footer-amount'>
                            £
                            {monthlyBilling
                                ? totalPrice.monthly.toFixed(2)
                                : totalPrice.annual.toFixed(2)}
                        </span>
                        <span className='fs-6 footer-period'>
                            {monthlyBilling ? 'A MONTH' : 'A YEAR'}
                        </span>
                    </div>
                </HideOn>
            )}
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

    /* <div className='col d-flex justify-content-end pe-5 me-5' >
     */
    .sticky-footer {
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 4.5rem;
        line-height: 60px;
        text-align: center;
        color: #fff;
        background-color: #0c8400;
        box-shadow: 0 -1px 15px 3px black;
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
        .footer-amount {
            margin: 0 1rem 0.5rem 0;
        }
        .footer-period {
            margin: 0 11rem 0.17rem 0;
        }
    }

    @media (max-width: 768px) {
        .total-price {
            font-size: 3rem;
        }

        .tax-text {
            min-height: 3rem;
        }

        .sticky-footer {
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 5.5rem;
            .footer-amount,
            .footer-period {
                margin: 0;
                padding: 0;
                line-height: 2rem;
            }
        }
    }
`

export default QuotePage
