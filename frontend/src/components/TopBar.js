import styled from 'styled-components'
import reportWebVitals from './../reportWebVitals'

function TopBar() {
    return (
        <Styles className='container-fluid border border-dark mb-4'>
            <div className='row px-4'>
                <span>HOME INSURANCE</span>
            </div>
        </Styles>
    )
}

const Styles = styled.div`
    div {
        background-color: white;
    }

    span {
        font-family: 'FuturaRener';
        font-size: calc(1.2rem + 2vmin);
        letter-spacing: 0.1rem;
        color: #0c8300;
        font-weight: lighter;
        font-weight: 500;
    }
`

export default TopBar
