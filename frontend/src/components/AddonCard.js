import styled from 'styled-components'

function AddonCard({ addon, selected, monthlyBilling, toggleAddonSelection }) {
    const handleClick = () => {
        // console.log('in handleClick ', addon.title)
        toggleAddonSelection(addon.id)
    }

    return (
        <Styles className='col-xl-6 my-3'>
            <div className='card border-dark rounded-0 pt-2 pe-3 pb-4 ps-2 h-100'>
                <div className='card-body'>
                    <div className='d-flex justify-content-between flex-wrap mb-4 title-and-price'>
                        <div className='me-4 addon-title'>
                            <span>{addon.title}</span>
                        </div>
                        <div className='addon-price d-flex align-items-center pt-1'>
                            {monthlyBilling && (
                                <span>£ {addon.monthlyPrice} per month</span>
                            )}
                            {!monthlyBilling && (
                                <span>£ {addon.annualPrice} per year</span>
                            )}
                        </div>
                    </div>
                    <p className='card-text mt-1 addon-text'>{addon.text}</p>
                </div>
                <div className='card-footer bg-white border-0 d-flex justify-content-end gap-2'>
                    {selected && (
                        <RemoveButton onClick={handleClick}>
                            Remove this
                        </RemoveButton>
                    )}
                    <AddButton onClick={handleClick} disabled={selected}>
                        {selected && (
                            <div>
                                Added{' '}
                                <i className='fa-solid fa-check tick-mark'></i>
                            </div>
                        )}
                        {!selected && 'Select this extra'}
                    </AddButton>
                </div>
            </div>
        </Styles>
    )
}

const AddButton = styled.button`
    border: 0.01rem solid #0c8400;
    color: #fff;
    border-radius: 0.4rem;
    background: #0c8400;
    font-family: MoreThan-Bold;
    font-size: 1.3rem;
    min-width: 13rem;
    padding: 0.7rem 1.6rem;

    ${props =>
        props.disabled
            ? 'background-color: #f2af00; color: #000; border: none;'
            : ''}
`

const RemoveButton = styled.button`
    border: 0.01rem solid #0c8400;
    color: #0c8400;
    border-radius: 0.4rem;
    background: #e8e8e8;
    font-family: MoreThan-Bold;
    font-size: 1.3rem;
    min-width: 13rem;
    padding: 0.7rem 1.3rem;
`

const Styles = styled.div`
    .card {
        background-color: white;
    }

    .addon-title {
        font-family: MoreThan-Light;
        font-size: 2rem;
    }

    .addon-price {
        color: #0c8400;
        font-size: 1.1rem;
        font-family: MoreThan-Regular;
    }

    .addon-text {
        font-size: 1.1rem;
    }

    @media (max-width: 768px) {
        .title-and-price {
            flex-direction: column;
        }
    }
`
export default AddonCard
