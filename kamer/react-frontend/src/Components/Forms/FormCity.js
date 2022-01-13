import React from 'react'

const FormCity = ({onGet}) => {
    const [city, setCity] = React.useState('')
    const [orderBy, setOrderBy] = React.useState('rent')
    const [ascOrDesc, setAscOrDesc] = React.useState('ASC')
    const [maxPrice, setMaxPrice] = React.useState(1000)
    const [minPrice, setMinPrice] = React.useState(0)
    const [pets_choice, setPets_choice] = React.useState('')
    const [minArea, setMinArea] = React.useState(0)
    const [maxArea, setMaxArea] = React.useState(10)
    const [sqmBudget, setSqmBudget] = React.useState(1)



    const onSubmit = (e) => {
        e.preventDefault()
        
    }

    return (
        <form className='form-control' onSubmit={onSubmit}>
            <label>City</label>
            <input type='text' placeholder='type city' value={city} onChange={(e) =>{
                setCity(e.target.value)
                console.log(city)
            }}></input>
            <label>Order By</label>
            <input type='text' placeholder='type orderBy' value={orderBy} onChange={(e) =>{
                setOrderBy(e.target.value)
                console.log(orderBy)
            }}></input>
            <label>Asc Or Desc</label>
            <input type='text' placeholder='type Asc Or Desc' value={ascOrDesc} onChange={(e) =>{
                setAscOrDesc(e.target.value)
                console.log(ascOrDesc)
            }}></input>
            <label>Max Price</label>
            <input type='text' placeholder='type Max Price' value={maxPrice} onChange={(e) =>{
                setMaxPrice(e.target.value)
                console.log(maxPrice)
            }}></input>
            <label>Min Price</label>
            <input type='text' placeholder='type Min Price' value={minPrice} onChange={(e) =>{
                setMinPrice(e.target.value)
                console.log(minPrice)
            }}></input>
            <label>Max Area</label>
            <input type='text' placeholder='type Max Area' value={maxArea} onChange={(e) =>{
                setMaxArea(e.target.value)
                console.log(maxArea)
            }}></input>
            <label>Min Area</label>
            <input type='text' placeholder='type Min Area' value={minArea} onChange={(e) =>{
                setMinArea(e.target.value)
                console.log(minArea)
            }}></input>
            <label>Pets</label>
            <input type='text' placeholder='type pets_choice' value={pets_choice} onChange={(e) =>{
                setPets_choice(e.target.value)
                console.log(pets_choice)
            }}></input>
            <label>sqmBudget</label>
            <input type='text' placeholder='type sqmBudget' value={sqmBudget} onChange={(e) =>{
                setSqmBudget(e.target.value)
                console.log(sqmBudget)
            }}></input>
            <input type='submit' value='Find Property'></input>
        </form>
    )
}

export default FormCity
