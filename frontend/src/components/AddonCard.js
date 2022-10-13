import styled from 'styled-components'
import useQuoteContext from '../hooks/useQuoteContext'

function AddonCard({ addon, toggleAddonSelection }) {
    const { monthlyBilling, addonSelection, setAddonSelection } =
        useQuoteContext()

    // console.log('AddonCard')
    // console.log({ monthlyBilling })

    const handleClick = () => {
        // console.log('in handleClick ', addon.title)
    }

    return (
        <Styles>
            <div className='addon-header'>
                <div className='addon-title'>{addon.title}</div>
                <div className='addon-price'>
                    {monthlyBilling && <p>£ {addon.monthlyPrice} per month</p>}
                    {!monthlyBilling && <p>£ {addon.annualPrice} per year</p>}
                </div>
            </div>
            <p className='addon-text'>{addon.text}</p>
            <div className='add-button-wrapper'>
                <AddButton onClick={handleClick}>Select this extra</AddButton>
            </div>
        </Styles>
    )
}

const Styles = styled.article`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 1rem;
    padding: 1.6rem 2.2rem 1.8rem 1.8rem;
    background: #f3f1ed;
    border: 0.1rem solid var(--primary);

    .addon-header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .addon-title {
            color: #000;

            font-family: MoreThan-Light;
            font-size: 2.15rem;
        }
        .addon-price {
            color: #0c8400;
            font-size: 1.8rem;
            font-family: MoreThan-Regular;
        }
    }

    .addon-text {
        text-align: left;
        font-size: 1.2rem;
    }

    .add-button-wrapper {
        display: flex;
        justify-content: flex-end;
        button:hover {
            cursor: pointer;
        }
    }

    transition: all 0.2s ease-in-out;

    &:hover {
        box-shadow: 0 0.1rem 0.1rem #222;
    }

    @media (min-width: 768px) {
        width: 90vh;
        min-width: 90vh;
        /* max-width: 600px; */
    }
`

const AddButton = styled.button`
    border: 0.01rem solid black;
    border-radius: 0.4rem;
    background: #ddd;
    font-family: MoreThan-Bold;
    font-size: 1.3rem;
    padding: 0.8rem 1.6rem;
    /* float: right; */
`

export default AddonCard
