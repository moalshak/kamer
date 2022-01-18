import React from 'react'
import { fuck } from "../../App"
/**
 *  This form gets all the parameter that the user would want to search properties by
 * @param onGet This function is used to set the values of the research that the user wants
 * @return {JSX.Element} the form that we want to display
 * @constructor
 */
const FormCity = ({onGet}) => {

    /**
     * The state of all the Parameters we want to research
     */
    const [city, setCity] = React.useState('')
    const [page_size, setPage_size] = React.useState('')
    const [orderBy, setOrderBy] = React.useState('')
    const [ascOrDesc, setAscOrDesc] = React.useState('')
    const [maxPrice, setMaxPrice] = React.useState('')
    const [minPrice, setMinPrice] = React.useState('')
    const [pets_choice, setPets_choice] = React.useState('')
    const [minArea, setMinArea] = React.useState('')
    const [maxArea, setMaxArea] = React.useState('')
    const [sqmBudget, setSqmBudget] = React.useState('')

    /**
     * This function listens to the click of the button and calls the research of the appropriate properties
     * @param e the listener
     */
    const onSubmit = (e) => {
        e.preventDefault();
        onGet(validate(city, page_size, orderBy, ascOrDesc, maxPrice, minPrice, pets_choice, minArea, maxArea, sqmBudget))
    }

    function validate(city, page_size, orderBy, ascOrDesc, maxPrice, minPrice, pets_choice, minArea, maxArea, sqmBudget) {
        return {
            city: city.trim(),
            page_size: page_size.trim(),
            orderBy: orderBy.trim(),
            ascOrDesc: ascOrDesc.trim(),
            maxPrice: maxPrice.trim(),
            minPrice: minPrice.trim(),
            pets_choice: pets_choice.trim(),
            minArea: minArea.trim(),
            maxArea: maxArea.trim(),
            sqmBudget: sqmBudget.trim()
        }
    }
    /**
     * JSX of the form
     */
    return (
        <form className='form-control' onSubmit={onSubmit}>
            <label>City</label>
            <input type='text' placeholder='type city' value={city} onChange={(e) => {
                setCity(e.target.value)
            }} required={true}/>
            
            <label>Order By</label>
            <select  name="dropdown" id="dropdown" value={orderBy} onChange={(e) => {setOrderBy(e.target.value)}}>
                <option value="Rent">Rent</option>
                <option value="areaSqm">Area</option>
            </select> 

            <label>Asc Or Desc</label>
            <select  name="dropdown" id="dropdown" value={ascOrDesc} onChange={(e) => {setAscOrDesc(e.target.value)}}>
                <option value="Asc">Ascending</option>
                <option value="Desc">Descending</option>
            </select>            

            <label>Max Price</label>
            <input type='text' placeholder='type Max Price' value={maxPrice} onChange={(e) => {
                setMaxPrice(e.target.value)
            }} type="number" min="0" />
            <label>Min Price</label>
            <input type='text' placeholder='type Min Price' value={minPrice} onChange={(e) => {
                setMinPrice(e.target.value)
            }} type="number" min="0" />
            <label>Max Area</label>
            <input type='text' placeholder='type Max Area' value={maxArea} onChange={(e) => {
                setMaxArea(e.target.value)
            }} type="number" min="0" />
            <label>Min Area</label>
            <input type='text' placeholder='type Min Area' value={minArea} onChange={(e) => {
                setMinArea(e.target.value)
            }} type="number" min="0"/>

            <label>Pets</label>
            <select  name="dropdown" id="dropdown" value={pets_choice} onChange={(e) => {setPets_choice(e.target.value)}}>
                <option value="%">No Preference</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
            </select> 

            <label>sqmBudget</label>
            <input type='text' placeholder='type sqmBudget' value={sqmBudget} onChange={(e) => {
                setSqmBudget(e.target.value)
            }} type="number" min="0"/>

            <label>Number of properties </label>
            <input type='text' placeholder='Number of Results' value={page_size} onChange={(e) => {
                setPage_size(e.target.value)
                console.log(e.target.value)
            }} required={true} type="number" min="0" />

            <a href={`${fuck(validate(city, page_size, orderBy, ascOrDesc, maxPrice, minPrice, pets_choice, minArea, maxArea, sqmBudget), "csv")}`}> Download CSV </a>

            <button type='submit'>Find Property</button>
        </form>
    )
}

export default FormCity


