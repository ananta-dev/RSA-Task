import styled from 'styled-components'
import { HideOn } from 'react-hide-on-scroll'

function StickyFooter({ dataFetched, monthlyBilling, totalPrice }) {
    return (
        <>
            {dataFetched && (
                <Styles>
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
                </Styles>
            )}
        </>
    )
}

const Styles = styled.div`
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

export default StickyFooter
