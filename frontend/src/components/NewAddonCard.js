import styled from 'styled-components'

function NewAddonCard({ addon, selected, toggleAddonSelection }) {
    const handleClick = () => {
        // console.log('in handleClick ', addon.title)
        toggleAddonSelection(addon.id)
    }

    const monthlyBilling = true

    return (
        <Styles className='col-xxl-6 my-3'>
            <div className='card border-dark rounded-0 pt-2 pe-3 pb-4 ps-2 h-100'>
                <div className='card-body'>
                    <div className='d-flex justify-content-between flex-wrap mb-4'>
                        <div className='addon-title'>
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
                    <p className='card-text mt-1'>{addon.text}</p>
                </div>
                <div className='card-footer border-0'>
                    {selected && <h1>Selected! </h1>}
                    <AddButton onClick={handleClick}>
                        Select this extra
                    </AddButton>
                </div>
            </div>
        </Styles>
    )
}

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

    .card-footer {
        background-color: white;
    }
`

const AddButton = styled.button`
    border: 0.01rem solid black;
    border-radius: 0.4rem;
    background: #ddd;
    font-family: MoreThan-Bold;
    font-size: 1.3rem;
    padding: 0.8rem 1.6rem;
    float: right;
`

export default NewAddonCard
