import React from 'react'

const FormPost = ({onGet}) => {
    const [externalId, setexternalId] = React.useState('')
    const [areaSqm, setAreaSqm] = React.useState('')
    const [city, setCity] = React.useState('')
    const [coverImageUrl, setCoverImageUrl] = React.useState('')
    const [furnish, setFurnish] = React.useState('')
    const [longitude, setLongitude] = React.useState('')
    const [latitude, setLatitude] = React.useState('')
    const [postalCode, setCity] = React.useState('')
    const [title, setTitle] = React.useState('')
    const [additionalCost, setAdditionalCost] = React.useState('')
    const [deposit, setDeposit] = React.useState('')
    const [descriptionTranslated, setDescriptionTranslated] = React.useState('')
    const [gender, setGender] = React.useState('')
    const [isRoomActive, setIsRoomActive] = React.useState('')
    const [pageDescription, setPageDescription] = React.useState('')
    const [pageTitle, setPageTitle] = React.useState('')
    const [pets, setPets] = React.useState('')
    const [roommates, setRoommates] = React.useState('')
 
    const onSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <form className='form-control' onSubmit={onSubmit}>

        externalId
        areaSqm
        city
        coverImageUrl
        furnish
        latitude
        longitude
        postalCode
        propertyType
        rent
        title
        additionalCost
        deposit
        descriptionTranslated
        gender
        isRoomActive
        pageDescription
        pageTitle
        pets
        roommates


            <label>ExternalID</label>
            <input type='text' placeholder='type ExternalID' value={externalID} onChange={(e) =>{
                setExternalID(e.target.value)
            }}></input>

            <label>Area Square Meter</label>
            <input type='text' placeholder='type max Area Square Meter' value={areaSqm} onChange={(e) =>{
                setAreaSqm(e.target.value)
            }}></input>

            <label>City</label>
            <input type='text' placeholder='type City' value={city} onChange={(e) =>{
                setCity(e.target.value)
            }}></input>
            <label>Cover Image Url</label>
            <input type='text' placeholder='type Cover Image Url' value={coverImageUrl} onChange={(e) =>{
                setCoverImageUrl(e.target.value)
            }}></input>
            <label>Furnish</label>
            <input type='text' placeholder='type furnish' value={city} onChange={(e) =>{
                setFurnish(e.target.value)
            }}></input>

            <label>Latitude</label>
            <input type='text' placeholder='type latitude' value={latitude} onChange={(e) =>{
                setLatitude(e.target.value)
            }}></input>

            <label>Longitude</label>
            <input type='text' placeholder='type longitude' value={longitude} onChange={(e) =>{
                setLongitude(e.target.value)
            }}></input>

            <label>Postal Code</label>
            <input type='text' placeholder='type postalCode' value={postalCode} onChange={(e) =>{
                setPostalCode(e.target.value)
            }}></input>
            
            <label>Longitude</label>
            <input type='text' placeholder='type longitude' value={longitude} onChange={(e) =>{
                setLongitude(e.target.value)

            }}></input>
            <label>Longitude</label>
            <input type='text' placeholder='type longitude' value={longitude} onChange={(e) =>{
                setLongitude(e.target.value)
            }}></input>

            <label>Longitude</label>
            <input type='text' placeholder='type longitude' value={longitude} onChange={(e) =>{
                setLongitude(e.target.value)
            }}></input>
            


            <input type='submit' value='Find Property'></input>
        </form>
    )
}

export default FormPost
