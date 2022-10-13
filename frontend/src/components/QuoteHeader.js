import styled from 'styled-components'
import useQuoteContext from '../hooks/useQuoteContext'
import BillingToggle from './BillingToggle'

function QuoteHeader({ quote }) {
    const { monthlyBilling, setMonthlyBilling, selectedAddonsTotal } =
        useQuoteContext()

    // console.log('In QuoteHeader ----------------------')
    // console.log({ monthlyBilling, setMonthlyBilling, selectedAddonsTotal })

    // function toggleBilling() {
    //     setMonthlyBilling(prevMonthlyBilling => !prevMonthlyBilling)
    // }

    return (
        <Wrapper>
            {/* <button onClick={toggleBilling}>ToggleBilling</button> */}
            <BillingToggle
                monthlyBilling={monthlyBilling}
                setMonthlyBilling={setMonthlyBilling}
            />
            <h1>Billing period: {monthlyBilling ? 'Monthly' : 'Annual'}</h1>
            <h2>
                Total amount (addons):{' '}
                {monthlyBilling
                    ? selectedAddonsTotal.monthly
                    : selectedAddonsTotal.annual}
            </h2>
            <h2>
                Total amount (base):{' '}
                {monthlyBilling ? quote.monthlyPrice : quote.annualPrice}
            </h2>
            <h2>
                Total amount (base+addons):{' '}
                {monthlyBilling
                    ? quote.monthlyPrice + selectedAddonsTotal.monthly
                    : quote.annualPrice + selectedAddonsTotal.annual}
            </h2>

            <ul>
                <li>First name: {quote.firstName}</li>
                <li>Last name: {quote.lastName}</li>
                <li>Address (1): {quote.address1}</li>
                <li>Address (2): {quote.address2}</li>
                <li>Address (3): {quote.address3}</li>
                <li>Postcode: {quote.postcode}</li>
                <li>Town: {quote.town}</li>
                <li>Start date: {quote.startDate}</li>
                <li>Quote Reference: {quote.quoteRef}</li>
                <li>Monthly price: {quote.monthlyPrice}</li>
                <li>Annual price: {quote.annualPrice}</li>
            </ul>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    font-size: 1rem;
    li {
        text-align: left;
        color: var(--primary);
    }
`

export default QuoteHeader
