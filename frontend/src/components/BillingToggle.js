import styled from 'styled-components'
import { useState } from 'react'

const BillingToggle = ({ monthlyBilling, setMonthlyBilling }) => {
    const [checked, setChecked] = useState(monthlyBilling)

    const handleChange = e => {
        setChecked(e.target.checked)
        setMonthlyBilling(prev => !prev)
    }

    console.log('Toggle Billing')
    console.log({ checked, monthlyBilling })

    return (
        <Label>
            <span>Billing Option: {checked ? 'Monthly' : 'Annual'}</span>
            <Input checked={checked} type='checkbox' onChange={handleChange} />
            <Switch />
        </Label>
    )
}

const Label = styled.label`
    display: flex;
    align-items: center;
    gap: 1rem;
    cursor: pointer;
    span {
        font-size: 2rem;
    }
`

const Switch = styled.div`
    position: relative;
    width: 60px;
    height: 28px;
    background: #b3b3b3;
    border-radius: 32px;
    padding: 4px;
    transition: 300ms all;

    &:before {
        transition: 300ms all;
        content: '';
        position: absolute;
        width: 28px;
        height: 28px;
        border-radius: 35px;
        top: 50%;
        left: 4px;
        background: white;
        transform: translate(0, -50%);
    }
`

const Input = styled.input`
    opacity: 0;
    position: absolute;

    &:checked + ${Switch} {
        background: green;

        &:before {
            transform: translate(32px, -50%);
        }
    }
`

export default BillingToggle
