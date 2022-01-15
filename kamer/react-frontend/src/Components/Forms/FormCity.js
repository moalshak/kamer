import React from 'react'

const FormCity = ({onGet}) => {
    const [city, setCity] = React.useState('')
    const [orderBy, setOrderBy] = React.useState('')
    const [ascOrDesc, setAscOrDesc] = React.useState('')
    const [maxPrice, setMaxPrice] = React.useState('')
    const [minPrice, setMinPrice] = React.useState('')
    const [pets_choice, setPets_choice] = React.useState('')
    const [minArea, setMinArea] = React.useState('')
    const [maxArea, setMaxArea] = React.useState('')
    const [sqmBudget, setSqmBudget] = React.useState('')


    const onSubmit = (e) => {
        e.preventDefault();
        onGet(city.trim(), orderBy.trim(), ascOrDesc.trim(), maxPrice.trim(), minPrice.trim(), pets_choice.trim(), minArea.trim(), maxArea.trim(), sqmBudget.trim())
    }

    return (
        <form className='form-control' onSubmit={onSubmit}>
            <label>City</label>
            <input type='text' placeholder='type city' value={city} onChange={(e) => {
                setCity(e.target.value)
                console.log(city)
            }} required={true}/>
            <label>Order By</label>
            <input type='text' placeholder='type orderBy' value={orderBy} onChange={(e) => {
                setOrderBy(e.target.value)
                console.log(orderBy)
            }}/>
            <label>Asc Or Desc</label>
            <input type='text' placeholder='type Asc Or Desc' value={ascOrDesc} onChange={(e) => {
                setAscOrDesc(e.target.value)
                console.log(ascOrDesc)
            }}/>
            <label>Max Price</label>
            <input type='text' placeholder='type Max Price' value={maxPrice} onChange={(e) => {
                setMaxPrice(e.target.value)
                console.log(maxPrice)
            }}/>
            <label>Min Price</label>
            <input type='text' placeholder='type Min Price' value={minPrice} onChange={(e) => {
                setMinPrice(e.target.value)
                console.log(minPrice)
            }}/>
            <label>Max Area</label>
            <input type='text' placeholder='type Max Area' value={maxArea} onChange={(e) => {
                setMaxArea(e.target.value)
                console.log(maxArea)
            }}/>
            <label>Min Area</label>
            <input type='text' placeholder='type Min Area' value={minArea} onChange={(e) => {
                setMinArea(e.target.value)
                console.log(minArea)
            }}/>
            <label>Pets</label>
            <input type='text' placeholder='type pets_choice' value={pets_choice} onChange={(e) => {
                setPets_choice(e.target.value)
                console.log(pets_choice)
            }}/>
            <label>sqmBudget</label>
            <input type='text' placeholder='type sqmBudget' value={sqmBudget} onChange={(e) => {
                setSqmBudget(e.target.value)
                console.log(sqmBudget)
            }}/>
            <input type='submit' value='Find Property'/>
        </form>
    )
}

export default FormCity
