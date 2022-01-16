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
        onGet({
            city: city.trim(),
            orderBy: orderBy.trim(),
            ascOrDesc: ascOrDesc.trim(),
            maxPrice: maxPrice.trim(),
            minPrice: minPrice.trim(),
            pets_choice: pets_choice.trim(),
            minArea: minArea.trim(),
            maxArea: maxArea.trim(),
            sqmBudget: sqmBudget.trim()
        })
    }

    return (
        <form className='form-control' onSubmit={onSubmit}>
            <label>City</label>
            <input type='text' placeholder='type city' value={city} onChange={(e) => {
                setCity(e.target.value)
            }} required={true}/>
            <label>Order By</label>
            <input type='text' placeholder='type orderBy' value={orderBy} onChange={(e) => {
                setOrderBy(e.target.value)
            }}/>
            <label>Asc Or Desc</label>
            <input type='text' placeholder='type Asc Or Desc' value={ascOrDesc} onChange={(e) => {
                setAscOrDesc(e.target.value)
            }}/>
            <label>Max Price</label>
            <input type='text' placeholder='type Max Price' value={maxPrice} onChange={(e) => {
                setMaxPrice(e.target.value)
            }}/>
            <label>Min Price</label>
            <input type='text' placeholder='type Min Price' value={minPrice} onChange={(e) => {
                setMinPrice(e.target.value)
            }}/>
            <label>Max Area</label>
            <input type='text' placeholder='type Max Area' value={maxArea} onChange={(e) => {
                setMaxArea(e.target.value)
            }}/>
            <label>Min Area</label>
            <input type='text' placeholder='type Min Area' value={minArea} onChange={(e) => {
                setMinArea(e.target.value)
            }}/>
            <label>Pets</label>
            <input type='text' placeholder='type pets_choice' value={pets_choice} onChange={(e) => {
                setPets_choice(e.target.value)
            }}/>
            <label>sqmBudget</label>
            <input type='text' placeholder='type sqmBudget' value={sqmBudget} onChange={(e) => {
                setSqmBudget(e.target.value)
            }}/>
            <button type='submit'>Find Property</button>
        </form>
    )
}

export default FormCity
