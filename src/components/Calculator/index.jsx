import React, { useEffect, useState } from 'react'
import './calculator.scss'
import Button from '../Button'

export default function Calculator() {
    const [smallDisplay, setSmallDisplay] = useState('')
    const [largeDisplay, setLargeDisplay] = useState('0')
    const [lastNumber, setLastNumber] = useState(0)
    const [lastOperation, setLastOperation] = useState('')
    const [clearFlag, setClearFlag] = useState(false);

    const handleOperation = (key) => {
        let value = Number(lastNumber)
        switch (lastOperation) {
            case '+':
                value += Number(largeDisplay)
                break;

            case '-':
                value -= Number(largeDisplay)
                break;

            case '/':
                value /= Number(largeDisplay)
                break;

            case 'x':
                value *= Number(largeDisplay)
                break;
            default:
                break;
        }
        setLastNumber(value)
        setLargeDisplay(value.toString())

        return value
    };

    const handleClick = (event) => {
        const key = event.target.innerText;

        setSmallDisplay(`${smallDisplay}${key}`)
        if (key === '0' && largeDisplay.startsWith('0'))
            return


        if ((isFinite(key)) || (key === '.' && !largeDisplay.includes('.'))) {
            let newDisplay = `${smallDisplay}${key}`
            if (largeDisplay.startsWith('0') || clearFlag && largeDisplay !== '-') {
                setLargeDisplay(`${key}`)
                if (!(smallDisplay.endsWith('-') || smallDisplay.endsWith('+') || smallDisplay.endsWith('x') || smallDisplay.endsWith('/'))) {
                    newDisplay = key
                }
            } else {
                setLargeDisplay(`${largeDisplay}${key}`)
            }
            setSmallDisplay(newDisplay)
            setClearFlag(false)

        } else if (key === 'AC') {
            setLargeDisplay('0')
            setSmallDisplay('')
        }
        else if (key === '+' || key === '-' || key === '/' || key === 'x') {
            if (lastOperation !== '') {
                if (smallDisplay.endsWith('+') || smallDisplay.endsWith('-') || smallDisplay.endsWith('x') || smallDisplay.endsWith('/')) {
                    if (key === '-') {
                        setLargeDisplay(key)
                        setSmallDisplay(`${smallDisplay}${key}`)
                        return
                    } else {
                        setSmallDisplay(`${smallDisplay.slice(0, smallDisplay.length - 1)}${key}`)
                        setLargeDisplay('0')
                    }
                } else {
                    handleOperation()
                }
            } else {
                setLastNumber(largeDisplay)
            }
            setClearFlag(true)
            setLastOperation(key)
        } else if (key === '=') {
            if (lastOperation) {
                const value = handleOperation()
                setSmallDisplay(`${smallDisplay}=${value}`)
                setLastOperation('')
                setClearFlag(true)
            }
        }
    }

    return (
        <div className='calculator'>
            <div className='display'>
                <span className='small-display'>{smallDisplay}</span>
                <p className='large-display' id='display'>{largeDisplay}</p>
            </div>
            <div className='actions'>
                <Button onClick={handleClick} symbol={'AC'} id='clear' colSpan={2} className='btn-red' />
                <Button onClick={handleClick} symbol={'/'} id='divide' operation />
                <Button onClick={handleClick} symbol={'x'} id='multiply' operation />
                <Button onClick={handleClick} symbol={7} id="seven" />
                <Button onClick={handleClick} symbol={8} id="eight" />
                <Button onClick={handleClick} symbol={9} id="nine" />
                <Button onClick={handleClick} symbol={'-'} id='subtract' operation />
                <Button onClick={handleClick} symbol={4} id="four" />
                <Button onClick={handleClick} symbol={5} id="five" />
                <Button onClick={handleClick} symbol={6} id="six" />
                <Button onClick={handleClick} symbol={'+'} id='add' operation />
                <Button onClick={handleClick} symbol={1} id="one" />
                <Button onClick={handleClick} symbol={2} id="two" />
                <Button onClick={handleClick} symbol={3} id="three" />
                <Button onClick={handleClick} symbol={'='} id='equals' rowSpan={2} className='btn-blue' />
                <Button onClick={handleClick} symbol={0} colSpan={2} id='zero' />
                <Button onClick={handleClick} symbol={'.'} id='decimal' />
            </div>
        </div>
    )
}