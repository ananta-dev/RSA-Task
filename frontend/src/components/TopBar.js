import styled from 'styled-components'

function TopBar() {
    return (
        <Styles className='container-fluid border border-dark'>
            <div className='row px-4'>
                <span>HOME INSURANCE</span>
            </div>
        </Styles>
    )
}

const Styles = styled.div`
    margin-bottom: 1rem;

    @media (max-width: 992px) {
        margin-bottom: 0;
    }

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
