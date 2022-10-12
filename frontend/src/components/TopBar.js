import styled from 'styled-components'

function TopBar() {
    return (
        <Wrapper className='font-face-futura-rener'>
            <h1>HOME INSURANCE</h1>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    background: #ddd;
    border: 0.15rem solid var(--primary);

    h1 {
        font-family: 'FuturaRener';
        font-size: calc(1rem + 5vmin);
        letter-spacing: 0.1rem;
        background: white;
        color: #0c8300;
        font-weight: lighter;
        font-weight: 500;
    }
`

export default TopBar
